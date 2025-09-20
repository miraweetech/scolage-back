import { MediaType } from "../models/index.js";

export const createMediaType = async (req, res) => {
    try {
        const mediaTypeData = req.body;

        const newMediaType = await MediaType.create(mediaTypeData);

        return res.status(201).json({
            message: "Media type created",
            data: newMediaType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllMediaType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: data, count } = await MediaType.findAndCountAll({
            limit,
            offset
        });
        return res.status(200).json({
            message: "Media types retrieved",
            data,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit

        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMediaTypeById = async (req, res) => {
    try {
        const mediaType = await MediaType.findByPk(req.params.id);
        if (!mediaType) {
            return res.status(404).json({
                message: "Media type not found"
            });
        }
        return res.status(200).json({
            // message: "Email type retrieved",
            data: mediaType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMediaType = async (req, res) => {
    try {
        const mediaType = await MediaType.findByPk(req.params.id);
        if (!mediaType) {
            return res.status(404).json({
                message: "Media type not found"
            });
        }
        await mediaType.update(req.body);
        return res.status(200).json({
            message: "Media type updated",
            data: mediaType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMediaType = async (req, res) => {
    try {
        const mediaType = await MediaType.findByPk(req.params.id);
        if (!mediaType) {
            return res.status(404).json({
                message: "Media type not found"
            });
        }
        await mediaType.destroy();
        return res.status(200).json({
            message: "Media type deleted"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};