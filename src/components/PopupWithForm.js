import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, selector) {
    super(selector);
    this._formElement = this._popupElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._formInputList= Array.from(
      this._formElement.querySelectorAll(".form__input")
    );
  }
  _getInputValues() {
    const data = {};
    this._formInputList.forEach((input) => {
      data[input.id] = input.value;
    });
    console.log(this._formInputList);

    return data;
  }

  setInputValues(data) {
    this._formInputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {this._handleFormSubmit(evt, this._getInputValues())});
    super.setEventListeners();
  }
  close() {
    this._formElement.reset();
    super.close();
  }
}
