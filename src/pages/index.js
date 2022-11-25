import "./index.css";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
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
  formProfileElement,
  profileFormEditBtn,
  profileDescription,
  profileName,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

const profieFormValidator = new FormValidator(config, formProfileElement);
const cardFormValidator = new FormValidator(config, cardForm);
const imagePopup = new PopupWithImage(IMAGE_POPUP_SELECTOR);
const profileFormPopup = new PopupWithForm(
  {
    handleFormSubmit: (evt, data) => {
      evt.preventDefault();
      profileInfoElement.setUserInfo({
        name: data.name,
        job: data.description,
      });
      profileFormPopup.close();
    },
  },
  PROFILE_FORM_POPUP
);
const cardFormPopup = new PopupWithForm(
  {
    handleFormSubmit: (evt, data) => {
      evt.preventDefault();
      cardSection.addItem({title: data.place, link: data.link});
      cardFormPopup.close();
    },
  },
  CARD_FORM_POPUP
);

function createCard (card){
  const cardObj = new Card(
    {
      data: card,
      handleImageClick: (data) => {
        imagePopup.open({ name: data.title, link: data.link });
      },
    },
    CARD_TEMPLATE_SECLECTOR
  );
  return cardObj;
}
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const cardObj = createCard(card);
      const cardElement = cardObj.generateCard();
      return cardElement;
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
  profileFormPopup.setInputValues({name: temp.name, description: temp.job});
  profieFormValidator.resetValidation();
  profileFormPopup.open();
});
cardSection.renderItems();
profieFormValidator.enableValidation();
cardFormValidator.enableValidation();
