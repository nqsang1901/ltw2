const Sequelize = require('sequelize');
const db = require('./db');
const TransactionLog = require('./TransactionLog');

const Model = Sequelize.Model;

class TransactionDetail extends Model {

    static async numberOfTransactionDetail() {
        return TransactionDetail.count();
    }
    static async add(TransactionDetailId, TransactionId, Content, BeneficiaryBank) {
        return TransactionDetail.create({ TransactionDetailId, TransactionId, Content, BeneficiaryBank });
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
    Content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    BeneficiaryBank: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'TransactionDetail',
    // options
});

TransactionDetail.belongsTo(TransactionLog, { foreignKey: 'TransactionId', targetKey: 'TransactionId' });
TransactionLog.hasOne(TransactionDetail, { foreignKey: 'TransactionId', sourceKey: 'TransactionId' });

module.exports = TransactionDetail;