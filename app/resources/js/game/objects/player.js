import MovableObject from "../movableObject";

export default class Player extends MovableObject {
    constructor(image, scene) {
        super(scene);
        this._image = image;
        this._scale = 1;

        this._speed = 30;
        this.zIndex = 999;

        this.width = this._image.width * this._scale;
        this.height = this._image.height * this._scale;
    }

    render (time) {
        let pos = this.canvasPos();

        this.scene.game.context.filter = 'sepia(40%) drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.8))';
        this.scene.game.context.drawImage(
            this._image,
            pos.x,
            pos.y,
            this.width,
            this.height);

        this.scene.game.context.filter = 'none';

        super.render(time);
    }
}
