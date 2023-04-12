const LEFT = 32; // binary 100000
const RIGHT = 16; // binary 010000
const BOTTOM = 8;  // binary 001000
const TOP = 4;  // binary 000100
const FAR = 2;  // binary 000010
const NEAR = 1;  // binary 000001
const FLOAT_EPSILON = 0.000001;

class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // scene:               object (...see description on Canvas)
    constructor(canvas, scene) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.scene = this.processScene(scene);
        this.enable_animation = false;  // <-- disabled for easier debugging; enable for animation
        this.start_time = null;
        this.prev_time = null;


        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.rotateLeft();
            } else if (event.key === 'ArrowRight') {
                this.rotateRight();
            } else if (event.key === 'A') {
                this.moveLeft();
            } else if (event.key === 'D') {
                this.moveRight();
            } else if (event.key === 'S') {
                this.moveBackward();
            } else if (event.key === 'W') {
                this.moveForward();
            }
        });



    }

    //
    updateTransforms(time, delta_time) {
        // TODO: update any transformations needed for animation

        // what all needs to be done here..?? 

        /*
        Rotation can be in the x, y, or z axis
        Animating models should rotate about their own center
        Rotation speed defined in terms of revolutions per second
        */






    }


    // Left arrow pressed. Rotate SRP around the v-axis with the PRP as the origin.
    rotateLeft() {
        console.log("rotating left");

        let angle = -Math.PI / 90;

        // Get the current SRP coordinates 
        let srp = this.scene.view.srp;
        let srpX = srp.x;
        let srpY = srp.y;
        let srpZ = srp.z;

        // Translate the SRP coordinates to the origin
        let prp = this.scene.view.prp;
        let newSrpX = srpX - prp.x;
        let newSrpY = srpY - prp.y;
        let newSrpZ = srpZ - prp.z;

        // Rotate the SRP around the v-axis
        let rotatedSrpX = newSrpX * Math.cos(angle) + newSrpZ * Math.sin(angle);
        let rotatedSrpY = newSrpY;
        let rotatedSrpZ = newSrpZ * Math.cos(angle) - newSrpX * Math.sin(angle);

        // Translate the rotated SRP coordinates back to the original position
        let finalSrpX = rotatedSrpX + prp.x;
        let finalSrpY = rotatedSrpY + prp.y;
        let finalSrpZ = rotatedSrpZ + prp.z;

        // Update the SRP coordinates in the processed scene object
        this.scene.view.srp = Vector3(finalSrpX, finalSrpY, finalSrpZ);
        
        this.draw();

    }

    // Right arrow pressed. Rotate SRP around the v-axis with the PRP as the origin.
    rotateRight() {
        console.log('rotating right');

        let angle = Math.PI / 90;

        // Get the current SRP coordinates
        let srp = this.scene.view.srp;
        let srpX = srp.x;
        let srpY = srp.y;
        let srpZ = srp.z;

        // Translate the SRP coordinates to the origin
        let prp = this.scene.view.prp;
        let newSrpX = srpX - prp.x;
        let newSrpY = srpY - prp.y;
        let newSrpZ = srpZ - prp.z;

        // Rotate the SRP around the v-axis
        let rotatedSrpX = newSrpX * Math.cos(angle) + newSrpZ * Math.sin(angle);
        let rotatedSrpY = newSrpY;
        let rotatedSrpZ = newSrpZ * Math.cos(angle) - newSrpX * Math.sin(angle);

        // Translate the rotated SRP coordinates back to the original position
        let finalSrpX = rotatedSrpX + prp.x;
        let finalSrpY = rotatedSrpY + prp.y;
        let finalSrpZ = rotatedSrpZ + prp.z;

        // Update the SRP coordinates in the processed scene object
        this.scene.view.srp = Vector3(finalSrpX, finalSrpY, finalSrpZ);

        this.draw();

    }

    // A: translate the PRP and SRP along the u-axis.
    moveLeft() {
        console.log('moving left');

        let dx = 1; // the amount to move to the left. CAN CHANGE ACCORDINGLY.
        let view = this.scene.view;

        // update PRP
        let prp = view.prp;
        prp.x += dx;

        // update SRP
        let srp = view.srp;
        srp.x += dx;

        this.draw();
    }

    // D: translate the PRP and SRP along the u-axis.
    moveRight() {
        console.log('moving right');

        let dx = 1; // the amount to move to the right. CAN CHANGE ACCORDINGLY.
        let view = this.scene.view;

        // update PRP
        let prp = view.prp;
        prp.x -= dx;

        // update SRP
        let srp = view.srp;
        srp.x -= dx;

        this.draw();
    }

    // S: translate the PRP and SRP along the n-axis.
    moveBackward() {
        console.log('moving backwards');

        let dz = 1; // the amount to move backwards. CAN CHANGE ACCORDINGLY.
        let view = this.scene.view;

        // update PRP
        let prp = view.prp;
        prp.z += dz;

        // update SRP
        let srp = view.srp;
        srp.z += dz;

        this.draw();
    }

    // W: translate the PRP and SRP along the n-axis.
    moveForward() {
        console.log('moving forwards');

        let dz = 1; // the amount to move forwards. CAN CHANGE ACCORDINGLY.
        let view = this.scene.view;

        // update PRP
        let prp = view.prp;
        prp.z -= dz;

        // update SRP
        let srp = view.srp;
        srp.z -= dz;

        this.draw();
    }

    //
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        console.log('draw()');

        // TODO: implement drawing here!
        // For each model
        //   * For each vertex
        //     * transform endpoints to canonical view volume
        //   * For each line segment in each edge
        //     * clip in 3D
        //     * project to 2D
        //     * translate/scale to viewport (i.e. window)
        //     * draw line


        let PRP = this.scene.view.prp;
        let SRP = this.scene.view.srp;
        let VUP = this.scene.view.vup;
        let Clip = this.scene.view.clip;
        let clone = mat4x4Perspective(PRP, SRP, VUP, Clip);
        let view = mat4x4Viewport(this.canvas.width, this.canvas.height);


        for (let i = 0; i < this.scene.models.length; i++) {
            let model = this.scene.models[i];

            if (model.type === 'generic') {
                for (let k = 0; k < model.edges.length; k++) {
                    let edge = model.edges[k];

                    for (let l = 0; l < edge.length - 1; l++) {
                        let vertexIndex1 = edge[l];
                        let vertexIndex2 = edge[l + 1];
                        let vertex1 = model.vertices[vertexIndex1];
                        let vertex2 = model.vertices[vertexIndex2];

                        // project to 2D
                        let Vertex1Persp = Matrix.multiply([clone, vertex1]);
                        let Vertex2Persp = Matrix.multiply([clone, vertex2]);

                        // translate/scale to viewport (i.e. window)
                        let Vertex1View = Matrix.multiply([view, Vertex1Persp]);
                        let Vertex2View = Matrix.multiply([view, Vertex2Persp]);

                        Vertex1View.x /= Vertex1View.w;
                        Vertex1View.y /= Vertex1View.w;
                        Vertex2View.x /= Vertex2View.w;
                        Vertex2View.y /= Vertex2View.w;

                        // draw line
                        this.drawLine(Vertex1View.x, Vertex1View.y, Vertex2View.x, Vertex2View.y);
                    }
                }

            }


            if (model.type === 'cube') {
                console.log('generating cube vertices');

                // Generate vertices for the cube
                model.vertices = [];
                let cubeHalfWidth = model.width / 2;
                let cubeHalfHeight = model.height / 2;
                let cubeHalfDepth = model.depth / 2;

                model.vertices = [
                    Vector4(model.center.x - cubeHalfWidth, model.center.y - cubeHalfHeight, model.center.z - cubeHalfDepth, model.center.w),
                    Vector4(model.center.x - cubeHalfWidth, model.center.y - cubeHalfHeight, model.center.z + cubeHalfDepth, model.center.w),
                    Vector4(model.center.x - cubeHalfWidth, model.center.y + cubeHalfHeight, model.center.z - cubeHalfDepth, model.center.w),
                    Vector4(model.center.x - cubeHalfWidth, model.center.y + cubeHalfHeight, model.center.z + cubeHalfDepth, model.center.w),
                    Vector4(model.center.x + cubeHalfWidth, model.center.y - cubeHalfHeight, model.center.z - cubeHalfDepth, model.center.w),
                    Vector4(model.center.x + cubeHalfWidth, model.center.y - cubeHalfHeight, model.center.z + cubeHalfDepth, model.center.w),
                    Vector4(model.center.x + cubeHalfWidth, model.center.y + cubeHalfHeight, model.center.z - cubeHalfDepth, model.center.w),
                    Vector4(model.center.x + cubeHalfWidth, model.center.y + cubeHalfHeight, model.center.z + cubeHalfDepth, model.center.w)
                ];

                let edges = []
                for (let i = 0; i < model.vertices.length; i++) {
                    for (let j = i + 1; j < model.vertices.length; j++) {
                        // Check if the vertices share two coordinates and connect them if they do
                        let sharedCoords = 0;
                        for (let k = 0; k < 3; k++) {
                            if (model.vertices[i][k] === model.vertices[j][k]) {
                                sharedCoords++;
                            }
                        }
                        if (sharedCoords === 2) {
                            edges.push([i, j]);
                        }
                    }
                }
                edges.push([0, 1, 3, 2, 0]); // Bottom face
                edges.push([4, 5, 7, 6, 4]); // Top face
                edges.push([0, 4]); // Side edges
                edges.push([1, 5]);
                edges.push([2, 6]);
                edges.push([3, 7]);
                model.edges = edges; // Add the edges to the model object

                for (let k = 0; k < model.edges.length; k++) {
                    let edge = model.edges[k];

                    for (let l = 0; l < edge.length - 1; l++) {
                        let vertexIndex1 = edge[l];
                        let vertexIndex2 = edge[l + 1];

                        let vertex1 = model.vertices[vertexIndex1];
                        let vertex2 = model.vertices[vertexIndex2];

                        //     * project to 2D
                        let Vertex1Persp = Matrix.multiply([clone, vertex1]);
                        let Vertex2Persp = Matrix.multiply([clone, vertex2]);

                        //     * translate/scale to viewport (i.e. window)
                        let Vertex1View = Matrix.multiply([view, Vertex1Persp]);
                        let Vertex2View = Matrix.multiply([view, Vertex2Persp]);

                        Vertex1View.x /= Vertex1View.w;
                        Vertex1View.y /= Vertex1View.w;
                        Vertex2View.x /= Vertex2View.w;
                        Vertex2View.y /= Vertex2View.w;
                        this.drawLine(Vertex1View.x, Vertex1View.y, Vertex2View.x, Vertex2View.y);
                    }
                }


            }

            if (model.type === 'cone') {
                console.log('generating cone vertices');

                model.vertices = [];
                let TWO_PI = 2 * Math.PI;
                let deltaTheta = TWO_PI / model.sides;
                let halfHeight = model.height / 2;

                // Create the base of the cone
                for (let k = 0; k < model.sides; k++) {
                    let theta = k * deltaTheta;
                    let x = model.center.x + (model.radius * Math.cos(theta));
                    let z = model.center.z + (model.radius * Math.sin(theta));

                    model.vertices.push(Vector4(x, model.center.y - halfHeight, z, model.center.w));
                }

                // Create the tip of the cone
                model.vertices.push(Vector4(model.center.x, model.center.y + halfHeight, model.center.z, model.center.w));

                // Create the sides of the cone
                for (let k = 0; k < model.sides; k++) {
                    let theta = k * deltaTheta;
                    let x = model.center.x + (model.radius * Math.cos(theta));
                    let z = model.center.z + (model.radius * Math.sin(theta));

                    model.vertices.push(Vector4(x, model.center.y - halfHeight, z, model.center.w));
                    model.vertices.push(Vector4(model.center.x, model.center.y + halfHeight, model.center.z, model.center.w));
                }

            }

            if (model.type === 'cylinder') {
                console.log('generating cylinder vertices');

                // Generate vertices for the cylinder
                model.vertices = [];
                for (let k = 0; k < model.sides; k++) {
                    let theta = k * 2 * Math.PI / model.sides;
                    let x = model.center.x + model.radius * Math.cos(theta);
                    let y = model.center.y + model.height / 2;
                    let z = model.center.z + model.radius * Math.sin(theta);
                    model.vertices.push(Vector4(x, y, z, model.center.w));
                }

                for (let k = 0; k < model.sides; k++) {
                    let theta = k * 2 * Math.PI / model.sides;
                    let x = model.center.x + model.radius * Math.cos(theta);
                    let y = model.center.y - model.height / 2;
                    let z = model.center.z + model.radius * Math.sin(theta);
                    model.vertices.push(Vector4(x, y, z, model.center.w));
                }


            }

            if (model.type === 'sphere') {
                console.log('generating sphere vertices');

                model.vertices = [];
                let PI = Math.PI;
                let TWO_PI = 2 * PI;
                let deltaPhi = PI / model.stacks;
                let deltaTheta = TWO_PI / model.slices;

                for (let k = 0; k <= model.stacks; k++) {
                    let phi = k * deltaPhi;
                    let sinPhi = Math.sin(phi);
                    let cosPhi = Math.cos(phi);

                    for (let j = 0; j <= model.slices; j++) {
                        let theta = j * deltaTheta;
                        let sinTheta = Math.sin(theta);
                        let cosTheta = Math.cos(theta);

                        let x = model.center.x + (model.radius * sinPhi * cosTheta);
                        let y = model.center.y + (model.radius * sinPhi * sinTheta);
                        let z = model.center.z + (model.radius * cosPhi);

                        model.vertices.push(Vector4(x, y, z, model.center.w));
                    }
                }


            }


            console.log(model.vertices, model.edges);
        }




    }

    // Get outcode for a vertex
    // vertex:       Vector4 (transformed vertex in homogeneous coordinates)
    // z_min:        float (near clipping plane in canonical view volume)
    outcodePerspective(vertex, z_min) {
        let outcode = 0;
        if (vertex.x < (vertex.z - FLOAT_EPSILON)) {
            outcode += LEFT;
        }
        else if (vertex.x > (-vertex.z + FLOAT_EPSILON)) {
            outcode += RIGHT;
        }
        if (vertex.y < (vertex.z - FLOAT_EPSILON)) {
            outcode += BOTTOM;
        }
        else if (vertex.y > (-vertex.z + FLOAT_EPSILON)) {
            outcode += TOP;
        }
        if (vertex.z < (-1.0 - FLOAT_EPSILON)) {
            outcode += FAR;
        }
        else if (vertex.z > (z_min + FLOAT_EPSILON)) {
            outcode += NEAR;
        }
        return outcode;
    }

    // Clip line - should either return a new line (with two endpoints inside view volume)
    //             or null (if line is completely outside view volume)
    // line:         object {pt0: Vector4, pt1: Vector4}
    // z_min:        float (near clipping plane in canonical view volume)
    clipLinePerspective(line, z_min) {
        let result = null;
        let p0 = Vector3(line.pt0.x, line.pt0.y, line.pt0.z);
        let p1 = Vector3(line.pt1.x, line.pt1.y, line.pt1.z);
        let out0 = this.outcodePerspective(p0, z_min);
        let out1 = this.outcodePerspective(p1, z_min);

        // check if line is completely outside view volume
        if ((out0 & out1) !== 0) {
            return null;
        }

        // clip against each view volume plane
        while (out0 !== 0 || out1 !== 0) {
            // is this condition still needed here if its being checked before the while loop???
            if ((out0 & out1) !== 0) { // the line segment is completely outside the plane
                return null;
            }

            let out = (out0 !== 0) ? out0 : out1;
            let p = (out0 !== 0) ? p0 : p1;

            // DO I WANT TO USE THE CONSTANTS FOR LEFT/RIGHT/TOP/BOTTOM???
            // MAKE SURE THE CLIPPING ORDER IS CORRECT TOO...

            if ((out & 1) !== 0) { // clip against left plane
                let t = (z_min - p.x) / (p1.x - p0.x);
                p = p0 + (p1 - p0) * t;
            } else if ((out & 2) !== 0) { // clip against right plane
                let t = (p.x - z_min) / (p0.x - p1.x);
                p = p1 + (p0 - p1) * t;
            } else if ((out & 4) !== 0) { // clip against bottom plane
                let t = (z_min - p.y) / (p1.y - p0.y);
                p = p0 + (p1 - p0) * t;
            } else if ((out & 8) !== 0) { // clip against top plane
                let t = (p.y - z_min) / (p0.y - p1.y);
                p = p1 + (p0 - p1) * t;
            } else if ((out & 16) !== 0) { // clip against near plane
                let t = (z_min - p.z) / (p1.z - p0.z);
                p = p0 + (p1 - p0) * t;
            } else if ((out & 32) !== 0) { // clip against far plane
                let t = (1 - p.z) / (p0.z - p1.z);
                p = p1 + (p0 - p1) * t;
            }

            if (out === out0) {
                p0 = p;
                out0 = this.outcodePerspective(p0, z_min);
            } else {
                p1 = p;
                out1 = this.outcodePerspective(p1, z_min);
            }
        }

        // line segment is partially or completely inside the view volume
        result = {
            pt0: new Vector4(p0.x, p0.y, p0.z, line.pt0.w),
            pt1: new Vector4(p1.x, p1.y, p1.z, line.pt1.w)
        };

        return result;

        //NEED TO CHECK IF THIS IS FUNCTIONING PROPERLY...
    }

    //
    animate(timestamp) {
        // Get time and delta time for animation
        if (this.start_time === null) {
            this.start_time = timestamp;
            this.prev_time = timestamp;
        }
        let time = timestamp - this.start_time;
        let delta_time = timestamp - this.prev_time;

        // Update transforms for animation
        this.updateTransforms(time, delta_time);

        // Draw slide
        this.draw();

        // Invoke call for next frame in animation
        if (this.enable_animation) {
            window.requestAnimationFrame((ts) => {
                this.animate(ts);
            });
        }

        // Update previous time to current one for next calculation of delta time
        this.prev_time = timestamp;
    }

    //
    updateScene(scene) {
        this.scene = this.processScene(scene);
        if (!this.enable_animation) {
            this.draw();
        }
    }

    //
    processScene(scene) {
        let processed = {
            view: {
                prp: Vector3(scene.view.prp[0], scene.view.prp[1], scene.view.prp[2]),
                srp: Vector3(scene.view.srp[0], scene.view.srp[1], scene.view.srp[2]),
                vup: Vector3(scene.view.vup[0], scene.view.vup[1], scene.view.vup[2]),
                clip: [...scene.view.clip]
            },
            models: []
        };

        for (let i = 0; i < scene.models.length; i++) {
            let model = { type: scene.models[i].type };
            if (model.type === 'generic') {
                model.vertices = [];
                model.edges = JSON.parse(JSON.stringify(scene.models[i].edges));
                for (let j = 0; j < scene.models[i].vertices.length; j++) {
                    model.vertices.push(Vector4(scene.models[i].vertices[j][0],
                        scene.models[i].vertices[j][1],
                        scene.models[i].vertices[j][2],
                        1));
                    if (scene.models[i].hasOwnProperty('animation')) {
                        model.animation = JSON.parse(JSON.stringify(scene.models[i].animation));
                    }
                }
            }
            else {
                model.center = Vector4(scene.models[i].center[0],
                    scene.models[i].center[1],
                    scene.models[i].center[2],
                    1);
                for (let key in scene.models[i]) {
                    if (scene.models[i].hasOwnProperty(key) && key !== 'type' && key != 'center') {
                        model[key] = JSON.parse(JSON.stringify(scene.models[i][key]));
                    }
                }
            }

            model.matrix = new Matrix(4, 4);
            processed.models.push(model);
        }

        return processed;
    }

    // x0:           float (x coordinate of p0)
    // y0:           float (y coordinate of p0)
    // x1:           float (x coordinate of p1)
    // y1:           float (y coordinate of p1)
    drawLine(x0, y0, x1, y1) {
        this.ctx.strokeStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();

        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(x0 - 2, y0 - 2, 4, 4);
        this.ctx.fillRect(x1 - 2, y1 - 2, 4, 4);
    }
};
