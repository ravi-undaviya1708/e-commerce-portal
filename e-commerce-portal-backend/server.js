const jsonServer = require("json-server");
const server = jsonServer.create();
const bodyParser = require("body-parser");
const router = jsonServer.router("db.json");
const fs = require("fs");
const cors = require("cors");
const middlewares = jsonServer.defaults();
const port = 3009;
server.use(jsonServer.bodyParser);
server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

console.log(`Server run on port: ${port}`)

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
server.use(router);

server.listen(port);
