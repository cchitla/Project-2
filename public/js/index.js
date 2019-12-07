// stuff
$(document).ready(function(){

let chatRoom = document.getElementById("page-info").className;


function getPosts(chatRoom){
$.get(`api/posts/${chatRoom}`,function(data){
console.log(data);


})

}



})