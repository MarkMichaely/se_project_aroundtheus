import "./index.css";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import API from "../utils/Api.js";
import {
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
  PROFILE_AVATAR_SELECTOR
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

const profieFormValidator = new FormValidator(validator_config, formProfileElement);
const cardFormValidator = new FormValidator(validator_config, cardForm);
const imagePopup = new PopupWithImage(IMAGE_POPUP_SELECTOR);
const profileFormPopup = new PopupWithForm(
  {
    handleFormSubmit: (evt, data) => {
      evt.preventDefault();
      profileInfoElement.setUserInfo({
        name: data.name,
        job: data.description,
      });
      cardsApi.editProfile({
        name: data.name,
        job: data.description
      });
      
      profileFormPopup.close();
    },
  },
  PROFILE_FORM_POPUP
);
const cardFormPopup = new PopupWithForm(
  {
    handleFormSubmit: async (evt, data) => {
      evt.preventDefault();
      await cardsApi.addCard({name:data.place, link: data.link})
      .then(cardSection.addItem({name: data.place, link: data.link}))
      .catch(err=>console.log(err));
      
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
  avatarSelector: PROFILE_AVATAR_SELECTOR,
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

profieFormValidator.enableValidation();
cardFormValidator.enableValidation();


///////////////////////////API////////////////////////////////
const cardsApi = new API(api_config);
cardsApi.getUserInfo().then(res=>
  {const userInfo = {
    name : res.name,
    about : res.about,
    avatar : res.avatar
}
profileInfoElement.setUserInfo({
  name: userInfo.name,
  job: userInfo.about,
  avatar: userInfo.avatar
});

  }).catch(err=>console.log(err));
cardsApi.getInitialCards().then((cards)=>{
  cardSection.renderItems(cards);
}).catch(err=>console.log(err));





///////////////////////////API////////////////////////////////

cardSection.renderItems();