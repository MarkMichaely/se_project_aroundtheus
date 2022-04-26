const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
const cardPopup = document.querySelector(".popup_type_card");
const cardForm = document.querySelector(".form_type_card");
const imagePopupTitle = document.querySelector(".popup__card-title");
const imagePopupImage = document.querySelector(".popup__card-image");
const addCardBtn = document.querySelector(".profile__add-btn");
const elements = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const closeCardBtn = document.querySelector(".popup__close-btn_type_card");
const cardFormPlace = document.querySelector(".form__input_type_place");
const cardFormLink = document.querySelector(".form__input_type_link");
const imagePopup = document.querySelector(".popup_type_image");
const closePopupImageBtn = document.querySelector(
  ".popup__close-btn_type_image"
);

function handleImageClick(card) {
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.title;
  imagePopupTitle.textContent = card.title;
  openPopup(imagePopup);
}

function addCard(card) {
  let cardElement = renderCard(card);
  createCard(cardElement);
}
function renderCard(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.title;
  const cardElementImg = cardElement.querySelector(".card__image");
  cardElementImg.src = card.link;
  cardElementImg.alt = card.title;
  cardElementImg.addEventListener("click", () => handleImageClick(card));
  cardElement
    .querySelector(".card__like-btn")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-btn-filled");
    });
  cardElement
    .querySelector(".card__delete-btn")
    .addEventListener("click", function (evt) {
      evt.target.parentNode.remove();
    });
  return cardElement;
}
function createCard(cardElement) {
  elements.prepend(cardElement);
}

function initCards() {
  initialCards.forEach((item) => {
    addCard({ title: item.name, link: item.link });
  });
}

function handleAddCardClick() {
  cardForm.reset();
  openPopup(cardPopup);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  addCard(cardFormPlace.value, cardFormLink.value);
  closePopup(cardPopup);
}

addCardBtn.addEventListener("click", handleAddCardClick);
closePopupImageBtn.addEventListener("click", () => closePopup(imagePopup));
closeCardBtn.addEventListener("click", () => closePopup(cardPopup));
cardForm.addEventListener("submit", handleCardSubmit);

initCards();
