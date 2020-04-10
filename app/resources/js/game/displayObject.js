import { Scene } from "./scene";

export class DisplayObject {
    constructor (scene) {
        if (scene instanceof Scene) {
            this._scene = scene;
        }
        else {
            console.error('!scene instanceOf Scene');
        }

        this.x = 0;
        this.y = 0;
        this.isVisible = true;
        this.zIndex = 0;
    }

    get scene() {
        return this._scene;
    }

    render(time) {

    }
}
