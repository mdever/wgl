import { Globals, globals } from 'Globals';

export function RenderFunction(gl: WebGLRenderingContext) {

    let program = globals.programs['defaultProgram'];

    gl.useProgram(program);
    let positionAttribLocation = gl.getAttribLocation(program, "position");

    gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(positionAttribLocation);

    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    let vbo = globals.vbos["triangle"];

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    
    console.log("All Done");
}