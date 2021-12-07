# 최종 배포 때 고려해야 할 사항
- 각 OAuth에 할당된 redirect uri

# 이미지 서버 재부팅으로 도메인 주소 변경 시 바꾸어야 할 설정들

- next.config.js 의 domain
- env.local의 STATIC_SERVER_URL
- env.local의 AWS_CONNECT SSH 주소
- webfront-static-server github hook URL 수정
- 내도메인.한국에서 도메인과 연결된 AWS IP 주소 변경
- EC2로 접속해서 webfront-static-server 의 CLINET_SERVER_URL env 파일 변경

# 사용 애플리케이션

## 클라이언트

### Next.js

- SSR 기능이 추가된 React Framework
- Vercel을 통한 배포
- 이미지를 요구하지 않는 API 요청 처리.

## 백엔드

### Node.js(Express + Socket.io)

- AWS EC2를 통한 배포
- 이미지 파일 관리가 요구되는 폼 데이터 요청 처리
- 메인 페이지 실시간 공지/채팅
- 이미지 파일 외에 실시간 공지가 요구되는 API 처리

## 데이터베이스

### MongoDB Atlas

- 클라우드 지원.
- 회원, 핵심 컨텐츠 데이터 저장.
- 이미지 파일 메타 데이터 저장(URL)

# 애플리케이션 핵심 기능

## 요리 레시피 공유
- 나만의 레시피 CRUD
- 작성된 레시피의 데이터는 다이어트 일지에서 검색 및 사용

## 다이어트 일지 작성
- 아침, 점심, 저녁, 간식에 먹은 음식 검색(식약처 식품영양정보 DB) 및 등록
- 개인별 기초대사량과 하루 섭취 칼로리 비교
- 선택한 음식 데이터는 메인 페이지의 개인화된 통계 자료로 활용

## 목표 달성 챌린지

- 레시피, 다이어트 일지 관련 챌린지
- 독립된 챌린지(하루 물 2L 이상 마시기)
- 다른 사용자가 작성한 챌린지에 참여 가능
- 챌린지 참여/생성/완료 시 실시간 공지

# 기타 정보

- 고유의 id를 가진 Schema : User, Recipe, Challenge, Diary

- Recipe, Challenge, Diary 는 User의 Id를 참조한다

- (임시)이미지의 경로 및 파일명 : /public/static/{recipe,challenge,diary}*사용자ID*게시물ID\_{기타정보}.jpg

- 기타 정보 예시 : Recipe(조리 순서에 해당하는 이미지), Diary(아침 점심 저녁 간식에 해당하는 이미지)
