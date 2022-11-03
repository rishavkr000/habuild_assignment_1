const tableModel = require("../models/tableModel");
const { isValid, isValidRanking } = require("../utils/validator")



const createData = async (req, res) => {
    try {
        let data = req.body;
        const userId = req.params.userId
  
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST, Please provide details " });
        }

        //  authroization
        if (userId != req.userId)
            return res.status(401).send({ status: false, msg: "User not authorized" })

        let {topic, ranking} = data
 
        if (isValid(topic)) {
            return res.status(400).send({ status: false, msg: "Topic is Required" });
        }
        if (isValid(ranking)) {
            return res.status(400).send({ status: false, msg: "Ranking is Required" });
        }

        // if (ranking < 1 && ranking > 100){
        //     return res.status(400).send({ status: false, msg: 'Ranking must be between 1 to 100' })
        // }


        // if (!isValidRanking(ranking)) {
        //     return res.status(400).send({ status: false, msg: 'Ranking must be between 1 to 100' })
        // }
        

        let savedData = await tableModel.create(data)
        return res.status(201).send({ status: true, msg: savedData });
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}


const getData = async function (req, res) {
    try {

        // const userId = req.params.userId

        // //  authroization
        // if (userId != req.userId)
        //     return res.status(401).send({ status: false, msg: "User not authorized" })

        const getData = await tableModel.find()

        return res.status(200).send({ status: true, data: getData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}
  


module.exports.createData = createData
module.exports.getData = getData