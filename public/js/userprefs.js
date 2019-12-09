let btnUser = document.getElementById("save-username");
let btnEmail = document.getElementById("save-email");
let btnPassword = document.getElementById("save-password");
let email = document.getElementById("email");
let username = document.getElementById("username");
let password = document.getElementById("password");

btnUser.addEventListener("click", event => {
  event.preventDefault();
  $.ajax({
    method: "PUT",
    url: "/api/updateusernames",
    data: {
      username: username.value
    }
  }).then(() => {
    console.log("update successful");
  });
});

btnEmail.addEventListener("click", event => {
  event.preventDefault();
  $.ajax({
    method: "PUT",
    url: "/api/updateemails",
    data: {
      email: email.value
    }
  }).then(() => {
    console.log("update successful");
  });
});

btnPassword.addEventListener("click", event => {
  event.preventDefault();
  $.ajax({
    method: "PUT",
    url: "/api/updatepasswords",
    data: {
      password: password.value
    }
  }).then(() => {
    console.log("update successful");
  });
});
