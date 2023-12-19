const router = require('express').Router();
const { User } = require('../../models');

// NEW USER ROUTE
router.post('/', async (req, res) => {
 try {
  const userInfo = await User.create(req.body);
  req.session.save(() => {
   req.session.user_id = userInfo.id;
   req.session.loggedIn = true;

   res.status(200).json(userInfo);
  });
 } catch (err) {
  res.status(400).json(err);
 }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
 try {
  const userInfo = await User.findOne({ where: { email: req.body.email } });
  // EMAIL VALIDATION
  if (!userInfo) {
   res
    .status(400)
    .json({ message: 'Incorrect email or password, please try again' });
   return;
  }
  // PASSWORD VALIDATION
  const correctPassword = await userInfo.checkPassword(req.body.password);

  if (!correctPassword) {
   res
    .status(400)
    .json({ message: 'Incorrect email or password, please try again' });
   return;
  }

  req.session.save(() => {
   req.session.user_id = userInfo.id;
   req.session.loggedIn = true;

   res.json({ user: userInfo, message: 'Login successful' });
  });

 } catch (err) {
  res.status(400).json(err);
 }
});
// LOGOUT ROUTE
router.post('/logout', (req, res) => {
 if (req.session.loggedIn) {
  req.session.destroy(() => {
   res.status(204).end();
  });
 } else {
  res.status(404).end();
 }
});

module.exports = router;