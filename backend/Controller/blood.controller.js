const bloodModel= require('../Model/blood.model')


const add_blood_request=async(req, res)=>{
    try {
        const newRequest = new bloodModel(req.body);
        await newRequest.save();
        res.status(201).json({ success: true, message: "Request added!" });
      } catch (err) {
        res.status(500).json({ success: false, message: "Error adding request." });
      }
}

const get_blood_request = async(req, res)=>{
    try {
        const requests = await bloodModel.find().sort({ createdAt: -1 });
        res.json({ success: true, data: requests });
      } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching requests." });
      }
}



module.exports={
    add_blood_request,
    get_blood_request
}