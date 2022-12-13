import { MY_ID } from "../utils/constants.js";
class Card {
  constructor({ data, handleImageClick ,handleBinClick}, cardSelector) {
    this._link = data.link;
    this._text = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleBinClick =handleBinClick;
    this._likesList = data.likes;
    this._id=data._id;
    this._ownerId=data.owner._id;
  }

  getId(){
    return this._id;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  _handleLikeButton = (evt) => {
    this._likeButton.classList.toggle("card__like-btn-filled");
  };

  _handleTrashButton = (evt) => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _addEventListeners = () => {
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, title: this._text })
    );
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._trashButton.addEventListener("click", () => this._handleBinClick(this._cardElement, this._id));
  };

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__title").textContent = this._text;
    this._likesCounter = this._cardElement.querySelector(".card__like-btn-counter");
    if (this._likesList) this._likesCounter.textContent=this._likesList.length;
    this._likeButton = this._cardElement.querySelector(".card__like-btn");
    this._trashButton = this._cardElement.querySelector(".card__delete-btn");
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    if (this._ownerId && this._ownerId!=MY_ID) {
      this._trashButton.classList.add("card__delete-btn-hidden");
    }
    this._addEventListeners();
    return this._cardElement;
  }
}
export default Card;
