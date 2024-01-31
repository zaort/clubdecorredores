const router = require('express').Router();
const { Comment } = require('../../models');
const middleAuth = require('../../utils/authentication');

// POST route to ctreate a comment
// How do we know which comments can be deleted by that user, with id but where does the logic ad connections should be?

router.post('/', middleAuth, async (req, res) => {
 console.log("created comment");
 try {
  const newPostComment = await Comment.create({
   ...req.body,
   user_id: req.session.user_id,
  });

  res.status(200).json(newPostComment);
 } catch (err) {
  console.log(err);
  res.status(400).json(err);
 }
});

// ROUTE TO DELETE A comment
router.delete('/:id', middleAuth, async (req, res) => {
 try {
  const commentData = await Comment.destroy({
   where: {
    id: req.params.id,
    user_id: req.session.user_id,
   },
  });

  if (!commentData) {
   res.status(400).json({ message: 'No comment found with this id!' });
   return;
  }

  res.status(200).json(commentData);
 } catch (err) {
  res.status(500).json(err);
 }
});

module.exports = router;

