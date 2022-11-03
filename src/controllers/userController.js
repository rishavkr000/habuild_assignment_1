const jwt = require('jsonwebtoken');              // import jsonwebtoken to generate token
const bcrypt = require('bcrypt');
const userModel = require("../models/userModel")
const { isValidRequestBody, isValid, isValidEmail, isValidPassword} = require("../utils/validator")


const createUser = async (req, res) => {
    try {
        const data = req.body;

        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "User credentials are required" })

        let { name, email, password } = data

        //Validations
        
        if (isValid(name)) return res.status(400).send({ status: false, message: "User name is required" })
        if (!name.match(/^[#.a-zA-Z\s,-]+$/)) return res.status(400).send({ status: false, message: "User name is Invalid !" })

        if (isValid(email)) return res.status(400).send({ status: false, message: "Email is required" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: `${email} is not a valid email` })

        if (isValid(password)) return res.status(400).send({ status: false, message: "Password is required" })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: ` Password ${password} length must be between 8 and 15 and must contain mix of unique character @#$%&* and a-z, A-Z` })
        password = await bcrypt.hash(password, 10)

        //DB calls to check valid phone and email
        const isUniqueEmail = await userModel.findOne({ email: email })
        if (isUniqueEmail) return res.status(400).send({ status: false, message: `Email : ${email} already registered` })

        //User creation
        let userData = { name, email, password }
        let user = await userModel.create(userData)

        return res.status(201).send({ status: true, message: "User created sucessfully", data: user })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const loginUser = async function (req, res) {
    try {
        const loginData = req.body;

        if (!isValidRequestBody(loginData)) return res.status(400).send({ status: false, message: "Login Credentials cannot be empty" })

        const { email, password } = loginData

        if (isValid(email)) return res.status(400).send({ status: false, message: "Email is required" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: `${email} is not a valid email` })

        if (isValid(password)) return res.status(400).send({ status: false, message: "Password is required" })

        //DB call for checking user is valid user
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(401).send({ status: false, message: "Email is not correct" })
        }

        const samePassword = await bcrypt.compare(password, user.password);
        if (!samePassword) {
            return res.status(401).send({ status: false, message: "Password is not correct" })
        }

        let token = jwt.sign(
            {
                userId: user._id.toString(),
                batch: "habuild",
                organisation: "FunctionUp",
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            },
            "habuild-assignment"
        )
        //sending token in header response
        res.setHeader("x-api-key", token)
        const data = {
            user: user._id,
            token : token
        }
        res.status(200).send({ status: true, data: data })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
