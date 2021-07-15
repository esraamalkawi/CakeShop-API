const { Cart, Order } = require("../db/models");

exports.checkout = async (req, res, next) => {
  const newOrder = await Order.create({ customerId: req.user.id });
  const cart = req.body.map((item) => ({
    ...item,
    orderId: newOrder.id,
  }));

  await Cart.bulkCreate(cart);

  const finalOrder = {
    ...newOrder.toJSON(),
    items: req.body,
  };
  res.status(201).json(finalOrder);
};
