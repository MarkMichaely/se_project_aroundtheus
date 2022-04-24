let hearts = document.querySelectorAll(".card__like-btn");
function changeLikeStatus() {
  hearts[0].classList.toggle("card__like-btn-filled");
}

for (let index = 0; index < hearts.length; index++) {
  hearts[index].addEventListener("click", function () {
    hearts[index].classList.toggle("card__like-btn-filled");
  });
}
