const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;

class Banking extends Model {

    static async add(){
        
    }
}
Banking.init({
    // attributes
    BankId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    BankName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'Banking',
    // options
});

module.exports = Banking;