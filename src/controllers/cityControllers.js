import { CityList, StateList } from "../models/index.js";
import { Op } from "sequelize";

export const createCity = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: no user ID" });
        }
        const { created_by, ...stateData } = req.body;


        const newCity = await CityList.create({
            ...stateData,
            created_by: userId,
            state_id: req.body.state_id
        })
        return res.json({ message: "City created", data: newCity });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllCity = async (req, res) => {
    try {
        const { state, state_id } = req.query;

        let whereCondition = {};

        if (state) {
            const stateData = await StateList.findOne({
                where: { name: { [Op.iLike]: `%${state}%` } }
            });

            if (!stateData) {
                return res.status(404).json({ error: "State not found" });
            }

            whereCondition.state_id = stateData.state_id;
        }

        if (state_id) {
            whereCondition.state_id = state_id;
        }

        const cities = await CityList.findAll({
            where: whereCondition,
            include: [
                {
                    model: StateList,
                    as: "state",
                    attributes: ["state_id", "name"],
                }
            ]
        });

        return res.json({ data: cities });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getCityById = async (req, res) => {
    try {
        const city = await CityList.findByPk(req.params.id)
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }
        return res.json({ data: city });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateCity = async (req, res) => {
    try {
        const city = await CityList.findByPk(req.params.id)
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }
        await city.update(req.body);
        return res.json({ message: "City updated", data: city });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteCity = async (req, res) => {
    try {
        const city = await CityList.findByPk(req.params.id)
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }
        await city.destroy();
        return res.json({ message: "City deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}