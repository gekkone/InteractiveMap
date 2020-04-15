import Scene from "./scene";

export default class DisplayObject extends EventTarget {
    constructor(scene) {
        super()

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
        return this.scene.camera != null ? this._x * this.scene.camera.scale : this._x;
    }
    set x(value) {
        this._x = value;
    }

    get y() {
        return this.scene.camera != null ? this._y * this.scene.camera.scale : this._y;
    }
    set y(value) {
        this._y = value;
    }

    canvasPos() {
        return this.scene.mapToGlobalPos(this.x, this.y);
    }

    get width() {
        return this.scene.camera != null ? this._width * this.scene.camera.scale : this._width;
    }
    set width(value) {
        this._width = value;
    }

    get height() {
        return this.scene.camera != null ? this._height * this.scene.camera.scale : this._height;
    }
    set height(value) {
        this._height = value
    }

    render(time) {

    }
}
