const Jobs = require("../models/Jobs");

const updateUser = async (req, res) => {
    try {
        const {
            companyName,
            addLogoUrl,
            jobPosition,
            monthlySalary,
            jobType,
            remoteOrOffice,
            location,
            jobDescription,
            aboutCompany,
            skillsRequired,
            information
        } = req.body;

        const jobId = req.params.jobId;

        if (!companyName || !addLogoUrl || !jobPosition || !monthlySalary ||
            !jobType || !remoteOrOffice || !jobDescription || !aboutCompany ||
            !skillsRequired || !information) {
            return res.status(409).json({ errorMessage: "Bad Request" })
        }

        try {
            await Jobs.updateOne({ _id: jobId }, {
                $set: {
                    companyName,
                    addLogoUrl,
                    jobPosition,
                    monthlySalary,
                    jobType,
                    remoteOrOffice,
                    location,
                    jobDescription,
                    aboutCompany,
                    skillsRequired,
                    information,
                }
            })

            res.status(200).json({
                message: "User details updated sucessfully..."
            })
        } catch (error) {
            res.status(400).json({
                errorMessage: "Error in updating user details"
            })
        }

    } catch (error) {
        res.status(500).json({
            errorMessage: "Internal Server Error"
        })
    }
}

module.exports = updateUser;