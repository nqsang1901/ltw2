const Sequelize = require('sequelize');
const db = require('./db');
// const { findAll } = require('./UserStatus');
const Model = Sequelize.Model;
const User = require('./User');
const AccountStatusType = require('./AccountStatusType');
const AccountType = require('./AccountType');
const Maturity = require('./Maturity');
<<<<<<< HEAD
const Model = Sequelize.Model;
=======
>>>>>>> 1eac18eaca76b3547b0c91fc1b27aa0e2985fc87

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
    static async findAllAccount() {
        return Account.findAll({

        });
    }
    static async findAccountByUserId(UserId) {
        return Account.findAll({
            where: { UserId },
        });
    }
    static async transferIn(UserId, money, AccountId) {
        console.log(UserId, money, AccountId);
        const accountSend = await Account.findOne({
            where: {
                UserId,
                AccountTypeId: 1,
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
        if (accountSend && accountGet) {
            accountSend.CurrentBalance = accountSend.CurrentBalance - money;
            accountGet.CurrentBalance = accountGet.CurrentBalance + money;
            accountSend.save();
            accountGet.save();

            return true;
        }
        return false;
    }
    //Ham xu li gui tien 
    static async Deposit(UserId,AccountId, money,interest) {
        const account = await Account.findOne({
            where: {
                UserId,
                AccountId,
                AccountTypeId : 2,
                AccountStatusTypeId: 2,
                CurrentBalance: {
                    [Sequelize.Op.gte]: money
                }
            },
        });
        if(account) {
            account.CurrentBalance = account.CurrentBalance - money;
            account.SavingMoney= account.SavingMoney + money;
            account.BankInterest= interest;
            account.save();
            return true;
        } 
        return false;
    }
    //Ham xu li tinh tien lai 
    static async Interest(UserId,AccountId,interest,Savingmoney) {
        const account = await Account.findOne({
            where: {
                UserId,
                AccountId,
                AccountTypeId : 2,
                AccountStatusTypeId: 2,
                CurrentBalance: {
                    [Sequelize.Op.gte]: money
                }
            },
        });
        if(account) {
            account.MoneyInterest =Savingmoney*interest/360;
            account.save();
            return true;
        } 
        return false;
    }
        //Ham xu li so du sau khi gia han
        static async BalanceBeforMaturity(UserId,AccountId, money) {
            const account = await Account.findOne({
                where: {
                    UserId,
                    AccountId,
                    AccountTypeId : 2,
                    AccountStatusTypeId: 2,
                    CurrentBalance: {
                        [Sequelize.Op.gte]: money
                    }
                },
            });
            if(account) {
                account.CurrentBalance = account.CurrentBalance + money;
                account.save();
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
    static async rechargeAccount(money, AccountId) {
        if (money % 1000 != 0) {
            return false;
        }
        const account = await Account.findOne({
            where: {
                AccountId,
            },

        });
        account.CurrentBalance = account.CurrentBalance + money;
        account.save();
        return true;
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
        //primaryKey: true,
        unique: true,
    },
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    CurrentBalance: {
        type: Sequelize.FLOAT,
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
    BankInterest: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    SavingMoney: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    MoneyInterest: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    MaturityId: {
        type: Sequelize.INTEGER,
    },
    AccountStatusTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    AccountTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

},
    {
        sequelize: db,
        modelName: 'Account',
        // options
    });

Account.belongsTo(User, { foreignKey: 'UserId', targetKey: 'UserId' });
User.hasMany(Account, { sourceKey: 'UserId' });

Account.belongsTo(AccountType, { foreignKey: 'AccountTypeId', targetKey: 'AccountTypeId' });
AccountType.hasMany(Account, { sourceKey: 'AccountTypeId' });

Account.belongsTo(AccountStatusType, { foreignKey: 'AccountStatusTypeId', targetKey: 'AccountStatusTypeId' });
AccountStatusType.hasMany(Account, { sourceKey: 'AccountStatusTypeId' });

Account.belongsTo(Maturity, { foreignKey: 'MaturityId', targetKey: 'MaturityId' });
Maturity.hasMany(Account, { sourceKey: 'MaturityId' });
// AccountType.belongsTo(Account, {foreignKey: 'AccountTypeId', targetKey: 'AccountTypeId'});
// Account.hasMany(AccountType, {sourceKey: 'AccountTypeId'});

// AccountStatusType.belongsTo(Account, {foreignKey: 'AccountStatusTypeId', targetKey: 'AccountStatusTypeId'});
// Account.hasMany(AccountStatusType, { sourceKey: 'AccountStatusTypeId'});

module.exports = Account;