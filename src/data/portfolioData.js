// 기술 스택 데이터
// level: 숙련도 퍼센트 (0-100)
// proficiency: 1=Beginner, 2=Intermediate, 3=Advanced
// proficiencyLevel: 1=공부해본적 있음, 2=사용해본적 있음, 3=프로젝트 1회 경험, 4=프로젝트 2회 경험, 5=프로젝트 3회 이상 경험
export const techStackData = [
  {
    id: 1,
    name: 'Java',
    description: 'Object-oriented programming language',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    color: '#007396',
    proficiency: 2,
    proficiencyLevel: 5,
    level: 50
  },
  {
    id: 2,
    name: 'Spring Boot',
    description: 'Java-based framework for backend development',
    image: 'https://cdn.simpleicons.org/springboot/6DB33F',
    color: '#6DB33F',
    proficiency: 2,
    proficiencyLevel: 4,
    level: 60
  },
  {
    id: 3,
    name: 'MySQL',
    description: 'Relational database management system',
    image: 'https://cdn.simpleicons.org/mysql/4479A1',
    color: '#4479A1',
    proficiency: 2,
    proficiencyLevel: 4,
    level: 45
  },
  {
    id: 4,
    name: 'UIkit',
    description: 'Frontend UI framework',
    image: 'https://cdn.simpleicons.org/uikit/2396F3',
    color: '#2396F3',
    proficiency: 2,
    proficiencyLevel: 4,
    level: 50
  },
  {
    id: 5,
    name: 'Android',
    description: 'Mobile app development with Java',
    image: 'https://cdn.simpleicons.org/android/3DDC84',
    color: '#3DDC84',
    proficiency: 2,
    proficiencyLevel: 3,
    level: 40
  },
  {
    id: 6,
    name: 'AWS',
    description: 'Amazon Web Services cloud platform',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    color: '#FF9900',
    proficiency: 1,
    proficiencyLevel: 3,
    level: 25
  },
  {
    id: 7,
    name: 'GCP',
    description: 'Google Cloud Platform services',
    image: 'https://cdn.simpleicons.org/googlecloud/4285F4',
    color: '#4285F4',
    proficiency: 1,
    proficiencyLevel: 3,
    level: 35
  },
  {
    id: 8,
    name: 'Docker',
    description: 'Containerization platform',
    image: 'https://cdn.simpleicons.org/docker/2496ED',
    color: '#2496ED',
    proficiency: 1,
    proficiencyLevel: 2,
    level: 20
  }
]

// 포트폴리오 프로젝트 데이터
export const portfolioItems = [
  {
    id: 1,
    color: '#FFF5E6',
    emoji: '✏️📝',
    title: 'BLISM',
    period: '2024.12.05 - 2024.12.22',
    overview: 'React와 Vite를 활용한 개인 포트폴리오 웹사이트 제작. 네오브루탈리즘 디자인을 적용하여 독창적이고 인상적인 UI/UX 구현',
    team: '1명 (개인 프로젝트)',
    skills: ['Swift', 'UIKIT', 'GitHub'],
    troubleshooting: [
      '반응형 디자인 구현 시 다양한 디바이스에서의 레이아웃 깨짐 현상 → CSS Grid와 Flexbox를 조합하여 해결',
      'GitHub Pages 배포 시 라우팅 문제 → base path 설정 및 HashRouter 적용'
    ],
    contribution: '• 프로젝트 기획 및 디자인 (100%)\n• React 컴포넌트 개발 (100%)\n• 네오브루탈리즘 UI/UX 디자인 구현\n• GitHub Pages 배포 및 CI/CD 구축\n• 반응형 웹 디자인 최적화'
  },
  {
    id: 2,
    color: '#E8F5FF',
    emoji: '💻🖥️',
    title: '공공데이터 활용 서비스',
    period: '2023.08 - 2023.09',
    award: {
      name: '최우수상 🥇',
      from: '공공데이터 활용 공모전',
      certificateUrl: ''
    },
    overview: `공공 API를 활용한 실시간 정보 제공 웹 애플리케이션.

## 기술 스택
- **Backend**: Spring Boot, MySQL
- **Frontend**: React
- **API**: REST API

## 주요 기능
- 공공 데이터 실시간 조회
- 데이터 시각화 및 분석
- 사용자 맞춤형 알림`,
    team: '4명 (백엔드 2명, 프론트엔드 2명)',
    skills: ['Spring Boot', 'MySQL', 'React', 'REST API'],
    troubleshooting: `### 문제 1: API 호출 제한으로 인한 서비스 중단
**문제점**: 공공 API의 호출 제한으로 인해 서비스가 자주 중단됨

**해결방법**: Redis 캐싱 시스템 도입
- API 응답 데이터를 Redis에 캐싱
- 캐시 만료 시간 설정 (5분)
- API 호출 횟수 **80% 감소**

### 문제 2: 대용량 데이터 처리 시 성능 저하
**문제점**: 수천 건의 데이터 조회 시 응답 시간 지연

**해결방법**: 페이징 및 인덱스 최적화
- 페이지네이션 구현 (한 페이지당 20건)
- MySQL 인덱스 최적화
- 쿼리 속도 **5배 향상**`,
    contribution: `## 담당 역할 및 기여도

### 백엔드 API 설계 및 개발 (50%)
- RESTful API 설계 및 구현
- Controller, Service, Repository 계층 구조 설계
- 공공 API 연동 모듈 개발

### Redis 캐싱 시스템 구축
- Redis 서버 구축 및 설정
- Spring Data Redis 연동
- 캐시 전략 수립 및 구현

### 데이터베이스 설계 및 최적화
- MySQL 데이터베이스 스키마 설계
- 인덱스 최적화 및 쿼리 튜닝
- 성능 테스트 및 모니터링

### REST API 문서화
- Swagger를 이용한 API 문서 자동화
- API 사용 가이드 작성`,
    retrospective: `## 프로젝트 회고

### 잘한 점 ✅
- Redis 캐싱을 통해 API 호출 비용을 크게 절감할 수 있었습니다
- 체계적인 API 문서화로 팀원들과의 협업이 원활했습니다
- 성능 최적화를 통해 사용자 경험을 크게 개선했습니다

### 아쉬운 점 📝
- 초기 설계 단계에서 성능 테스트를 진행하지 않아 후반부에 많은 시간을 할애했습니다
- 캐시 무효화 전략을 더 정교하게 설계했다면 좋았을 것 같습니다

### 배운 점 💡
- 대용량 트래픽 처리를 위한 캐싱 전략의 중요성을 깨달았습니다
- 데이터베이스 인덱스 설계의 중요성을 체감했습니다
- API 문서화가 협업 효율성에 미치는 영향이 크다는 것을 배웠습니다

### 다음에 시도해볼 것 🚀
- Redis Cluster를 활용한 분산 캐싱 시스템 구축
- Spring Boot Actuator를 이용한 실시간 모니터링
- GraphQL 도입을 통한 API 효율성 개선`
  },
  {
    id: 3,
    color: '#FFFACD',
    emoji: '🎨🖌️',
    title: '커뮤니티 플랫폼',
    period: '2023.03 - 2023.06',
    overview: `Spring Boot와 JPA를 활용한 게시판 및 댓글 기능이 포함된 커뮤니티 웹사이트.

## 기술 스택
- **Backend**: Spring Boot, JPA, MySQL
- **Frontend**: UIkit

## 주요 기능
- 게시판 CRUD 기능
- 댓글 및 대댓글 시스템
- 사용자 인증 및 권한 관리`,
    team: '3명 (백엔드 2명, 프론트엔드 1명)',
    skills: ['Spring Boot', 'JPA', 'MySQL', 'UIkit'],
    troubleshooting: `### 문제 1: N+1 쿼리 문제로 인한 성능 저하
**문제점**: 게시글 목록 조회 시 각 게시글마다 추가 쿼리가 발생하여 성능 저하

**해결방법**: Fetch Join 및 @EntityGraph 적용
- Fetch Join을 통한 연관 엔티티 한 번에 조회
- @EntityGraph로 필요한 연관관계만 선택적 로딩
- 쿼리 수 **95% 감소**

### 문제 2: 동시성 이슈로 인한 댓글 중복 저장
**문제점**: 동시에 댓글 작성 시 중복 저장되는 문제 발생

**해결방법**: 낙관적 락(Optimistic Lock) 적용
- @Version 어노테이션을 통한 버전 관리
- 충돌 감지 및 재시도 로직 구현`,
    contribution: `## 담당 역할 및 기여도

### JPA 엔티티 설계 및 연관관계 매핑 (70%)
- 엔티티 클래스 설계
- 양방향 연관관계 매핑
- 영속성 컨텍스트 관리

### 게시판 CRUD API 개발
- 게시글 생성, 조회, 수정, 삭제 API
- 페이징 및 정렬 기능 구현

### 댓글 시스템 구현
- 댓글 및 대댓글 계층 구조 설계
- 댓글 작성, 수정, 삭제 기능

### 성능 최적화
- N+1 쿼리 문제 해결
- 동시성 제어 구현`,
    retrospective: `## 프로젝트 회고

### 잘한 점 ✅
- JPA의 다양한 기능을 실전에서 활용할 수 있었습니다
- 성능 문제를 적극적으로 찾아 해결했습니다
- 동시성 문제를 사전에 예방할 수 있었습니다

### 아쉬운 점 📝
- 초기 설계 시 성능을 고려하지 않아 리팩토링이 많았습니다
- 테스트 코드 작성이 부족했습니다

### 배운 점 💡
- JPA의 영속성 컨텍스트와 지연 로딩의 중요성
- 데이터베이스 락의 종류와 활용 방법
- 연관관계 매핑의 장단점

### 다음에 시도해볼 것 🚀
- QueryDSL을 활용한 동적 쿼리 작성
- Spring Data JPA Specification 활용
- 통합 테스트 코드 작성`
  }
]
