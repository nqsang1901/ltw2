const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class LoaiNguoiDung extends Model {

    static async add(){
        
    }
}
LoaiNguoiDung.init({
    // attributes
    MaLoai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    TenLoaiNguoiDung: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'LoaiNguoiDung',
    // options
});

module.exports = LoaiNguoiDung;