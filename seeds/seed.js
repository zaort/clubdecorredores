// seed.js will serve as dummy data so the app works. This file populates the database with the .json files on the seeds directory.
const sequelize = require('../config/connection');

const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');
// const sequelize = require('sequelize');

const seedDatabase = async () => {
 await sequelize.sync({ force: true });

 const users = await User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
 });

 for (const post of blogData) {
  await Post.create({
   ...post,
   user_id: users[Math.floor(Math.random() * users.length)].id,
  });
 };

 for (const comment of commentData) {
  await Comment.create({
   ...comment,
   // should something as the user_id needs to be created for post_id?
   user_id: users[Math.floor(Math.random() * users.length)].id,
  });
 };

 process.exit(0);
};

seedDatabase();