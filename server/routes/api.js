const express = require("express");
const router = express.Router();
const user = require("../mock/user");
const login = require("../mock/login");
const upload = require("../utils/upload");

router.get("/User/UserInfo", async (req, res, next) => {
  let result = await login.getUserInfo(req);
  res.json(result);
});
router.get("/User/UserList", async (req, res, next) => {
  let result = await login.getUserList(req);
  res.json(result);
});
router.get("/User/GetRole", async (req, res, next) => {
  let result = await user.getRole(req);
  res.json(result);
});
router.get("/User/getEditorList", async (req, res, next) => {
  let result = await user.getEditorList(req);
  res.json(result);
});

router.post("/Login/UserLogin", async (req, res, next) => {
  let result = await login.loginByUsername(req);
  res.json(result);
});
router.post("/User/DeleteEditor", async (req, res, next) => {
  let result = await user.deleteEditor(req);
  res.json(result);
});
router.post("/User/DeleteUser", async (req, res, next) => {
  let result = await login.deleteUser(req);
  res.json(result);
});
router.post("/User/AddEditor", async (req, res, next) => {
  console.log("[/User/AddEditor]", req.body);
  let result = await user.addEditor(req);
  res.json(result);
});
router.post("/User/RewriteEditor", async (req, res, next) => {
  let result = await user.rewriteEditor(req);
  res.json(result);
});
router.post("/User/RewriteUser", async (req, res, next) => {
  let result = await login.rewriteUser(req);
  res.json(result);
});
router.post("/User/AddUser", async (req, res, next) => {
  let result = await login.addUser(req);
  res.json(result);
});

router.get("/upload/qiniu_token", async (req, res, next) => {
  res.json({
    success: true,
    data: {
      token: upload.getToken()
    }
  });
});

router.get("/upload/del_qiniu", async (req, res, next) => {
  if (!req.query.key) {
    res.json({
      success: false,
      message: "key is required!"
    });
    return;
  }
  let result = await upload.delItem(req.query.key);
  res.json(result);
});

module.exports = router;
