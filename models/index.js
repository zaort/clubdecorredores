const User = require('./Users');
const Post = require('./Posts');
const Comment = require('./Comment');

User.hasMany(Post, {
 foreignKey: 'user_id',
 onDelete: 'CASCADE'
});

Post.belongsTo(User, {
 foreignKey: 'user_id'
});

// Validate if this works like this and also if the foreignKey should also be the post? (Because the comment directly relates to the post and the user)
User.hasMany(Comment, {
 foreignKey: 'user_id',
 onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
 foreignKey: 'user_id',
});


module.exports = { User, Post, Comment };

