import {InstituteYoutubeLinkType } from "../models/index.js"

export const createYoutubeLinkType = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const { created_by, ...youtubeLinkdata } = req.body
        const data = await InstituteYoutubeLinkType.create({
            ...youtubeLinkdata,
            created_by: userId
        })
        return res.status(200).json({
            message: "Youtube Link Type created",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getAllYoutubeLinkType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const { rows: data, count } = await InstituteYoutubeLinkType.findAndCountAll({
            limit,
            offset
        })
        return res.status(200).json({
            message: "Youtube link type retrieved",
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

export const getYoutubeLinkTypeById = async (req, res) => {
    try {
        const youtubeLinkType = await InstituteYoutubeLinkType.findByPk(req.params.id)
        if (!youtubeLinkType) {
            return res.status(404).json({
                message: "youtubeLink type not found"
            });
        }
        return res.status(200).json({
            message: "youtubeLink type retrieved",
            data: youtubeLinkType
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const updateYoutubeLinkType = async (req, res) => {
    try {
        const data = await InstituteYoutubeLinkType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.update(req.body)
        return res.status(200).json({
            message: "youtubeLink type updated",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}

export const deleteYoutubeLinkType = async (req, res) => {
    try {
        const data = await InstituteYoutubeLinkType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.destroy()
        return res.status(200).json({
            message: "youtubeLink type deleted",
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}