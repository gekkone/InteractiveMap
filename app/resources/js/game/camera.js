export default class Camera {
    constructor(x, y, width, height, scene) {
        this._x = x;
        this._y = y;

        this._width = width;
        this._heigth = height;
        this._scene = scene;
        this._scale = 1;

        this._scene.game.addEventListener('resizeCanvas', (event) => {
            this._width = event.detail.width;
            this._heigth = event.detail.height;
        });
    }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._heigth;
    }

    get scale() {
        return this._scale;
    }
    set scale(value) {
        this._scale = value;
    }
}
