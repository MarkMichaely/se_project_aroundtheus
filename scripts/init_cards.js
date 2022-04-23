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

  
  const elemnts =document.querySelector(".elements");
  const cardTemplate =document.querySelector("#card-template").content;

  function addCard(cardName,cardImg){
      const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
      
    cardElement.querySelector(".card__title").textContent = cardName;
    cardElement.querySelector(".card__image").src = cardImg;
elemnts.prepend(cardElement);  
}

function initCards(){
    for (let index = 0; index < initialCards.length; index++) {
        addCard(initialCards[index].name,initialCards[index].link)
        
    }

}

initCards();