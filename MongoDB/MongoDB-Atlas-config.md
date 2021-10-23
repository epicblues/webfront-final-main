CSV 파일 MongoDB에 넣기(Local Version)
MongoDB DataBase Tool 설치 *Version 4.4 이상일 경우

(https://docs.mongodb.com/database-tools/installation/installation/)

명령 프롬프트 실행.

cd C:\Program Files\MongoDB\Tools\100\bin 입력

Database Tool이 설치된 곳 경로 이동
해당 디렉토리에 mongoimport.exe가 설치되어 있는지 확인

mongoimport --uri "mongodb+srv://<계정명>:<비밀번호>@cluster0.bopwr.mongodb.net/webfront?retryWrites=true&w=majority" --db webfront --collection food --type csv --headerline --ignoreBlanks -- file C:\Users\epicb\Desktop\Coding\webfront-final-main\MongoDB\food_db.csv

오류 없이 실행되었을 경우 명령 프롬프트를 종료하고 mongo Atlas 실행 및 데이터 확인

