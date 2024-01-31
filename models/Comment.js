// would an articles model be needed in addition to the posts? Would we also need a comments model?

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
 {
  id: {
   type: DataTypes.INTEGER,
   allowNull: false,
   primaryKey: true,
   autoIncrement: true,
  },
  description: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  date_created: {
   type: DataTypes.DATE,
   allowNull: false,
   defaultValue: DataTypes.NOW,
  },
  user_id: {
   type: DataTypes.INTEGER,
   references: {
    model: 'User',
    key: 'id',
   },
  },
  post_id: {
   type: DataTypes.INTEGER,
   references: {
    // this doesn't match the post.js model name but it only works like this.
    model: 'posts',
    key: 'id',
   },
  },
 },
 {
  sequelize,
  timestamps: false,
  freezTableName: true,
  underscores: true,
  modelName: 'Comment',
 }
);

module.exports = Comment;