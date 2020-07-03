const Sequelize = require('sequelize');
const db = require('./db');
const Account = require('./Account');
// const { create } = require('./UserStatus');


const Model = Sequelize.Model;

class AccountStatusType extends Model {

    static add(AccountStatusTypeId,AccountStatusDescription ){
        return AccountStatusType.create({AccountStatusTypeId,AccountStatusDescription});
    }
}
AccountStatusType.init({
    // attributes
    AccountStatusTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // unique: true,
        primaryKey: true,
    },
    AccountStatusDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'AccountStatusType',
    // options
});
AccountStatusType.hasMany(Account, {foreignKey: 'AccountStatusTypeId', sourceKey: 'AccountStatusTypeId'});
Account.belongsTo(AccountStatusType, {foreignKey: 'AccountStatusTypeId', targetKey: 'AccountStatusTypeId'});
module.exports = AccountStatusType;