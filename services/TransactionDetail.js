const Sequelize = require('sequelize');
const db = require('./db');
const TransactionLog = require('./TransactionLog');

const Model = Sequelize.Model;

class TransactionDetail extends Model {

    static async numberOfTransactionDetail() {
        return TransactionDetail.count();
    }
    static async add(TransactionDetailId, TransactionId, TransactionDate, TransactionAmount, Content, BeneficiaryBank, BeneficiaryUser) {
        return TransactionDetail.create({ TransactionDetailId, TransactionId, TransactionDate, TransactionAmount, Content, BeneficiaryBank, BeneficiaryUser });
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
    TransactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    BeneficiaryUser: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    // BiXoa:{
    //     type:Sequelize.BOOLEAN,
    //     allowNull:false,
    // },
}, {
    sequelize: db,
    modelName: 'TransactionDetail',
    // options
});

TransactionDetail.belongsTo(TransactionLog, { foreignKey: 'TransactionId', targetKey: 'TransactionId' });
TransactionLog.hasOne(TransactionDetail, { sourceKey: 'TransactionId', });

module.exports = TransactionDetail;