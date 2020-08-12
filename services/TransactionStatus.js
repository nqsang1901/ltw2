const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class TransactionStatus extends Model {

    static async add()
    {
        
    }
}
TransactionStatus.init({
    // attributes
    TransactionStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //primaryKey: true,
        unique: true,
    },
    TransactionStatusDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'TransactionStatus',
    // options
});

module.exports = TransactionStatus;