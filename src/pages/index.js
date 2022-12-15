import "./index.css";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import API from "../components/Api.js";
import {
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
  api_config,
  PROFILE_AVATAR_SELECTOR,
  DELETE_CONFIRM_POPUP_SELECTOR,
  AVATAR_FORM_POPUP,
  avatarFormElement,
  avatarButton
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithButton from "../components/PopupWithButton";

///////////////////////FORM VALIDATION/////////////////////////
const profieFormValidator = new FormValidator(validator_config, formProfileElement);
const cardFormValidator = new FormValidator(validator_config, cardForm);
const avatarFormValidator = new FormValidator(validator_config, avatarFormElement);

profieFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
///////////////////////FORM VALIDATION/////////////////////////

const imagePopup = new PopupWithImage(IMAGE_POPUP_SELECTOR);
const deletionConfirmPopup = new PopupWithButton(
  {
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      cardsApi.removeCard(deletionConfirmPopup.getCardId())
      .then(deletionConfirmPopup.removeCardElement())
      .catch(err=>console.log(err));
      deletionConfirmPopup.close();
    }
  },DELETE_CONFIRM_POPUP_SELECTOR
);
const profileFormPopup = new PopupWithForm(
  {
    handleFormSubmit: (evt, data) => {
      evt.preventDefault();
      profileFormPopup.renderFormLoading(true);
      cardsApi.editProfile({
        name: data.name,
        job: data.description
      })
      .then((res)=> {
        profileInfoElement.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar
        });
      }).catch(err=>console.log(err))
      .finally(()=> profileFormPopup.renderFormLoading(false));
      
      profileFormPopup.close();
    },
  },
  PROFILE_FORM_POPUP
);
const cardFormPopup = new PopupWithForm(
  {
    handleFormSubmit: async (evt, data) => {
      evt.preventDefault();
      cardFormPopup.renderFormLoading(true);
      await cardsApi.addCard({name:data.place, link: data.link})
      .then(res=> cardSection.addItem(res))
      .catch(err=>console.log(err))
      .finally(()=>cardFormPopup.renderFormLoading(false));
      
      cardFormPopup.close();
    },
  },
  CARD_FORM_POPUP
);
const avatarFormPopup = new PopupWithForm(
  {
    handleFormSubmit: async (evt, data) => {
      evt.preventDefault();
      avatarFormPopup.renderFormLoading(true);
      await cardsApi.changeProfilePicture(data.link)
      .then((res)=>{
        profileInfoElement.setUserInfo({
          name:res.name,
        job:res.about,
        avatar: res.avatar
        })
      })
      .catch(err=>console.log(err))
      .finally(()=> avatarFormPopup.renderFormLoading(false));
      avatarFormPopup.close();
    }
  },
  AVATAR_FORM_POPUP
);

function createCard (card){
  const temp=profileInfoElement.getUserInfo();
  const cardObj = new Card(
    {
      data: card,
      handleImageClick: (data) => {
        imagePopup.open({ name: data.title, link: data.link });
      },
      handleBinClick: (cardElement, cardId) => {
        deletionConfirmPopup.open();
        deletionConfirmPopup.setCardElement(cardElement, cardId);
      },
      handleLikeClick: async (cardId,likeList ,likeCounter, heartIcon) =>{
        
        if (!likeList.some(item=>item._id===temp.id)){
          const res = await cardsApi.likeCard(cardId)
          .then(res => {
            likeCounter.textContent = res.likes.length;
            heartIcon.classList.add("card__like-btn-filled");
            likeList.push(temp.id);
          })
          .catch(err=>console.log(err));
        }
        else {
          const res = await cardsApi.unLikeCard(cardId)
          .then(res=>{
            likeCounter.textContent = res.likes.length;
            heartIcon.classList.remove("card__like-btn-filled");
            likeList.filter(item => item!=temp.id);            
          })
          .catch(err=>console.log(err));
          
        }
      }
    },
    CARD_TEMPLATE_SECLECTOR
  );
  
  const cardElm =  cardObj.generateCard();
  cardObj.hideTrashIcon(temp.id);
  cardObj.toggleLikeButton(temp.id);
  return cardElm;
}
const cardSection = new Section(
  {
    renderer: (card) => {
      return createCard(card);
    },
  },
  ELEMENTS_SELECTOR
);
const profileInfoElement = new UserInfo({
  nameSelector: PROFILE_NAME_SELECTOR,
  jobSelector: PROFILE_DESCRIPTION,
  avatarSelector: PROFILE_AVATAR_SELECTOR,
});

avatarButton.addEventListener("click", ()=>{
  avatarFormValidator.resetValidation();
  avatarFormPopup.open();
});

addCardBtn.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  cardFormPopup.open();
});
imagePopup.setEventListeners();
cardFormPopup.setEventListeners();
profileFormPopup.setEventListeners();
deletionConfirmPopup.setEventListeners();
avatarFormPopup.setEventListeners();
profileFormEditBtn.addEventListener("click", () => {
  const temp = profileInfoElement.getUserInfo();
  profileFormPopup.setInputValues({name: temp.name, description: temp.job});
  profieFormValidator.resetValidation();
  profileFormPopup.open();
});

///////////////////////////API////////////////////////////////
const cardsApi = new API(api_config);

async function init(){
  const [userData,cards ] = await Promise.all([
    cardsApi.getUserInfo(),
    cardsApi.getInitialCards()
  ])
  
  profileInfoElement.setUserInfo({
    name: userData.name,
    job: userData.about,
    avatar: userData.avatar,
    id: userData._id
  });
  cardSection.renderItems(cards);
}
init();


///////////////////////////API////////////////////////////////

