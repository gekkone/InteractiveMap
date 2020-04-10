export class Scene {
    constructor(name, game) {
        this._isLoad = false;
        this._objects = new Map();

        this.name = name;
        this.game = game;
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

            this._objects.forEach((object) => {
                object.render(time);
            });
        }
    }
}
