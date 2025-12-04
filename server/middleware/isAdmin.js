import User from "../models/User.js";

export async function isAdmin(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).send({ message: "Not authorized" });

    const user = await User.findById(userId);
    if (!user) return res.status(401).send({ message: "User not found" });

    if (user.role !== "admin")
      return res.status(403).send({ message: "Admin only" });

    req.currentUser = user;
    next();
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
