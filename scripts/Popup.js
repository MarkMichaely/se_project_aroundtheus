export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this._closeButton = this._popupElement.querySelector(".popup__close-btn");
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEvenetListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
    this._closeButton.addEvenetListener("click", () => this.close());
  }
}
