import { InstituteHighlightsType } from "../models/index.js"

export const createHighlightsType = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const { created_by, ...highlightstypeData } = req.body
        const data = await InstituteHighlightsType.create({
            ...highlightstypeData,
            created_by: userId
        })
        return res.status(200).json({
            message: "highlights type created",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getAllHighlightsTyps = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const { rows: data, count } = await InstituteHighlightsType.findAndCountAll({
            limit,
            offset
        })
        return res.status(200).json({
            message: "highlights type retrieved",
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

export const getHighlightsTypsById = async (req, res) => {
    try {
        const highlightsType = await InstituteHighlightsType.findByPk(req.params.id)
        if (!highlightsType) {
            return res.status(404).json({
                message: "highlights type not found"
            });
        }
        return res.status(200).json({
            message: "highlights type retrieved",
            data: highlightsType
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const updateHighlightsTyps = async (req, res) => {
    try {
        const data = await InstituteHighlightsType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.update(req.body)
        return res.status(200).json({
            message: "highlights type updated",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}

export const deleteHighlightsTyps = async (req, res) => {
    try {
        const data = await InstituteHighlightsType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.destroy()
        return res.status(200).json({
            message: "highlights type deleted",
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}