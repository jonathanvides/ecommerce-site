const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const {
    createAdmin,
    fetchAdmin,
    fetchAdminByUsername,
    updateAdmin,
    deleteAdmin,
} = require('../controllers/admin.js');

const {
    isAuthenticatedAdmin,
} = require('../middleware/authMiddleware.js');

const router = express('router');

router.post("/", createAdmin); 
router.get("/", fetchAdmin);
router.get("/:id", fetchAdminByUsername);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await fetchAdminByUsername(username);
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;