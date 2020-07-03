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
    static async findAcountStatusTypeId() {
        return Account.findAll({
            where: {AcountStatusTypeId: 1},
            include: [{
                model: User,
                where: {UserTypeId: null},
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

Account.belongsTo(User, {foreignKey: 'UserId', targetKey: 'UserId'});
User.hasMany(Account, {sourceKey: 'UserId'});

module.exports = Account;