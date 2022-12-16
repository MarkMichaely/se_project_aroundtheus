class Card {
  constructor({ data, handleImageClick ,handleBinClick, handleLikeClick}, cardSelector) {
    this._link = data.link;
    this._text = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleBinClick =handleBinClick;
    this._handleLikeClick=handleLikeClick;
    this._likesList = data.likes;
    this._id=data._id;
    this._ownerId=data.owner._id;
  }

  getId(){
    return this._id;
  }
  getLikeList(){
    return this._likesList;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  
  _addEventListeners = () => {
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, title: this._text })
    );
    this._likeButton.addEventListener("click",()=> this._handleLikeClick(this));
    this._trashButton.addEventListener("click", () => this._handleBinClick(this._cardElement, this._id));
  };
  hideTrashIcon(id) {
    if (this._ownerId != id) {
      this._trashButton.classList.add("card__delete-btn-hidden");
    }
  }
  isLiked (id) {
   return this._likesList.some(item => item._id === id);
  }
  
  toggleLike(likeList, id){
    this._likesList=likeList;
    this._likesCounter.textContent=likeList.length;
    this.renderLike(id);
  }
  
  renderLike(id){
    if (this.isLiked(id)){
      this._likeButton.classList.add("card__like-btn-filled");
    }
    else {
      this._likeButton.classList.remove("card__like-btn-filled");
    }
  }
  
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__title").textContent = this._text;
    this._likesCounter = this._cardElement.querySelector(".card__like-btn-counter");
    this._likeButton = this._cardElement.querySelector(".card__like-btn");
    this._trashButton = this._cardElement.querySelector(".card__delete-btn");
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._likesCounter.textContent=this._likesList.length;
    
    this._addEventListeners();
    return this._cardElement;
  }
}
export default Card;
