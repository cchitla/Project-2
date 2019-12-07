export function socketio() {
  let message = document.getElementById("message");
  let displayName = document.getElementById("displayName");
  let btn = document.getElementById("send");
  let output = document.getElementById("output");
  let chatWindow = document.getElementById("chat");
  let feedback = document.getElementById("feedback");
  let currentUsers = document.getElementById("current-users");
  let pageName = document.getElementById("page-info").className;

  var socket = io.connect(`http://localhost:3000/${pageName}`);

  socket.emit("retrieve messages");
  socket.on("send db messages", data => {
    displayMessage(data);
  });

  socket.emit("get connected users");
  socket.on("get connected users", data => {
    if (data > 1) {
      currentUsers.innerHTML = `<p>${data} users currently here</p>`;
    } else {
      currentUsers.innerHTML = "<p>You are the only one here.</p>";
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

    message.value = "";
  });

  //listening to keypresses in message area and sending typing event to server
  message.addEventListener("keypress", () => {
    socket.emit("typing", displayName.value);
  });

  //listening for incoming chat message from server
  socket.on("chat message", data => {
    //output data to DOM
    output.innerHTML += `<p><strong>${data.displayName}: </strong> ${data.message}</p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
  });

  //listening for incoming typing event from server
  socket.on("typing", data => {
    feedback.innerHTML = `<p><em>${data} is typing... </em></p>`;
    setTimeout(clearFeedback, 3000);
  });

  // function to clear typing message (is called on a setTimeout)
  const clearFeedback = () => {
    feedback.innerHTML = "";
  };

  const displayMessage = data => {
    data.forEach(element => {
      output.innerHTML += `<p><strong>${element.displayName}: </strong> ${element.message}</p>`;
    });
  };
}
