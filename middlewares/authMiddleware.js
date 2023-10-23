// 유저 미들웨어

const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    return res.status(401).json({ errorMessage: "인증 정보가 없습니다." });
  }

  const [tokenType, token] = authorization.split(" ");
  // [배열] 형태임! 중요!

  if (tokenType !== "Bearer" || !token) {
    return res.status(401).json({
      errorMessage: "토큰 타입이 일치하지 않거나, 토큰이 존재하지 않습니다.",
    });
  }

  try {
    // 토큰 검증 및 복호화
    const decodedToken = jwt.verify(token, "customized_secret_key");
    const userId = decodedToken.userId;

    const user = await Users.findOne({ where: { userId: userId } });
    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "토큰에 해당하는 사용자가 존재하지 않습니다." });
    }

    res.locals.user = user; // 전달받은 사용자의 정보를 전부 저장
    next(); // middleware 종료
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errorMessage: "비정상적인 접근입니다." });
  }
};