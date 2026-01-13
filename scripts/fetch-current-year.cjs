const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../public/github-data.json');
const USERNAME = 'worhs02';

async function fetchCurrentYear() {
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

    // 올해 contributions 가져오기
    console.log(`Fetching contributions for ${currentYear}...`);
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${currentYear}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const contributionsData = await response.json();

    // 데이터 업데이트
    data.contributions[currentYear] = contributionsData.contributions || [];
    data.lastUpdated.contributions[currentYear] = new Date().toISOString();

    // 파일 저장
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    console.log(`✅ Updated contributions for ${currentYear}`);

  } catch (error) {
    console.error('❌ Error fetching current year:', error.message);
    process.exit(1);
  }
}

fetchCurrentYear();
