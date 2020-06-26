const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class TinhTrangGiaoDich extends Model {

    static async add(){
        
    }
}
TinhTrangGiaoDich.init({
    // attributes
    MaTTGD: {
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
    modelName: 'TinhTrangGiaoDich',
    // options
});

module.exports = TinhTrangGiaoDich;