const initialCards = [
  {
    title: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
const validator_config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
const api_config ={
  url: "https://around.nomoreparties.co/v1/cohort-3-en",
  authorization:"47e379fa-558c-4eb9-b8db-66ce53bf3802"

}

const ELEMENTS_SELECTOR = ".elements";
const CARD_TEMPLATE_SECLECTOR = "#card-template";
const PROFILE_NAME_SELECTOR = ".profile-info__name";
const PROFILE_DESCRIPTION = ".profile-info__description";
const PROFILE_AVATAR_SELECTOR = ".profile__avatar"
const CARD_FORM_POPUP = ".popup_type_card";
const PROFILE_FORM_POPUP = ".popup_type_edit";
const IMAGE_POPUP_SELECTOR = ".popup_type_image";
const DELETE_CONFIRM_POPUP_SELECTOR = ".popup_type_delete";

const cardForm = document.querySelector(".form_type_card");
const addCardBtn = document.querySelector(".profile__add-btn");



const formProfileElement = document.querySelector(".form_type_edit");
const profileFormEditBtn = document.querySelector(".profile-info__edit-button");

const profileName = document.querySelector(".profile-info__name");
const profileDescription = document.querySelector(".profile-info__description");

const MY_ID="339bdd3f46e607bf2c8e6140";
export {
  initialCards,
  validator_config,
  ELEMENTS_SELECTOR,
  CARD_TEMPLATE_SECLECTOR,
  PROFILE_DESCRIPTION,
  PROFILE_NAME_SELECTOR,
  CARD_FORM_POPUP,
  PROFILE_FORM_POPUP,
  IMAGE_POPUP_SELECTOR,
  cardForm,
  addCardBtn,
  formProfileElement,
  profileFormEditBtn,
  profileDescription,
  profileName,
  api_config,
  PROFILE_AVATAR_SELECTOR,
  DELETE_CONFIRM_POPUP_SELECTOR,
  MY_ID
};
