var db = require("../models");

module.exports = function(app) {
  app.get("/api/posts/:ChatRoom", (req, res) => {
    db.Posts.findAll({
      where: {
        ChatRoom: req.params.ChatRoom
      }
    }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
};
