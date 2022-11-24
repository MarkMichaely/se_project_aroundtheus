export default class Section{
    constructor({items, renderer}, selector){
        this._itmes=items;
        this._renderer=renderer;
        this._container=document.querySelector(selector);
    }

    renderItems(){
        this._container.innerHTML = "";
        this._itmes.forEach(element => {
            this._renderer(element);
        });
    }

    addItem(item){
        this._container.prepend(item);
    }
}