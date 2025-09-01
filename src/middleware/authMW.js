import { SuperAdmin, User } from "../models/index.js";

export const authMW = async (req, res, next) => {
    try {
        const { email, mobile } = req.body;
        let user = null;
        let superAdmin = null;

        if (email) {
            user = await User.findOne({ where: { email } });
        } else if (mobile) {
            user = await User.findOne({ where: { mobile } });
        } else {
            return res.status(400).json({ message: "Email or mobile required" });
        }

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        superAdmin = await SuperAdmin.findOne({ where: { created_by: user.id } });

        if (!superAdmin) {
            return res.status(404).json({ message: "SuperAdmin does not exist" });
        }

        req.superAdmin = superAdmin;
        req.user = user;
        next();
    } catch (err) {
        console.error("Auth MW Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
