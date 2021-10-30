const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {
    getAuthorID() {
        return this.author_id;
    }
}

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
                model: 'users',
                key: 'id'
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