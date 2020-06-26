const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class TinhTrangKhachHang extends Model {

    static async add(){
        
    }
}
TinhTrangKhachHang.init({
    // attributes
    MaTTKH: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    TenTinhTrang: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'TinhTrangKhachHang',
    // options
});

module.exports = TinhTrangKhachHang;