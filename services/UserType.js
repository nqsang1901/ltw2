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
// User.belongsTo(UserType, {foreignKey: 'UserTypeId', targetKey : 'TypeId'});
// UserType.hasMany(User, {foreignKey: 'UserTypeId', sourceKey : 'TypeId'});

// UserType.hasMany(User);
// User.belongsTo(UserType);

module.exports = UserType;