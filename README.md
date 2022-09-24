# 2회 너디너리 해커톤 가즈아
## Package Structure
```
📂 git@iamjooon2/GridgeTestChallenge
  ┣📂 src
    ┣📂 config # db connection option
    ┣📂 controller # req->검사->service && service->검사->res, Controller Layer
    ┣📂 middleware # 미들웨어들을 짱박아둔 디렉토리
    ┣📂 DAO # DB 접근하는 디렉토리, DataManager Layer
    ┣📂 router # 메서드 종류와 요청에 따른 분기를 다루는 곳
    ┣📂 service # Controller에서 비즈니스 로직만을 빼낸 곳, Service Layer
    ┣📂 utilitiy # response 관련 status와 함수들, 그 외 유틸관련 모아둔 곳
    ┣📜 index.js 
  ┣📂 swagger
  ┣ .env.example 
  ┣ docker-compose.yml # AWS 프리티어 안되서.. 도커로 로컬에서 디비 띄우자~
  ┣ package.json 

```
## API 로직

1. index.js(express) - 익스프레스가 띄운 서버로 접속
2. router/index.js - 도메인별 라우터로 분기
3. router/*.router.js - 해당하는 도메인 별 API로 넘김
4. controller/*.controller.js - 유효성 검사, 인증처리 등, Controller Layer
5. service/*.service.js - DB로 데이터 전달 혹은 DB에서 뽑아온 데이터 정제, 비즈니스 로직만 빼 둔 놈,Service Layer
6. DAO/*.DAO.js - DB 접근 쿼리들의 집합, DataManager Layer
7. DataBase

## 개발시
```
npm run start
```

##  Swagger
```
http://localhost:5050/docs
```
