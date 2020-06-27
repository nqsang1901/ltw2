const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class AcountType extends Model {

    static async add(){
        
    }
}
AcountType.init({
    // attributes
    AcountTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    AcountTypeDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'AcountType',
    // options
});

module.exports = AcountType;