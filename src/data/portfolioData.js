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
  },
  {
    id: 7,
    color: '#FFE4E1',
    emoji: '🎮🕹️',
    title: '게임 커뮤니티',
    period: '2021.09 - 2021.12',
    overview: 'Node.js와 MongoDB를 활용한 게임 정보 공유 커뮤니티 플랫폼',
    team: '3명 (풀스택 개발)',
    skills: ['Node.js', 'Express', 'MongoDB', 'React'],
    troubleshooting: [
      'MongoDB 쿼리 최적화 → 인덱스 생성 및 aggregation pipeline 활용',
      '이미지 업로드 속도 개선 → AWS S3 연동 및 CDN 적용'
    ],
    github: 'https://github.com/username/game-community'
  },
  {
    id: 8,
    color: '#E0F7FA',
    emoji: '📊📈',
    title: '데이터 시각화 대시보드',
    period: '2021.06 - 2021.08',
    overview: 'Python과 React를 활용한 데이터 분석 및 시각화 웹 애플리케이션',
    team: '2명 (백엔드 1명, 프론트엔드 1명)',
    skills: ['Python', 'Flask', 'Pandas', 'Chart.js', 'React'],
    troubleshooting: [
      '대용량 CSV 파일 처리 시간 단축 → Pandas 청크 처리 적용',
      '실시간 차트 업데이트 성능 → WebSocket 적용'
    ],
    github: 'https://github.com/username/data-dashboard'
  },
  {
    id: 9,
    color: '#FFF9C4',
    emoji: '🎓📚',
    title: '온라인 강의 플랫폼',
    period: '2021.03 - 2021.05',
    overview: 'Spring Boot 기반 동영상 강의 플랫폼. 비디오 스트리밍 및 진도율 관리 기능',
    team: '4명 (백엔드 2명, 프론트엔드 2명)',
    skills: ['Spring Boot', 'MySQL', 'AWS S3', 'HLS'],
    troubleshooting: [
      '동영상 재생 끊김 현상 → HLS 프로토콜 적용 및 adaptive bitrate streaming',
      '진도율 저장 동시성 문제 → Redis를 이용한 분산 락 구현'
    ],
    github: 'https://github.com/username/online-lecture'
  },
  {
    id: 10,
    color: '#F0F4C3',
    emoji: '🏋️💪',
    title: '운동 기록 앱',
    period: '2020.11 - 2021.02',
    overview: 'React Native로 개발한 크로스 플랫폼 운동 기록 및 분석 모바일 앱',
    team: '2명 (앱 개발)',
    skills: ['React Native', 'SQLite', 'Redux', 'Victory Charts'],
    troubleshooting: [
      'iOS/Android 플랫폼별 UI 차이 → Platform API 활용',
      '로컬 데이터 동기화 → AsyncStorage와 SQLite 조합'
    ],
    github: 'https://github.com/username/workout-tracker'
  },
  {
    id: 11,
    color: '#E1F5FE',
    emoji: '🌤️🌧️',
    title: '날씨 정보 앱',
    period: '2020.08 - 2020.10',
    overview: 'OpenWeather API를 활용한 날씨 정보 제공 웹 애플리케이션',
    team: '1명 (개인 프로젝트)',
    skills: ['Vue.js', 'Vuex', 'OpenWeather API', 'Chart.js'],
    troubleshooting: [
      'API 호출 횟수 제한 → LocalStorage 캐싱 적용',
      '위치 정보 정확도 개선 → Geolocation API 정밀도 설정'
    ],
    github: 'https://github.com/username/weather-app'
  },
  {
    id: 12,
    color: '#FCE4EC',
    emoji: '📝✅',
    title: 'Todo 관리 앱',
    period: '2020.06 - 2020.07',
    overview: 'TypeScript와 React를 활용한 할 일 관리 웹 애플리케이션',
    team: '1명 (개인 프로젝트)',
    skills: ['TypeScript', 'React', 'Context API', 'LocalStorage'],
    troubleshooting: [
      '타입 안정성 확보 → TypeScript strict mode 적용',
      '상태 관리 복잡도 → Context API와 useReducer 조합'
    ],
    github: 'https://github.com/username/todo-app'
  },
  {
    id: 13,
    color: '#E8EAF6',
    emoji: '🎵🎶',
    title: '음악 스트리밍 앱',
    period: '2020.03 - 2020.05',
    overview: 'Android 기반 음악 재생 및 플레이리스트 관리 애플리케이션',
    team: '2명 (Android 개발)',
    skills: ['Kotlin', 'Android', 'MediaPlayer', 'Room DB'],
    troubleshooting: [
      '백그라운드 재생 중단 문제 → Foreground Service 적용',
      '메모리 누수 이슈 → ViewModel과 LiveData 활용'
    ],
    github: 'https://github.com/username/music-player'
  },
  {
    id: 14,
    color: '#F1F8E9',
    emoji: '🍕🍔',
    title: '음식 배달 플랫폼',
    period: '2019.11 - 2020.02',
    overview: 'Spring Boot와 React Native를 활용한 음식 주문 배달 서비스',
    team: '6명 (백엔드 3명, 앱 3명)',
    skills: ['Spring Boot', 'MySQL', 'React Native', 'Kakao Map API'],
    troubleshooting: [
      '주문 처리 동시성 문제 → 비관적 락(Pessimistic Lock) 적용',
      '실시간 배달 상태 추적 → Server-Sent Events 활용'
    ],
    github: 'https://github.com/username/food-delivery'
  },
  {
    id: 15,
    color: '#FBE9E7',
    emoji: '📖📚',
    title: '도서 관리 시스템',
    period: '2019.08 - 2019.10',
    overview: 'Java Swing을 활용한 도서관 대출/반납 관리 데스크톱 애플리케이션',
    team: '3명 (데스크톱 개발)',
    skills: ['Java', 'Swing', 'MySQL', 'JDBC'],
    troubleshooting: [
      'UI 응답 지연 → SwingWorker를 이용한 비동기 처리',
      'DB 연결 풀 부족 → HikariCP 도입'
    ],
    github: 'https://github.com/username/library-system'
  },
  {
    id: 16,
    color: '#E3F2FD',
    emoji: '🚗🅿️',
    title: '주차장 관리 시스템',
    period: '2019.05 - 2019.07',
    overview: 'IoT 센서와 연동된 스마트 주차장 관리 웹 애플리케이션',
    team: '4명 (IoT 2명, 웹 2명)',
    skills: ['Node.js', 'Express', 'MQTT', 'React', 'Raspberry Pi'],
    troubleshooting: [
      'IoT 센서 데이터 손실 → MQTT QoS 레벨 조정',
      '실시간 주차 현황 업데이트 → Socket.io 적용'
    ],
    github: 'https://github.com/username/parking-system'
  }
]
