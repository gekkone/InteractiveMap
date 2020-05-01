export default class Scene {
    constructor(name, game) {
        this._isLoad = false;
        this._objects = new Map();

        this.imageResources = new Map();
        this.camera = null;

        this.name = name;
        this.game = game;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
    }

    mapToGlobalPos(sceneX, sceneY) {
        let camera = this.camera;

        if (camera != null) {
            sceneX -= camera.x;
            sceneY -= camera.y;
        }

        return {
            x: sceneX,
            y: sceneY
        };
    }

    mapFromGlobalPos(canvasX, canvasY) {
        let camera = this.camera;

        if (camera != null) {
            canvasX += camera.x;
            canvasY += camera.y;
        }

        return { x: canvasX, y: canvasY };
    }

    addObject(name, object) {
        this._objects.set(name, object);
    }

    get isLoad() {
        return this._isLoad;
    }

    load() {
        return new Promise((resolve) => {
            this._isLoad = true;
            resolve();
        });
    }

    render(time) {
        if (this._isLoad) {
            this.game.context.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

            if (this.camera != null) {
                this.camera.render(time);
            }

            this._objects.forEach((object, name) => {
                if (!object.isVisible) {
                    return;
                }

                if (this.camera != null) {
                    // Следует отрисовывать только видимые объекты
                    if (object.x <= this.camera.x + this.camera.width
                        && object.y <= this.camera.y + this.camera.height
                        && object.x + object.width >= this.camera.x
                        && object.y + object.height >= this.camera.y) {

                        object.render(time);
                    }
                }
                else {
                    object.render(time);
                }
            });
        }
    }
}
