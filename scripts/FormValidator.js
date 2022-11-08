export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList) {
    const formButton = this._form.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      formButton.classList.add(this._inactiveButtonClass);
      formButton.disabled = true;
    } else {
      formButton.classList.remove(this._inactiveButtonClass);
      formButton.disabled = false;
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
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    this._toggleButtonState(inputList);
    inputList.forEach((formInput) => {
      if (!formInput.validity.valid) {
        this._showError(formInput);
      } else {
        this._hideError(formInput);
      }
    });
  }
  enableValidation() {
    this._form.addEventListener("input", () => this._checkInputValidity());
  }
}
