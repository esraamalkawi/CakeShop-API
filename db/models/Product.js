module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: { type: DataTypes.STRING },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      Validate: {
        min: 5,
        max: 50,
      },
    },
    image: { type: DataTypes.STRING },
  });
};
