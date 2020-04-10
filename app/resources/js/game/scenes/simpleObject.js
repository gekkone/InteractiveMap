import { MovableObject } from '../movableObject';

export class SimpleObject extends MovableObject {
    constructor(scene) {
        super(scene);
    }

    render(time) {
        super.render(time);
        this.scene.game.context.fillRect(this.x, this.y, 40, 40);
    }
}
