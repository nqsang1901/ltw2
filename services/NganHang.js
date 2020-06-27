const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class NganHang extends Model {

    static async add(){
        
    }
}
NganHang.init({
    // attributes
    MaNganHang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    TenNganHang: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'NganHang',
    // options
});

module.exports = NganHang;