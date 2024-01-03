// PENDING TO CHECK THE REQUIRED CONNECTION WITH THR MODELS AND ANY INCONVENIENCE WITH THE VARIABLE NAMES.
const router = require('express').Router();
const { Post, User } = require('../models');
const middleAuth = require('../utils/authentication');
const { route } = require('./api');

// Route to get all posts on homescreen with or without being logged
router.get('/', async (req, res) => {
 try {
  // Get all posts and JOIN with user data
  const postsData = await Post.findAll({
   include: [
    {
     model: User,
     attributes: ['name'],
    },
   ],
  });

  // Serialize data so the template con read it
  const posts = postsData.map((posts) => posts.get({ plain: true }));

  // Pass serialized data and session flag into template
  res.render('homepage', {
   posts,
   loggedIn: req.session.loggedIn
  });
 } catch (err) {
  res.status(500).json(err);
 }
});

// Route to view an specific post
router.get('/post/:id', async (req, res) => {
 try {
  const postData = await Post.findByPk(req.params.id, {
   include: [
    {
     model: User,
     attributes: ['name'],
    },
   ],
  });

  const post = postData.get({ plain: true });

  res.render('post', {
   ...post,
   loggedIn: req.session.loggedIn
  });
 } catch (err) {
  res.status(500).json(err);
 }
});

// Use middleware to prevent access to route
router.get('/profile', middleAuth, async (req, res) => {
 try {
  // Find the logged in user based on the session ID
  const userInfo = await User.findByPk(req.session.user_id, {
   attributes: { exclude: ['password'] },
   include: [{ model: Post }],
   //CHECK ON ABOVE SYNTAX
  });

  const user = userInfo.get({ plain: true });

  res.render('profile', {
   ...user,
   loggedIn: true
  });
 } catch (err) {
  res.status(500).json(err);
 }
});

router.get('/login', (req, res) => {
 // If the user is already logged in, redirect the request to another route
 if (req.session.loggedIn) {
  res.redirect('/profile');
  return;
 }

 res.render('login');
});

module.exports = router;