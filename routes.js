module.exports = function(app, passport) {

    app.get('/', function(req, res){
      res.render('index', { user: req.user });
    });

    app.get('/account', ensureAuthenticated, function(req, res){
      res.render('account', { user: req.user });
    });

    app.get('/auth/steam',
      passport.authenticate('steam', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });

    app.get('/auth/steam/return',
      passport.authenticate('steam', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.redirect('/login')
    }

};
