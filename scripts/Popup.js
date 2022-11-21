export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }

  open() {
    this._element.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._element.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._element.addEvenetListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close;
      }
    });
  }
}
