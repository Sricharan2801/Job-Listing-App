const Jobs = require("../models/Jobs");

const getUserDetailsById = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request"
            });
        }

        const jobDetails = await Jobs.findById({ _id: jobId }, { companyName: 1 });

        if (!jobDetails) {
            return res.status(404).json({
                errorMessage: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job Details Fetched Successfully...",
            jobDetails: jobDetails
        });

    } catch (error) {
        console.error("Error in fetching job details:", error);
        res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
};

const getAllJobDetails = async (req, res) => {
    try {
        const jobPosition = req.query.jobPosition || "";
        let skills = req.query.skills || [];

        if (typeof skills === "string") {
            skills = skills.split(",")
        }

        const filter = {}

        if (skills.length > 0) {
            filter.skillsRequired = { $in: skills.map(skill => new RegExp(skill, "i")) }
        }

        const jobsDetails = await Jobs.find({
            jobPosition: { $regex: jobPosition, $options: "i" },
            ...filter
        });

        if (jobsDetails.length === 0) {
            res.status(404).json({
                errorMessage: "No Jobs Found"
            })
        }

        res.status(200).json({
            message: "Jobs Details Fetched Successfully...",
            jobsDetails: jobsDetails
        });

    } catch (error) {
        console.error("Error in fetching jobs details:", error);
        res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
};

module.exports = { getUserDetailsById, getAllJobDetails };
