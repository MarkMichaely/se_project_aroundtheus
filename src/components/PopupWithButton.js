import Popup from "./Popup.js";
export default class PopupWithButton extends Popup{
    constructor({ handleFormSubmit }, selector){
        super(selector);
        this._formElement = this._popupElement.querySelector(".form");
        this._handleFormSubmit = handleFormSubmit;
    }
    getCardId(){
        return this._cardId;
    }

    setCardElement(cardElement, id){
        this._cardElement = cardElement;
        this._cardId = id;
    }
    removeCardElement(){
        this._cardElement.remove();
        this._cardElement = null;
    }

    setEventListeners() {
        this._formElement.addEventListener("submit", (evt) => {this._handleFormSubmit(evt)});
        super.setEventListeners();
      }
}