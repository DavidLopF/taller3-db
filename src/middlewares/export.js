const validate = require("../middlewares/validate");
const validateBody = require("../middlewares/validate_body");

module.exports = {
    ...validate,
    ...validateBody
}