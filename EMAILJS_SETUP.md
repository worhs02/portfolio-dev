# EmailJS 설정 가이드

Mail 앱에서 실제로 이메일을 전송하려면 EmailJS를 설정해야 합니다.

## 1. EmailJS 계정 생성

1. [EmailJS 웹사이트](https://www.emailjs.com/)에 접속
2. 무료 계정 생성 (월 200개 이메일 무료)

## 2. Email Service 추가

1. EmailJS 대시보드에서 **Email Services** 클릭
2. **Add New Service** 클릭
3. 사용할 이메일 서비스 선택 (Gmail 추천):
   - Gmail
   - Outlook
   - Yahoo
   - 기타
4. 이메일 계정 연결 및 인증
5. **Service ID**를 복사해두기

## 3. Email Template 생성

1. EmailJS 대시보드에서 **Email Templates** 클릭
2. **Create New Template** 클릭
3. 템플릿 내용 작성:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Template 변수 설정:
   - `from_name`: 보내는 사람 이름
   - `from_email`: 보내는 사람 이메일
   - `subject`: 이메일 제목
   - `message`: 이메일 본문
   - `to_email`: 받는 사람 이메일 (선택사항)

5. **Template ID**를 복사해두기

## 4. Public Key 가져오기

1. EmailJS 대시보드에서 **Account** 클릭
2. **General** 탭에서 **Public Key** 찾기
3. Public Key를 복사해두기

## 5. 코드에 설정 적용

`src/components/Mail.jsx` 파일을 열어서 다음 부분을 수정:

```javascript
const serviceId = 'YOUR_SERVICE_ID'      // 2단계에서 복사한 Service ID
const templateId = 'YOUR_TEMPLATE_ID'    // 3단계에서 복사한 Template ID
const publicKey = 'YOUR_PUBLIC_KEY'      // 4단계에서 복사한 Public Key
```

예시:
```javascript
const serviceId = 'service_abc123'
const templateId = 'template_xyz789'
const publicKey = 'abcd1234efgh5678'
```

## 6. 테스트

1. 개발 서버 실행: `npm run dev`
2. Desktop에서 Mail 아이콘 클릭
3. 테스트 메시지 작성 및 전송
4. 설정한 이메일 계정으로 메일이 도착하는지 확인

## 문제 해결

### "이메일 전송에 실패했습니다" 오류가 표시되는 경우:

1. **Service ID, Template ID, Public Key 확인**
   - 올바른 값을 복사했는지 확인
   - 따옴표 안에 정확히 입력했는지 확인

2. **EmailJS 서비스 상태 확인**
   - EmailJS 대시보드에서 서비스가 활성화되어 있는지 확인
   - 이메일 계정이 올바르게 연결되어 있는지 확인

3. **브라우저 콘솔 확인**
   - F12를 눌러 개발자 도구 열기
   - Console 탭에서 에러 메시지 확인

4. **이메일 할당량 확인**
   - 무료 계정은 월 200개 이메일 제한
   - EmailJS 대시보드에서 사용량 확인

## 보안 참고사항

- Public Key는 클라이언트 측에서 사용되므로 공개되어도 안전합니다
- EmailJS는 자동으로 스팸 방지 및 사용량 제한을 적용합니다
- 중요한 정보는 템플릿에 하드코딩하지 말고 변수로 전달하세요

## 추가 설정 (선택사항)

### 자동 응답 설정
EmailJS에서 자동 응답 템플릿을 생성하여 메시지를 보낸 사람에게 자동으로 확인 이메일을 보낼 수 있습니다.

### 이메일 알림 사용자 정의
EmailJS 대시보드에서 이메일 템플릿의 HTML, CSS를 수정하여 더 멋진 이메일을 만들 수 있습니다.

---

설정 완료 후 Mail 앱에서 실제로 이메일을 전송할 수 있습니다!
