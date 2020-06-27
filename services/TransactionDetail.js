const Sequelize = require('sequelize');
const db = require('./db');

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

module.exports = TransactionDetail;