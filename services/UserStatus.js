const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./User');

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
// User.belongsTo(UserStatus, {foreignKey: 'UserStatusId', targetKey  : 'UserStatusId'});
// UserStatus.hasMany(User, {as: 'users', foreignKey: 'UserStatusId'});

// UserStatus.hasMany(User);
// User.belongsTo(UserStatus);

module.exports = UserStatus;