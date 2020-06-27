const Sequelize = require('sequelize');
const db = require('./db');
const UserStatus = require('./UserStatus');
const UserType = require('./UserType');
const Model = Sequelize.Model;

class User extends Model {

    static async add(){
        
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
    PassWord:{
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
TinhTrangKhachHang.hasMany(NguoiDung, {foreignKey: 'MaTTKH'});
LoaiNguoiDung.hasMany(NguoiDung,{foreignKey:'MaLoai'});

module.exports = User;