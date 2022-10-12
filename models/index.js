// import all models
const Post = require('./Post');
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Rating = require('./Rating');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
  through: Rating,
  as: 'rated_posts',// this will be rating

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
  through: Rating,
  as: 'rated_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Comment, {
  foreignKey: 'comment_id',
  onDelete: 'SET NULL'
});
Rating.belongsTo(Post, {
  foreignKey: 'rating_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

User.hasMany(Rating, {
  foreignKey: 'user_id'
})

Comment.hasMany(Vote, {
  foreignKey: 'comment_id'
});
// may not need this 
Post.hasMany(Rating, {
  foreignKey: 'rating_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment, Rating };
