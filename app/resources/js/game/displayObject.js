import Scene from "./scene";

export default class DisplayObject {
    constructor (scene) {
        if (scene instanceof Scene) {
            this._scene = scene;
        }
        else {
            console.error('!scene instanceOf Scene');
        }

        this._x = 0;
        this._y = 0;
        this.width = 0;
        this.height = 0;
        this.isVisible = true;
        this.zIndex = 0;
    }

    get x() {
        return this._scene.camera != null ? this._x - this._scene.camera.x : this._x;
    }
    set x(value) {
        this._x = value;
    }

    get y() {
        return this._scene.camera != null ? this._y - this._scene.camera.y : this._y;
    }
    set y(value) {
        this._y = value;
    }

    get scene() {
        return this._scene;
    }

    render(time) {

    }
}
