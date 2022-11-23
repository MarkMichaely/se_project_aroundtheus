import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import Card from "./Card.js";
// import { openPopup, closePopup } from "./utils.js";
import {
  initialCards,
  config,
  ELEMENTS_SELECTOR,
  CARD_TEMPLATE_SECLECTOR,
  PROFILE_DESCRIPTION,
  PROFILE_NAME_SELECTOR,
  CARD_FORM_POPUP,
  PROFILE_FORM_POPUP,
  IMAGE_POPUP_SELECTOR,
} from "./constants.js";
import UserInfo from "./UserInfo.js";

const cardForm = document.querySelector(".form_type_card");
const addCardBtn = document.querySelector(".profile__add-btn");

const cardFormPlace = document.querySelector(".form__input_type_place");
const cardFormLink = document.querySelector(".form__input_type_link");

const formProfileElement = document.querySelector(".form_type_edit");
const profileFormEditBtn = document.querySelector(".profile-info__edit-button");
const profileNameInput = document.querySelector(".form__input_type_name");
const profileJobInput = document.querySelector(".form__input_type_description");
const profileName = document.querySelector(".profile-info__name");
const profileDescription = document.querySelector(".profile-info__description");

const profieFormValidator = new FormValidator(config, formProfileElement);
const cardFormValidator = new FormValidator(config, cardForm);
const imagePopup = new PopupWithImage(IMAGE_POPUP_SELECTOR);
const profileFormPopup = new PopupWithForm(
  PROFILE_FORM_POPUP,
  handleProfileFormSubmit
);
const cardFormPopup = new PopupWithForm(CARD_FORM_POPUP, handleCardSubmit);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const cardObj = new Card(
        {
          data: card,
          handleImageClick,
        },
        CARD_TEMPLATE_SECLECTOR
      );
      const cardElement = cardObj.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ELEMENTS_SELECTOR
);
const profileInfoElement = new UserInfo({
  nameSelector: PROFILE_NAME_SELECTOR,
  jobSelector: PROFILE_DESCRIPTION,
});

function handleAddCardClick() {
  cardFormValidator.resetValidation();
  cardFormPopup.open();
}
function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardObj = new Card(
    {
      data: { title: cardFormPlace.value, link: cardFormLink.value },
      handleImageClick,
    },

    CARD_TEMPLATE_SECLECTOR
  );
  const cardElement = cardObj.generateCard();
  cardSection.addItem(cardElement);
  cardFormPopup.close();
}

function handleEditButtonClick() {
  const temp = profileInfoElement.getUserInfo();
  profileNameInput.value = temp.name;
  profileJobInput.value = temp.job;
  profieFormValidator.resetValidation();
  profileFormPopup.open();
}
function handleImageClick() {
  imagePopup.setEventListeners();
  imagePopup.open({ name: this._text, link: this._link });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileInfoElement.setUserInfo({
    name: profileNameInput.value,
    job: profileJobInput.value,
  });
  profileFormPopup.close();
}
profileInfoElement.setUserInfo({
  name: profileName.textContent,
  job: profileDescription.textContent,
});
addCardBtn.addEventListener("click", handleAddCardClick);
cardFormPopup.setEventListeners();
profileFormPopup.setEventListeners();
profileFormEditBtn.addEventListener("click", handleEditButtonClick);
cardSection.renderItems();
profieFormValidator.enableValidation();
cardFormValidator.enableValidation();
