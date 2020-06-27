const Sequelize = require('sequelize');
const db = require('./db');
const TransactionStatus = require('./TransactionStatus');
const TransactionDetail = require('./TransactionDetail');
const User = require('./User');

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
    TransactionStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    TransactionDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    UserId: {
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
TransactionStatus.hasMany(TransactionLog, {foreignKey: 'TransactionStatusId'});
TransactionDetail.hasMany(TransactionLog,{foreignKey:'TransactionDetailId'});
User.hasMany(TransactionLog,{foreignKey:'UserId'});
module.exports = TransactionLog;