import DisplayObject from "../displayObject"

export default class QuestMessage extends DisplayObject {
    constructor(scene) {
        super(scene)

        this.maxWidth = 400;
        this.maxHeight = 400;

        this._element = document.createElement('div');
        this._element.setAttribute('class', 'popup_message');
        document.body.appendChild(this._element);

        this._element.style.maxWidth = `${this.maxWidth}px`;
        this._element.style.maxHeight = `${this.maxHeight}px`;

        this.isVisible = false;
    }

    get width() {
        return this._element.offsetWidth;
    }

    get height() {
        return this._element.offsetHeight;
    }

    render(time) {
        super.render(time)
        let pos = this.canvasPos();
        if (this._element.style.left != `${pos.x}px`) {
            this._element.style.left = `${pos.x}px`;
        }

        if (this._element.style.top != `${pos.y}px`) {
            this._element.style.top = `${pos.y}px`;
        }
    }

    setText(text) {
        this._element.innerHTML = `<p class="popup_message__title">${text}</p>`;
    }

    addAction(action) {
        let actionsElm = this._element.querySelector('.popup_message__actions');
        if (actionsElm == null) {
            actionsElm = document.createElement('div');
            actionsElm.setAttribute('class', 'popup_message__actions');
            this._element.appendChild(actionsElm);
        }

        let actionElm = document.createElement('span');
        actionElm.innerHTML = action.text;
        actionElm.addEventListener('click', action.fn);

        actionsElm.appendChild(actionElm);
    }

    show() {
        this.isVisible = true;
        this._element.style.opacity = '1';
    }

    hide() {
        this.isVisible = false;
        this._element.style.opacity = '0';
    }

    remove() {
        this._element.remove();
    }
}
