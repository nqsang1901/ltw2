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
        allowNull: false,
    },
    UserName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    EmailAddress : {
        type: Sequelize.STRING,
    },
    PassWord:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    CellPhone: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    soCMND: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    DateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    Address:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    Token:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    LoaiNguoiDung:{
        type:Sequelize.INTEGER,
        allowNull:true,
    },
    MaTinhTrang:{
        type:Sequelize.STRING,
        allowNull:true,
    },

}, {
    sequelize: db,
    modelName: 'User',
    // options
});
// UserStatus.hasMany(NguoiDung, {foreignKey: 'MaTTKH'});
// UserType.hasMany(NguoiDung,{foreignKey:'MaLoai'});

module.exports = User;