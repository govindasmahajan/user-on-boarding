const mongoose = require('mongoose');
const { User } = require('../models/User');

let db_ops = {};
db_ops.mongoUrl = `mongodb://${process.env.MONGO_HOST || 'localhost'}:27017/user-on-boarding`;

db_ops.getData = () => {
  return new Promise((resolve, reject) => {
    User.find()
      .then(users => { resolve(users) })
      .catch(err => reject(err))
  })
}

db_ops.findByName = (name) => {
  return new Promise((resolve, reject) => {
    User.findOne({ full_name: name })
      .then(users => { resolve(users) })
      .catch(err => reject(err))
  })
}

db_ops.setData = (data) => {
  return new Promise((resolve, reject) => {
    let userData = {
      id: data.id,
      full_name: data.full_name
    }

    User.create(userData)
      .then(userDetails => resolve(userDetails))
      .catch(err => reject(err))
  })
};



module.exports = { db_ops }