const Sequelize = require('sequelize');
const db = require('./db');
// const User = require('./User');

const Model = Sequelize.Model;

class UserStatus extends Model {

    static async add(){
        
    }
}
UserStatus.init({
    // attributes
    UserStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //primaryKey: true,
        unique: true,
    },
    UserStatusDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'UserStatus',
    // options
});

module.exports = UserStatus;