// const { rejects } = require("assert");
const fs = require("fs");
// const { resolve } = require("path");
const path = require("path");

const dbfp = path.join(__dirname, "db.json");

exports.readDB = async () =>
  new Promise((resolve, reject) => {
    fs.readFile(dbfp, "utf8", (err, db) => {
      if (err) reject(err);

      return resolve(JSON.parse(db));
    });
  });

exports.writeDB = async (obj) =>
  new Promise((resolve, reject) => {
    fs.writeFile(dbfp, JSON.stringify(obj, null, 2), "utf8", (err) => {
      if (err) reject(err);

      return resolve(obj);
    });
  });
