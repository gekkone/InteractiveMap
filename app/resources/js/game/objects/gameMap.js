import DisplayObject from '../displayObject'

export default class GameMap extends DisplayObject {
    constructor(image, scene) {
        super(scene);
        this._image = image;
        this._width = image.width;
        this._height = image.height;

        this._virtCanvas = document.createElement('canvas');
        this._cacheContext = this._virtCanvas.getContext('2d');

        this._cacheOption = {
            x: 0,
            y: 0,
            sceneWidth: 0,
            sceneHeight: 0
        };
    }

    render(time) {
        this._preRender();

        this.scene.game.context.drawImage(this._virtCanvas, 0, 0);

        super.render(time);
    }

    _preRender() {
        let pos = this.canvasPos();

        if (
            this._virtCanvas.width !== this.scene.game.canvas.width
            || this._virtCanvas.height !== this.scene.game.canvas.height
        ) {
            this._virtCanvas.width = this.scene.game.canvas.width;
            this._virtCanvas.height = this.scene.game.canvas.height;
        }

        let option = {
            x: pos.x,
            y: pos.y,
            sceneWidth: this.scene.width,
            sceneHeight: this.scene.height
        };

        if (
            this._cacheOption.x == option.x
            && this._cacheOption.y == option.y
            && this._cacheOption.sceneWidth == option.sceneWidth
            && this._cacheOption.sceneHeight == option.sceneHeight
        ) {
            return;
        }


        this._cacheOption = option

        let width = this.scene.camera != null ? this.scene.game.canvas.width * this.scene.camera.scale : this.scene.game.canvas.width;
        let height = this.scene.camera != null ? this.scene.game.canvas.height * this.scene.camera.scale : this.scene.game.canvas.height;

        this._cacheContext.drawImage(
            this._image,
            -option.x, -option.y, width, height,
            0, 0, this.scene.game.canvas.width, this.scene.game.canvas.height
        );
    }
}
