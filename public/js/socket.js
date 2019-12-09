export function socketio() {
  let message = document.getElementById("message");
  let displayName = document.getElementById("displayName");
  let btn = document.getElementById("send");
  let output = document.getElementById("output");
  let chatWindow = document.getElementById("chat");
  let feedback = document.getElementById("feedback");
  let currentUsers = document.getElementById("current-users");
  let pageName = document.getElementById("page-info").className;
  let pageURL = window.location.href;
  console.log(pageURL, window.location.pathname, window.location.hostname);
  console.log(window.location.protocol);

  var socket = io.connect(`http://localhost:3000/${pageName}`);
  // var socket = io.connect(`https://new-scrap.herokuapp.com/${pageName}`);

  socket.emit("retrieve messages");
  socket.on("send db messages", data => {
    displayMessage(data);
  });

  socket.emit("get connected users");
  socket.on("get connected users", data => {
    if (data > 1) {
      currentUsers.innerHTML = `<span>${data} users currently here.</span>`;
    } else {
      currentUsers.innerHTML = "<span>You are the only one here.</span>";
    }
  });

  //emit event to send messsage
  btn.addEventListener("click", event => {
    event.preventDefault();

    //event emitter takes in name of event, then object of message data
    socket.emit("chat message", {
      message: message.value,
      displayName: displayName.value
    });

    let postData = {
      ChatRoom: pageName,
      Message: message.value,
      Username: displayName.value
    };

    $.post("/api/posts", postData, function() {
      console.log("completed");
    });

    message.value = "";
  });

  //listening to keypresses in message area and sending typing event to server
  message.addEventListener("keypress", () => {
    socket.emit("typing", displayName.value);
  });

  //listening for incoming typing event from server
  socket.on("typing", data => {
    feedback.innerHTML = `<p><em>${data} is typing... </em></p>`;
    setTimeout(clearFeedback, 1000);
  });

  //listening for incoming chat message from server
  socket.on("chat message", data => {
    //output data to DOM
    output.innerHTML += `<p><strong>${data.displayName}: </strong> ${data.message}</p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
  });

  // function to clear typing message (is called on a setTimeout)
  const clearFeedback = () => {
    feedback.innerHTML = "";
  };

  //api routes
  function getPosts(pageName) {
    $.get(`/api/posts/${pageName}`, function(data) {
      displayMessage(data);
    });
  }
  getPosts(pageName);

  const displayMessage = data => {
    data.forEach(element => {
      output.innerHTML += `<p><strong>${element.Username}: </strong> ${element.Message}</p>`;
    });
  };
}
