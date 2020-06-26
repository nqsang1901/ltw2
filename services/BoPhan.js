const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class BoPhan extends Model {

    static async add(){
        
    }
}
BoPhan.init({
    // attributes
    MaBoPhan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    TenBoPhan: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'BoPhan',
    // options
});

module.exports = BoPhan;