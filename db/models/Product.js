const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
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
  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });

  //relations
  Product.associate = (models) => {
    models.Shop.hasMany(Product, {
      foreignKey: "shopId",
      // allowNull: false,
      as: "products",
    });
    Product.belongsTo(models.Shop, {
      foreignKey: "shopId",
    });
  };

  return Product;
};
