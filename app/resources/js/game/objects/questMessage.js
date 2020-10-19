import DisplayObject from "../displayObject"
import CONSTANTS from '../constants';

export default class QuestMessage extends DisplayObject {
    constructor(scene) {
        super(scene)

        this._element = document.createElement('div');
        this._element.setAttribute('class', 'popup_message');
        document.body.appendChild(this._element);

        this.isVisible = false;

        this._scene.game.addEventListener('resizeCanvas', () => {
            this._mathPosition();
        });
    }

    get width() {
        return this._element.offsetWidth;
    }
    set width(value) {
        if (null === value) {
            this._element.style.removeProperty('width');
        } else {
            this._element.style.width = `${value}px`;
        }
    }

    get height() {
        return this._element.offsetHeight;
    }
    set height(value) {
        if (null === value) {
            this._element.style.removeProperty('height');
        } else {
            this._element.style.height = `${value}px`;
        }
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
        this._mathPosition();

        this._element.style.opacity = '1';
    }

    hide() {
        this.isVisible = false;
        this._element.style.opacity = '0';
    }

    remove() {
        this._element.remove();
    }

    _mathPosition() {
        let player = this.scene.getObject('player');
        let camera = this.scene.camera;

        let leftSpace = player.x - camera.x;
        let topSpace = player.y - camera.y;
        let rightSpace = camera.x + camera.width - player.x - player.width;
        let bottomSpace = camera.y + camera.height - player.y - player.height;

        switch (Math.max(leftSpace, topSpace, rightSpace, bottomSpace)) {
            case leftSpace:
                this.x = player.x - this.width - CONSTANTS.PLAYER_MSG_MARGIN;
                this.y = player.y;

                break;
            case topSpace:
                this.x = player.x;
                this.y = player.y - this.height - CONSTANTS.PLAYER_MSG_MARGIN;
                break;
            case rightSpace:
                this.x = player.x + player.width + CONSTANTS.PLAYER_MSG_MARGIN;
                this.y = player.y;
                break;
            case bottomSpace:
                this.x = player.x;
                this.y = player.y + player.height + CONSTANTS.PLAYER_MSG_MARGIN;
                break;
        }

        if (this.x - camera.x < CONSTANTS.CAMERA_MSG_BORDER_DISTANCE) {
            let difference = CONSTANTS.CAMERA_MSG_BORDER_DISTANCE - this.x + camera.x;

            this.x += difference;
            this.width -= difference;
        }

        if (camera.x + camera.width - this.x - this.width < CONSTANTS.CAMERA_MSG_BORDER_DISTANCE) {
            this.width -= CONSTANTS.CAMERA_MSG_BORDER_DISTANCE - camera.x - camera.width + this.x + this.width;
        }

        if (this.y - camera.y < CONSTANTS.CAMERA_MSG_BORDER_DISTANCE) {
            let difference = CONSTANTS.CAMERA_MSG_BORDER_DISTANCE - this.y + camera.y;

            this.y += difference;
            this.height -= difference;
        }

        if (camera.y + camera.height - this.y - this.height < CONSTANTS.CAMERA_MSG_BORDER_DISTANCE) {
            this.height -= CONSTANTS.CAMERA_MSG_BORDER_DISTANCE - camera.y - camera.height + this.y + this.height;
        }
    }
}
