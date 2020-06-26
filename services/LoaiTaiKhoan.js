const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class LoaiTaiKhoan extends Model {

    static async add(){
        
    }
}
LoaiTaiKhoan.init({
    // attributes
    MaLoaiTaiKhoan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    TenLoaiTaiKhoan: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'LoaiTaiKhoan',
    // options
});

module.exports = LoaiTaiKhoan;