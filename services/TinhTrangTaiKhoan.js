const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class TinhTrangTaiKhoan extends Model {

    static async add(){
        
    }
}
TinhTrangTaiKhoan.init({
    // attributes
    MaTTTK: {
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
    modelName: 'TinhTrangTaiKhoan',
    // options
});

module.exports = TinhTrangTaiKhoan;