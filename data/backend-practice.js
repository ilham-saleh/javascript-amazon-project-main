const xhr = new XMLHttpRequest();

xhr.addEventListener("load", function () {
  console.log("Response received:", xhr.response);
});

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
xhr.send();
