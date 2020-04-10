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
        this._width = 0;
        this._height = 0;
        this.isVisible = true;
        this.zIndex = 0;
    }

    get scene() {
        return this._scene;
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

    get width() {
        return this._scene.camera != null ? this._width * this._scene.camera.scale : this._width;
    }
    set width(value) {
        this._width = value;
    }

    get height() {
        return this._scene.camera != null ? this._height * this._scene.camera.scale : this._height;
    }
    set height(value) {
        this._height = value
    }

    render(time) {

    }
}
