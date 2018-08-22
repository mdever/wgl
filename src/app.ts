
import { Vector3 } from 'Vector3';
import { Globals, globals } from 'Globals';
import { initializeInputListeners, ProcessInputFunction } from 'Input';
import { UpdateWorldFunction } from 'Update';
import { RenderFunction } from 'Render';


import { GameObject } from 'GameObject';

let vertices = [
    -0.5, -0.5, 0,
     0,    0.5, 0,
     0.5, -0.5, 0
];

let triangle = new GameObject(new Vector3(0, 0, 0));
triangle.vertices = [new Vector3(-0.5, -0.5, 0), new Vector3(0, 0.5, 0), new Vector3(0.5, -0.5, 0)];


let modelMatrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

//let viewMatrix = 

var main = () => {
    let body: HTMLElement = document.body;

    let canvas = document.createElement("canvas");
    canvas.setAttribute('id', 'thecanvas');
    canvas.setAttribute('width', '800');
    canvas.setAttribute('height', '600');
    body.appendChild(canvas);

    initializeInputListeners(canvas);

    let gl = <WebGLRenderingContext> canvas.getContext('webgl');

    if (gl == null) {
        window.alert("Could not get webgl rendering context");
        return 0;
    }


    gl.clearColor(0, 0, 0, 1);

    let VBO = gl.createBuffer();
    if (VBO == null) {
        window.alert("Could not allocate a Vertex Buffer Object");
        return 0;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    globals.vbos["triangle"] = VBO;

    let program = compileProgram(gl, "defaultVertexShader.vs.glsl", "defaultFragmentShader.fs.glsl");

    if (program == null) {
        console.log("Could not compileProgram()...");
        return 0;
    }

    globals.programs["defaultProgram"] = program;
    globals.addGameObject("triangle", triangle);

    requestAnimationFrame(globals.makeMainLoop(gl, ProcessInputFunction, UpdateWorldFunction, RenderFunction));

}

function compileProgram(gl: WebGLRenderingContext, vertexShaderName: string, fragmentShaderName: string): WebGLProgram | null {

    let program = null;
    let fragmentShader = null;
    let vertexShader= null;

    var request = new XMLHttpRequest();
    request.open('GET', '/data/shaders/' + vertexShaderName, false);
    request.send();

    if (request.status === 200) {
        vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, request.responseText);
        gl.compileShader(vertexShader);
        var status = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
        if (!status) {
            console.log('Could not compile vertex shader');
            console.log(gl.getShaderInfoLog(vertexShader));
            return null;
        }
    } else {
        return null;
    }

    request = new XMLHttpRequest();
    request.open('GET', '/data/shaders/' + fragmentShaderName, false);
    request.send();

    if (request.status === 200) {
        fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, request.responseText);
        gl.compileShader(fragmentShader);
        var status = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
        if (!status) {
            console.log('Could not compile fragment shader');
            console.log(gl.getShaderInfoLog(fragmentShader));
            return null;
        }
    } else {
        return null;
    }

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    var status = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!status) {
        console.log("Could not link program: " + gl.getProgramInfoLog(program));
    }

    return program;
}


window.onload = main;