const Sequelize = require('sequelize');
const db = require('./db');
const Banking = require('./Banking');
const TransactionLog = require('./TransactionLog');
const AcountType = require('./AcountType');
const AcountStatusType = require('./AcountStatusType');
const { findAll } = require('./UserStatus');
const User = require('./User');

const Model = Sequelize.Model;

class Account extends Model {
    static async findAcountByAcountId(AcountId) {
        return Account.findOne({
            where: {
                AcountId,
            }
        });
    }
    static async findAcountByUserId(UserId) {
        return Account.findAll({
            where: {
                UserId,
            }
        });
    }
    static async findAcountStatusTypeId(id) {
        return Account.findAll({
            where: {AcountStatusTypeId: 1},
            include: [{
                model: User,
                where: {UserId: id},
                required: false,
            }]
        });
    }
    static add(AcountId, CurrentBalance, ReleaseDate, UserId , BankId, AcountStatusTypeId, AcountTypeId) {
        return Account.create({AcountId, CurrentBalance, ReleaseDate, UserId , BankId, AcountStatusTypeId, AcountTypeId});
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