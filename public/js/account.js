let btn = document.getElementById("view-post-btn");

let postDisplay = document.getElementById("postDisplay");

btn.addEventListener("click", event => {
  event.preventDefault();

  $.get("api/userposts", data => {
    for (let i = 0; i < data.length; i++) {
      postDisplay.innerHTML += `<p>${data[i].Message}</p>`;
    }
  });
});
