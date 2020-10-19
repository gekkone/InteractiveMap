import DisplayObject from '../displayObject'

export default class VersionInfo extends DisplayObject {
    constructor(version, scene) {
        super(scene);
        this.version = version;

        this._width = 120;
        this._height = 25;
    }

    get x() {
        return this.scene.camera.x + this.scene.camera.width - this.width - 25;
    }

    get y() {
        return this.scene.camera.y + 25;
    }

    render(time) {
        super.render(time);

        let pos = this.canvasPos();
        let context = this.scene.game.context;

        context.font = '14px Arial';
        context.fillText(this.version, pos.x, pos.y);
        context.stroke();
    }
}
