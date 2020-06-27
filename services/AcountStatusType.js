const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class AcountStatusType extends Model {

    static async add(){
        
    }
}
AcountStatusType.init({
    // attributes
    AcountStatusTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    AcountStatusDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'AcountStatusType',
    // options
});

module.exports = AcountStatusType;