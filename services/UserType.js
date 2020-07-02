const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./User');

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
// User.hasOne(UserStatus, {foreignKey: 'UserStatusId', targetKey : 'UserStatusId'});
// UserType.hasMany(User, {foreignKey: 'UserTypeId', targetKey : 'TypeUser'});

// UserType.hasMany(User);
// User.belongsTo(UserType);

module.exports = UserType;