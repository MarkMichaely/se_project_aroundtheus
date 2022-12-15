export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.style.backgroundImage,
      id: this._ownerId
    };
  }
  setUserInfo({ name, job}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
  
  setUserInfo({ name, job ,avatar, id}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatarElement.style.backgroundImage = `url(${avatar})`; 
    this._ownerId= id;
  }
}
