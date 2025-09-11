import { AreaList, CityList } from "../models/index.js";
import { Op } from "sequelize";

export const createArea = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: no user ID" });
        }
        const { created_by, ...areaData } = req.body;

        const newArea = await AreaList.create({
            ...areaData,
            created_by: userId,
            state_id: req.body.state_id,
            city_id: req.body.city_id
        })
        return res.json({ message: "Area created", data: newArea });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllArea = async (req, res) => {
    try {
        const { city, city_id } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        let whereCondition = {};

        if (city) {
            const cityData = await CityList.findOne({
                where: { name: { [Op.iLike]: `%${city}%` } }
            });

            if (!cityData) {
                return res.status(404).json({ error: "City not found" });
            }

            whereCondition.city_id = cityData.city_id;
        }

        if (city_id) {
            whereCondition.city_id = city_id;
        }

        const { rows: areas, count } = await AreaList.findAndCountAll({
            where: whereCondition,
            include: [
                {
                    model: CityList,
                    as: "city",
                    attributes: ["city_id", "name"],
                }
            ],
            limit,
            offset
        });

        if (!areas.length) {
            return res.status(404).json({ error: "No areas found" });
        }

        return res.json({
            data: areas,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAreaById = async (req, res) => {
    try {
        const area = await AreaList.findByPk(req.params.id)
        if (!area) {
            return res.status(404).json({ error: "Area not found" });
        }
        return res.json({ data: area });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateArea = async (req, res) => {
    try {
        const area = await AreaList.findByPk(req.params.id)
        if (!area) {
            return res.status(404).json({ error: "Area not found" });
        }
        const updatedArea = await area.update(req.body);
        return res.json({ message: "Area updated", data: updatedArea });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteArea = async (req, res) => {
    try {
        const area = await AreaList.findByPk(req.params.id)
        if (!area) {
            return res.status(404).json({ error: "Area not found" });
        }
        await area.destroy();
        return res.json({ message: "Area deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}