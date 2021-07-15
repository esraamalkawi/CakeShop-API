module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  Cart.associate = (models) => {
    models.Order.belongsToMany(models.Product, {
      through: Cart,
      foreignKey: "orderId",
    });
    models.Product.belongsToMany(models.Order, {
      through: Cart,
      foreignKey: "itemId",
    });
  };

  return Cart;
};
