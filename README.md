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

##  다이어트 일지 작성

## 목표 달성 챌린지

- 레시피, 다이어트 일지 관련 챌린지 구현
- 타 회원 참여 독려
- ex ) 일주일 동안 한식 레시피 3개 업로드
- ex2) 5일 연속 칼로리 섭취 목표량 달성

## 페이지 흐름

- 고유의 id를 가진 Schema : User, Recipe, Challenge, Diary

- Recipe, Challenge, Diary 는 User의 Id를 참조한다

- (임시)이미지의 디렉토리 주소는 /public/static/{recipe,challenge,diary,user}_사용자ID_게시물ID_순서.jpg

  ### Recipe

  - 이미지 파일의 id는 레시피 실행 순서(1단계 => 1.jpg / 2단계 => 2.jpg)
  - ex) /public/recipe_id/2.jpg

  ### User

  - 프로필 사진 경로(기타 유저 정적 데이터)
  - /public/user_id/profile.jpg

  ### Diary

  ### Challenge
