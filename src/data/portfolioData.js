export const portfolioItems = [
  {
    id: 1,
    color: '#FFF5E6',
    emoji: '✏️📝',
    title: '포트폴리오 웹사이트',
    period: '2024.11 - 2024.12',
    award: '우수상 🏆',
    overview: 'React와 Vite를 활용한 개인 포트폴리오 웹사이트 제작. 네오브루탈리즘 디자인을 적용하여 독창적이고 인상적인 UI/UX 구현',
    team: '1명 (개인 프로젝트)',
    skills: ['React', 'Vite', 'CSS3', 'GitHub Pages'],
    troubleshooting: [
      '반응형 디자인 구현 시 다양한 디바이스에서의 레이아웃 깨짐 현상 → CSS Grid와 Flexbox를 조합하여 해결',
      'GitHub Pages 배포 시 라우팅 문제 → base path 설정 및 HashRouter 적용'
    ],
    github: 'https://github.com/username/portfolio'
  },
  {
    id: 2,
    color: '#E8F5FF',
    emoji: '💻🖥️',
    title: '공공데이터 활용 서비스',
    period: '2023.08 - 2023.09',
    award: '최우수상 🥇',
    overview: '공공 API를 활용한 실시간 정보 제공 웹 애플리케이션. Spring Boot 기반 백엔드와 React 프론트엔드로 구성',
    team: '4명 (백엔드 2명, 프론트엔드 2명)',
    skills: ['Spring Boot', 'MySQL', 'React', 'REST API'],
    troubleshooting: [
      'API 호출 제한으로 인한 서비스 중단 → Redis 캐싱 적용으로 API 호출 횟수 80% 감소',
      '대용량 데이터 처리 시 성능 저하 → 페이징 처리 및 인덱스 최적화로 쿼리 속도 5배 향상'
    ],
    github: 'https://github.com/username/public-data-service'
  },
  {
    id: 3,
    color: '#FFFACD',
    emoji: '🎨🖌️',
    title: '커뮤니티 플랫폼',
    period: '2023.03 - 2023.06',
    overview: 'Spring Boot와 JPA를 활용한 게시판 및 댓글 기능이 포함된 커뮤니티 웹사이트',
    team: '3명 (백엔드 2명, 프론트엔드 1명)',
    skills: ['Spring Boot', 'JPA', 'MySQL', 'UIkit'],
    troubleshooting: [
      'N+1 쿼리 문제로 인한 성능 저하 → Fetch Join 및 @EntityGraph 적용',
      '동시성 이슈로 인한 댓글 중복 저장 → 낙관적 락(Optimistic Lock) 적용'
    ],
    github: 'https://github.com/username/community-platform'
  },
  {
    id: 4,
    color: '#FFF8DC',
    emoji: '🔍✨',
    title: '맛집 추천 앱',
    period: '2022.11 - 2023.02',
    overview: 'Android 네이티브로 개발한 위치 기반 맛집 추천 모바일 애플리케이션',
    team: '2명 (Android 개발)',
    skills: ['Java', 'Android', 'Google Maps API', 'Firebase'],
    troubleshooting: [
      '위치 권한 거부 시 앱 크래시 → 권한 체크 로직 개선 및 fallback UI 구현',
      'Firebase 실시간 데이터 동기화 지연 → 로컬 캐싱 및 optimistic update 적용'
    ],
    github: 'https://github.com/username/restaurant-app'
  },
  {
    id: 5,
    color: '#E8F5E9',
    emoji: '🛒💳',
    title: '이커머스 플랫폼',
    period: '2022.06 - 2022.10',
    overview: 'Spring Boot 기반 쇼핑몰 웹사이트. 결제 모듈 연동 및 관리자 페이지 구현',
    team: '5명 (풀스택 개발)',
    skills: ['Spring Boot', 'MySQL', 'Thymeleaf', 'BootPay API'],
    troubleshooting: [
      '결제 취소 시 재고 복구 트랜잭션 문제 → @Transactional 격리 수준 조정',
      '주문 폭주 시 DB 커넥션 부족 → HikariCP 설정 최적화'
    ],
    github: 'https://github.com/username/ecommerce'
  },
  {
    id: 6,
    color: '#F3E5F5',
    emoji: '📱🔥',
    title: '실시간 채팅 앱',
    period: '2022.03 - 2022.05',
    overview: 'Firebase를 활용한 실시간 채팅 Android 애플리케이션',
    team: '2명 (Android 개발)',
    skills: ['Java', 'Android', 'Firebase Realtime Database', 'FCM'],
    troubleshooting: [
      '메시지 순서 보장 문제 → Firebase Transaction 활용',
      '푸시 알림 미수신 이슈 → FCM 토큰 갱신 로직 구현'
    ],
    github: 'https://github.com/username/chat-app'
  }
]
