export default class Section{
    constructor({renderer}, selector){
        this._renderer=renderer;
        this._container=document.querySelector(selector);
    }

    async renderItems(items){
        this._container.innerHTML = "";
        items.forEach(element => {
            this.addItem(element);
        });
    }

    addItem(item){
        const card = this._renderer(item);
        this._container.prepend(card);
    }
}