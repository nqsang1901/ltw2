const Sequelize = require('sequelize');
const db = require('./db');
const TransactionStatus = require('./TransactionStatus');
const TransactionDetail = require('./TransactionDetail');
const Account = require('./Account');

const Model = Sequelize.Model;

class TransactionLog extends Model {

    static async add(){
        
    }
}
TransactionLog.init({
    // attributes
    TransactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    TransactionDate: {
        type: Sequelize.DATE,
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
TransactionStatus.hasMany(TransactionLog);
TransactionDetail.hasMany(TransactionLog);
Account.hasMany(TransactionLog);
module.exports = TransactionLog;