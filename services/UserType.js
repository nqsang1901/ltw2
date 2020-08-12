const Sequelize = require('sequelize');
const db = require('./db');
// const User = require('./User');

const Model = Sequelize.Model;

class UserType extends Model {

    static async add(){
        
    }
}
UserType.init({
    // attributes
    UserTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //primaryKey: true,
        unique: true,
    },
    UserTypeDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'UserType',
    // options
});

module.exports = UserType;