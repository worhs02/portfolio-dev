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
    color: '#E8F5FF',
    emoji: '🐳🌊',
    title: '다이버리 (Divary)',
    period: '',
    overview: `![Divary Banner](/portfolio-dev/images/divary.jpg)

**"바다를 기록하고, 추억을 꾸미다"**

스쿠버다이빙을 사랑하는 사람들을 위한 감성 다이빙 로그 앱

## 프로젝트 배경

스쿠버다이빙은 단순한 스포츠를 넘어 바닷속에서 비일상적인 경험을 기록하는 여정입니다. 하지만 다이버들이 남기는 기록(다이빙 로그)은 아직도 대부분 종이로, 또는 딱딱한 입력형 앱에 그치고 있습니다.

## 기술 스택
- **Backend**: Spring Boot, MySQL
- **Frontend**: iOS (UIKit), SwiftUI
- **API**: GPT API, 날씨/수온 API
- **기타**: Canvas API / PencilKit (그림 그리기), 사진 추가 및 자유 배치

## 주요 기능
### 📘 다이빙 로그
- 날짜, 장소, 수심, 수온, 시야, 장비 등 필수 정보 기록
- 빠르고 직관적인 입력 UI
- 템플릿 기반 반복 작성

### 📓 다이빙 일기장
- 감정과 추억을 자유롭게 표현하는 감성 기록 공간
- 사진 첨부, 손글씨 느낌 폰트, 이모지, 스티커 등 꾸미기 요소 제공

### 🐠 해양 도감 (AI 연동)
- GPT 연동으로 생물 이름과 설명 제공
- 사진 기반 검색 및 대화형 탐색 ("이거 뭐야?" 질문 가능)
- 나만의 도감 완성 기능

### 🌊 나의 바다 & 아바타
- 다이빙 기록에 따라 아바타와 바다 공간 성장
- 아바타 커스터마이징 (장비, 의상 등)
- 수집한 해양 생물로 어항 꾸미기`,
    team: '5명 (백엔드 2명, iOS 3명)',
    skills: ['Spring Boot', 'MySQL', 'iOS', 'UIKit', 'GPT API', 'PencilKit'],
    troubleshooting: `### 문제 1: @OneToMany 매핑 없이 연관 엔티티 삭제

**상황**
- Member(부모) 엔티티가 삭제될 때, 해당 회원이 작성한 Log, Avatar (자식) 엔티티도 함께 삭제되어야 데이터 무결성이 보장됨
- Member 엔티티에는 비즈니스 로직상 자식 엔티티(List<Log> 등)로 향하는 @OneToMany 매핑이 정의되어 있지 않았음
- 이로 인해 JPA 표준 기능인 cascade = CascadeType.REMOVE 옵션을 설정할 수 없는 문제 발생

**해결방법**
- JPA 레벨의 영속성 전이 대신, **DB 레벨의 외래 키 제약 조건** 활용
- Member를 @ManyToOne으로 참조하는 자식 엔티티의 매핑 필드에 \`@OnDelete(action = OnDeleteAction.CASCADE)\` 추가

**결과**
- Member 엔티티에 불필요한 @OneToMany 매핑을 추가하지 않고 깔끔한 단방향 의존성 유지
- N+1 삭제 방지: JPA가 Delete 쿼리 1개만 실행하고, 실제 연쇄 삭제는 데이터베이스가 직접 처리하여 성능 향상

### 문제 2: 새로운 멤버 생성 시 try-catch 부근에서 rollback only 오류

**상황**
- Member 생성 로직은 @Transactional로 관리
- 이메일 중복으로 발생하는 DataIntegrityViolationException을 try-catch로 잡아 커스텀 응답 반환 시도
- catch 블록이 예외를 처리했음에도 UnexpectedRollbackException 발생

**원인**
- DataIntegrityViolationException은 RuntimeException
- Spring AOP 프록시가 catch 블록보다 먼저 예외를 감지하고 트랜잭션을 "rollback-only" 상태로 표시
- 메서드는 정상 return 되지만 commit 시도 시 충돌 발생

**해결방법**
- DB 예외에 의존하는 사후 처리(Reactive) 방식 포기
- **Optional을 활용**하여 회원이 있으면 기존 회원 리턴, 없으면 생성하는 방식으로 변경

### 문제 3: Optimistic Lock 커밋 시점 예외 처리

**상황**
- 유저 탈퇴 및 탈퇴 취소 요청 시 race condition 처리를 위해 @Version 도입
- ObjectOptimisticLockingFailureException 발생 시 처리하는 핸들러가 없어 500 Internal Server Error 노출

**해결방법**
- @RestControllerAdvice가 붙은 GlobalExceptionHandler에 ObjectOptimisticLockingFailureException을 명시적으로 처리하는 @ExceptionHandler 메서드 추가
- **HTTP 409 Conflict** 상태 코드와 "데이터가 충돌했습니다. 다시 시도해 주세요." 메시지 반환`,
    contribution: `## 담당 역할 및 기여도

### 백엔드 API 설계 및 개발 (40%)
- RESTful API 설계 및 구현
- Spring Boot 기반 서버 아키텍처 구축
- GPT API 연동 모듈 개발

### 데이터베이스 설계
- MySQL 데이터베이스 스키마 설계
- JPA 엔티티 및 연관관계 매핑
- 데이터 무결성 보장을 위한 제약조건 설계

### 예외 처리 및 트랜잭션 관리
- 글로벌 예외 핸들러 구현
- 트랜잭션 관리 및 동시성 제어
- Optimistic Lock을 통한 race condition 해결

### AI 기능 구현
- GPT API를 활용한 해양 생물 인식 기능
- 대화형 도감 검색 기능 구현`,
    retrospective: `## 프로젝트 회고

### 잘한 점 ✅
- **실제 사용자 조사를 통한 기획**: 설문조사를 통해 실제 다이버들의 니즈를 파악하고 반영했습니다
- **DB 레벨에서의 성능 최적화**: @OnDelete를 활용해 N+1 삭제 문제를 사전에 방지했습니다
- **예외 처리 전략 수립**: 다양한 예외 상황에 대한 체계적인 처리 방안을 마련했습니다
- **AI 기술 활용**: GPT API를 활용하여 사용자 경험을 크게 향상시켰습니다

### 아쉬운 점 📝
- 초기 설계 단계에서 트랜잭션 관리 전략을 더 깊이 고민했다면 시행착오를 줄일 수 있었을 것 같습니다
- iOS 팀과의 API 명세 협의에 더 많은 시간을 할애할 필요가 있었습니다

### 배운 점 💡
- **JPA 영속성 관리의 중요성**: 엔티티 생명주기와 트랜잭션 경계에 대한 깊은 이해의 필요성을 깨달았습니다
- **예외 처리의 타이밍**: RuntimeException과 Spring AOP의 동작 방식을 명확히 이해하게 되었습니다
- **사용자 중심 설계**: 실제 사용자의 피드백이 제품 방향성에 얼마나 중요한지 배웠습니다
- **AI 기술의 실전 활용**: GPT API를 실제 서비스에 통합하는 경험을 쌓았습니다

### 다음에 시도해볼 것 🚀
- Redis를 활용한 세션 관리 및 캐싱 전략 도입
- Spring Boot Actuator를 이용한 실시간 모니터링 시스템 구축
- 테스트 커버리지 향상을 위한 통합 테스트 작성
- CI/CD 파이프라인 구축을 통한 배포 자동화`
  },
  {
    id: 2,
    color: '#FFE5F5',
    emoji: '🎵🎧',
    title: 'ARCHEIVE',
    period: '',
    overview: `![ARCHEIVE Banner](/portfolio-dev/images/Archeive.png)

## 기술 스택
- **Frontend**: iOS, UIKit
- **Architecture**: MVC 패턴
- **API**: REST API
- **협업**: Git, 코드 리뷰

## 주요 기능
### 📚 Library
- 재생목록, 노래, 앨범, 아티스트 세그먼트 구현
- 세그먼트 바를 통한 카테고리 전환
- 노래 터치 시 재생 기능
- 앨범/아티스트 터치 시 상세 페이지 이동
- 더보기(...) 메뉴 구현

### 👤 MyPage + Recap
- 닉네임 변경 기능
- 많이 들은 장르 기반 CD gradation 효과
- 가장 많이 들은 장르 Carousel View
- 가장 많이 들은 노래 Carousel View (2등-1등-3등 순서)

### 📅 DatePicker
- Carousel View를 응용한 커스텀 DatePicker
- 화면 중심 기준 거리 계산
- 거리에 따른 색상 opacity 조절`,
    team: '',
    skills: ['iOS', 'UIKit', 'MVC', 'REST API', 'Git'],
    troubleshooting: `### Carousel View 구현

**요구사항**
- 2등-1등-3등 순서로 아이템 배치
- 스크롤 종료 시 자동으로 가장 가까운 아이템으로 이동
- 중심에서 멀어질수록 크기 감소

**구현 방법**
- 각 아이템과 화면 중심 사이의 거리를 계산
- 거리 기반으로 scale 비율 조정
- \`scrollViewDidEndDecelerating\` 및 \`scrollViewWillEndDragging\`에서 snap 효과 구현
- 가장 가까운 아이템의 인덱스를 계산하여 자동 스크롤

**결과**
- 자연스러운 스크롤 애니메이션
- 사용자 친화적인 UI/UX

### DatePicker의 Carousel 응용

**요구사항**
- 날짜 리스트를 Carousel 형태로 표시
- 중심에서 멀어질수록 투명도 감소

**구현 방법**
- Carousel View의 거리 계산 로직 재사용
- 거리 기반으로 alpha 값 조정
- 중심 날짜 강조를 위한 폰트 크기 조절

**결과**
- 코드 재사용성 향상
- 일관된 UX 제공`,
    contribution: `## 담당 역할 및 기여도

### Library 화면 구현
- 재생목록, 노래, 앨범, 아티스트 세그먼트 UI 개발
- 세그먼트 전환 애니메이션
- 음악 재생 기능 연동
- 상세 페이지 네비게이션

### MyPage & Recap 구현
- 사용자 프로필 관리 (닉네임 변경)
- 청취 데이터 기반 시각화
- CD gradation 효과 구현
- Carousel View를 활용한 통계 표시

### Custom UI Component 개발
- 재사용 가능한 Carousel View 컴포넌트
- DatePicker 커스터마이징
- 거리 기반 애니메이션 시스템

### API 연동
- 백엔드 API 통신
- 데이터 모델링 및 파싱
- MVC 패턴 적용`,
    retrospective: `## 프로젝트 회고

### 잘한 점 ✅
- **깊이 있는 학습**: 단순 기능 구현을 넘어 언어, 프레임워크, Git 컨벤션, API 통신, MVC 패턴 등을 체계적으로 학습
- **코드 재사용성**: Carousel View를 구현하고 이를 DatePicker에 응용하여 코드 재사용성 향상
- **협업 경험**: 매일 트러블슈팅과 코드 리뷰를 통해 팀원들과 적극적으로 소통
- **MVC 구조 이해**: 코드를 구조적으로 작성하는 습관 형성

### 아쉬운 점 📝
- 초기 설계 단계에서 컴포넌트 구조를 더 체계적으로 계획했다면 리팩토링 시간을 줄일 수 있었을 것
- 테스트 코드 작성이 부족했음

### 배운 점 💡
- **프론트-백엔드 연동**: API 통신을 통해 실제 데이터를 주고받으며 전체 흐름 이해
- **MVC 패턴의 중요성**: 관심사 분리를 통한 유지보수성 향상
- **협업 프로세스**: Git 컨벤션, 코드 리뷰, 이슈 관리 등 실무 협업 경험
- **Custom UI의 가치**: 기본 컴포넌트를 커스터마이징하여 차별화된 UX 제공

### 다음에 시도해볼 것 🚀
- SwiftUI를 활용한 선언형 UI 개발
- Combine 프레임워크를 이용한 반응형 프로그래밍
- Unit Test 및 UI Test 작성
- MVVM 아키텍처 패턴 적용`
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
