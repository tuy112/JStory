const express = require("express");
const { Posts } = require("../models");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// 게시글 등록 [POST]
router.post("/posts", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { title, content } = req.body;

  if (!userId) {
    res.status(403).json({ errorMessage: "로그인 후 사용 가능합니다." });
    return;
  }

  if (!title) {
    return res.status(400).json({ errorMessage: "제목을 입력해주세요." });
  }

  if (!content) {
    return res.status(400).json({ errorMessage: "내용을 입력해주세요." });
  }

  try {
    const addPost = await Posts.create({
      title,
      content,
      userId: userId,
    });

    return res.status(201).json({ data: addPost });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "게시글 등록 과정에 오류가 발생하였습니다." });
  }
});

// 게시글 전체 조회 [GET]
router.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.findAll({
      attributes: ["postId", "userId", "title", "content", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ data: posts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "게시글 전제 조회 과정에 오류가 발생하였습니다." });
  }
});

// 게시글 수정 [PUT]
router.put("/posts/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;
  const { title, content } = req.body;
  // const imageUrl = req.file.location;

  try {
    const post = await Posts.findOne({
      where: { postId: postId },
    });
    console.log(post);

    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ errorMessage: "게시글을 수정할 권한이 없습니다." });
    }

    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글를 찾을 수 없습니다." });
    }

    await Posts.update({ title, content }, { where: { postId: postId } });

    return res.status(200).json({ message: "게시글 수정을 완료하였습니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "게시글 수정 과정에 오류가 발생하였습니다." });
  }
});

// 게시글 삭제_DELETE
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;

  try {
    const post = await Posts.findOne({
      where: { postId: postId },
    });
    console.log(post);

    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ errorMessage: "게시글을 삭제할 권한이 없습니다." });
    }

    if (!post) {
      return res.status(404).json({ errorMessage: "메뉴를 찾을 수 없습니다." });
    }

    await Posts.destroy({ where: { postId: postId } });

    return res.status(200).json({ message: "게시글 삭제를 완료하였습니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "게시글 삭제에 실패하였습니다." });
  }
});

module.exports = router;
