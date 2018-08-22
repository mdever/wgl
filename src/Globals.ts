import { GameObject } from 'GameObject';

// Program Wide Globals
let programs: { [name: string]: WebGLProgram } = {};
let vbos:     { [name: string]: WebGLBuffer  } = {};
let gameObjectsMap: { [name: string]: GameObject } = {};
let gameObjects: GameObject[] = [];
let elapsedTime       = 0
let dt                = 0;
let frameCount        = 0;
let lastUpdated       = 0;
let lastRendered      = 0;
let msSinceLastUpd    = 0;
let msSinceLastRender = 0;

const FPS = 60;
const MS_PER_RENDER = 1000/FPS;

function makeMainLoop(gl: WebGLRenderingContext, processInputFn: () => void, updateFunc: (time: number) => void, renderFn: (gl: WebGLRenderingContext) => void)  {

    let time = new Date().getTime();
    dt = time - elapsedTime;
    elapsedTime += (new Date().getTime() - elapsedTime);

    var cb: FrameRequestCallback =  function() {

        let time = new Date().getTime();
        dt = time - elapsedTime;
        elapsedTime += dt;

        processInputFn();
        updateFunc(dt);

        if (msSinceLastRender < MS_PER_RENDER) {
            msSinceLastRender += dt;
    
            requestAnimationFrame(cb);
            return;
        }
        
        console.log('Rendering...');
        renderFn(gl);
        msSinceLastRender = 0;

        console.log("Elapsed Time: " + elapsedTime);
        console.log("dt: " + dt);
        console.log("frameCount: " + ++frameCount + "\n\n");

        requestAnimationFrame(cb);
    }

    return cb;
}

export interface Globals {
    programs: { [name: string]: WebGLProgram };
    vbos:     { [name: string]: WebGLBuffer  };
    makeMainLoop: (gl: WebGLRenderingContext, processInputFn: () => void, updateFn: (dt: number) => void, renderFn: (gl: WebGLRenderingContext) => void) => FrameRequestCallback;
    gameObjectsMap: { [name: string]: GameObject };
    gameObjects: GameObject[];
    elapsedTimeMs: number;
    addGameObject: (name: string, obj: GameObject) => void;
}

export const globals: Globals = {
    programs: programs,
    vbos: vbos,
    makeMainLoop: makeMainLoop,
    gameObjectsMap: gameObjectsMap,
    gameObjects: gameObjects,
    elapsedTimeMs: elapsedTime,

    addGameObject: (name: string, object: GameObject) => {
        globals.gameObjectsMap[name] = object;
        globals.gameObjects.push(object);
    }
};

