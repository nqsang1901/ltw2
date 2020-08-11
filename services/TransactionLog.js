const Sequelize = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;
const TransactionStatus = require('./TransactionStatus');
const TransactionDetail = require('./TransactionDetail');
const Account = require('./Account');

class TransactionLog extends Model {

    // static async add(TransactionId,AccountId,TransactionDetailId,TransactionStatusId,BiXoa){
    //     return TransactionLog.create(TransactionId,AccountId,TransactionDetailId,TransactionStatusId,BiXoa);
    // }
}
TransactionLog.init({
    // attributes
    TransactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
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
Account.belongsTo(TransactionLog, { foreignKey: 'AccountId', targetKey: 'AccountId' });
TransactionLog.hasMany(Account, { sourceKey: 'AccountId' });

TransactionLog.belongsTo(TransactionDetail, {foreignKey: 'TransactionDetailId', targetKey: 'TransactionDetailId'});
TransactionDetail.hasMany(TransactionLog, { sourceKey: 'TransactionDetailId'});

TransactionLog.belongsTo(TransactionStatus, {foreignKey: 'TransactionStatusId', targetKey: 'TransactionStatusId'});
TransactionStatus.hasMany(TransactionLog, { sourceKey: 'TransactionStatusId'});
module.exports = TransactionLog;