import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openPopup, closePopup } from "./utils.js";

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

const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
const cardPopup = document.querySelector(".popup_type_card");
const cardForm = document.querySelector(".form_type_card");
const imagePopupTitle = document.querySelector(".popup__card-title");
const imagePopupImage = document.querySelector(".popup__card-image");
const addCardBtn = document.querySelector(".profile__add-btn");
const elements = document.querySelector(".elements");
const CARD_TEMPLATE_SECLECTOR = "#card-template";
const cardFormPlace = document.querySelector(".form__input_type_place");
const cardFormLink = document.querySelector(".form__input_type_link");
const imagePopup = document.querySelector(".popup_type_image");

const editPopup = document.querySelector(".popup_type_edit");
const formProfileElement = document.querySelector(".form_type_edit");
const profileFormEditBtn = document.querySelector(".profile-info__edit-button");
const profileNameInput = document.querySelector(".form__input_type_name");
const profileJobInput = document.querySelector(".form__input_type_description");
const profileName = document.querySelector(".profile-info__name");
const profileDescription = document.querySelector(".profile-info__description");

const editFormElement = new FormValidator(
  config,
  document.querySelector(".form_type_edit")
);
const cardFormElement = new FormValidator(config, cardForm);
function addCard(card) {
  const cardObj = new Card(card, CARD_TEMPLATE_SECLECTOR, handleImageClick);
  const cardElement = cardObj.generateCard();
  createCard(cardElement);
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
  cardFormElement._toggleButtonState(
    Array.from(cardPopup.querySelectorAll(".form__input"))
  );
  openPopup(cardPopup);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  addCard({ title: cardFormPlace.value, link: cardFormLink.value });
  closePopup(cardPopup);
}

function handleEditButtonClick() {
  fillProfileForm();
  openPopup(editPopup);
}
function handleImageClick(card) {
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.title;
  imagePopupTitle.textContent = card.title;
  openPopup(imagePopup);
}

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;

  closePopup(editPopup);
}

addCardBtn.addEventListener("click", handleAddCardClick);
cardForm.addEventListener("submit", handleCardSubmit);
formProfileElement.addEventListener("submit", handleProfileFormSubmit);
profileFormEditBtn.addEventListener("click", handleEditButtonClick);
initCards();

editFormElement.enableValidation();
cardFormElement.enableValidation();
