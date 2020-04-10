export default class ImageLoader {
    constructor(imageFiles) {
        this.imageFiles = imageFiles;
        this.images = new Map();
    }

    load() {
        let promises = [];
        this.imageFiles.forEach((path, name) => {
            let promise = new Promise((resolve, reject) => {
                const image = new Image();
                image.src = path;
                this.images.set(name, image);

                image.onload = () => resolve(name);
                image.onerror = (e) => reject(e);
            })
            promises.push(promise);
        });

        return Promise.all(promises);
    }
}
