const secrets = JSON.parse(process.env.DB);
const stripe = require('stripe')(secrets.stripe);
require('dotenv').config();

const paymentIntent = async ({ id, amount }) => {
  const price = amount / 100;
  try {
    const payment = await stripe.paymentIntents.create({
      // Utiliza centimos como modelo base, por lo que los pagos tienen que ser mayor de 50 ( 50 centimos)
      amount: amount,
      currency: 'eur',
      description: `Recarga ${price}€`,
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    return payment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { paymentIntent };
