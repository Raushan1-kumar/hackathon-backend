const Emergency = require('../Model/emergency.model');

const add_emergency_info = async (req, res) => {
    try {
      const {
        name,
        bloodGroup,
        secretKey,
        allergies,
        medications,
        emergencyContact,
        doctorContact
      } = req.body;
  
      
      if (!name || !bloodGroup) {
        return res.status(400).json({
          success: false,
          message: "Name and blood group are required"
        });
      }
  
      // Create new emergency info
      const emergencyInfo = new Emergency({
        name,
        bloodGroup,
        secretKey,
        allergies: allergies || [],
        medications: medications || [],
        emergencyContact,
        doctorContact
      });
  
      
      await emergencyInfo.save();
  
      
      res.status(201).json({
        success: true,
        message: "Emergency information added successfully",
        data: {
          emergencyUUID: emergencyInfo.emergencyUUID,  // Return the UUID to the user
        }
      });
  
    } catch (error) {
      console.error("Error in add_emergency_info:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  };
  
const access_emergency_detail = async (req, res) => {
    try {
        const { uuid } = req.params;

        const emergencyInfo = await Emergency.findOne({ emergencyUUID: uuid });

        if (!emergencyInfo) {
            return res.status(404).json({
                success: false,
                message: "Emergency information not found"
            });
        }

        res.status(200).json({
            success: true,
            data: emergencyInfo
        });

    } catch (error) {
        console.error("Error in access_emergency_detail:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const update_emergency_info = async (req, res) => {
    try {
        const { uuid } = req.params;
        const updateData = req.body;

        const updatedInfo = await Emergency.findOneAndUpdate(
            { emergencyUUID: uuid },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedInfo) {
            return res.status(404).json({
                success: false,
                message: "Emergency information not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Emergency information updated successfully",
            data: updatedInfo
        });

    } catch (error) {
        console.error("Error in update_emergency_info:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const delete_emergency_info = async (req, res) => {
    try {
        const { uuid } = req.params;

        const deletedInfo = await Emergency.findOneAndDelete({ emergencyUUID: uuid });

        if (!deletedInfo) {
            return res.status(404).json({
                success: false,
                message: "Emergency information not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Emergency information deleted successfully"
        });

    } catch (error) {
        console.error("Error in delete_emergency_info:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    add_emergency_info,
    access_emergency_detail,
    update_emergency_info,
    delete_emergency_info
};