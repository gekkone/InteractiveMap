export default class QuestMessage {
    constructor(scene) {
        this._scene = scene;

        this.maxWidth = 300;
        this.maxHeight = 400;

        this._element = document.createElement('div');
        this._element.setAttribute('class', 'popup_message');
        document.body.appendChild(this._element);
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

    setPosition(x, y) {
        this._element.style.left = `${x}px`;
        this._element.style.top = `${y}px`;
    }

    show() {
        this._element.style.opacity = '1';
    }

    hide() {
        this._element.style.opacity = '0';
    }
}
