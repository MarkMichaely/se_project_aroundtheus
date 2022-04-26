const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ];
  const cardPopup=document.querySelector(".popup_type_card");
  const cardForm=document.querySelector(".form_type_card");
  const addBtn=document.querySelector(".profile-info__add-btn");
  const elemnts =document.querySelector(".elements");
  const cardTemplate =document.querySelector("#card-template").content;
  const closeCardBtn = document.querySelector(".popup__close-btn_type_card");
  const cardFormPlace =document.querySelector(".form__input_type_place");
  const cardFormLink =document.querySelector(".form__input_type_link");
  const removeBtn=document.querySelector(".card__delete-btn");
  const imagePopup=document.querySelector(".popup_type_image");
  const closePopupImageBtn=document.querySelector(".popup__close-btn_type_image");
 

  function handleImageClick(title,link){
    const imagePopupTitle=document.querySelector(".popup__card-title");
    const imagePopupImg=document.querySelector(".popup__card-image");
    imagePopupImg.src=link;
    imagePopupTitle.textContent=title;
    imagePopup.classList.add("popup_opened");
  }
  function addCard(cardName,cardImg){
      const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
      
    cardElement.querySelector(".card__title").textContent = cardName;
    const cardElementImg=cardElement.querySelector(".card__image");
    cardElementImg.src = cardImg;
    cardElementImg.addEventListener("click", ()=> handleImageClick(cardName,cardImg)); 
    cardElement.querySelector(".card__like-btn").addEventListener("click", function(evt){
      evt.target.classList.toggle("card__like-btn-filled");
    })
    cardElement.querySelector(".card__delete-btn").addEventListener("click", function(evt){
      evt.target.parentNode.remove();
    })
elemnts.prepend(cardElement);  
}

function initCards(){
    for (let index = 0; index < initialCards.length; index++) {
        addCard(initialCards[index].name,initialCards[index].link)
        
    }
}
function openCardPopup(){
  cardFormLink.value="";
  cardFormPlace.value="";

  cardPopup.classList.add("popup_opened");  
}
function closeCardPopup(){
  cardPopup.classList.remove("popup_opened");  

}

function handleCardSubmit(evt){
  evt.preventDefault();
  addCard(cardFormPlace.value,cardFormLink.value);
  closeCardPopup();

}

function closeImagePopup(){
  imagePopup.classList.remove("popup_opened");
}
addBtn.addEventListener("click",openCardPopup);
closePopupImageBtn.addEventListener("click" , closeImagePopup)
closeCardBtn.addEventListener("click", closeCardPopup);
cardForm.addEventListener("submit", handleCardSubmit);
initCards();