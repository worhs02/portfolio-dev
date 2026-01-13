const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../public/github-data.json');
const USERNAME = 'worhs02';

async function fetchPastYears() {
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

    const currentYear = new Date().getFullYear();
    const yearsToFetch = [currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

    // 각 연도별로 contributions 가져오기
    for (const year of yearsToFetch) {
      console.log(`Fetching contributions for ${year}...`);

      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`
        );

        if (!response.ok) {
          console.warn(`⚠️  API Error for ${year}: ${response.status}`);
          continue;
        }

        const contributionsData = await response.json();
        data.contributions[year] = contributionsData.contributions || [];
        data.lastUpdated.contributions[year] = new Date().toISOString();

        console.log(`✅ Updated contributions for ${year}`);

        // API rate limit 고려해서 1초 대기
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.warn(`⚠️  Error fetching ${year}:`, error.message);
      }
    }

    // 파일 저장
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    console.log('✅ All past years updated');

  } catch (error) {
    console.error('❌ Error fetching past years:', error.message);
    process.exit(1);
  }
}

fetchPastYears();
