import DisplayObject from './displayObject';

export default class MovableObject extends DisplayObject {
    constructor(scene) {
        super(scene);

        this._movedPosition = { x: -1, y: -1 }; //Позиция на которую следует переместится объекту
        this._speed = 1000; //Скорость движения объекта - количество ms за которое объект передвигается на 1px
        this._stepX = 1; //Сколько пикселей должен занимать один шаг движения по X
        this._stepY = 1; //Сколько пикселей должен занимать один шаг движения по Y
        this._lastRender = 0; //Время последней отрисовки
    }

    // Перемещает объект в указанную точку
    moveTo(x, y, speed = 0) {
        this._movedPosition.x = x;
        this._movedPosition.y = y;
        if (speed != 0) {
            this._speed = speed;
        }

        let distanceX = Math.abs(this._movedPosition.x - this.x);
        let distanceY = Math.abs(this._movedPosition.y - this.y);

        if (distanceX < distanceY) {
            this._stepX = distanceX / distanceY;
            this._stepY = 1;
        }
        else if (distanceX > distanceY) {
            this._stepX = 1;
            this._stepY = distanceY / distanceX;
        }

        if (this._movedPosition.x - this.x < 0) {
            this._stepX = -this._stepX;
        }

        if (this._movedPosition.y - this.y < 0) {
            this._stepY = -this._stepY;
        }
    }

    // Признак перемещения объекта в данный момент
    isMoves() {
        return (this._movedPosition.x != -1 && this.x != this._movedPosition.x)
            || (this._movedPosition.y != -1 && this.y != this._movedPosition.y);
    }

    // Функция отрисовки объекта
    render(time) {
        if (this.isMoves()
            && (this._lastRender == 0 || time - this._lastRender >= this._speed)) {
            let skippedSycleFactor = this._lastRender > 0 ? (time - this._lastRender) / this._speed : 1;
            this._lastRender = time;


            this.x = this.x + this._stepX * skippedSycleFactor;
            this.y = this.y + this._stepY * skippedSycleFactor;


            if ((this._stepX > 0 && this.x > this._movedPosition.x)
                || (this._stepX < 0 && this.x < this._movedPosition.x)) {
                this.x = this._movedPosition.x;
            }

            if ((this._stepY > 0 && this.y > this._movedPosition.y)
                || (this._stepY < 0 && this.y < this._movedPosition.y)) {
                this.y = this._movedPosition.y;
            }

            console.debug(this.x, this.y);
        }

        super.render(time);
    }
}
