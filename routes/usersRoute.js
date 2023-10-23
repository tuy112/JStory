const express = require("express");
const jwt = require("jsonwebtoken");

const { Users } = require("../models");
const router = express.Router();

// 1. 회원가입 API [POST]
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password, passwordConfirm } = req.body;

  const validEmailCheck = (string) => {
    const pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/;
    return pattern.test(string);
  };

  if (!validEmailCheck(email) || email.length < 3) {
    return res
      .status(400)
      .json({ errorMessage: "이메일의 형식이 올바르지 않습니다." });
  }

  if (!password || password < 4) {
    return res
      .status(412)
      .json({ errorMessage: "패스워드는 4자이상이어야 합니다." });
  }

  if (password !== passwordConfirm) {
    return res.status(412).json({
      errorMessage:
        "패스워드가 일치하지 않습니다. 패스워드 재입력은 passwordConfirm 입니다.",
    });
  }

  const isExistUser = await Users.findOne({ where: { email: email } });
  if (isExistUser) {
    return res
      .status(412)
      .json({ errorMessage: "이미 존재하는 이메일입니다." });
  }

  try {
    await Users.create({ email, password });
    return res.status(201).json({ message: "유저가 등록되었습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "유저 등록 과정에서 오류가 발생하였습니다." });
  }
});

// 2. 로그인 API [POST]
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const userCheck = await Users.findOne({
    where: { email: email },
  });

  if (!userCheck) {
    return res
      .status(401)
      .json({ errorMessage: "해당하는 사용자가 존재하지 않습니다." });
  } else if (userCheck.password !== password) {
    return res
      .status(401)
      .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
  }

  try {
    // JWT 생성
    const token = jwt.sign(
      {
        userId: userCheck.userId,
      },
      "customized_secret_key"
      // 필요 시 수정
    );

    // 2. 쿠키 발급
    res.cookie("authorization", `Bearer ${token}`);

    // 3. response
    return res.status(200).json({ message: "사장님 환영합니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "사장님 로그인 과정에 오류가 발생하였습니다." });
  }
});

// 3. 회원 정보 조회 API [GET]
router.get("/userInfoList", async (req, res) => {
  try {
    const userList = await Users.findAll({
      attributes: ["userId", "email", "password", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ data: userList });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "유저 목록 조회 과정에 오류가 발생하였습니다." });
  }
});

router.get("/userInfo/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userInfo = await Users.findOne({
      where: { userId: userId },
      attributes: ["userId", "email", "password", "createdAt"],
    });

    return res.status(200).json({ data: userInfo });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: " 유저 정보 조회 과정에 에러가 발생했습니다." });
  }
});

// 4. 유저 비밀번호 수정 API [PUT]
router.put("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  const userIdToUpdate = await Users.findOne({
    where: { userId: userId },
  });

  if (!userIdToUpdate) {
    return res.status(404).json({ message: "Id를 다시 확인해주세요." });
  }

  try {
    await Users.update({ password: password }, { where: { userId: userId } });
    return res.status(200).json({ message: "유저 정보가 수정되었습니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errorMessage: "유저 정보를 수정하는 과정에 오류가 발생하였습니다.",
    });
  }
});

// 5. 회원 탈퇴 API. [DELETE]
router.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const userIdToDelete = await Users.findOne({
    where: { userId: userId },
  });

  if (!userIdToDelete) {
    return res.status(404).json({ message: "userId를 다시 확인해주세요." });
  }

  try {
    await userIdToDelete.destroy();
    return res.status(200).json({ message: "계정이 삭제되었습니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errorMessage: "계정을 삭제하는 과정에 오류가 발생하였습니다.",
    });
  }
});

module.exports = router;

