const MedicalInfo = require('../Model/medical.model');
const cloudinary = require('../config/cloudinary')

const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, { folder: 'medical_docs' }, (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          type: result.resource_type
        });
      });
    });
  };


const add_medical_info = async (req, res) => {
  try {
    const {
      dob,
      gender,
      height,
      weight,
      chronicConditions,
      pastSurgeries,
      medicalHistoryNotes,
      documents
    } = req.body;

    if (!dob || !gender || !height || !weight) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    let uploadedDocs = [];
    if (documents && documents.length > 0) {
      for (const doc of documents) {
        const uploaded = await uploadToCloudinary(doc.url);
        console.log(uploaded); // `doc.url` is a dataURL (base64)
        uploadedDocs.push({
          url: uploaded.url,
          type: uploaded.type,
        });
      }
    }

    const medicalInfo = new MedicalInfo({
      dob: new Date(dob),
      gender,
      height: Number(height),
      weight: Number(weight),
      chronicConditions: chronicConditions || [],
      pastSurgeries: pastSurgeries || [],
      medicalHistoryNotes,
      documents: uploadedDocs,
    });

    await medicalInfo.save();

    res.status(201).json({
      success: true,
      message: "Medical information added successfully",
      data: medicalInfo
    });

  } catch (error) {
    console.error("Error in add_medical_info:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const access_medical_info = async (req, res) => {
    try {
        const medicalInfo = await MedicalInfo.findOne({ _id: req.params.id });

        if (!medicalInfo) {
            return res.status(404).json({
                success: false,
                message: "Medical information not found"
            });
        }

        res.status(200).json({
            success: true,
            data: medicalInfo
        });

    } catch (error) {
        console.error("Error in access_medical_info:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const update_medical_info = async (req, res) => {
    try {
        const {
            dob,
            gender,
            height,
            weight,
            chronicConditions,
            pastSurgeries,
            medicalHistoryNotes,
            documents
        } = req.body;

  
        const updatedInfo = await MedicalInfo.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    dob: dob ? new Date(dob) : undefined,
                    gender,
                    height: height ? Number(height) : undefined,
                    weight: weight ? Number(weight) : undefined,
                    chronicConditions,
                    pastSurgeries,
                    medicalHistoryNotes,
                    documents
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedInfo) {
            return res.status(404).json({
                success: false,
                message: "Medical information not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Medical information updated successfully",
            data: updatedInfo
        });

    } catch (error) {
        console.error("Error in update_medical_info:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    add_medical_info,
    access_medical_info,
    update_medical_info
};