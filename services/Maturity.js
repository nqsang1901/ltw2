const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class Maturity extends Model {

    static async add()
    {
        
    }
}
Maturity.init({
    // attributes
    MaturityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //primaryKey: true,
        unique: true,
    },
    MaturityName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'Maturity',
    // options
});

module.exports = Maturity;