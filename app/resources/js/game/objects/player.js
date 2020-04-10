import MovableObject from "../movableObject";

export default class Player extends MovableObject {
    constructor(image, scene) {
        super(scene);
        this._image = image;
        this._width = image.width;
        this._height = image.height;
        this._scale = 0.05;
    }

    render (time) {
        this.scene.game.context.filter = 'sepia(40%) drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.8))';
        this.scene.game.context.drawImage(
            this._image,
            this.x,
            this.y,
            this.width * this._scale,
            this.height * this._scale);
            this.scene.game.context.filter = 'none';

        super.render(time);
    }
}
