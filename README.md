# 이미지 서버 재부팅으로 도메인 주소 변경 시 바꾸어야 할 설정들

- next.config.js 의 domain
- env.local의 STATIC_SERVER_URL
- env.local의 AWS_CONNECT SSH 주소
- webfront-static-server github hook URL 수정

# 사용 애플리케이션

## 클라이언트

### Next.js

- SSR 기능이 추가된 React Framework
- Vercel을 통한 배포
- 이미지를 요구하지 않는 API 요청 처리.

## 백엔드

### Node.js(Express)

- AWS EC2를 통한 배포
- 이미지 파일 관리가 요구되는 폼 데이터 요청 처리

## 데이터베이스

### MongoDB Atlas

- 클라우드 지원.
- 회원, 핵심 컨텐츠 관련 데이터 저장.
- 이미지 파일 메타 데이터 저장(URL)

# 애플리케이션 핵심 기능

## 요리 레시피 공유

## 다이어트 일지 작성

## 목표 달성 챌린지

- 레시피, 다이어트 일지 관련 챌린지 구현
- 타 회원 참여 독려
- ex ) 일주일 동안 한식 레시피 3개 업로드
- ex2) 5일 연속 칼로리 섭취 목표량 달성

# 기타 정보

- 고유의 id를 가진 Schema : User, Recipe, Challenge, Diary

- Recipe, Challenge, Diary 는 User의 Id를 참조한다

- (임시)이미지의 경로 및 파일명 : /public/static/{recipe,challenge,diary}*사용자ID*게시물ID\_{기타정보}.jpg

- 기타 정보 예시 : Recipe(조리 순서에 해당하는 이미지), Diary(아침 점심 저녁 간식에 해당하는 이미지)
