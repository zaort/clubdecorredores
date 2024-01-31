const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const { post } = require('../controllers/api');

Post.belongsTo(User, {
 foreignKey: 'user_id'
});

User.hasMany(Post, {
 foreignKey: 'user_id',
 onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
 foreignKey: 'user_id',
 onDelete: 'CASCADE'
});

User.hasMany(Comment, {
 foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
 foreignKey: 'post_id',
 onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
 foreignKey: 'post_id'
});
//Comment need to be connected to the user foreign_key(user_id) but also to the post_id should it be through it?

// Validate if this works like this and also if the foreignKey should also be the post? (Because the comment directly relates to the post and the user)
// User.hasMany(Comment, {
//  foreignKey: 'user_id',
//  onDelete: 'CASCADE'
// });

// Comment.belongsTo(User, {
//  foreignKey: 'user_id',
// });


module.exports = { User, Post, Comment };

