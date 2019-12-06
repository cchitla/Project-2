var socket = io.connect("https://scrap-room.herokuapp.com/guncontrol");

let message = document.getElementById("message");
let displayName = document.getElementById("displayName");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let chatWindow = document.getElementById("chat");
let feedback = document.getElementById("feedback");

//emit event to send messsage
btn.addEventListener("click", event => {
  event.preventDefault();

  //event emitter takes in name of event, then object of message data
  socket.emit("chat message", {
    message: message.value,
    displayName: displayName.value
  });
});

//listening to keypresses in message area and sending typing event to server
message.addEventListener("keypress", () => {
  socket.emit("typing", displayName.value);
});

/*
//
////

Stuff below is listening to events sent from the server

////
//
*/

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
