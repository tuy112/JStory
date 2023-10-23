'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cmts extends Model {
    static associate(models) {
      // Users와 Cmts는 일대다 관계
      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "userId",
      });

      // Posts와 Cmts는 일대다 관계
      this.belongsTo(models.Posts, {
        sourceKey: "cmtId",
        foreignKey: "postId",
      });
    }
  }
  Cmts.init({
    cmtId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Cmts',
  });
  return Cmts;
};