const Articles = require('./Articles');
const Comments = require('./Comments');
const Users = require('./Users');

// One to many relationship of articles to comments
Articles.hasMany(Comments, {
    foreignKey: 'article_id'
});

Comments.belongsTo(Articles, {
    foreignKey: 'article_id'
});

// One to Many relationship users to articles
Users.hasMany(Articles, {
    foreignKey: 'author_id'
});

Articles.belongsTo(Users, { 
    foreignKey: 'author_id'
});

// One to many relationship Users to Comments
Users.hasMany(Comments, {
    foreignKey: 'author_id'
});

Comments.belongsTo(Users, {
    foreignKey: 'author_id'
});

module.exports = { Articles, Comments, Users };