const Sequelize = require('sequelize');
const db = require('./db');
// const Banking = require('./Banking');
// const TransactionLog = require('./TransactionLog');
// const AccountType = require('./AccountType');
// const AccountStatusType = require('./AccountStatusType');
const { findAll } = require('./UserStatus');
const User = require('./User');

const Model = Sequelize.Model;

class Account extends Model {
    static async findAccountByAcountId(AccountId) {
        return Account.findOne({
            where: {
                AccountId,
            }
        });
    }
    static async findAccountByUserId(UserId) {
        return Account.findAll({
            where: {
                UserId,
            }
        });
    }
    static async findAccountStatusTypeId(id) {
        return Account.findAll({
            where: {AccountStatusTypeId: 1},
            include: [{
                model: User,
                where: {UserId: id},
                required: false,
            }]
        });
    }
    static add(AccountId, CurrentBalance, ReleaseDate, UserId , BankId, AccountStatusTypeId, AccountTypeId) {
        return Account.create({AccountId, CurrentBalance, ReleaseDate, UserId , BankId, AccountStatusTypeId, AccountTypeId});
    }
}
Account.init({
    // attributes
    AccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // unique: true,
        primaryKey: true,
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
    AccountStatusTypeId:{
        type: Sequelize.INTEGER,
    },
    AccountTypeId:{
        type: Sequelize.INTEGER,
    }
},
{
    sequelize: db,
    modelName: 'Account',
    // options
});
// AcountType.hasMany(Account);
// User.hasMany(Account);
// Banking.hasMany(Account);
// AcountStatusType.hasMany(Account);
// TransactionLog.hasMany(Account);

module.exports = Account;