const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../public/github-data.json');
const USERNAME = 'worhs02';

async function fetchRepos() {
  try {
    // 기존 데이터 읽기
    let data = {
      user: null,
      repos: [],
      contributions: {},
      lastUpdated: {
        user: null,
        repos: null,
        contributions: {}
      }
    };

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }

    // 사용자 정보 가져오기
    console.log('Fetching user data...');
    const userResponse = await fetch(`https://api.github.com/users/${USERNAME}`);
    if (!userResponse.ok) {
      throw new Error(`User API Error: ${userResponse.status}`);
    }
    const userData = await userResponse.json();
    data.user = userData;
    data.lastUpdated.user = new Date().toISOString();
    console.log('✅ User data updated');

    // 레포지토리 목록 가져오기
    console.log('Fetching repositories...');
    const reposResponse = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`
    );
    if (!reposResponse.ok) {
      throw new Error(`Repos API Error: ${reposResponse.status}`);
    }
    const reposData = await reposResponse.json();

    // 각 레포지토리의 push 수 가져오기
    const reposWithPushes = [];
    for (const repo of reposData.slice(0, 6)) {
      console.log(`Fetching pushes for ${repo.name}...`);

      try {
        // commits API로 push 수 계산 (최근 100개만)
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${USERNAME}/${repo.name}/commits?per_page=100`
        );

        let pushCount = 0;
        if (commitsResponse.ok) {
          const commits = await commitsResponse.json();
          pushCount = commits.length;

          // Link header에서 total count 확인 (더 정확한 수)
          const linkHeader = commitsResponse.headers.get('Link');
          if (linkHeader && linkHeader.includes('rel="last"')) {
            const match = linkHeader.match(/page=(\d+)>; rel="last"/);
            if (match) {
              const lastPage = parseInt(match[1]);
              pushCount = lastPage * 100; // 대략적인 추정
            }
          }
        }

        reposWithPushes.push({
          ...repo,
          push_count: pushCount
        });

        // API rate limit 고려해서 500ms 대기
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.warn(`⚠️  Error fetching pushes for ${repo.name}:`, error.message);
        reposWithPushes.push({
          ...repo,
          push_count: 0
        });
      }
    }

    data.repos = reposWithPushes;
    data.lastUpdated.repos = new Date().toISOString();

    // 파일 저장
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    console.log('✅ Repositories data updated');

  } catch (error) {
    console.error('❌ Error fetching repos:', error.message);
    process.exit(1);
  }
}

fetchRepos();
