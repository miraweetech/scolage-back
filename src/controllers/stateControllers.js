import { StateList } from "../models/index.js";

export const createState = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: no user ID" });
        }

        const { created_by, ...stateData } = req.body;

        const newState = await StateList.create({
            ...stateData,
            created_by: userId  
        });

        return res.status(201).json({ message: "State created", data: newState });
    } catch (error) {
        console.error("Error creating state:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllState = async (req, res) => {
    try {
        const states = await StateList.findAll();
        return res.json({ data: states });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getStateById = async (req, res) => {
    try {
        const state = await StateList.findByPk(req.params.id);
        if (!state) {
            return res.status(404).json({ error: "State not found" });
        }
        return res.json({ data: state });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateState = async (req, res) => {
    try {
        const state = await StateList.findByPk(req.params.id);
        if (!state) {
            return res.status(404).json({ error: "State not found" });
        }
        await state.update(req.body);
        return res.json({ message: "State updated", data: state });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteState = async (req, res) => {
    try {
        const state = await StateList.findByPk(req.params.id);
        if (!state) {
            return res.status(404).json({ error: "State not found" });
        }
        await state.destroy();
        return res.json({ message: "State deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}