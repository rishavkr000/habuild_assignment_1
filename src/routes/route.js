const express = require("express");
const router = express.Router();
const {createUser, loginUser} = require("../controllers/userController")
const {createData, getData} = require("../controllers/assignmentController");
const {authentication} = require("../middlewares/auth")

router.post('/register', createUser) 
router.post('/loginUser', loginUser)
router.post("/createData/:userId", authentication, createData);
router.get("/getData", getData)




/*------------------------------if api is invalid OR wrong URL--------------------------------*/


router.all("/**", function (req, res) {
    res.status(400).send({ status: false, msg: "The api you request is not available" })
})

module.exports = router;