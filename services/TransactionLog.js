const Sequelize = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;
const TransactionStatus = require('./TransactionStatus');
// const Account = require('./Account');
const User = require('./User');

class TransactionLog extends Model {

    static async numberOfTransactionLog() {
        return TransactionLog.count();
    }

    static async add(TransactionId, UserId, AccountId, TransactionStatusId, money, token, TransactionDate) {
        return TransactionLog.create({ TransactionId, UserId, AccountId, TransactionStatusId, money, token, TransactionDate });

    }
    static async findAllTransactionLogById(TransactionId) {
        return TransactionLog.findOne({
            where: { TransactionId },
        });
    }
    static async findTransactionLogByAccountId(AccountId) {
        return TransactionLog.findAll({
            where: { AccountId },
        });
    }
    static async findTransactionLogByToken(token) {
        return TransactionLog.findOne({
            where: { token },
        });
    }
}
TransactionLog.init({
    // attributes
    TransactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //primaryKey: true,
        unique: true,
    },
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    AccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    TransactionStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    money: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    TransactionDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    // TransactionDetailId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    // },
    // BiXoa:{
    //     type:Sequelize.BOOLEAN,
    //     allowNull:false,
    // },
}, {
    sequelize: db,
    modelName: 'TransactionLog',
    // options
});

// TransactionLog.belongsTo(Account, { foreignKey: 'AccountId', targetKey: 'AccountId' });
// Account.hasMany(TransactionLog, { sourceKey: 'AccountId' });

TransactionLog.belongsTo(User, { foreignKey: 'UserId', targetKey: 'UserId' });
User.hasMany(TransactionLog, { sourceKey: 'UserId' });

TransactionLog.belongsTo(TransactionStatus, { foreignKey: 'TransactionStatusId', targetKey: 'TransactionStatusId' });
TransactionStatus.hasMany(TransactionLog, { sourceKey: 'TransactionStatusId' });

module.exports = TransactionLog;