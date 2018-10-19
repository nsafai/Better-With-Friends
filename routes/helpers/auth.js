exports.requireLogin = (req, res, next) => {
  console.log(req.originalUrl);
  if(req.session && req.session.user) {
    return next();
  } else {
    let err = new Error('You must sign up or log in to view this page');
    err.status = 401;

    // return res.redirect('/login');
    return res.render('login', { originalUrl: req.originalUrl });
  }
}
