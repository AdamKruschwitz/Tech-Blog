const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users
            }
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'articles',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'comments'
    }
);

module.exports = Comment;