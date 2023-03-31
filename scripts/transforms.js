// create a 4x4 matrix to the perspective projection / view matrix
function mat4x4Perspective(prp, srp, vup, clip) {
    // 1. translate PRP to origin
    // 2. rotate VRC such that (u,v,n) align with (x,y,z)
    // 3. shear such that CW is on the z-axis
    // 4. scale such that view volume bounds are ([z,-z], [z,-z], [-1,zmin])

    // ...
    // let transform = Matrix.multiply([...]);
    // return transform;


    let tanHalfFOV = Math.tan(fov * 0.5);
    let zRange = near - far;

    let projectionMatrix = mat4();
    projectionMatrix[0][0] = 1.0 / (tanHalfFOV * aspect);
    projectionMatrix[1][1] = 1.0 / tanHalfFOV;
    projectionMatrix[2][2] = (-near - far) / zRange;
    projectionMatrix[2][3] = (2 * far * near) / zRange;
    projectionMatrix[3][2] = 1.0;

    return projectionMatrix;
    // I THINK THIS WOULD WORK... TEST THIS TO MAKE SURE IT FUNCTIONS AS I THINK IT WOULD...

}

// create a 4x4 matrix to project a perspective image on the z=-1 plane
function mat4x4MPer() {
    let mper = new Matrix(4, 4);
    // mper.values = ...;

    let near = 1.0;
    let far = 100.0;
    let fov = 60.0 * Math.PI / 180.0; // field of view in radians
    let aspectRatio = 1.0;
    let f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    let rangeInv = 1.0 / (near - far);

    mper.values = [
        [f / aspectRatio, 0, 0, 0],
        [0, f, 0, 0],
        [0, 0, (near + far) * rangeInv, -1],
        [0, 0, near * far * rangeInv * 2, 0]
    ];

    return mper;
    // CHECK IF THIS WORKS... 
    
}

// create a 4x4 matrix to translate/scale projected vertices to the viewport (window)
function mat4x4Viewport(width, height) {
    let viewport = new Matrix(4, 4);
    // viewport.values = ...;




    return viewport;
}


///////////////////////////////////////////////////////////////////////////////////
// 4x4 Transform Matrices                                                         //
///////////////////////////////////////////////////////////////////////////////////

// set values of existing 4x4 matrix to the identity matrix
function mat4x4Identity(mat4x4) {
    mat4x4.values = [[1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]];
}

// set values of existing 4x4 matrix to the translate matrix
function mat4x4Translate(mat4x4, tx, ty, tz) {
    // mat4x4.values = ...;

    mat4x4.values[0] = 1;
    mat4x4.values[1] = 0;
    mat4x4.values[2] = 0;
    mat4x4.values[3] = 0;
    mat4x4.values[4] = 0;
    mat4x4.values[5] = 1;
    mat4x4.values[6] = 0;
    mat4x4.values[7] = 0;
    mat4x4.values[8] = 0;
    mat4x4.values[9] = 0;
    mat4x4.values[10] = 1;
    mat4x4.values[11] = 0;
    mat4x4.values[12] = tx;
    mat4x4.values[13] = ty;
    mat4x4.values[14] = tz;
    mat4x4.values[15] = 1;
    return mat4x4;
    // CHECK TO SEE IF THIS IS CORRECT...
}

// set values of existing 4x4 matrix to the scale matrix
function mat4x4Scale(mat4x4, sx, sy, sz) {
    // mat4x4.values = ...;

    mat4x4.values[0] = sx;
    mat4x4.values[1] = 0;
    mat4x4.values[2] = 0;
    mat4x4.values[3] = 0;
    mat4x4.values[4] = 0;
    mat4x4.values[5] = sy;
    mat4x4.values[6] = 0;
    mat4x4.values[7] = 0;
    mat4x4.values[8] = 0;
    mat4x4.values[9] = 0;
    mat4x4.values[10] = sz;
    mat4x4.values[11] = 0;
    mat4x4.values[12] = 0;
    mat4x4.values[13] = 0;
    mat4x4.values[14] = 0;
    mat4x4.values[15] = 1;
    return mat4x4;
    // CHECK TO SEE IF THIS IS CORRECT...

}

// set values of existing 4x4 matrix to the rotate about x-axis matrix
function mat4x4RotateX(mat4x4, theta) {
    // mat4x4.values = ...;

    let c = Math.cos(theta);
    let s = Math.sin(theta);
    mat4x4.values[0] = 1;
    mat4x4.values[1] = 0;
    mat4x4.values[2] = 0;
    mat4x4.values[3] = 0;
    mat4x4.values[4] = 0;
    mat4x4.values[5] = c;
    mat4x4.values[6] = s;
    mat4x4.values[7] = 0;
    mat4x4.values[8] = 0;
    mat4x4.values[9] = -s;
    mat4x4.values[10] = c;
    mat4x4.values[11] = 0;
    mat4x4.values[12] = 0;
    mat4x4.values[13] = 0;
    mat4x4.values[14] = 0;
    mat4x4.values[15] = 1;
    return mat4x4;
    // CHECK TO SEE IF THIS IS CORRECT...

}

// set values of existing 4x4 matrix to the rotate about y-axis matrix
function mat4x4RotateY(mat4x4, theta) {
    // mat4x4.values = ...;

    let c = Math.cos(theta);
    let s = Math.sin(theta);
    mat4x4.values[0] = c;
    mat4x4.values[1] = 0;
    mat4x4.values[2] = -s;
    mat4x4.values[3] = 0;
    mat4x4.values[4] = 0;
    mat4x4.values[5] = 1;
    mat4x4.values[6] = 0;
    mat4x4.values[7] = 0;
    mat4x4.values[8] = s;
    mat4x4.values[9] = 0;
    mat4x4.values[10] = c;
    mat4x4.values[11] = 0;
    mat4x4.values[12] = 0;
    mat4x4.values[13] = 0;
    mat4x4.values[14] = 0;
    mat4x4.values[15] = 1;
    return mat4x4;
    // CHECK TO SEE IF THIS IS CORRECT...

}

// set values of existing 4x4 matrix to the rotate about z-axis matrix
function mat4x4RotateZ(mat4x4, theta) {
    // mat4x4.values = ...;

    let c = Math.cos(theta);
    let s = Math.sin(theta);
    mat4x4.values[0] = c;
    mat4x4.values[1] = -s;
    mat4x4.values[2] = 0;
    mat4x4.values[3] = 0;
    mat4x4.values[4] = s;
    mat4x4.values[5] = c;
    mat4x4.values[6] = 0;
    mat4x4.values[7] = 0;
    mat4x4.values[8] = 0;
    mat4x4.values[9] = 0;
    mat4x4.values[10] = 1;
    mat4x4.values[11] = 0;
    mat4x4.values[12] = 0;
    mat4x4.values[13] = 0;
    mat4x4.values[14] = 0;
    mat4x4.values[15] = 1;
    return mat4x4;
    // CHECK TO SEE IF THIS IS CORRECT...

}

// set values of existing 4x4 matrix to the shear parallel to the xy-plane matrix
function mat4x4ShearXY(mat4x4, shx, shy) {
    // mat4x4.values = ...;

    mat4x4.values[0] = 1;
    mat4x4.values[1] = shx;
    mat4x4.values[2] = 0;
    mat4x4.values[3] = 0;
    mat4x4.values[4] = shy;
    mat4x4.values[5] = 1;
    mat4x4.values[6] = 0;
    mat4x4.values[7] = 0;
    mat4x4.values[8] = 0;
    mat4x4.values[9] = 0;
    mat4x4.values[10] = 1;
    mat4x4.values[11] = 0;
    mat4x4.values[12] = 0;
    mat4x4.values[13] = 0;
    mat4x4.values[14] = 0;
    mat4x4.values[15] = 1;
    return mat4x4;
    // CHECK TO SEE IF THIS IS CORRECT...

}

// create a new 3-component vector with values x,y,z
function Vector3(x, y, z) {
    let vec3 = new Vector(3);
    vec3.values = [x, y, z];
    return vec3;
}

// create a new 4-component vector with values x,y,z,w
function Vector4(x, y, z, w) {
    let vec4 = new Vector(4);
    vec4.values = [x, y, z, w];
    return vec4;
}
