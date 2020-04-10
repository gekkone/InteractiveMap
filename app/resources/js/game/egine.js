import { Scene } from './scene';

export class Engine extends EventTarget {
    constructor(canvas) {
        super();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this._scenes = new Map();
        this._activeScene = null;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.dispatchEvent(new CustomEvent('resizeCanvas', {
                detail: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            }));
        });
    }

    scene(name) {
        return this._scenes.get(name);
    }

    addScene(object) {
        if (!this._scenes.has(object.name)) {
            this._scenes.set(object.name, object);
        }
        else {
            console.error(`Не удалось добавить объект ${object.name} в список игровых
                        объектов, т.к. объект с таким именем уже зарегистрирован в списке`);
        }
    }
    setActiveScene(sceneName) {
        this._activeScene = this._scenes.get(sceneName);
        if (!this._activeScene.isLoad) {
            this._activeScene.load().then(() => { console.debug(`${this._activeScene.name} успешно загружена`) });
        }
    }

    render(time) {
        if (this._activeScene != null) {
            this._activeScene.render(time);
        }
        requestAnimationFrame(time => this.render(time));
    }

    run() {
        requestAnimationFrame(time => this.render(time));
    }
}
