const LEFT =   32; // binary 100000
const RIGHT =  16; // binary 010000
const BOTTOM = 8;  // binary 001000
const TOP =    4;  // binary 000100
const FAR =    2;  // binary 000010
const NEAR =   1;  // binary 000001
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
    }

    //
    updateTransforms(time, delta_time) {
        // TODO: update any transformations needed for animation

    }

    //
    rotateLeft() {

    }
    
    //
    rotateRight() {

    }
    
    //
    moveLeft() {

    }
    
    //
    moveRight() {

    }
    
    //
    moveBackward() {

    }
    
    //
    moveForward() {

    }

    //
    draw() {
       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


       let PRP = [0, 10, -5];
       let SRP = [20, 15, -40];
       let VUP = [1, 1, 0];

       //translate in the future for vector 4 to get them for the buttons. 


       let Clip = [-12, 6, -12, 6, 10, 100];

       let clone = mat4x4Perspective(PRP,SRP,VUP,Clip);
        console.log('draw()' );

       
        console.log(this.scene.view)
        //console.log(this.scene.models[0].vertices[0])
        let ob = new Matrix(4,4)

        let view = mat4x4Viewport(this.canvas.width, this.canvas.height);
        for(let i =0; i<this.scene.models.length; i++)
        {
            let model = this.scene.models[i]; 
            console.log(model)
            if (model.type === 'cube') {
                console.log('generating cube vertices');

                // Generate vertices for the cube
                model.vertices = []; //Cannot set properties of undefined (setting 'vertices')
                let cubeHalfWidth = model.width / 2;
                let cubeHalfHeight = model.height / 2;
                let cubeHalfDepth = model.depth / 2;
                model.vertices = [  Vector4(model.center.x - cubeHalfWidth, model.center.y - cubeHalfHeight, model.center.z - cubeHalfDepth, 1),
                                    Vector4(model.center.x - cubeHalfWidth, model.center.y - cubeHalfHeight, model.center.z + cubeHalfDepth, 1),
                                    Vector4(model.center.x - cubeHalfWidth, model.center.y + cubeHalfHeight, model.center.z - cubeHalfDepth, 1),
                                    Vector4(model.center.x - cubeHalfWidth, model.center.y + cubeHalfHeight, model.center.z + cubeHalfDepth, 1),
                                    Vector4(model.center.x + cubeHalfWidth, model.center.y - cubeHalfHeight, model.center.z - cubeHalfDepth, 1),
                                    Vector4(model.center.x + cubeHalfWidth, model.center.y - cubeHalfHeight, model.center.z + cubeHalfDepth, 1),
                                    Vector4(model.center.x + cubeHalfWidth, model.center.y + cubeHalfHeight, model.center.z - cubeHalfDepth, 1),
                                    Vector4(model.center.x + cubeHalfWidth, model.center.y + cubeHalfHeight, model.center.z + cubeHalfDepth, 1)];
                
                console.log(model)
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

                // Add the edges to the model object
                model.edges = edges;

                console.log(edges)
                



                for (let k = 0; k<model.edges.length; k++)
                {
                     let edge = model.edges[k];
                     console.log(edge);
                
                     for(let l = 0; l<edge.length-1; l++)
                     {   
                        let vertexIndex1 = edge[l];
                        let vertexIndex2 = edge[l + 1];

                        let vertex1 = model.vertices[vertexIndex1];
                        let vertex2 = model.vertices[vertexIndex2];
                        

                        console.log("hi", vertex1, vertex2);
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
                     }}
                }
             
                    
            if(model.type === "generic")
            {
            //check for type 
                console.log(model)
                 for (let k = 0; k<model.edges.length; k++)
                {
                     let edge = model.edges[k];
                     console.log(edge, edge.length);
                
                     for(let l = 0; l<edge.length-1; l++)
                     {   
                        let vertexIndex1 = edge[l];
                        let vertexIndex2 = edge[l + 1];
                        let vertex1 = model.vertices[vertexIndex1];
                        let vertex2 = model.vertices[vertexIndex2];

                        console.log(vertex1, vertexIndex1)

                        console.log("hi", vertex1);
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

                    //     * draw line
                        this.drawLine(Vertex1View.x, Vertex1View.y, Vertex2View.x, Vertex2View.y);
                }
            }}
        }
    }

        
         // TODO: implement drawing here!
        //For each model
        //   * For each vertex
        //     * transform endpoints to canonical view volume
        //   * For each line segment in each edge
        //     * clip in 3D
        //     * project to 2D
        //     * translate/scale to viewport (i.e. window)
        //     * draw line
    
    generateEdges(model) {
        let edges = [];
        let vertices = model.vertices
      
        // Iterate over every vertex
        for (let i = 0; i < vertices.length; i++) {
          // Connect to the next vertex in the list
          if (i + 1 < vertices.length) {
            edges.push([vertices[i], vertices[i + 1]]);
          }
          // Connect to the corresponding vertex in the next face
          if (i + 4 < vertices.length) {
            edges.push([vertices[i], vertices[i + 4]]);
          }
          // Connect to the corresponding vertex in the next face and the next vertex in the list
          if (i + 5 < vertices.length) {
            edges.push([vertices[i], vertices[i + 5]]);
          }
        }
    
        return edges;
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
        
        // TODO: implement clipping here!
        
        return result;
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
                                                scene.models[i].vertices[j][2], 1));
                
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
