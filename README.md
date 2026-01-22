# Portfolio

macOS 스타일의 인터랙티브 포트폴리오 웹사이트

**Live Demo**: [https://worhs02.github.io/portfolio-dev/](https://worhs02.github.io/portfolio-dev/)

---

## 프로젝트 소개

macOS 데스크톱 환경을 웹으로 구현한 개인 포트폴리오 사이트입니다.
실제 macOS와 유사한 사용자 경험을 제공하며, Vibe Coding(AI 페어 프로그래밍)을 통해 개발하였습니다.

---

## 기술 스택

- **Frontend**: React, Vite, JavaScript (ES6+)
- **Styling**: CSS3 (Flexbox, Grid, Animation)
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions (자동 데이터 수집)
- **Development**: Vibe Coding with Claude Code

---

## 주요 기능

- macOS 스타일 데스크톱 UI
- 드래그 가능한 윈도우 시스템
- Dock 애니메이션 (마우스 호버 시 아이콘 확대)
- 창 최소화/최대화/닫기 기능
- Finder 스타일 포트폴리오 브라우저
- GitHub 통합 (Contribution Graph, Repositories)
- 이메일 앱
- 반응형 디자인 (Desktop/Tablet/Mobile)

---

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 배포
npm run deploy
```

---

## 프로젝트 구조

```
portfolio-dev/
├── public/
│   ├── images/          # 이미지 파일
│   └── github-data.json # GitHub 데이터 (자동 생성)
├── src/
│   ├── components/      # React 컴포넌트
│   ├── data/           # 프로젝트 데이터
│   └── utils/          # 유틸리티 함수
└── .github/
    └── workflows/      # GitHub Actions
```

---

## 개발자

**송재곤 (worhs02)**

- GitHub: [@worhs02](https://github.com/worhs02)
- Email: worhs02@gmail.com
