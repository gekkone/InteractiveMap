export default class Camera {
    constructor(x, y, width, height, scene) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
        this._scene = scene;
        this._scale = 1;

        this._scene.game.addEventListener('resizeCanvas', (event) => {
            this.width = event.detail.width;
            this.height = event.detail.height;
        });

        this._followAt = null;
        this._followDistance = 0;
    }

    get scale() {
        return this._scale;
    }
    set scale(scale) {
        let x = this.x / this._scale;
        let y = this.y / this._scale;

        this._scale = scale;
        this.x = x * this._scale;
        this.y = y * this._scale;
    }

    followAt(object, distance) {
        this._followAt = object;
        this._followDistance = distance;
    }

    render(time) {
        if (this._followAt == null) {
            return;
        }

        if (this._followAt.x + this._followAt.width > this.x + this.width - this._followDistance) {
            this.x = Math.min(
                this._scene.x + this._scene.width,
                this._followAt.x + this._followAt.width - this.width + this._followDistance
            );
        }
        if (this._followAt.x < this.x + this._followDistance) {
            this.x = Math.max(this._scene.x, this._followAt.x - this._followDistance);
        }
        if (this._followAt.y + this._followAt.height > this.y + this.height - this._followDistance) {
            this.y = Math.min(
                this._scene.y + this._scene.height,
                this._followAt.y + this._followAt.height - this.height + this._followDistance
            );
        }
        if (this._followAt.y < this.y + this._followDistance) {
            this.y = Math.max(this._scene.y, this._followAt.y - this._followDistance);
        }
    }
}
