const express = require("express");
const contactUsRouter = express.Router();

const {contactUs} = require("../controllers/ContactUs");

contactUsRouter.post("/contactUsrouter", contactUs);

module.exports = contactUsRouter