import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
    this._image = this._popupElement.querySelector(".popup__card-image");
    this._caption = this._popupElement.querySelector(".popup__card-title");
  }
  
  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
