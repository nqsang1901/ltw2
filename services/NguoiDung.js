const Sequelize = require('sequelize');
const db = require('./db');
const TinhTrangKhachHang = require('./TinhTrangKhachHang');
const LoaiNguoiDung = require('./LoaiNguoiDung');
const Model = Sequelize.Model;

class NguoiDung extends Model {

    static async add(){
        
    }
}
NguoiDung.init({
    // attributes
    MaNguoiDung: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    TenNguoiDung: {
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
    modelName: 'NguoiDung',
    // options
});
TinhTrangKhachHang.hasMany(NguoiDung, {foreignKey: 'MaTTKH'});
LoaiNguoiDung.hasMany(NguoiDung,{foreignKey:'MaLoai'});

module.exports = NguoiDung;