const { Model, DataTypes } = require('sequelize');
const User = require('./Users');
const sequelize = require('../config/connection');

class Articles extends Model {}

Articles.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
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
        }
    },
    {
        sequelize,
        modelName: 'articles'
    }
);

module.exports = Articles;