let hearts = document.querySelectorAll(".card__like-btn");


for (let index = 0; index < hearts.length; index++) {
  hearts[index].addEventListener("click", function () {
    hearts[index].classList.toggle("card__like-btn-filled");
  });
}
