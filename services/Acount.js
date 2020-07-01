const Sequelize = require('sequelize');
const db = require('./db');
const Banking = require('./Banking');
const TransactionLog = require('./TransactionLog');
const AcountType = require('./AcountType');
const AcountStatusType = require('./AcountStatusType');
const { findAll } = require('./UserStatus');
const User = require('./User');

const Model = Sequelize.Model;

class Account extends Model {
    static async findAcountByAcountId(AcountId) {
        return Account.findOne({
            where: {
                AcountId,
            }
        });
    }
    static async findAcountByUserId(UserId) {
        return Account.findAll({
            where: {
                UserId,
            }
        });
    }
    static async findAcountStatusTypeId(id) {
        return Account.findAll({
            where: {AcountStatusTypeId: 1},
            include: [{
                model: User,
                where: {UserId: id},
                required: false,
            }]
        });
    }
    static add(AcountId, CurrentBalance, ReleaseDate, UserId , BankId, AcountStatusTypeId, AcountTypeId) {
        return Account.create({AcountId, CurrentBalance, ReleaseDate, UserId , BankId, AcountStatusTypeId, AcountTypeId});
    }
}
Account.init({
    // attributes
    AcountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    CurrentBalance: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    ReleaseDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    ExpirationDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    UserId : {
        type: Sequelize.INTEGER,
    },
    BankId: {
        type: Sequelize.INTEGER,
    },
    DueDate:{
        type: Sequelize.DATE,
        allowNull: true,
    },   
    AcountStatusTypeId:{
        type:Sequelize.INTEGER,
        allowNull:true,
    },
    InterestRate:{
        type:Sequelize.FLOAT,
        allowNull:true,
    },
    AcountTypeId:{
        type:Sequelize.INTEGER,
        allowNull:true,
    },
    TransactionId:{
        type:Sequelize.STRING,
        allowNull:true,
    },

}, {
    sequelize: db,
    modelName: 'Account',
    // options
});
// AcountType.hasMany(Account, {foreignKey: 'AcountTypeId', sourceKey: 'AcountTypeId'});
// Account.belongsTo(AcountType, {foreignKey: 'AcountTypeId', targetKey: 'AcountTypeId'});

// User.hasMany(Account, {foreignKey: 'UserId', sourceKey: 'UserId'});
// Account.belongsTo(User, {foreignKey: 'UserId', targetKey: 'UserId'});

// Banking.hasMany(Account, {foreignKey: 'BankId', sourceKey: 'BankId'});
// Account.belongsTo(Banking, {foreignKey: 'BankId', targetKey: 'BankId'});

// AcountStatusType.hasMany(Account, {foreignKey: 'AcountStatusTypeId', sourceKey: 'AcountStatusTypeId'});
// Account.belongsTo(AcountStatusType, {foreignKey: 'AcountStatusTypeId', targetKey: 'AcountStatusTypeId'});

// TransactionLog.hasMany(Account, {foreignKey: 'TransactionId', sourceKey: 'TransactionId'});
// Account.belongsTo(TransactionLog, {foreignKey: 'TransactionId', targetKey: 'TransactionId'});


module.exports = Account;