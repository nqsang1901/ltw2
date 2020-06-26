const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class KhachHang extends Model {

    static async add(){
        
    }
}
KhachHang.init({
    // attributes
    MakhachHang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    TenkhachHang: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email : {
        type: Sequelize.STRING,
    },
    sdt: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    sdt: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    soCMND: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    NgaySinh: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    DiaChi:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    Token:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    MatKhau:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    MaTinhTrang:{
        type:Sequelize.STRING,
        allowNull:true,
    },

}, {
    sequelize: db,
    modelName: 'KhachHang',
    // options
});
TinhTrangKhachHang.hasMany(KhachHang, {foreignKey: 'MaTTKH'});
module.exports = KhachHang;