exports.requireLogin = (req, res, next) => {
  if(req.session && req.session.user) {
    return next();
  } else {
    let err = new Error('You must sign up or log in to view this page');
    err.status = 401;

    return res.redirect('/signup');
  }
}
