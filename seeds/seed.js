// seed.js will serve as dummy data so the app works. This file populates the database with the .json files on the seeds directory.
const seuelize = require('../config/connection');

const { User, Posts } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const sequelize = require('sequelize');

const seedDatabase = async () => {
 await sequelize.sync({ force: true });

 const users = await User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
 });

 for (const posts of blogData) {
  await Posts.create({
   ...posts,
   user_id: users[Math.floor(Math.random() * users.length)].id,
  });
 }

 process.exit(0);
};

seedDatabase();