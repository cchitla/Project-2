let guncontrol = document.getElementById("guncontrol");
let vaccines = document.getElementById("vaccines");
let flatearth = document.getElementById("flatearth");

var socket = io.connect("https://new-scrap.herokuapp.com/main");

socket.emit("get all connected");
socket.on("get all connected", data => {
  guncontrol.innerHTML = `<span>${data.guncontrol}</span>`;
  vaccines.innerHTML = `<span>${data.vaccines}</span>`;
  flatearth.innerHTML = `<span>${data.flatearth}</span>`;
});

getConnected();
setInterval(getConnected, 1500);

function getConnected() {
  socket.emit("get all connected");
}
