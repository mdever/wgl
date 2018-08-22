export class Vector3 {
    constructor(public x: number, public y: number, public z: number) {  }

    minus(otherVector: Vector3): Vector3 {
        return new Vector3(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z);
    }

    plus(otherVector: Vector3): Vector3 {
        return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
    }

    dot(otherVector: Vector3): number {
        return this.x*otherVector.x + this.y*otherVector.y + this.z*otherVector.z;
    }

    normalize(): Vector3 {
        let mag = this.dot(this);

        return new Vector3(this.x/mag, this.y/mag, this.z/mag);
    }

    toArr(): number[] {
        return [this.x, this.y, this.z];
    }
}