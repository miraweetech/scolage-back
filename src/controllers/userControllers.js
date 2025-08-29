import { User } from "../models/index.js";

// Create User
export const createUser = async (req, res) => {
    try {
        const { emergency_code, email, mobile } = req.body;

        const user = await User.create({
            emergency_code,
            email,
            mobile,
            last_login: new Date()
        });

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// Get User By ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [updated] = await User.update(
            { ...req.body, modified_at: new Date() },
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByPk(id);

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await User.destroy({
            where: { id }
        });

        if (!deleted) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
