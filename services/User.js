const Sequelize = require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');
const Model = Sequelize.Model;
const UserStatus = require('./UserStatus');
const UserType = require('./UserType');
const Account = require('./Account');

class User extends Model {
    static async findUserById(UserId) {
        return User.findOne({
            where: {
                UserId,
            }
        });
    }
    static async findAllUser() {
        return User.findAll({
            where: {
                UserTypeId: 1,
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
    static async findAllUserByFname(fname) {
        if (fname != "") {
            return User.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        { UserName: { [Sequelize.Op.like]: '%' + fname + '%' } },
                        { EmailAddress: { [Sequelize.Op.like]: '%' + fname + '%' } },
                    ]
                },
            });
        }
        return User.findAll();
    }
    async chanceAvatar(Avatar) {
        this.Avatar = Avatar;
        return this.save();
    }
    static async numberOfUsers() {
        return User.count();
    }
    static add(UserId, UserName, EmailAddress, PassWord, IdentityImages, IdentityNumber, DateOfBirth, Token) {
        return User.create({ UserId, UserName, EmailAddress, PassWord, IdentityImages, IdentityNumber, DateOfBirth, Token, UserTypeId: 1, UserStatusId: 1 });
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
        //primaryKey: true,
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
        type: Sequelize.DATEONLY,
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
    UserTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    UserStatusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'User',
    // options
});

User.belongsTo(UserStatus, { foreignKey: 'UserStatusId', targetKey: 'UserStatusId' });
UserStatus.hasMany(User, { sourceKey: 'UserStatusId' });

User.belongsTo(UserType, { foreignKey: 'UserTypeId', targetKey: 'UserTypeId' });
UserType.hasMany(User, { sourceKey: 'UserTypeId' });

module.exports = User;