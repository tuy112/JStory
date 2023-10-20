const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const { Cmts } = require('../models');
const { Op } = require('sequelize');

// 댓글 목록 조회 API (GET)
router.get('/posts/:postId/cmts', async (req, res) => {
  const cmts = await Cmts.findAll({
    attributes: ['cmtId', 'postId', 'content', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']]
  });

  return res.status(200).json({ data: cmts });
});

// 댓글 작성 API (POST)
router.post('/posts/:postId/cmts', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  const { content } = req.body;

  const cmt = await Cmts.create({
    userId: userId,
    postId: postId,
    content: content
  });

  return res.status(201).json({ data: cmt });
});

// 댓글 수정 API (PUT)
router.put('/posts/cmts/:cmtId', authMiddleware, async (req, res) => {
  const { cmtId } = req.params;
  const { userId } = res.locals.user;
  const { content } = req.body;

  const cmt = await Cmts.findOne({ where: { cmtId } });
  if (!cmt) {
    return res.status(404).json({ message: '해당 댓글이 존재하지 않습니다.' });
  } else if (cmt.userId !== userId) {
    // 404 => 403
    return res.status(403).json({ message: '권한이 없습니다.' });
  }

  await Cmts.update(
    { content },
    {
      where: {
        [Op.and]: [{ cmtId }, { userId }]
      }
    }
  );
  return res.status(200).json({ data: '댓글이 수정되었습니다.' });
});

// 댓글 삭제 API (DELETE)
router.delete('/posts/cmts/:cmtId', authMiddleware, async (req, res) => {
  const { cmtId } = req.params;
  const { userId } = res.locals.user;
  const { content } = res.req.body;

  const cmt = await Cmts.findOne({ where: { cmtId } });
  if (!cmt) {
    return res.status(404).json({ message: '해당 댓글이 존재하지 않습니다.' });
  } else if (cmt.userId !== userId) {
    // 404 => 403
    return res.status(403).json({ message: '권한이 없습니다.' });
  } else if (cmt.content !== content) {
    return res.status(401).json({ message: '내용이 일치하지 않습니다.' });
  }

  await Cmts.destroy({
    where: {
      [Op.and]: [{ cmtId }, { userId }]
    }
  });
  return res.status(200).json({ data: '댓글이 삭제되었습니다.' });
});

module.exports = router;