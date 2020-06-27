const Sequelize = require('sequelize');
const db = require('./db');
const TinhTrangGiaoDich = require('./TinhTrangGiaoDich');
const ChiTietGiaoDich = require('./ChiTietGiaoDich');
const NguoiDung = require('./NguoiDung');

const Model = Sequelize.Model;

class GiaoDich extends Model {

    static async add(){
        
    }
}
GiaoDich.init({
    // attributes
    MaGiaoDich: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    NgayGiaoDich: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    MaTTGiaoDich: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    MaChiTietGiaoDich: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    MaKhachHang: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    BiXoa:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
    },
}, {
    sequelize: db,
    modelName: 'GiaoDich',
    // options
});
TinhTrangGiaoDich.hasMany(GiaoDich, {foreignKey: 'MaTTGD'});
ChiTietGiaoDich.hasMany(GiaoDich,{foreignKey:'MaChiTietGiaoDich'});
NguoiDung.hasMany(GiaoDich,{foreignKey:'MaNguoiDung'});
module.exports = GiaoDich;