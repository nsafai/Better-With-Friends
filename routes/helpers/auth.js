exports.requireLogin = (req, res, next) => {
  console.log("The following URL is requesting a login: " + req.originalUrl);
  if (req.session && req.session.user) {
    return next();
  } else {
    let err = new Error('You must sign up or log in to view this page');
    err.status = 401;
    console.log("REQ BELOW:");
    // console.log(req.body);
    // return res.redirect('/login');

    let referrer = req.header('Referer');
    console.log("REFERRER IS: " + referrer);
    if (referrer.endsWith("/events/new")) {
      console.log("Someone who is not logged in is trying to create an event!");
      let eventDetails = req.body;
      return res.render('login', {
        destinationUrl: referrer,
        reasonForLogin: req.body.reasonForLogin,
        eventDetails: eventDetails
      });
    } else if (referrer == null) {
      return res.render('login', {
        destinationUrl: req.body.originalUrl,
        reasonForLogin: req.body.reasonForLogin
      });
    } else {
      return res.render('login', {
        destinationUrl: referrer,
        reasonForLogin: req.body.reasonForLogin
      });
    }
  }
}
