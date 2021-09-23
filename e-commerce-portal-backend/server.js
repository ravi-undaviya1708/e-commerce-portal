const jsonServer = require("json-server");
const connection = require("tedious").Connection
const server = jsonServer.create();
// const path = require('path')
// const express = require("express");
const bodyParser = require("body-parser");
// const app = express();
const router = jsonServer.router("db.json");
const fs = require("fs");
const cors = require("cors");
const middlewares = jsonServer.defaults();
const port = 3009;
server.use(jsonServer.bodyParser);
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());
// server.use(bodyParser.json({ type: "application/*+json" }));
const config = {  
  server: 'http://sql6.freesqldatabase.com/',  //update me
  authentication: {
      type: 'default',
      options: {
          userName: 'sql6432855', //update me
          password: '5MJrr1wsD4'  //update me
      }
  },
  options: {
      // If you are on Microsoft Azure, you need encryption:
      encrypt: true,
      database: 'sql6432855'  //update me
  }
};

const conn = new connection(config)

conn.connect()
conn.on('connect', function(err) {
  console.log('connect')
  // execute()
})


const rqst = require('tedious').Request
const type = require('tedious').TYPES

// const rqst = require('tedious').Request
// const type = require('tedious').TYPES

/* function execute(){
  let query = ""
  const db_data = fs.readFileSync('db.json', { encoding: 'utf8'})
  const register = JSON.parse(db_data).register
  
  register.forEach(ele => {
    query += 'INSERT into tbl_register (' + Object.keys(ele).toString() + ") ";
    query += " values ("+ Object.values(ele).toString() +")"

    let insertQry = new rqst(query, function (err) {
      if(err) {console.log(`err`, err)}
    })

    insertQry.on('row', function(col) {console.log(`col`, col)})

    insertQry.on('requestCompleted', function(rCount, more) {
      conn.close()
    })
    
    conn.execSql(insertQry)
  })

}
 */

server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

console.log("server started...")

server.post("/", (req, res) => {
  console.log("Hello World");
});
server.post("/deleteCart", (req, res) => {
  const cartData = req.body.cartId;
  const cartInfo = fs.readFileSync("db.json", { encoding: "utf8" });
  const cartJson = JSON.parse(cartInfo);
  const cart = cartJson.cart;
  const cartDataInJson = cartData.filter((val, i) => {
    const data = cart.find(({ id }) => id === parseInt(val));
    // console.log(`data`, data);
    cart.splice(i, 1);
    return cart;
  });
  cartJson.cart = cart;
  fs.writeFileSync("db.json", JSON.stringify(cartJson));

  return res.json({ data: cartJson });
});
server.options("*", cors());

server.use(middlewares);

// server.use(router);
// server.use('', express.static(path.join(__dirname, 'images/')))

// Avoid CORS issue
// server.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

// server.use(jsonServer.rewriter(routes))

server.use(router);

server.listen(port);
