const passport = require("passport");
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const router = express.Router();

// Flash
router.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "wootwoot"
  })
);
router.use(flash());

// Passport
require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

router.get("/", function(req, res) {
  if (req.user) {
    console.log(req.user.dataValues.email);
    res.render("index", {
      user: req.user
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/login", function(req, res) {
  res.render("login", { message: req.flash("error") });
});

///////////////////////////////////////////////////////////////////////

router.get("/guncontrol", (req, res) => {
  if (req.user) {
    res.render("guncontrol", {
      user: req.user,
      online: 5
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/vaccines", (req, res) => {
  if (req.user) {
    res.render("vaccines", {
      user: req.user,
      online: 1
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/flatearth", (req, res) => {
  if (req.user) {
    res.render("flatearth", {
      user: req.user,
      online: 8
    });
  } else {
    res.redirect("/login");
  }
});

///////////////////////////////////////////////////////////////////////

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/signup", function(req, res) {
  res.render("signup", { message: req.flash("error") });
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("*", function(req, res) {
  res.render("404");
});

module.exports = router;
