const navbutton = document.querySelector("#ham-btn");
const navBar = document.querySelector('#nav-bar');

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navBar.classList.toggle("show");
});

const openButton = document.querySelector("#btn-all");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");

openButton.addEventListener("click", () => {
    dialogBox.showModal();
});

closeButton.addEventListener("click", () => {
  dialogBox.close();
});