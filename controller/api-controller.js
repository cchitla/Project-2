var db = require("../models");

module.exports = function(app) {
  app.get("/api/posts/:ChatRoom", function(request, response) {
    db.Posts.findAll({
      where: {
        ChatRoom: request.params.ChatRoom
      }
    }).then(function(dbPosts) {
      response.json(dbPosts);
    });
  });
};