import ImageLoader from "../imageLoader"
import DisplayObject from '../displayObject'

export default class GameMap extends DisplayObject {
    constructor(scene) {
        super(scene);
        this.width = scene.game.canvas.width;
        this.height = scene.game.canvas.height;
    }

    render(time) {
        this.scene.game.context.drawImage(this.scene.imageResources.get('map'),
            this.x, this.y, this.scene.camera.width, this.scene.camera.height,
            0, 0, this.scene.camera.width, this.scene.camera.height
        );
        super.render(time);
    }
}
