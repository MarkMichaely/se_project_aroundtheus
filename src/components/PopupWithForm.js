import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, selector) {
    super(selector);
    this._formElement = this._popupElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const data = {};
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    inputList.forEach((input) => {
      data.input = input.value;
    });
    return data;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
  close() {
    this._formElement.reset();
    super.close();
  }
}
