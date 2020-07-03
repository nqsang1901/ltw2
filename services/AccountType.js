const Sequelize = require('sequelize');
const db = require('./db');
const Account = require('./Account');
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
        // unique: true,
        primaryKey: true,
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
AccountType.hasMany(Account, {foreignKey: 'AccountTypeId', sourceKey: 'AccountTypeId'});
Account.belongsTo(AccountType, {foreignKey: 'AccountTypeId', targetKey: 'AccountTypeId'});
module.exports = AccountType;