const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Articles extends Model {
    getAuthorID() {
        return this.author_id;
    }
}

Articles.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        body: {
            type: DataTypes.STRING(2048),
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'articles'
    }
);

module.exports = Articles;