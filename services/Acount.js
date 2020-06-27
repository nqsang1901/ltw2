const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./User');
const Banking = require('./Banking');
const TransactionLog = require('./TransactionLog');
const AcountType = require('./AcountType');
const AcountStatusType = require('./AcountStatusType');

const Model = Sequelize.Model;

class Acount extends Model {
    static async add(){
    }
}
Acount.init({
    // attributes
    AcountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    CurrentBalance: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    ReleaseDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    ExpirationDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    UserId : {
        type: Sequelize.INTEGER,
    },
    BankId: {
        type: Sequelize.INTEGER,
    },
    DueDate:{
        type: Sequelize.DATE,
        allowNull: true,
    },   
    AcountStatusTypeId:{
        type:Sequelize.INTEGER,
        allowNull:true,
    },
    InterestRate:{
        type:Sequelize.FLOAT,
        allowNull:true,
    },
    AcountTypeId:{
        type:Sequelize.INTEGER,
        allowNull:true,
    },
    TransactionId:{
        type:Sequelize.STRING,
        allowNull:true,
    },

}, {
    sequelize: db,
    modelName: 'Acount',
    // options
});
AcountType.hasMany(Acount, {foreignKey: 'AcountTypeId'});
User.hasMany(Acount, {foreignKey: 'UserId'});
Banking.hasMany(Acount, {foreignKey: 'BankId'});
AcountStatusType.hasMany(Acount, {foreignKey: 'AcountStatusTypeId'});
TransactionLog.hasMany(Acount, {foreignKey: 'TransactionId'});
// Account.belongsTo(entities.LoaiTaiKhoan, {as: 'MaLoaiTaiKhoan'});

module.exports = Acount;