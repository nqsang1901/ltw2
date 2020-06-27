const Sequelize = require('sequelize');
const db = require('./db');
const NguoiDung = require('./NguoiDung');
const NganHang = require('./NganHang');
const GiaoDich = require('./GiaoDich');
const LoaiTaiKhoan = require('./LoaiTaiKhoan');
const TinhTrangTaiKhoan = require('./TinhTrangTaiKhoan');

const Model = Sequelize.Model;

class TaiKhoan extends Model {

    static async add(){
        
    }
}
TaiKhoan.init({
    // attributes
    MaTaiKhoan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    TenTaiKhoan: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    NgayCap: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    NgayHetHan: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    MaKhachHang : {
        type: Sequelize.INTEGER,
    },
    MaNganHang: {
        type: Sequelize.INTEGER,
    },
    
    KiHan:{
        type: Sequelize.DATE,
        allowNull: true,
    },
   
    MaTinhTrang:{
        type:Sequelize.INTEGER,
        allowNull:true,
    },
    LaiSuat:{
        type:Sequelize.FLOAT,
        allowNull:true,
    },
    LoaiTaiKhoan:{
        type:Sequelize.INTEGER,
        allowNull:true,
    },
    MaGiaoDich:{
        type:Sequelize.STRING,
        allowNull:true,
    },

}, {
    sequelize: db,
    modelName: 'TaiKhoan',
    // options
});
LoaiTaiKhoan.hasMany(TaiKhoan, {foreignKey: 'MaLoaiTaiKhoan'});
NguoiDung.hasMany(TaiKhoan, {foreignKey: 'MaNguoiDung'});
NganHang.hasMany(TaiKhoan, {foreignKey: 'MaNganHang'});
TinhTrangTaiKhoan.hasMany(TaiKhoan, {foreignKey: 'MaTTTK'});
GiaoDich.hasMany(TaiKhoan, {foreignKey: 'MaGiaoDich'});
// Account.belongsTo(entities.LoaiTaiKhoan, {as: 'MaLoaiTaiKhoan'});

module.exports = TaiKhoan;