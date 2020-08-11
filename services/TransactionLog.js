const Sequelize = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;
const TransactionStatus = require('./TransactionStatus');
const Account = require('./Account');

class TransactionLog extends Model {

    static async add(){
    }
}
TransactionLog.init({
    // attributes
    TransactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    AccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    TransactionDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    TransactionStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    BiXoa:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
    },
    
}, {
    sequelize: db,
    modelName: 'TransactionLog',
    // options
});

TransactionLog.belongsTo(Account, { foreignKey: 'AccountId', targetKey: 'AccountId' });
Account.hasOne(TransactionLog, { sourceKey: 'AccountId' });

TransactionLog.belongsTo(TransactionStatus, {foreignKey: 'TransactionStatusId', targetKey: 'TransactionStatusId'});
TransactionStatus.hasMany(TransactionLog, { sourceKey: 'TransactionStatusId'});

module.exports = TransactionLog;