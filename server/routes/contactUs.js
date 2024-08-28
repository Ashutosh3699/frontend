const express = require("express");
const contactUsRouter = express.Router();

const {contactUs} = require("../controllers/ContactUs");

contactUsRouter.post("/contactUs", contactUs);

module.exports = contactUsRouter