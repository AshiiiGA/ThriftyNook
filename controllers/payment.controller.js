

const Payment = require('../models/paymentModel'); // Import the Payment model
const Product = require('../models/Product'); // Import the Product model

// Function to render the product details page and potentially make a payment
exports.viewProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Fetch the product details by productId (use your actual code for this)
    const product = await Product.findById(productId);

    if (!product) {
      // Handle the case when the product with the given ID doesn't exist
      return res.status(404).send('Product not found');
    }

    // Render the 'payment.ejs' template and pass the product details as data
    res.render('payment', { product }); // Ensure that 'payment' matches your actual template name
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
/*

// Handle the payment confirmation and save payment information
exports.confirmPayment = async (req, res) => {
  try {
    const { shippingAddress, shippingContact, productId, userId } = req.body;

    // Find the product by productId to ensure it exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Create a new payment instance with the provided data
    const payment = new Payment({
      shippingAddress,
      shippingContact,
      productId,
      userId
    });

    // Save the payment information to the database
    await payment.save();

    // Redirect or send a response as needed (e.g., to a confirmation page)
    res.status(200).send('Payment confirmed');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
*/