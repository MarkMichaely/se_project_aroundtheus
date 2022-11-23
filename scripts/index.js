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
  cardForm,
  addCardBtn,
  cardFormPlace,
  cardFormLink,
  formProfileElement,
  profileFormEditBtn,
  profileNameInput,
  profileDescription,
  profileJobInput,
  profileName,
} from "./constants.js";
import UserInfo from "./UserInfo.js";

const profieFormValidator = new FormValidator(config, formProfileElement);
const cardFormValidator = new FormValidator(config, cardForm);
const imagePopup = new PopupWithImage(IMAGE_POPUP_SELECTOR);
const profileFormPopup = new PopupWithForm(
  {
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      profileInfoElement.setUserInfo({
        name: profileNameInput.value,
        job: profileJobInput.value,
      });
      profileFormPopup.close();
    },
  },
  PROFILE_FORM_POPUP
);
const cardFormPopup = new PopupWithForm(
  {
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      const cardObj = new Card(
        {
          data: { title: cardFormPlace.value, link: cardFormLink.value },
          handleImageClick: (data) => {
            imagePopup.open({ name: data.title, link: data.link });
          },
        },

        CARD_TEMPLATE_SECLECTOR
      );
      const cardElement = cardObj.generateCard();
      cardSection.addItem(cardElement);
      cardFormPopup.close();
    },
  },
  CARD_FORM_POPUP
);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const cardObj = new Card(
        {
          data: card,
          handleImageClick: (data) => {
            imagePopup.open({ name: data.title, link: data.link });
          },
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

profileInfoElement.setUserInfo({
  name: profileName.textContent,
  job: profileDescription.textContent,
});
addCardBtn.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  cardFormPopup.open();
});
imagePopup.setEventListeners();
cardFormPopup.setEventListeners();
profileFormPopup.setEventListeners();
profileFormEditBtn.addEventListener("click", () => {
  const temp = profileInfoElement.getUserInfo();
  profileNameInput.value = temp.name;
  profileJobInput.value = temp.job;
  profieFormValidator.resetValidation();
  profileFormPopup.open();
});
cardSection.renderItems();
profieFormValidator.enableValidation();
cardFormValidator.enableValidation();
