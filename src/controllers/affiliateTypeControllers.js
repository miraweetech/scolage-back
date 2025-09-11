import { InstituteAffiliateType } from "../models/index.js"

export const createAffiliateType = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const { created_by, ...affiliateTypeData } = req.body
        const data = await InstituteAffiliateType.create({
            ...affiliateTypeData,
            created_by: userId
        })
        return res.status(200).json({
            message: "affiliate type created",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getAllAffiliateTyps = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const { rows: data, count } = await InstituteAffiliateType.findAndCountAll({
            limit,
            offset
        })
        return res.status(200).json({
            message: "affiliate type retrieved",
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

export const getAffiliateTypeById = async (req, res) => {
    try {
        const affiliateType = await InstituteAffiliateType.findByPk(req.params.id)
        if (!affiliateType) {
            return res.status(404).json({
                message: "highlights type not found"
            });
        }
        return res.status(200).json({
            message: "affiliate type retrieved",
            data: affiliateType
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const updateAffiliateType = async (req, res) => {
    try {
        const data = await InstituteAffiliateType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.update(req.body)
        return res.status(200).json({
            message: "affiliate type updated",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}

export const deleteAffiliateType = async (req, res) => {
    try {
        const data = await InstituteAffiliateType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.destroy()
        return res.status(200).json({
            message: "affiliate type deleted",
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}