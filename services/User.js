const Sequelize = require('sequelize');
const db = require('./db');
const UserStatus = require('./UserStatus');
const bcrypt = require('bcrypt');
const UserType = require('./UserType');
const Model = Sequelize.Model;

class User extends Model {
    static async findUserById(id) {
        return User.findByPk(id);
    }
    static async findUserByEmail(EmailAddress) {
        return User.findOne({
            where: {
                EmailAddress,
            }
        });
    }
    static async numberOfUsers() {
        return User.count();
    }
    static add(UserId, UserName, EmailAddress, PassWord, IdentityImages, IdentityNumber, DateOfBirth, Token) {
        return User.create({ UserId, UserName, EmailAddress, PassWord, IdentityImages, IdentityNumber, DateOfBirth, Token});
    }
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    static verifyPassword(password, passwordHash) {
        return bcrypt.compareSync(password, passwordHash);
    }
}
User.init({
    // attributes
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    Avatar: {
        type: Sequelize.STRING,
    },
    UserName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    EmailAddress: {
        type: Sequelize.STRING,
    },
    PassWord: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    CellPhone: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    IdentityImages: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    IdentityNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    DateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    Address: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Token: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    TypeUser: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    UserStatusId: {
        type: Sequelize.STRING,
        allowNull: true,
    },

}, {
    sequelize: db,
    modelName: 'User',
    // options
});
// UserStatus.hasMany(NguoiDung, {foreignKey: 'MaTTKH'});
UserStatus.hasMany(User, {foreignKey: 'UserStatusId', sourceKey: 'UserStatusId'});
User.belongsTo(UserStatus, {foreignKey: 'UserStatusId', targetKey: 'UserStatusId'});
// UserType.hasMany(NguoiDung,{foreignKey:'MaLoai'});
UserType.hasMany(User, {foreignKey: 'UserTypeId', sourceKey: 'UserTypeId'});
User.belongsTo(UserType, {foreignKey: 'UserTypeId', targetKey: 'UserTypeId'});

module.exports = User;