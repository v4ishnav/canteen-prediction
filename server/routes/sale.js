const express=  require("express")
const router  = express.Router()
const {addSale,getSales} = require("../controllers/sale.js")

router.get('/',getSales)
router.post('/',addSale)

module.exports = router;