const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class ChiTietGiaoDich extends Model {

    static async add(){
        
    }
}
ChiTietGiaoDich.init({
    // attributes
    MaChiTietGiaoDich: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    NgayGiaoDich: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    SoTien: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        
    },
    NoiDung: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    NganHangThuHuong: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    NguoiThuHuong:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    BiXoa:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
    },
}, {
    sequelize: db,
    modelName: 'ChiTietGiaoDich',
    // options
});

module.exports = ChiTietGiaoDich;