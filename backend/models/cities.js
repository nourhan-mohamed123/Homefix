import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cities extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      city_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'cities',
      timestamps: true,
      underscored: true,

      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "city_id" },
          ]
        },
      ]
    });
  }
}
