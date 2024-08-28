const  express  = require("express");
const paymentRouter = express.Router();

const {capturePayment, verifySignature} = require("../controllers/Payment");
// import middlewares
const {isAuth, isStudent} = require("../middleware/Auth");

// payment from the razorpay , fetching the data
paymentRouter.post("/capturePayment",isAuth, isStudent, capturePayment);
// payment done successfully  after the payment is done and checking process 
paymentRouter.post("/verifySignature", verifySignature);


module.exports = paymentRouter;