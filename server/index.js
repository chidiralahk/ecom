// const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");

const { readDB, writeDB } = require("./utils");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.get("/currentUser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      carts = {},
      favList = {},
      orders = {},
      profiles = {},
      addresses = {},
    } = await readDB();

    return res.send({
      profile: profiles[userId] || {},
      cart: carts[userId] || [],
      favList: favList[userId] || [],
      orders: orders[userId] || [],
      addresses: addresses[userId] || [],
    });
  } catch (e) {
    return res.send({ msg: "something went wrong" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const { products } = await readDB();

    return res.send(products);
  } catch (e) {
    return res.send({ msg: "something went wrong" });
  }
  // fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, db) => {
  //   if (err) return res.send({ msg: "something went wrong" });

  //   return res.send(JSON.parse(db).products);
  // });
});

app.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const db = await readDB();
    // console.log("db----", db);
    const products = db.products.filter(
      (p) => p.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
    // console.log(products);
    return res.send(products);
  } catch (e) {
    return res.send({ msg: "something went wrong" });
  }

  // fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, db) => {
  //   if (err) return res.send({ msg: "something went wrong" });

  //   const products = JSON.parse(db).products.filter(
  //     (p) => p.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  //   );
  //   return res.send(products);
  // });
});

app.post("/users/:userId/cart", async (req, res) => {
  const product = req.body;
  const { userId } = req.params;

  // console.log("product --- ", userId);

  try {
    const oldData = await readDB();
    // console.log(oldData);
    const { carts = {} } = oldData;

    if (Array.isArray(carts[userId])) {
      let existingItem = false;
      const userCart = carts[userId].map((item) => {
        if (item.id === product.id) {
          item.qty += product.qty;
          existingItem = true;
        }

        return item;
      });
      carts[userId] = existingItem ? [...userCart] : [...userCart, product];
    } else {
      carts[userId] = [product];
    }

    await writeDB({ ...oldData, carts });

    return res.send(carts[userId]);
  } catch (e) {
    return res.send({ msg: "something went wrong" });
  }
});

app.delete("/users/:userId/cart/:itemId", async (req, res) => {
  // const product = req.body;
  const { userId, itemId } = req.params;

  try {
    const oldData = await readDB();
    // console.log(oldData);
    const { carts = {} } = oldData;
    // console.log(carts[userId]);

    const updatedCart = carts[userId].filter((item) => {
      console.log(typeof item.id, typeof itemId);
      return item.id !== itemId;
    });
    // console.log(updatedCart);

    carts[userId] = updatedCart;

    await writeDB({ ...oldData, carts });

    // console.log(carts[userId]);

    return res.send(carts[userId]);
  } catch (e) {
    return res.send({ msg: "something went wrong" });
  }
});

app.post("/users/:userId/address", async (req, res) => {
  const address = req.body;
  const { userId } = req.params;

  // console.log("product --- ", userId);

  try {
    const oldData = await readDB();
    // console.log(oldData);
    const { addresses = {} } = oldData;

    // if (Array.isArray(carts[userId])) {
    //   let existingItem = false;
    //   const userCart = carts[userId].map((item) => {
    //     if (item.id === product.id) {
    //       item.qty += product.qty;
    //       existingItem = true;
    //     }

    //     return item;
    //   });
    //   carts[userId] = existingItem ? [...userCart] : [...userCart, product];
    // } else {
    //   carts[userId] = [product];
    // }

    addresses[userId] = addresses[userId]
      ? [...addresses[userId], address]
      : [address];

    await writeDB({ ...oldData, addresses });

    return res.send(addresses[userId]);
  } catch (e) {
    return res.send({ msg: "something went wrong" });
  }
});

app.listen(3001, () => {
  console.log("server is running on:3001");
});
