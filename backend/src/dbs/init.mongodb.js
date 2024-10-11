"use strict";
const mongoose = require("mongoose");
const connectString = "mongodb://127.0.0.1:27108/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2";

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    if (!true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log("Mongodb Connected");
      })
      .catch((err) => console.log("Error:: " + err));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
