const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class TransactionType extends Model {

    static async add()
    {
        
    }
}
TransactionType.init({
    // attributes
    TransactionTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //primaryKey: true,
        unique: true,
    },
    TransactionTypeDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'TransactionType',
    // options
});

module.exports = TransactionType;