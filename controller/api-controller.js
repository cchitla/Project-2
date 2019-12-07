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

  app.post("/api/posts", function(request, response) {
    console.log("sending post to db");
    db.Posts.create({
      ChatRoom: request.body.ChatRoom,
      Author: request.body.Author,
      Message: request.body.Message
    }).then(function(dbPost) {
      response.json(dbPost);
    });
  });
};
