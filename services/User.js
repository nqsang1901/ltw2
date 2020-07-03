const Sequelize = require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');
const Model = Sequelize.Model;
const UserStatus = require('./UserStatus');
const UserType = require('./UserType');

class User extends Model {
    static async findUserById(UserId) {
        return User.findOne({
            where: {
                UserId,
            }
        });
    }
    static async findUserByEmail(EmailAddress) {
        return User.findOne({
            where: {
                EmailAddress,
            }
        });
    }
    async chanceAvatar(Avatar) {
        this.Avatar = Avatar;
        return this.save();
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
    StatusId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    TypeId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }


}, {
    sequelize: db,
    modelName: 'User',
    // options
});
// UserStatus.hasMany(User);
// UserType.hasMany(User);

module.exports = User;