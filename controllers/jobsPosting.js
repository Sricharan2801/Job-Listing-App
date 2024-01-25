const Jobs = require("../models/Jobs");

const createJob = async (req, res) => {
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
            information,

        } = req.body

        if (!companyName || !addLogoUrl || !jobPosition || !monthlySalary ||
            !jobType || !remoteOrOffice || !jobDescription || !aboutCompany ||
            !skillsRequired || !information) {
            return res.status(409).json({ errorMessage: "Bad Request" })
        }

        const jobCreated = new Jobs({
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
            refUserId: req.body.userId,
        })

        try {
            await jobCreated.save()
            res.status(200).json({ message: "Job Created Sucessfully" })
        } catch (error) {
            console.log(error);
            res.status(409).json({ errorMessage: "Error in creating job" })
        }


    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = createJob;