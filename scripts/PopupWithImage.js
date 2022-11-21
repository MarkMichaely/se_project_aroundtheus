import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  open({ link, name }) {
    const image = this._popupElement.querySelector(".popup__card-image");
    image.src = link;
    image.alt = name;
    this._popupElement.querySelector(".popup__card-title").textContent = name;
    super.open();
  }
}
