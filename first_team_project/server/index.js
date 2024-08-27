
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const mysqlPromise = require("mysql2/promise");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const moment = require("moment-timezone");
const path = require("path");

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname + "/images")));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "10541054",
  database: "shopping_db",
  port: 3306,
});

const PromiseConnection = mysqlPromise.createPool({
  host: "localhost",
  user: "root",
  password: "10541054",
  database: "shopping_db",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error(" MySQL 접속에러: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

app.get("/", (req, res) => res.send(`안녕~~`));

const usedUserNumbers = new Set();

async function generateUserid(usertype) {
  const prefix = {
    personal: 1,
  }[usertype];

  do {
    randomDigits = Math.floor(10000 + Math.random() * 90000);
    userid = `${prefix}${randomDigits}`;
  } while (usedUserNumbers.has(userid));

  usedUserNumbers.add(userid);
  return userid;
}

app.post("/checkEmailDuplication", (req, res) => {
  const { email } = req.body;
  const sql = "SELECT * FROM user WHERE email = ?";
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error("MySQL에서 이메일 중복 확인 중 오류", err);
      return res.status(500).json({
        success: false,
        message: "이메일 중복 확인 중 오류가 발생했습니다",
        error: err.message,
      });
    }
    if (result.length > 0) {
      return res.status(200).json({
        success: false,
        message: "이미 등록된 이메일 입니다.",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "사용 가능한 이메일입니다.",
      });
    }
  });
});

app.post("/signup", async (req, res) => {
  const {
    username,
    email,
    password,
    address,
    phonenumber,
    usertype: clientUsertype,
    terms,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userid = await generateUserid(clientUsertype);
    const usertypeNumber = {
      personal: 1,
    };

    const serverUsertype = usertypeNumber[clientUsertype];

    const sql =
      "INSERT INTO user (userid, username, email, password, address, phonenumber, usertype, terms ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [
        userid,
        username,
        email,
        hashedPassword,
        address,
        phonenumber,
        serverUsertype,
        terms,
      ],
      (err, result) => {
        if (err) {
          console.error("MySQL에 데이터 등록 오류:", err);
          return res.status(500).json({
            success: false,
            message: "회원가입 중 오류가 발생했습니다.",
            error: err.message,
          });
        }
        console.log("사용자가 성공적으로 등록됨");
        return res.status(200).json({
          success: true,
          message: "사용자가 성공적으로 등록됨",
          usertype: serverUsertype,
        });
      }
    );
  } catch (error) {
    console.error("회원가입 중 오류:", error);
    return res.status(500).json({
      success: false,
      message: "내부 서버 오류",
      details: error.message,
    });
  }
});

const sessionStore = new MySQLStore(
  {
    expiration: 3600000,
    createDatabaseTable: true,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "sessionid",
        expires: "expires",
        data: "data",
      },
    },
  },
  connection
);

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 3600000,
      httpOnly: true,
    },
  })
);

app.post("/login", async (req, res) => {
  const { email, password, usertype } = req.body;

  try {
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.error("서버에서 에러 발생:", err);
          res.status(500).send({ success: false, message: "서버 에러 발생" });
        } else {
          if (result.length > 0) {
            const isPasswordMatch = await bcrypt.compare(
              password,
              result[0].password
            );
            if (isPasswordMatch && usertype == result[0].usertype) {
              if (!req.session) {
                req.session = {};
              }
              req.session.usertype = result[0].usertype;
              req.session.userid = result[0].userid;

              res.send({
                success: true,
                message: "로그인 성공",
                data: result,
              });
            } else {
              res.send({
                success: false,
                message: "정보가 일치하지 않습니다.",
              });
            }
          } else {
            res.send({ success: false, message: "유저 정보가 없습니다." });
          }
        }
      }
    );
  } catch (error) {
    console.error("비밀번호 비교 중 오류:", error);
    res.status(500).send({ success: false, message: "서버 에러 발생" });
  }
});

app.get("/getOrderList", async (req, res, next) => {
  try {
    const { userid, periodDate } = req.query;

    const startDate = periodDate[0];
    const endDate = periodDate[1];

    const orderQuery =
      "SELECT * FROM orders WHERE userid = ? AND date BETWEEN ? AND ? ORDER BY date DESC";
    const productQuery = "SELECT productid, title, thumbnail FROM product";

    const [orderData] = await PromiseConnection.query(orderQuery, [
      userid,
      startDate,
      endDate,
    ]);
    const [productData] = await PromiseConnection.query(productQuery);

    return res.send({ orderData: orderData, productData: productData });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// 결제완료 시 mysql로 전송 됨
app.post("/saveOrder", async (req, res) => {
  try {
    const { orderSheet } = req.body;

    if (!orderSheet || !Array.isArray(orderSheet)) {
      throw new Error("Invalid orderSheet data");
    }

    console.log('Order sheet received:', orderSheet);

    const insertQuery = `
      INSERT INTO orders (
        ordernumber, 
        userid, 
        productcode, 
        status, 
        date, 
        ordername,
        postcode, 
        address, 
        detailedAddress, 
        phonenumber, 
        reqmessage,
        count, 
        totalcount, 
        totalamount, 
        payment, 
        imageurl,
        paymentamount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const order of orderSheet) {
      const data = [
        order.orderNumber,
        order.userid,
        order.productcode,
        '주문완료',
        moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'),
        order.orderName,
        order.postcode,
        order.address,
        order.detailedAddress,
        order.phoneNumber,
        order.reqMessage,
        order.quantity,
        order.totalCount,
        order.totalAmount,
        order.payment,
        order.imageUrl,
        order.paymentamount,
      ];

      console.log('Inserting order data:', data);
      await PromiseConnection.query(insertQuery, data);
    }

    return res.json({
      success: true,
      message: 'Order saved successfully'
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving order',
      error: error.message
    });
  }
});


app.get("/product/:productid", async (req, res) => {
  const { productid } = req.params;
  const sqlQuery = "SELECT * FROM product WHERE productid = ?";

  connection.query(sqlQuery, [productid], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(result);
  });
});

app.post("/submitReview", async (req, res) => {
  const { productid, userid } = req.body;
  try {
    const updateQuery =
      "UPDATE orders SET isReviewed = true WHERE productcode = ? AND userid = ?";
    await PromiseConnection.query(updateQuery, [productid, userid]);
    res.status(200).json({ message: "Review submitted" });
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/review", (req, res) => {
  const { userid, productid, reviewtitle, reviewtext, starrating } = req.body;
  const queryInsertReview =
    "INSERT INTO reviews (userid, productid, reviewtitle, reviewtext, starrating) VALUES (?, ?, ?, ?, ?)";
  const querySelectProduct = "SELECT * FROM product WHERE productid = ?";

  const date = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');

  connection.query(
    queryInsertReview,
    [userid, productid, reviewtitle, reviewtext, starrating],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }

      const reviewid = result.insertId;

      connection.query(querySelectProduct, [productid], (err, productResult) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          return;
        }

        if (productResult.length > 0) {
          const product = productResult[0];
          console.log(err);
          res.status(201).send({
            id: reviewid,
            reviewtitle,
            userid,
            reviewtext,
            starrating,
            product,
            date,
          });
        } else {
          res.status(404).send({ message: "Product not found" });
        }
      });
    }
  );
});
// QNA mySQL 연결

app.post("/saveQna", async (req, res) => {

  const { qna_id, productid, userid, qna_title, qna_detail, qna_answer, qna_date, qna_finish } = req.body;


  const sql =
    "INSERT INTO qna (qna_id, productid, userid, qna_title, qna_detail, qna_answer, qna_date, qna_finish ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      qna_id,
      productid,
      userid,
      qna_title,
      qna_detail,
      qna_answer,
      qna_date,
      qna_finish,
    ],
    (err, result) => {
      if (err) {
        console.error('오류 발생', err);
        res.status(500).send('오류 발생');
      } else {
        console.log('문의글이 정상적으로 저장됬습니다.');
        res.status(200).send('문의글이 정상적으로 저장됬습니다.');
      }
    }
  );
});


app.get("/saveQna", (req, res) => {
  const sqlQuery = "SELECT* FROM shopping_db.qna";
  connection.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});
// QNA mySQL 연결 F

app.put("/review/:reviewid", (req, res) => {
  const { reviewid } = req.params;
  const { reviewtitle, reviewtext, starrating } = req.body;
  const query =
    "UPDATE reviews SET reviewtitle = ?, reviewtext = ?, starrating = ? WHERE reviewid = ?";

  connection.query(query, [ reviewtitle, reviewtext, starrating, reviewid], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    connection.query(
      "SELECT * FROM reviews WHERE reviewid = ?",
      [reviewid],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.status(200).json(results[0]);
      }
    );
  });
});

app.delete("/review/:reviewid", (req, res) => {
  const { reviewid } = req.params;
  const query = "DELETE FROM reviews WHERE reviewid = ?";
  connection.query(query, [reviewid], (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.sendStatus(204);
  });
});

app.get("/shop", (req, res) => {
    const sqlQuery = "SELECT* FROM shopping_db.product";
    connection.query(sqlQuery, (err, result) => {
      res.send(result);
    });
  });

  app.get("/orderlist", (req, res) => {
    const sqlQuery = "SELECT* FROM shopping_db.orders";
    connection.query(sqlQuery, (err, result) => {
      res.send(result);
    });
  });

app.get("/ordersheet", async (req, res, next) => {
  try {
    const { userid } = req.query;
    const [userData] = await PromiseConnection.query(
      "SELECT username, phonenumber, address, userid FROM user WHERE userid = ?",
      [userid]
    );
    return res.send(userData);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/reviewlist", (req, res) => {
  const sqlQuery = "SELECT * FROM shopping_db.reviews";
  connection.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.get("/reviews", (req, res) => {
  connection.query("SELECT * FROM reviews", (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(result);
  });
});


app.listen(port, () => {
  console.log(port, `포트가 구동되었습니다`);
});
