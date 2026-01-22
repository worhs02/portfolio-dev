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
    title: 'Divary',
    githubUrl: 'https://github.com/DivaryOfficial/divary-spring',
    award: { name: 'UMC 데모데이 대상', from: 'UMC', url: 'https://www.kolleges.net/ko/neordinary/achievement/9725' },
    period: '',
    overview: `![Divary Banner](/portfolio-dev/images/divary.jpg)

**"바다를 기록하고, 추억을 꾸미다"**

스쿠버다이빙을 사랑하는 사람들을 위한 감성 다이빙 로그 앱

**진행 기간**: 2025년 8월 20일 - 2025년 11월 30일

## 프로젝트 배경

스쿠버다이빙은 단순한 스포츠를 넘어 바닷속에서 비일상적인 경험을 기록하는 여정입니다. 하지만 다이버들이 남기는 기록(다이빙 로그)은 아직도 대부분 종이로, 또는 딱딱한 입력형 앱에 그치고 있습니다.

## 기술 스택
- **Backend**: Spring Boot, MySQL
- **Frontend**: iOS (UIKit), SwiftUI
- **API**: GPT API, 날씨/수온 API
- **기타**: Canvas API / PencilKit (그림 그리기), 사진 추가 및 자유 배치

## 주요 기능
###  다이빙 로그
- 날짜, 장소, 수심, 수온, 시야, 장비 등 필수 정보 기록
- 빠르고 직관적인 입력 UI
- 템플릿 기반 반복 작성

###  다이빙 일기장
- 감정과 추억을 자유롭게 표현하는 감성 기록 공간
- 사진 첨부, 손글씨 느낌 폰트, 이모지, 스티커 등 꾸미기 요소 제공

###  해양 도감 (AI 연동)
- GPT 연동으로 생물 이름과 설명 제공
- 사진 기반 검색 및 대화형 탐색 ("이거 뭐야?" 질문 가능)
- 나만의 도감 완성 기능

###  나의 바다 & 아바타
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

### 잘한 점 
- **실제 사용자 조사를 통한 기획**: 설문조사를 통해 실제 다이버들의 니즈를 파악하고 반영했습니다
- **DB 레벨에서의 성능 최적화**: @OnDelete를 활용해 N+1 삭제 문제를 사전에 방지했습니다
- **예외 처리 전략 수립**: 다양한 예외 상황에 대한 체계적인 처리 방안을 마련했습니다
- **AI 기술 활용**: GPT API를 활용하여 사용자 경험을 크게 향상시켰습니다

### 아쉬운 점 
- 초기 설계 단계에서 트랜잭션 관리 전략을 더 깊이 고민했다면 시행착오를 줄일 수 있었을 것 같습니다
- iOS 팀과의 API 명세 협의에 더 많은 시간을 할애할 필요가 있었습니다

### 배운 점 
- **JPA 영속성 관리의 중요성**: 엔티티 생명주기와 트랜잭션 경계에 대한 깊은 이해의 필요성을 깨달았습니다
- **예외 처리의 타이밍**: RuntimeException과 Spring AOP의 동작 방식을 명확히 이해하게 되었습니다
- **사용자 중심 설계**: 실제 사용자의 피드백이 제품 방향성에 얼마나 중요한지 배웠습니다
- **AI 기술의 실전 활용**: GPT API를 실제 서비스에 통합하는 경험을 쌓았습니다

### 다음에 시도해볼 것 
- Redis를 활용한 세션 관리 및 캐싱 전략 도입
- Spring Boot Actuator를 이용한 실시간 모니터링 시스템 구축
- 테스트 커버리지 향상을 위한 통합 테스트 작성
- CI/CD 파이프라인 구축을 통한 배포 자동화`
  },
  {
    id: 2,
    color: '#FFE5F5',
    emoji: '🎵🎧',
    title: 'Archive',
    githubUrl: 'https://github.com/UMC-Archive/Archive-iOS',
    award: { name: 'UMC 데모데이 우수상', from: 'UMC', url: 'https://www.kolleges.net/ko/neordinary/achievement/2775' },
    period: '',
    overview: `![ARCHEIVE Banner](/portfolio-dev/images/Archeive.png)

**진행 기간**: 2025년 1월 1일 - 2025년 2월 20일

## 기술 스택
- **Frontend**: iOS, UIKit
- **Architecture**: MVC 패턴
- **API**: REST API
- **협업**: Git, 코드 리뷰

## 주요 기능
### Library
- 재생목록, 노래, 앨범, 아티스트 세그먼트 구현
- 세그먼트 바를 통한 카테고리 전환
- 노래 터치 시 재생 기능
- 앨범/아티스트 터치 시 상세 페이지 이동
- 더보기(...) 메뉴 구현

### MyPage + Recap
- 닉네임 변경 기능
- 많이 들은 장르 기반 CD gradation 효과
- 가장 많이 들은 장르 Carousel View
- 가장 많이 들은 노래 Carousel View (2등-1등-3등 순서)

### DatePicker
- Carousel View를 응용한 커스텀 DatePicker
- 화면 중심 기준 거리 계산
- 거리에 따른 색상 opacity 조절

## 구현 내용

### Carousel View 구현
- 2등-1등-3등 순서로 아이템 배치
- 각 아이템과 화면 중심 사이의 거리를 계산하여 scale 비율 조정
- \`scrollViewDidEndDecelerating\` 및 \`scrollViewWillEndDragging\`에서 snap 효과 구현
- 가장 가까운 아이템의 인덱스를 계산하여 자동 스크롤

### DatePicker의 Carousel 응용
- Carousel View의 거리 계산 로직 재사용
- 거리 기반으로 alpha 값 조정
- 중심 날짜 강조를 위한 폰트 크기 조절`,
    team: '',
    skills: ['iOS', 'UIKit', 'MVC', 'REST API', 'Git'],
    troubleshooting: `### Carousel View snap 효과 구현 문제

**문제점**
- 스크롤 종료 시 아이템이 중앙에 정렬되지 않는 문제

**해결방법**
- \`scrollViewDidEndDecelerating\` 및 \`scrollViewWillEndDragging\`에서 가장 가까운 아이템 인덱스 계산
- 해당 인덱스로 자동 스크롤 적용`,
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

### 잘한 점 
- **깊이 있는 학습**: 단순 기능 구현을 넘어 언어, 프레임워크, Git 컨벤션, API 통신, MVC 패턴 등을 체계적으로 학습
- **코드 재사용성**: Carousel View를 구현하고 이를 DatePicker에 응용하여 코드 재사용성 향상
- **협업 경험**: 매일 트러블슈팅과 코드 리뷰를 통해 팀원들과 적극적으로 소통
- **MVC 구조 이해**: 코드를 구조적으로 작성하는 습관 형성

### 아쉬운 점 
- 초기 설계 단계에서 컴포넌트 구조를 더 체계적으로 계획했다면 리팩토링 시간을 줄일 수 있었을 것
- 테스트 코드 작성이 부족했음

### 배운 점 
- **프론트-백엔드 연동**: API 통신을 통해 실제 데이터를 주고받으며 전체 흐름 이해
- **MVC 패턴의 중요성**: 관심사 분리를 통한 유지보수성 향상
- **협업 프로세스**: Git 컨벤션, 코드 리뷰, 이슈 관리 등 실무 협업 경험
- **Custom UI의 가치**: 기본 컴포넌트를 커스터마이징하여 차별화된 UX 제공

### 다음에 시도해볼 것 
- SwiftUI를 활용한 선언형 UI 개발
- Combine 프레임워크를 이용한 반응형 프로그래밍
- Unit Test 및 UI Test 작성
- MVVM 아키텍처 패턴 적용`
  },
  {
    id: 3,
    color: '#E3F2FD',
    emoji: '',
    title: 'Blism',
    githubUrl: 'https://github.com/UMC-Blism',
    period: '',
    overview: `![Blism Banner](/portfolio-dev/images/blism.png)

**"진심 어린 마음, 디지털로 전달하세요."**

Blism은 단순한 디지털 메시지 서비스가 아닙니다. 매일의 설렘과 감동을 통해 친구, 연인, 가족과의 관계를 더 깊게 연결합니다. 바쁜 일상 속에서도 감성을 담아 소통할 수 있는 특별한 플랫폼, Blism으로 추억을 선물하세요.

## 프로젝트 설명

Blism은 디지털 시대의 감성을 되살리고 연말 시즌에 감동을 전하기 위해 설계된 온라인 우체통 서비스입니다.

- 사용자가 자신만의 우체통을 만들고, 친구, 가족, 연인 등 소중한 사람들과 공유하면, 상대방이 해당 우체통에 사진과 메시지를 남길 수 있는 공간입니다.
- 편지들은 연말 기간(12/1~25일) 동안 하루에 하나씩 확인할 수 있도록 설계되었습니다.
- 편지와 메시지는 추억을 생생히 전달할 수 있도록 커스터마이징 템플릿과 애니메이션, 감성적 요소를 담고 있습니다.

## 주요 특징

### 디지털 우체통
사용자는 본인만의 우체통을 만들고, 지인들에게 공유할 수 있습니다.

### 12월 1일부터 열리는 둥지
메시지가 작성된 둥지는 12월 1일부터 25일까지 하루에 하나씩 열려 사용자에게 설렘과 감동을 선사합니다.

### 정성 가득한 선물의 전환
기존 물질적 선물에서 벗어나 디지털로 간편하게 추억을 공유하고 선물할 수 있는 새로운 경험을 제공합니다.

### 감성 소통 강화
비어 있는 둥지와 채워진 둥지의 상태를 직관적으로 보여주고, 수집한 메시지를 연말 이후에도 우체통으로 보관 가능합니다.

## 기술 스택
- **Platform**: iOS
- **Frontend**: UIKit, CollectionView
- **API**: REST API

## 구현 내용

### CollectionView를 활용한 홈화면 구현
- UICollectionView를 사용하여 25개의 둥지(문)를 그리드 형태로 배치
- 현재 날짜를 기준으로 클릭 가능한 셀 개수 조정하는 로직 구현
- isUserInteractionEnabled를 활용하여 미래 날짜의 둥지 비활성화
- 빈 둥지와 채워진 둥지 시각적 구분

### 메시지 확인 및 답장 Modal 구현
- UIViewController를 모달로 present
- 커스텀 트랜지션 애니메이션 적용
- 답장 작성 후 API 연동

### 메시지 공개여부 설정
- Alert을 이용한 메시지 공개여부 설정
- 토글을 활용한 변경 기능`,
    team: '10명 (PM 2명, Designer 2명, iOS 3명, Backend 3명)',
    skills: ['iOS', 'UIKit', 'CollectionView', 'REST API'],
    troubleshooting: `### API 연동 시 에러 처리

**문제점**
- 네트워크 에러 발생 시 사용자에게 피드백 없음

**해결방법**
- Alert을 이용한 에러 메시지 표시
- 재시도 로직 구현

### iPhone 13 mini 레이아웃 문제

**문제점**
- 특정 기기로만 시뮬레이터를 사용하다가 마감 하루 전 iPhone 13 mini에서 레이아웃이 맞지 않는 문제 발생

**해결방법**
- 화면의 height을 가져오는 코드를 활용
- 화면 간의 비율을 곱해 동적으로 레이아웃 조정`,
    contribution: `## 담당 역할 및 기여도

### UI 구현
- CollectionView를 활용한 홈화면 구현
- 메시지 확인, 답장 modal 구현
- 날짜에 따라 열 수 있는 문 갯수 구현 (CollectionView에서 클릭 가능한 문 갯수 조정 로직)
- Alert을 이용한 메시지 공개여부 설정 및 토글을 활용한 변경

### API 연결
- 우체통 조회 API
- 내 과거 우체통 전체 조회 API
- 특정 년도의 과거 우체통 조회 API
- 우체통 공개 여부 설정 API`,
    retrospective: `## 프로젝트 회고

PM, 디자인, FE, BE로 구성된 첫 프로젝트였습니다.

### 배운 점
- API 연결이 서툴다보니 시간이 오래 걸렸지만 Swagger와 명세서를 활용하는 방법을 배웠습니다.
- KingFisher를 활용하여 URL을 통해 이미지를 활용하는 방법을 배웠습니다.
- AutoLayout의 중요성을 깨달았습니다.

### 협업에서 느낀 점
View 연결의 분업은 볼륨에 맞게 잘 진행되었지만, 시간이 지나 추가되는 기능이 생기면서 API를 연결하는 부분에서 각자 맡은 파트의 볼륨이 달라지게 되었습니다. 마감 시간에 맞추기 위해 API 연결을 재분배해야 하는 상황을 맞이하였고, 그 결과 본인이 작업하지 않은 View, ViewController에서 작업을 해야 하는 상황이 발생하였습니다.

### 다음에 개선할 점
- 초기 분업 시 API 연결 볼륨까지 고려한 계획 수립
- 다양한 기기에서의 레이아웃 테스트를 초기부터 진행
- 코드 컨벤션 통일로 타인의 코드 이해도 향상`
  },
  {
    id: 4,
    color: '#E0F2F1',
    emoji: '',
    title: '경도팟',
    githubUrl: 'https://github.com/UMC-9th-hackathon-TEAM5/BE',
    award: { name: 'UMC 해커톤 최우수상', from: 'UMC' },
    period: '',
    overview: `![경도팟 Banner](/portfolio-dev/images/gyungdopat.png)

**"동심과 도파민을 채우다, 리얼 월드 추격전"**

위치 기반 실시간 경찰과 도둑 매칭 서비스

**진행 기간**: 2026년 1월 10일 - 2026년 1월 11일

## 프로젝트 배경
런닝은 지루하고 헬스장은 가기 싫은 대학생들, 동네 친구들과 특별한 액티비티를 즐기고 싶은 20대를 위해 기획되었습니다. 어릴 적 즐기던 '경찰과 도둑' 놀이를 모바일 기술과 접목하여 오프라인에서 생동감 있게 즐길 수 있는 플랫폼입니다.

## 기술 스택
- **Backend**: Spring Boot, MySQL
- **Protocol**: WebSocket (STOMP)
- **Frontend**: React, Tailwind CSS, Vitest
- **Infra**: AWS EC2

## 주요 게임 규칙
### 경찰 vs  도둑
- **경찰 승리**: 제한 시간 내에 모든 도둑을 검거하여 감옥에 가두면 승리
- **도둑 승리**: 제한 시간 종료 시점까지 단 1명이라도 생존하면 승리

### 핵심 플레이
- **검거**: 경찰이 앱에서 도둑을 터치하여 검거 처리 (도둑은 '감옥' 상태로 변경)
- **구출**: 생존한 도둑이 감옥에 갇힌 동료를 터치하여 구출 (감옥 상태 해제)

## 주요 기능
###  간편 접속 (No-Login)
- 회원가입 없이 닉네임과 4자리 비밀번호만으로 즉시 게임 참여 가능
- 진입 장벽을 최소화하여 오프라인 현장에서 즉각적인 플레이 유도

###  게임 페이즈 관리
- **Lobby**: 호스트의 역할 배정 및 공지사항 실시간 확인
- **Flee Time**: 게임 시작 직후 도둑이 숨을 수 있는 '도망갈 시간' 카운트다운
- **Main Game**: 실시간 추격전 진행 및 생존자 현황판 제공

###  실시간 상태 동기화
- 생존/감옥 상태, 남은 시간, 게임 종료 여부 등을 지연 없이 전파`,
    team: '7명 (PM 1명, Designer 1명, Frontend 2명, Backend 3명)',
    skills: ['Spring Boot', 'WebSocket', 'Redis', 'MySQL', 'React', 'Tailwind CSS', 'Vitest'],
    troubleshooting: `### 문제 1: 실시간 게임 상태 동기화 지연 해결

**상황**
- 술래잡기 게임 특성상 '검거'와 '구출'은 0.1초의 차이로 승패가 갈릴 수 있음
- 기존 HTTP Polling 방식으로는 상태 변화를 실시간으로 모든 참여자에게 전파하는 데 한계가 있음

**해결방법**
- **WebSocket (STOMP) 프로토콜 도입**: 클라이언트와 서버 간 양방향 통신 채널 구축
- **PUB/SUB 구조 설계**: 특정 게임 방(Room)을 Topic으로 구독하게 하여, 상태 변경 이벤트 발생 시 해당 방의 모든 유저에게 즉시 브로드캐스팅

**결과**
- 검거/구출 판정 레이턴시 최소화 및 실시간 생존 현황판 구현 성공`,

    contribution: `## 담당 역할 및 기여도

### 실시간 게임 서버 아키텍처 설계
- WebSocket을 활용한 실시간 통신 서버 구축
- 게임 방 생성, 입장, 퇴장 및 재접속 처리 로직 구현

### 게임 로직 구현 (Core Logic)
- **Phase 관리**: 대기(Lobby) → 도주(Flee) → 진행(Main) → 종료(Result)로 이어지는 상태 머신 구현
- **인터랙션 처리**: 검거 및 구출 API 구현 및 유효성 검증 (거리가 가까운지 등 검증 로직 포함)

### 비로그인 기반 세션 시스템 구축
- Redis를 활용한 임시 유저 세션 관리
- UUID 기반의 사용자 식별 체계 구현`,
    retrospective: `## 프로젝트 회고

### 잘한 점 
- **기술적 도전**: 익숙한 HTTP 통신을 넘어 WebSocket을 처음 도입하고 실시간 서비스를 성공적으로 구현했습니다.
- **적절한 기술 선정**: 휘발성 데이터가 많은 게임 특성에 맞춰 Redis를 메인 저장소로 활용한 점이 성능 향상에 크게 기여했습니다.
- **사용자 경험 고려**: '로그인 없는 접속'이라는 기획 의도를 기술적으로 잘 풀어내어 현장 반응이 좋았습니다.

### 아쉬운 점 
- **GPS 오차 범위**: 실내나 건물 밀집 지역에서 GPS 튀는 현상으로 인해 '잡았다'는 판정에 대한 논란이 있을 수 있었습니다. (위치 보정 로직의 부재)
- **네트워크 불안정 처리**: 모바일 데이터 환경이 좋지 않은 곳에서 소켓 연결이 끊겼을 때의 재연결(Reconnect) 처리가 매끄럽지 못했습니다.

### 배운 점 
- **Stateful 서버의 관리**: 상태를 유지해야 하는 소켓 서버의 스케일 아웃 이슈와 세션 관리에 대해 깊이 고민해보는 계기가 되었습니다.
- **이벤트 기반 아키텍처**: 클라이언트의 요청에 대한 응답뿐만 아니라, 서버가 주도적으로 메시지를 발행하는 구조에 익숙해졌습니다.`
  },
  {
    id: 5,
    color: '#F3E5F5',
    emoji: '',
    title: 'Portfolio',
    githubUrl: 'https://github.com/worhs02/portfolio-dev',
    period: '',
    overview: `![Portfolio Banner](/portfolio-dev/images/portfolio.png)

**"macOS를 닮은 인터랙티브 포트폴리오"**

macOS 데스크톱 환경을 웹으로 구현한 개인 포트폴리오 사이트입니다. Vibe Coding(AI 페어 프로그래밍)을 통해 개발하였으며, 실제 macOS와 유사한 사용자 경험을 제공합니다.

**진행 기간**: 2026년 1월 1일 - 2026년 1월 22일

## 프로젝트 배경

최근 AI를 활용한 Vibe Coding이 개발 업계의 큰 화두로 떠올랐습니다. 자연어로 요구사항을 전달하고 AI가 코드를 생성하는 새로운 개발 패러다임을 직접 경험해보고자 이 프로젝트를 시작했습니다.

기존의 정적인 포트폴리오 사이트에서 벗어나, 방문자에게 인터랙티브한 경험을 제공하고자 했습니다. macOS의 직관적인 UI/UX를 웹으로 재현하여 개발자로서의 기술력과 디자인 감각을 동시에 보여줄 수 있는 포트폴리오를 목표로 했습니다.

## 기술 스택
- **Frontend**: React, JavaScript (ES6+)
- **Styling**: CSS3 (Flexbox, Grid, Animation)
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions (자동 데이터 수집)
- **Development**: Vibe Coding with Claude Code

## 디자인 포인트

### Desktop 환경 재현
- macOS 스타일의 메뉴바 (시계, 상태 아이콘)
- Dock 애니메이션 (마우스 호버 시 아이콘 확대 효과)
- 드래그 가능한 윈도우 시스템
- 창 최소화/최대화/닫기 기능

### 앱 시스템
- **GitHub App**: 실제 GitHub 잔디 데이터 연동, Contribute 현황 표시
- **Mail App**: 방문자가 직접 메일을 보낼 수 있는 폼 구현
- **TechStack App**: 기술 스택 시각화, 스플래시 스크린 애니메이션
- **Portfolio App**: 프로젝트 목록 및 상세 정보, Finder 스타일 UI

### 반응형 디자인
- Desktop: 전체 macOS 데스크톱 경험
- Tablet: 최적화된 창 크기 및 레이아웃
- Mobile: 전체 화면 앱 뷰, iOS 스타일 네비게이션

### 세부 디테일
- 로그인 화면: 프로필 이미지, 시간 표시, 애니메이션
- 창 드래그 시 자연스러운 움직임
- 앱 실행 시 Dock 아이콘 바운스 애니메이션
- 프로젝트 이미지 확대/축소 기능 (긴 이미지 대응)
- Markdown 렌더링 지원`,
    team: '1명 (개인 프로젝트)',
    skills: ['React', 'JavaScript', 'CSS3', 'GitHub Actions', 'Vibe Coding'],
    troubleshooting: `### 모바일 터치 이벤트 처리

**문제점**
- 모바일에서 프로젝트 카드 클릭 시 상세 페이지로 이동하지 않는 문제 발생

**원인**
- onClick 이벤트가 모바일 터치에서 제대로 동작하지 않음

**해결방법**
- onTouchEnd 이벤트 핸들러 추가
- preventDefault()를 통한 기본 동작 방지
- 터치와 클릭 이벤트 동시 지원

### 긴 이미지 처리

**문제점**
- README 이미지가 세로로 긴 경우 화면을 벗어나는 문제

**해결방법**
- ExpandableImage 컴포넌트 구현
- 이미지 aspect ratio 감지 (1:3 이상이면 긴 이미지로 판단)
- 클릭 시 전체 이미지 확대 모달 표시
- 스크롤 가능한 이미지 뷰어 제공

### GitHub 잔디 데이터 연동

**문제점**
- 클라이언트에서 직접 GitHub API 호출 시 CORS 및 rate limit 문제

**해결방법**
- GitHub Actions를 통한 자동 데이터 수집 워크플로우 구성
- 매일 정해진 시간에 잔디 데이터를 JSON 파일로 저장
- 정적 파일로 제공하여 API 호출 없이 데이터 표시`,
    contribution: `## Vibe Coding 경험

### AI 페어 프로그래밍
- Claude Code를 활용한 개발 진행
- 자연어로 요구사항 전달 후 코드 생성
- 실시간 코드 리뷰 및 수정

### 개발 과정
- 전체 프로젝트 구조 설계 및 컴포넌트 분리
- macOS UI/UX 분석 및 재현
- 반응형 디자인 구현 (Desktop/Tablet/Mobile)
- GitHub Actions 워크플로우 설정

### 디자인 구현
- CSS 애니메이션을 활용한 자연스러운 인터랙션
- Dock 호버 효과 (fishEye 알고리즘 응용)
- 창 드래그 시스템 구현
- 모달 및 오버레이 처리`,
    retrospective: `## 프로젝트 회고

### Vibe Coding 경험
AI와의 협업을 통해 빠른 프로토타이핑과 반복적인 개선이 가능했습니다. 자연어로 요구사항을 전달하고 즉시 결과물을 확인할 수 있어 개발 속도가 크게 향상되었습니다.

### 잘한 점
- **디테일에 대한 집착**: macOS의 세세한 애니메이션과 인터랙션을 최대한 재현하려 노력했습니다.
- **반응형 설계**: 다양한 디바이스에서 일관된 경험을 제공하도록 설계했습니다.
- **실제 데이터 연동**: GitHub 잔디 데이터를 실시간으로 반영하여 살아있는 포트폴리오를 만들었습니다.

### 배운 점
- **AI 도구 활용**: Vibe Coding을 통해 AI와 효과적으로 협업하는 방법을 익혔습니다.
- **CSS 애니메이션**: 복잡한 인터랙션을 CSS만으로 구현하는 기법을 학습했습니다.
- **사용자 경험 설계**: 데스크톱/태블릿/모바일 각각에 최적화된 UX를 고민했습니다.

### 다음에 개선할 점
- 다크 모드 지원
- 더 많은 앱 추가 (메모, 캘린더 등)
- 성능 최적화 (이미지 lazy loading, 코드 스플리팅)`
  }
]
