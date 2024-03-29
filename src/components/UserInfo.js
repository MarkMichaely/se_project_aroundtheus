export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
      avatar: this._avatarElement.style.backgroundImage,
      _id: this._ownerId
    };
  }
 
  setUserInfo({ name, about ,avatar, _id}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this._avatarElement.style.backgroundImage = `url(${avatar})`; 
    this._ownerId= _id;
  }
}
