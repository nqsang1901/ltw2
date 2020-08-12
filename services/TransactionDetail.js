const Sequelize = require('sequelize');
const db = require('./db');
const TransactionLog = require('./TransactionLog');

const Model = Sequelize.Model;

class TransactionDetail extends Model {

    static async add(){
    }
}
TransactionDetail.init({
    // attributes
    TransactionDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //primaryKey: true,
        unique: true,
    },
    TransactionDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    TransactionAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    Content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    BeneficiaryBank: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    BeneficiaryUser:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    BiXoa:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
    },
}, {
    sequelize: db,
    modelName: 'TransactionDetail',
    // options
});

TransactionDetail.belongsTo(TransactionLog, {foreignKey: 'TransactionDetailId', targetKey: 'TransactionDetailId'});
TransactionLog.hasOne(TransactionDetail, { sourceKey: 'TransactionDetailId'});

module.exports = TransactionDetail;