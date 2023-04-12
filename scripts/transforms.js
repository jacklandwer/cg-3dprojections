// create a 4x4 matrix to the perspective projection / view matrix
function mat4x4Perspective(prp, srp, vup, clip) {
    //clip array [left, right,bottom, top, near far]

    // 1. translate PRP to origin
    let trans = new Matrix(4,4);
    let x = prp.x;
    let y = prp.y;
    let z = prp.z;
    if(x!=0){
        x = -1*x;
    }
    mat4x4Translate(trans, x, -y, -z);
    console.log(trans);
    // 2. rotate VRC such that (u,v,n) align with (x,y,z)

    
    let vprp =  prp;
    let vsrp =  srp;
    
    let n = vprp.subtract(vsrp);
    console.log(n)
    n.normalize();

    let vups = vup;
    let u = vups.cross(n);

    u.normalize();

    console.log(u);

    let v = n.cross(u);
    console.log(v);
    let Rot = new Matrix(4,4);
    Rot.values = [
        [u.x, u.y, u.z, 0],
        [v.x, v.y, v.z, 0],
        [n.x, n.y, n.z, 0],
        [0,   0,   0,   1]];

    console.log(Rot.values)
    // 3. shear such that CW is on the z-axis
    //DOP - direction of projection. VRC Virtual Viewing Coordinates (VRC) space
    let left = clip[0];
    let right = clip[1];
    let bottom = clip[2];
    let top = clip[3];
    let near = clip[4];
    let far = clip[5];

    let cw = new Vector3((left+right)/2, (bottom+top)/2, -near);
    
    
    let DOP = cw.subtract(vprp)
    console.log("hi", DOP);
    let shx = -cw.x/cw.z;
    let shy =-cw.y/cw.z;

    let shearMatrix = new Matrix(4,4);

    mat4x4ShearXY(shearMatrix, shx, shy);
    console.log(shearMatrix);
    // 4. scale such that view volume bounds are ([z,-z], [z,-z], [-1,zmin])
    //clipping???
    let zmin = -near/far;


    let xScale = (2*near / ((right - left)*far));
    let yScale = (2*near/ ((top - bottom)*far));
    let zScale =  1 / (far);
  
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
    mper.values = [[1, 0, 0, 0],
                   [0, 1, 0, 0],
                   [0, 0, 1, 0],
                   [0, 0, -1, 0]];
    return mper;
}

// create a 4x4 matrix to translate/scale projected vertices to the viewport (window)
function mat4x4Viewport(width, height) {
    let viewport = new Matrix(4, 4);
    viewport.values =  [[width / 2, 0, 0, width/2],
                        [0, height / 2, 0, height/2],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]       ];
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
       mat4x4.values = [[1, 0, 0, tx],
                        [0, 1, 0, ty],
                        [0, 0, 1, tz],
                        [0, 0, 0, 1]];
}

// set values of existing 4x4 matrix to the scale matrix
function mat4x4Scale(mat4x4, sx, sy, sz) {
    mat4x4.values = [[sx, 0, 0, 0],
                     [0, sy, 0, 0],
                     [0, 0, sz, 0],
                     [0, 0, 0, 1]];
}

// set values of existing 4x4 matrix to the rotate about x-axis matrix
function mat4x4RotateX(mat4x4, theta) {
    let cosTheta = Math.cos(theta);
    let sinTheta = Math.sin(theta);
    mat4x4.values = [    [1, 0, 0, 0],
                         [0, cosTheta, -sinTheta, 0],
                         [0, sinTheta, cosTheta, 0],
                         [0, 0, 0, 1],
    ]; //first sineTheta could be negative 
}

// set values of existing 4x4 matrix to the rotate about y-axis matrix
function mat4x4RotateY(mat4x4, theta) {
    let cosTheta = Math.cos(theta);
    let sinTheta = Math.sin(theta);
  
    mat4x4.values = [[cosTheta, 0, sinTheta, 0],
                     [0, 1, 0, 0],
                     [-sinTheta, 0, cosTheta, 0],
                     [0, 0, 0, 1]
    ];//first sine might be negative, and second one positive 
}

// set values of existing 4x4 matrix to the rotate about z-axis matrix
function mat4x4RotateZ(mat4x4, theta) {
    let cosTheta = Math.cos(theta);
    let sinTheta = Math.sin(theta);
    mat4x4.values = [    [cosTheta, -sinTheta, 0, 0],
                         [sinTheta, cosTheta, 0, 0],
                         [0, 0, 1, 0],
                         [0, 0, 0, 1]
    ];
}

// set values of existing 4x4 matrix to the shear parallel to the xy-plane matrix
function mat4x4ShearXY(mat4x4, shx, shy) {

    mat4x4.values = [[1, 0, shx, 0],
                    [0, 1, shy, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1]];
    // mat4x4.values = ...;
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
