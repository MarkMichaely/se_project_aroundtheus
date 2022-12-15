import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, selector) {
    super(selector);
    this._formElement = this._popupElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._formInputList= Array.from(
      this._formElement.querySelectorAll(".form__input")
    );
    this._formButton = this._formElement.querySelector(".form__button");
    this._formButtonText = this._formButton.textContent;
  }
  _getInputValues() {
    const data = {};
    this._formInputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }
renderFormLoading(isLoading){
  if (isLoading){
    this._formButton.textContent="Saving...";
  }
  else this._formButton.textContent=this._formButtonText;

}
  setInputValues(data) {
    this._formInputList.forEach((input) => {
      if (data[input.name]!=null){
      input.value = data[input.name];
    }
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
