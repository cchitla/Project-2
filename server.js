/* eslint-disable prettier/prettier */
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  let server = app.listen(PORT, function() {
    console.log(
      `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
    );
  });

  const socket = require("socket.io");
  const io = socket(server);

  //arrays to hold connected users and number of connections
  let guncontrolConnections = [];
  let flatearthConnections = [];
  let vaccineConnections = [];

  io.of("/guncontrol").on("connection", socket => {
    guncontrolConnections.push(socket);
    console.log("Connection made: %s connected @ Politics", guncontrolConnections.length);

    socket.on("disconnect", () => {
      guncontrolConnections.splice(guncontrolConnections.indexOf(socket), 1);
      console.log("Disconnection: %s connected @ Politics", guncontrolConnections.length);
    });

    // listening to typing from connected client sockets, and sending out to other sockets
    socket.on("typing", data => {
      socket.broadcast.emit("typing", data);
    });

    // listening to incoming messages from client sockets, sending out message data to other sockets
    socket.on("chat message", data => {
      socket.emit("chat message", data);
      socket.broadcast.emit("chat message", data);
    });
  });

  io.of("/vaccines").on("connection", socket => {
    vaccineConnections.push(socket);
    console.log("Connection made: %s connected @ Vaccines", vaccineConnections.length);

    socket.on("disconnect", () => {
      vaccineConnections.splice(vaccineConnections.indexOf(socket), 1);
      console.log("Disconnection: %s connected @ Vaccines", vaccineConnections.length);
    });

    // listening to typing from connected client sockets, and sending out to other sockets
    socket.on("typing", data => {
      socket.broadcast.emit("typing", data);
    });

    // listening to incoming messages from client sockets, sending out message data to other sockets
    socket.on("chat message", data => {
      socket.emit("chat message", data);
      socket.broadcast.emit("chat message", data);
    });
  });

  io.of("/flatearth").on("connection", socket => {
    flatearthConnections.push(socket);
    console.log("Connection made: %s connected @ Flat Earth", flatearthConnections.length);

    socket.on("disconnect", () => {
      flatearthConnections.splice(flatearthConnections.indexOf(socket), 1);
      console.log("Disconnection: %s connected @ Flat Earth", flatearthConnections.length);
    });

    // listening to typing from connected client sockets, and sending out to other sockets
    socket.on("typing", data => {
      socket.broadcast.emit("typing", data);
    });

    // listening to incoming messages from client sockets, sending out message data to other sockets
    socket.on("chat message", data => {
      socket.emit("chat message", data);
      socket.broadcast.emit("chat message", data);
    });
  });


  //DONT DELETE THIS
});

// Routes
const authRoutes = require("./controller/auth-controller");
const userRoutes = require("./controller/user-controller");
const chatRoutes = require("./controller/chats-controller");
// eslint-disable-next-line no-unused-vars
const apiRoutes = require("./controller/api-controller")(app);
app.use(authRoutes);
app.use(userRoutes);
app.use(chatRoutes);
