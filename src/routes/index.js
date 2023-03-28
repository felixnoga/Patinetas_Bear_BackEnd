const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const app = express();
const secrets = JSON.parse(process.env.DB);

app.use('/user', require('./user'));
// app.use("/client", require('./clients'));

router.use('/scooters', validateToken, require('./scooters'));
router.use('/booking', validateToken, require('./booking'));
router.use('/trip', validateToken, require('./trips'));
router.post(
  '/payment/:id',
  validateToken,
  require('../controllers/paymentController')
);

router.get('/', (req, res) => {
  JSON.stringify(secrets);
  res.status(200).send(secrets);
});

module.exports = router;
