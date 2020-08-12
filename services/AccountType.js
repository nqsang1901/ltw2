const Sequelize = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;

class AccountType extends Model {

    static async add(){
        
    }
}
AccountType.init({
    // attributes
    AccountTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //primaryKey: true,
        unique: true,
    },
    AccountTypeDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'AccountType',
    // options
});
module.exports = AccountType;