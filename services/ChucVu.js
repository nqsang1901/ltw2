const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class ChucVu extends Model {

    static async add(){
        
    }
}
ChucVu.init({
    // attributes
    MaChucVu: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    TenChucVu: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'ChucVu',
    // options
});

module.exports = ChucVu;