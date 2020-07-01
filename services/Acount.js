const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./User');
const Banking = require('./Banking');
const TransactionLog = require('./TransactionLog');
const AcountType = require('./AcountType');
const AcountStatusType = require('./AcountStatusType');

const Model = Sequelize.Model;

class Account extends Model {
    static async add(){
    }
}
Account.init({
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
    InterestRate:{
        type:Sequelize.FLOAT,
        allowNull:true,
    },
},
{
    sequelize: db,
    modelName: 'Account',
    // options
});
AcountType.hasMany(Account);
User.hasMany(Account);
Banking.hasMany(Account);
AcountStatusType.hasMany(Account);
TransactionLog.hasMany(Account);

module.exports = Account;