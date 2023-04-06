// create a 4x4 matrix to the perspective projection / view matrix
function mat4x4Perspective(prp, srp, vup, clip) {
    // 1. translate PRP to origin
    // 2. rotate VRC such that (u,v,n) align with (x,y,z)
    // 3. shear such that CW is on the z-axis
    // 4. scale such that view volume bounds are ([z,-z], [z,-z], [-1,zmin])


    // 1. translate PRP to origin
    let trans = new Matrix(4, 4);
    let x = prp[0];
    let y = prp[1];
    let z = prp[2];
    if (x != 0) {
        x = -1 * x;
    }
    mat4x4Translate(trans, x, -y, -z);
    console.log(trans);

    // 2. rotate VRC such that (u,v,n) align with (x,y,z)
    let vprp = new Vector3(prp[0], prp[1], prp[2]);
    let vsrp = new Vector3(srp[0], srp[1], srp[2]);

    let n = vprp.subtract(vsrp);
    console.log(n)
    n.normalize();

    let vups = new Vector3(vup[0], vup[1], vup[2]);
    let u = vups.cross(n);

    u.normalize();

    console.log(u);

    let v = n.cross(u);
    console.log(v);
    let Rot = new Matrix(4, 4);
    Rot.values = [
        [u.x, u.y, u.z, 0],
        [v.x, v.y, v.z, 0],
        [n.x, n.y, n.z, 0],
        [0, 0, 0, 1]];

    console.log(Rot.values)

    // 3. shear such that CW is on the z-axis
    //DOP - direction of projection. VRC Virtual Viewing Coordinates (VRC) space
    let left = clip[0];
    let right = clip[1];
    let bottom = clip[2];
    let top = clip[3];
    let near = clip[4];
    let far = clip[5];

    let cw = new Vector3((left + right) / 2, (bottom + top) / 2, -near);

    let DOP = cw - prp;

    let shx = -cw.x / cw.z;
    let shy = -cw.y / cw.z;

    let shearMatrix = new Matrix(4, 4);

    mat4x4ShearXY(shearMatrix, shx, shy);
    console.log(shearMatrix)

    // 4. scale such that view volume bounds are ([z,-z], [z,-z], [-1,zmin])
    let zmin = -near / far;
    let xScale = (2 * near / ((right - left) * far));
    let yScale = (2 * near / ((top - bottom) * far));
    let zScale = 1 / (far);

    // Create scaling matrix
    let scalingMatrix = new Matrix(4, 4);
    mat4x4Scale(scalingMatrix, xScale, yScale, zScale);

    let nper = Matrix.multiply([scalingMatrix, shearMatrix, Rot, trans]);
    console.log(nper);

    let Mper = mat4x4MPer();
    let transform = Matrix.multiply([Mper, nper]);
    console.log(transform);
    return transform;


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
    viewport.values = [
        [width / 2, 0, 0, width / 2],
        [0, height / 2, 0, height / 2],
        [0, 0, 0.5, 0.5],
        [0, 0, 0, 1]
    ];
    return viewport;
    // CHECK IF THIS WORKS....
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
