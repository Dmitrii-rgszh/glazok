// backend/src/models/User.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vk_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      is_premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      premium_until: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      referral_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      source_reason: {
        type: DataTypes.STRING,
        allowNull: true, // например, "Ревную", "Хочу узнать, что делает бывший"
      }
    }, {
      tableName: 'Users'
    });
  
    return User;
  };
  