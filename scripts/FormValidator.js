export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._formButton = this._form.querySelector(this._submitButtonSelector);
    
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState() {
    
    if (this._hasInvalidInput()) {
      this._formButton.classList.add(this._inactiveButtonClass);
      this._formButton.disabled = true;
    } else {
      this._formButton.classList.remove(this._inactiveButtonClass);
      this._formButton.disabled = false;
    }
  }
  _showError(input) {
    const formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    formError.textContent = input.validationMessage;
    formError.classList.add(this._errorClass);
  }

  _hideError(input) {
    const formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = "";
  }
  _checkInputValidity() {
 
    this._toggleButtonState();
    this._inputList.forEach((formInput) => {
      if (!formInput.validity.valid) {
        this._showError(formInput);
      } else {
        this._hideError(formInput);
      }
    });
  }
  resetValidation() {
    this._toggleButtonState(); 
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement) 
    });

  }

  enableValidation() {
    this._form.addEventListener("input", () => this._checkInputValidity());
  }
}
