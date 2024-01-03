// middleware

const middleAuth = (req, res, next) => {
 //if the user isn't logged in they will be automatically redirected to the login route
 if (!req.session.loggedIn) {
  response.redirect('/login');
 } else {
  next();
 }
};

module.exports = middleAuth; 