# CSV 파일 MongoDB에 넣기(Local Version)

 1. MongoDB DataBase Tool 설치 *Version 4.4 이상일 경우

    - (https://docs.mongodb.com/database-tools/installation/installation/)

 2. 명령 프롬프트 실행

 3. mongo 입력해서 mongo db 실행

 4. use webfront - webfront라는 이름을 가진 db를 생성하고 들어간다.

 5. webfront.test.insertOne( {x : 1}) : test collection 생성 후 임시 데이터 입력

 6. show dbs를 통해 webfront db가 생성되었는지 확인

 7. 종료

 8. 명령 프롬프트 실행. 

 9. cd C:\Program Files\MongoDB\Tools\100\bin  입력

    - Database Tool이 설치된 곳 경로 이동

 10. 해당 디렉토리에 mongoimport.exe가 설치되어 있는지 확인

 11. **mongoimport** --db webfront --collection food --type csv --headerline --ignoreBlanks -- file C:\Users\epicb\Desktop\Coding\webfront-final-main\MongoDB\\food_db.csv

 12. 오류 없이 실행되었을 경우 명령 프롬프트를 종료하고 mongo 실행 및 데이터 확인

     - use webfront 
     - db.food.findOne();

     
