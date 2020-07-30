const Sequelize = require('sequelize');
const db = require('./db');
const { findAll } = require('./UserStatus');
const User = require('./User');

const Model = Sequelize.Model;

class Account extends Model {
    static async findAccountByAcountId(AccountId) {
        return Account.findOne({
            where: { AccountId },
            include: [{
                model: User,
                required: false,
            }]
        });
    }
    static async findAccountByUserId(UserId) {
        return Account.findAll({
            where: { UserId },
        });
    }
    static async transferIn(UserId, money, AccountId) {
        const accountSend = await Account.findOne({
            where: {
                UserId,
                AccountTypeId : 1,
                AccountStatusTypeId: 2,
                CurrentBalance: {
                    [Sequelize.Op.gte]: money
                }
            },
        });
        const accountGet = await Account.findOne({
            where: {
                AccountId,
            },
        });
        if(accountSend && accountGet) {
            accountSend.CurrentBalance = accountSend.CurrentBalance - money;
            accountGet.CurrentBalance = accountGet.CurrentBalance + money;
            accountSend.save();
            accountGet.save();

            return true;
        } 
        return false;
    }
    static async findAccountStatusTypeId() {
        return Account.findAll({
            where: { AccountStatusTypeId: 1 },
            include: [{
                model: User,
                required: false,
            }]
        });
    }
    static add(AccountId, UserId, CurrentBalance, ReleaseDate, AccountStatusTypeId, AccountTypeId) {
        return Account.create({ AccountId, UserId, CurrentBalance, ReleaseDate, AccountStatusTypeId, AccountTypeId });
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
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    DueDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    InterestRate: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    AccountStatusTypeId: {
        type: Sequelize.INTEGER,
    },
    AccountTypeId: {
        type: Sequelize.INTEGER,
    },

},
    {
        sequelize: db,
        modelName: 'Account',
        // options
    });

Account.belongsTo(User, { foreignKey: 'UserId', targetKey: 'UserId' });
User.hasMany(Account, { sourceKey: 'UserId' });

module.exports = Account;