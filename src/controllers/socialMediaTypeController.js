import { InstituteSocialMediaType } from "../models/index.js"

export const createSocialMediaType = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const { created_by, ...socialMediaData } = req.body
        const data = await InstituteSocialMediaType.create({
            ...socialMediaData,
            created_by: userId
        })
        return res.status(200).json({
            message: "Social Media Type created",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getAllSocialMediaType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const { rows: data, count } = await InstituteSocialMediaType.findAndCountAll({
            limit,
            offset
        })
        return res.status(200).json({
            message: "Social media type retrieved",
            data,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getSocialMediaTypeById = async (req, res) => {
    try {
        const socialMediaType = await InstituteSocialMediaType.findByPk(req.params.id)
        if (!socialMediaType) {
            return res.status(404).json({
                message: "socialMedia type not found"
            });
        }
        return res.status(200).json({
            message: "socialMedia type retrieved",
            data: socialMediaType
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const updatesocialMediaType = async (req, res) => {
    try {
        const data = await InstituteSocialMediaType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.update(req.body)
        return res.status(200).json({
            message: "socialMedia type updated",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}

export const deletesocialMediaType = async (req, res) => {
    try {
        const data = await InstituteSocialMediaType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.destroy()
        return res.status(200).json({
            message: "socialMedia type deleted",
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}