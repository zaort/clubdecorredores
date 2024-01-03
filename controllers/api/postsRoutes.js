const router = require('express').Router();
const { Post } = require('../../models');
const middleAuth = require('../../utils/authentication');

// POST route to ctreatr a post/article
// Do we need separete logic for articles? And why is this requesting body? is that the infomation entered by the user on the create post form?

router.post('/', middleAuth, async (req, res) => {
 try {
  const newBlogPost = await Post.create({
   ...req.body,
   user_id: req.session.user_id,
  });

  res.status(200).json(newBlogPost);
 } catch (err) {
  res.status(400).json(err);
 }
});

// ROUTE TO DELETE A POST/ARTICLE
router.delete('/:id', middleAuth, async (req, res) => {
 try {
  const postData = await Post.destroy({
   where: {
    id: req.params.id,
    user_id: req.session.user_id,
   },
  });

  if (!postData) {
   res.status(400).json({ message: 'No post found with this id!' });
   return;
  }

  res.status(200).json(postData);
 } catch (err) {
  res.status(500).json(err);
 }
});

module.exports = router;

