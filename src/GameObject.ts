import { Vector3 } from 'Vector3';

export class GameObject {

    constructor(public position: Vector3, public velocity: Vector3 = new Vector3(0, 0, 0), public acceleration: Vector3 = new Vector3(0, 0, 0)) { 
        this.vertices = [];
     }
    
    vertices: Vector3[];

    getMesh(): Float32Array {

        let arr: Array<number> = [];

        for (let vector of this.vertices) {
            arr.concat(vector.toArr());
        }

        return new Float32Array(arr);
    }
}