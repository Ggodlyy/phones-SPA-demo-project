const router = require("express").Router();
const { isGuest, isAuth } = require("../middlewares/guards");
const { register, login, logout, getProfile, getUser, uploadAvatar } = require("../services/users");
const mapErrors = require("../utils/mapper");

router.post("/register", isGuest(), async (req, res) => {
  try {
    if (req.body.password.trim() == "" || req.body.email.trim() == "") {
      throw new Error("Email and password are required");
    }

    const result = await register(
      req.body.username.trim().toLowerCase(),
      req.body.email.trim().toLowerCase(),
      req.body.password.trim(),
      req.body.avatar
    );
    res.status(201).json(result);
  } catch (err) {
    console.error(err.message);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    const result = await login(
      req.body.email.trim().toLowerCase(),
      req.body.password.trim()
    );
    res.json(result);
  } catch (err) {
    console.error(err.message);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

router.get("/logout", (req, res) => {
  logout(req.user?.token);
  res.status(204).end();
});

router.get("/profiles/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await getUser(username);
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

router.post("/profile", async (req, res) => {
  try {
    const result = await getProfile(req.body.userId);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

router.post("/avatar", async (req, res) => {
  try {
    const {img, userId} = req.body;
    const result = await uploadAvatar(userId, img);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

module.exports = router;
