// 할일 앱

// restful APi
// 주소 +http 명령어

// 1. 할일을 추가 할 수 있다. Create /tasks post
// 2. 할일 리스트를 볼 수 있다. Read /tasks get
// 3. 할일에 대해서 상태를 표시 할 수 있다. Update /tasks/:id put
// 4. 할일을 삭제 할 수 있다. Delete /tasks/:id delete

// 백엔드 준비
// 1. 기본 세팅 : npm,express,mongoose,app 리스너
// 2. 라우터 주소 정의
// 3. 데이터베이스 스키마 정의
// 4. 기능정의 CRUD
// 5. 테스트 : 포스트맨

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config();

const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("MON", MONGODB_URI_PROD);
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => console.log("connect"))
  .catch((err) => console.log("connect fail", err));

app.listen(5000, () => {
  console.log("server is on 5000");
});
