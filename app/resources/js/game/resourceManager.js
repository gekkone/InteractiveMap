import ImageLoader from './imageLoader'

export default class ResourceManager {
    constructor() {
        this.resources = new Map();
    }

    loadImages(_images) {
        if (!_images instanceof Map) {
            console.error(`В функцию loadImages должен быть передан
            объект производный от Map, а получен ${_images}`);
            return;
        }

        let loader = new ImageLoader(_images);

        return new Promise((resolve, reject) => {
            loader.load().then(() => {
                loader.images.forEach((resource, name) => {
                    this.resources.set(name, resource);
                });

                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }

    resource(_name) {
        return this.resources.get(_name);
    }
}
