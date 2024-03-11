import * as CG from "./transforms.js";
import { Matrix } from "./matrix.js";
class Renderer {
  // canvas:              object ({id: __, width: __, height: __})
  // limit_fps_flag:      bool
  // fps:                 int
  constructor(canvas, limit_fps_flag, fps) {
    this.canvas = document.getElementById(canvas.id);
    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
    this.ctx = this.canvas.getContext("2d");
    this.slide_idx = 0;
    this.limit_fps = limit_fps_flag;
    this.fps = fps;
    this.start_time = null;
    this.prev_time = null;
    this.models = {
      slide0: [
        {
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 50,
          origin: 400,
          num_sides: 30,
          vx: 500,
          vy: 230,
        }
      ],
      slide1: [
        { // face of the clock
          vertices: [ // based about the origin
            CG.Vector3(-260,0,1),
            CG.Vector3(-195,195,1),
            CG.Vector3(0,260,1),
            CG.Vector3(195,195,1),
            CG.Vector3(260,0,1),
            CG.Vector3(195,-195,1),
            CG.Vector3(0,-260,1),
            CG.Vector3(-195,-195,1),
          ],
          rotation: new Matrix(3, 3),
          translation: new Matrix(3, 3), // to be set in drawSlide1
          velocity: 0,                   // to be set in drawSlide1
          color: new Matrix(1,4)         // to be set in drawSlide1
        },
        { // long hand of the clock
          vertices: [ // based about the orgin
            CG.Vector3(-15,0,1),
            CG.Vector3(0,240,1),
            CG.Vector3(15,0,1),
            CG.Vector3(0,-75,1)
          ],
          rotation: new Matrix(3, 3),
          translation: new Matrix(3, 3), // to be set in drawSlide1
          velocity: 0,                   // to be set in drawSlide1
          color: new Matrix(1,4)         // to be set in drawSlide1
        },
        { // short hand of the clock
          vertices: [ // based about the orgin
            CG.Vector3(-15,0,1),
            CG.Vector3(0,150,1),
            CG.Vector3(15,0,1),
            CG.Vector3(0,-75,1),
          ],
          rotation: new Matrix(3, 3),
          translation: new Matrix(3, 3), // to be set in drawSlide1
          velocity: 0,                   // to be set in drawSlide1
          color: new Matrix(1,4)         // to be set in drawSlide1
        }
      ],
      slide2: [
        {
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 40,
          origin_x: 450,
          origin_y: 300,
          num_sides: 6,
          growth_rate: 2,
          scaling_magnitude_x: 1.6,
          scaling_magnitude_y: 1.6,
          current_scale_x: 1,
          current_scale_y: 1,
          color: [255, 40, 100, 255],
        },
        {
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 60,
          origin_x: 150,
          origin_y: 200,
          num_sides: 5,
          growth_rate: 3,
          scaling_magnitude_x: 1.5,
          scaling_magnitude_y: 2,
          current_scale_x: 1,
          current_scale_y: 1,
          color: [30, 100, 240, 255],
        },
        {
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 100,
          origin_x: 650,
          origin_y: 350,
          num_sides: 9,
          growth_rate: 4,
          scaling_magnitude_x: 2,
          scaling_magnitude_y: 6,
          current_scale_x: 1,
          current_scale_y: 1,
          color: [255, 120, 160, 255],
        },
      ],
      slide3: [],
      slide3: [
        { // ONE
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 200,
          origin: 200,
          num_sides: 30,
          vx: -100,
          vy: 70,
          color: new Matrix(1, 4)
        },
        { // TWO
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 200,
          origin: 200,
          num_sides: 30,
          vx: 130,
          vy: -80,
          color: new Matrix(1, 4)
        },
        { // THREE
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 200,
          origin: 400,
          num_sides: 30,
          vx: 80,
          vy: -190,
          color: new Matrix(1, 4)
        },
        { // FOUR
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 150,
          origin: 300,
          num_sides: 30,
          vx: 100,
          vy: 140,
          color: new Matrix(1, 4)
        },
        { // FIVE
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 150,
          origin: 250,
          num_sides: 30,
          vx: -100,
          vy: 110,
          color: new Matrix(1, 4)
        },
        { // SIX
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 150,
          origin: 400,
          num_sides: 30,
          vx: -100,
          vy: -120,
          color: new Matrix(1, 4)
        },
        { // SEVEN
          vertices: [ // based about the origin
            CG.Vector3(-90,0,1),
            CG.Vector3(-60,60,1),
            CG.Vector3(0,90,1),
            CG.Vector3(60,60,1),
            CG.Vector3(90,0,1),
            CG.Vector3(60,-60,1),
            CG.Vector3(0,-90,1),
            CG.Vector3(-60,-60,1),
          ],
          rotation: new Matrix(3, 3),
          translation: new Matrix(3, 3), // to be set in drawSlide1
          velocity: 0,                   // to be set in drawSlide1
          color: new Matrix(1,4)         // to be set in drawSlide1
        },
        { // EIGHT
          vertices: [ // based about the origin
            CG.Vector3(-90,0,1),
            CG.Vector3(-60,60,1),
            CG.Vector3(0,90,1),
            CG.Vector3(60,60,1),
            CG.Vector3(90,0,1),
            CG.Vector3(60,-60,1),
            CG.Vector3(0,-90,1),
            CG.Vector3(-60,-60,1),
          ],
          rotation: new Matrix(3, 3),
          translation: new Matrix(3, 3), // to be set in drawSlide1
          velocity: 0,                   // to be set in drawSlide1
          color: new Matrix(1,4)         // to be set in drawSlide1
        },
        { // NINE
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 150,
          origin_x: 600,
          origin_y: 400,
          num_sides: 16,
          growth_rate: 2,
          scaling_magnitude_x: 6,
          scaling_magnitude_y: 6,
          current_scale_x: 1,
          current_scale_y: 1,
        },
        { // TEN
          vertices: [],
          transform: new Matrix(3, 3),
          radius: 125,
          origin_x: 200,
          origin_y: 200,
          num_sides: 16,
          growth_rate: 4,
          scaling_magnitude_x: 4,
          scaling_magnitude_y: 4,
          current_scale_x: 1,
          current_scale_y: 1,
        },
      ]
    };

    // SLIDE 0 STUFF

    // a circle with 30 sides looks pretty good,
    // so I iterate 30 times here defining a new
    // vertex in each iteration

    //--------------------- CIRCLE GENERATOR ---------------------//
    // a circle with 30 sides looks pretty good, so I iterate 30 times here defining a new vertex in each iteration
    let model_list = [ this.models.slide0[0], this.models.slide3[0], this.models.slide3[1], this.models.slide3[2], this.models.slide3[3], this.models.slide3[4], this.models.slide3[5] ];
    for ( let model_idx = 0; model_idx < model_list.length; model_idx++ ) {
      for (let i = 0; i < model_list[model_idx].num_sides; i++) {
        // calculating the current angle here. basically just making my way around the unit circle by iterating from 0 to 2PI by increments of (2PI / num sides)
        let currentTheta = (i / model_list[model_idx].num_sides) * (2 * Math.PI);

        // calculate the new vertex position and push it to the list of vertices in the models.slide0[0] object as a Vector3
        model_list[model_idx].vertices.push(
          CG.Vector3( model_list[model_idx].origin + model_list[model_idx].radius * Math.cos(currentTheta),
                      model_list[model_idx].origin + model_list[model_idx].radius * Math.sin(currentTheta), 1 ) );
      }
    }

    // SLIDE 2 STUFF

    //--------------------- SLIDE TWO AND THREE POLYGON GENERATION ---------------------//
    // create polygon using same method as i did for circle (above)
    model_list = [ this.models.slide2[0], this.models.slide2[1], this.models.slide2[2], this.models.slide3[8], this.models.slide3[9] ];
    for ( let model_idx = 0; model_idx < model_list.length; model_idx++ ) {
      for (let i = 0; i < model_list[model_idx].num_sides; i++) {
        let currentTheta = (i / model_list[model_idx].num_sides) * (2 * Math.PI);
        model_list[model_idx].vertices.push(
          CG.Vector3( model_list[model_idx].origin_x + model_list[model_idx].radius * Math.cos(currentTheta),
                      model_list[model_idx].origin_y + model_list[model_idx].radius * Math.sin(currentTheta), 1 ) );
      }
    }
  }

  // flag:  bool
  limitFps(flag) {
    this.limit_fps = flag;
  }
  // n:  int
  setFps(n) {
    this.fps = n;
  }
  // idx: int
  setSlideIndex(idx) {
    this.slide_idx = idx;
  }
  animate(timestamp) {
    // Get time and delta time for animation
    if (this.start_time === null) {
      this.start_time = timestamp;
      this.prev_time = timestamp;
    }
    let time = timestamp - this.start_time;
    let delta_time = timestamp - this.prev_time;
    //console.log('animate(): t = ' + time.toFixed(1) + ', dt = ' + delta_time.toFixed(1));
    // Update transforms for animation
    this.updateTransforms(time, delta_time);
    // Draw slide
    this.drawSlide();
    // Invoke call for next frame in animation
    if (this.limit_fps) {
      setTimeout(() => {
        window.requestAnimationFrame((ts) => {
          this.animate(ts);
        });
      }, Math.floor(1000.0 / this.fps));
    } else {
      window.requestAnimationFrame((ts) => {
        this.animate(ts);
      });
    }
    // Update previous time to current one for next calculation of delta time
    this.prev_time = timestamp;
  }

  //
  updateTransforms(time, delta_time) {
    // TODO: update any transformations needed for animation

    // -------------- SLIDE ZERO -------------- //

    // all code below just handles bouncing
    // had to do some weird stuff here to
    // make it work without glitchess

    // iterate over all vertices
    for (let i = 0; i < this.models.slide0[0].vertices.length; i++) {
      // create reference to vector3 at index i
      let vector = this.models.slide0[0].vertices[i];

      // calculate its cartesian coordinates using
      // the homogeneous formula we saw in class
      let cartesianX = vector.values[0] / vector.values[2];
      let cartesianY = vector.values[1] / vector.values[2];

      // if the x coord of what should be the next
      // frame's location for this particular vector
      // is at the left of the canvas, change the
      // x velocity of the circle to be positive
      if (cartesianX + (this.models.slide0[0].vx * delta_time / 1000) <= 0) {
        this.models.slide0[0].vx = Math.abs(this.models.slide0[0].vx);
      }

      // if the y coord of what should be the next
      // frame's location for this particular vector
      // is at the right of the canvas, change the
      // x velocity of the circle to be negative
      else if (cartesianX + (this.models.slide0[0].vx * delta_time / 1000) >= this.canvas.width) {
        this.models.slide0[0].vx = Math.abs(this.models.slide0[0].vx) * -1;
      }

      // if the y coord of what should be the next
      // frame's location for this particular vector
      // is at the bottom of the canvas, change the
      // y velocity of the circle to be positive
      if (cartesianY + (this.models.slide0[0].vy * delta_time / 1000) <= 0) {
        this.models.slide0[0].vy = Math.abs(this.models.slide0[0].vy);
      }

      // if the y coord of what should be the next
      // frame's location for this particular vector
      // is at the top of the canvas, change the
      // y velocity of the circle to be negative
      else if (cartesianY + (this.models.slide0[0].vy * delta_time / 1000) >= this.canvas.height) {
        this.models.slide0[0].vy = Math.abs(this.models.slide0[0].vy) * -1;
      }

      // NOTE: I had to use the Math.abs stuff cause
      // sometimes the ball would get stuck on an edge
      // toggling back and forth between pos and neg
    }


    // update the model's transform matrix.
    // this method just overwrites whatever matrix
    // used to be referenced there, with a new one
    // of those homogeneous matrices. keep in mind
    // that delta time is in ms, so I div by 1k here
    // otherwise it would move too fast
    CG.mat3x3Translate( this.models.slide0[0].transform,
                       (this.models.slide0[0].vx * delta_time) / 1000,
                       (this.models.slide0[0].vy * delta_time) / 1000 );


    //--------------------- SLIDE ZERO AND THREE ---------------------//
    // iterate over all vertices
    let model_list = [ this.models.slide0[0], this.models.slide3[0], this.models.slide3[1], this.models.slide3[2], this.models.slide3[3], this.models.slide3[4], this.models.slide3[5] ];
    for ( let model_idx = 0; model_idx < model_list.length; model_idx++ ) {
      for ( let i = 0; i < model_list[model_idx].vertices.length; i++ ) {
        // create reference to vector3 at index i
        let vector = model_list[model_idx].vertices[i];

        // calculate its cartesian coordinates using the homogeneous formula we saw in class
        let cartesianX = vector.values[0] / vector.values[2];
        let cartesianY = vector.values[1] / vector.values[2];

        // if the x coord of what should be the next frame's location for this particular vector is at the left of the canvas, change the x velocity of the circle to be positive
        if (cartesianX + (model_list[model_idx].vx * delta_time / 1000) <= 0) {
          model_list[model_idx].vx = Math.abs(model_list[model_idx].vx);
        } else if (cartesianX + (model_list[model_idx].vx * delta_time / 1000) >= this.canvas.width) { // if the y coord of what should be the next frame's location for this particular vector is at the right of the canvas, change the x velocity of the circle to be negative
          model_list[model_idx].vx = Math.abs(model_list[model_idx].vx) * -1;
        }

        // if the y coord of what should be the next frame's location for this particular vector is at the bottom of the canvas, change the y velocity of the circle to be positive
        if (cartesianY + (model_list[model_idx].vy * delta_time / 1000) <= 0) {
          model_list[model_idx].vy = Math.abs(model_list[model_idx].vy);
        } else if (cartesianY + (model_list[model_idx].vy * delta_time / 1000) >= this.canvas.height) { // if the y coord of what should be the next frame's location for this particular vector is at the top of the canvas, change the y velocity of the circle to be negative
          model_list[model_idx].vy = Math.abs(model_list[model_idx].vy) * -1;
        }
      }
      // update the model's transform matrix. this method just overwrites whatever matrix used to be referenced there, with a new one of those homogeneous matrices. keep in mind that delta time is in ms, so I div by 1k here otherwise it would move too fast
      CG.mat3x3Translate( model_list[model_idx].transform, 
                         (model_list[model_idx].vx * delta_time) / 1000, 
                         (model_list[model_idx].vy * delta_time) / 1000 );
    }

    //--------------------- SLIDE ONE AND THREE ---------------------//
    model_list = [ this.models.slide1[0], this.models.slide1[1], this.models.slide1[2], this.models.slide3[6], this.models.slide3[7] ];
    for ( let model_idx = 0; model_idx < model_list.length; model_idx++ ) {
        // make referencing each model easier
        let current_model = model_list[model_idx];

        let theta = ( current_model.velocity / 1000.0 ) * time; // time is in milliseconds
        if ( theta >= (2*Math.PI) ) {
            theta = theta - (2*Math.PI); // resets theta after a full circle is complete
        }
        CG.mat3x3Rotate( current_model.rotation, theta );
    }

    //--------------------- SLIDE TWO AND THREE ---------------------//
    model_list = [ this.models.slide2[0], this.models.slide2[1], this.models.slide2[2], this.models.slide3[8], this.models.slide3[9] ];
    for ( let model_idx = 0; model_idx < model_list.length; model_idx++ ) {
      // make referencing each model easier
      let model = model_list[model_idx];

      // calculate how much time has passed (in seconds)
      let timePassed = time / 1000;

      // modulus by the model's growth rate * 2 because
      // if the growth rate is 4 for example, it should
      // take 8 seconds to complete its oscillation of
      // size between its original scale and magnitudes

      // we basically only care about how much time has
      // passed within this particular period of growth
      // and shrinkage (which lasts 2*growth_rate seconds)
      // because it take growth_rate seconds to grow to max
      // size and growth_rate seconds to shrink to base size
      timePassed = timePassed % (model.growth_rate * 2);

      // consider the current period of growth or shrinkage
      // (either of which last growth_rate number of secs)
      // and determine what fraction of that period has
      // already happened by this point
      let scalingAlreadyCompleted =
        (timePassed % model.growth_rate) / model.growth_rate;
        
      // create 2 empty variables which will hold the newly
      // calculated scale values in x and y direction
      let newScaleX;
      let newScaleY;

      // if the amount of time passed is less than the amount
      // of time it should take for the polygon to grow from
      // its base size to its max size, then it is currently
      // in the process of growing still, so handle this case...
      if (timePassed < model.growth_rate) {
        // to calculate the new scale (for the upcoming frame) in
        // either the x or y direction, begin with that direction's
        // original scale, which is always 1, and add to that the
        // amount of growth that has already taken place
        newScaleX = 1;
        newScaleX += (model.scaling_magnitude_x - 1) * scalingAlreadyCompleted;
        newScaleY = 1;
        newScaleY += (model.scaling_magnitude_y - 1) * scalingAlreadyCompleted;
      } else {
        // otherwise, the polygon is in the process of shrinking,
        // so handle this case...

        // to calculate the new scale (for the upcoming frame) in
        // either the x or y direction, begin with that direction's
        // scaling magnitude (the maximum size) and remove from
        // that the amount of shrinkage that has already taken place
        newScaleX = model.scaling_magnitude_x;
        newScaleX -= (model.scaling_magnitude_x - 1) * scalingAlreadyCompleted;
        newScaleY = model.scaling_magnitude_y;
        newScaleY -= (model.scaling_magnitude_y - 1) * scalingAlreadyCompleted;
      }

      // create matrix transformation for translating
      // the polygon back to the origin
      // create matrix transformation for translating the polygon back to the origin
      let translateToOrigin = new Matrix(3, 3);
      CG.mat3x3Translate(
        translateToOrigin,
        -1 * model.origin_x,
        -1 * model.origin_y
      );

      // create matrix transform for scaling note that I calculate the scale factor here by taking the ratio of the desired scale amount in either direction versus the current scale amount in that direction.
      let scaleAtOrigin = new Matrix(3, 3);
      CG.mat3x3Scale(
        scaleAtOrigin,
        newScaleX / model.current_scale_x,
        newScaleY / model.current_scale_y
      );

      // we still have to translate the polygon back to its original spot after we scale, and that's what this matrix is for
      let translateBack = new Matrix(3, 3);
      CG.mat3x3Translate(translateBack, model.origin_x, model.origin_y);

      // combine the transformations into a single matrix
      let combinedMatrix = Matrix.multiply( [translateBack, scaleAtOrigin, translateToOrigin] );

      // update our model's transform matrix
      model.transform = combinedMatrix;
      // update current scales for next frame
      model.current_scale_x = newScaleX;
      model.current_scale_y = newScaleY;
    }
  }

  //
  drawSlide() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    switch (this.slide_idx) {
      case 0:
        this.drawSlide0();
        break;
      case 1:
        this.drawSlide1();
        break;
      case 2:
        this.drawSlide2();
        break;
      case 3:
        this.drawSlide3();
        break;
    }
  }

  //
  drawSlide0() {
    // define the color
    let purp = [120, 80, 250, 255];
    // draw the circle
    this.drawConvexPolygon(this.models.slide0[0].vertices, purp);

    // iterate over every vertex in the circle
    for (let i = 0; i < this.models.slide0[0].vertices.length; i++) {
        // apply the translation tranformation by
        // multiplying the Vector3 w/ the transform
        // apply the translation tranformation by multiplying the Vector3 w/ the transform
        this.models.slide0[0].vertices[i] = Matrix.multiply( [this.models.slide0[0].transform, this.models.slide0[0].vertices[i]] );
    }
  }

  drawSlide1() {
    //   - have each polygon spin at a different speed / direction
    let velocity_arr = [ (Math.PI / 3), (-1 * Math.PI), (-1 * Math.PI / 12) ];
    let color_arr    = [ [209, 164, 245, 255], [214, 11, 177, 255], [232, 63, 209, 255] ]; // purple, pink, light pink
    let location_arr = [ [400, 300], [400, 300], [400, 300] ];
    let num_models = this.models.slide1.length;
    for ( let model_idx = 0; model_idx < num_models; model_idx++ ) {
        // make referencing each model easier
        let current_model = this.models.slide1[model_idx];
        // initialize custom parameters velocity, color, and location on slide (translate)
        current_model.velocity = velocity_arr[model_idx];
        current_model.color = color_arr[model_idx];
        CG.mat3x3Translate( current_model.translation, location_arr[model_idx][0], location_arr[model_idx][1] );
    
        // perform rotation, then translation from model at origin
        let updated_vertices = [];
        let num_edges = current_model.vertices.length;
        for ( let edge = 0; edge < num_edges; edge++ ) {
          let current_vertice = current_model.vertices[edge];
          let result = Matrix.multiply( [ current_model.translation, current_model.rotation, current_vertice ] );
          updated_vertices.push(result);
        }
        this.drawConvexPolygon(updated_vertices, current_model.color);
    }
  }

  drawSlide2() {
    // TODO: draw at least 2 polygons grow and shrink about their own centers
    //   - have each polygon grow / shrink different sizes
    //   - try at least 1 polygon that grows / shrinks non-uniformly in the x and y directions

    // for each model in slide 2...
    for (let i = 0; i < this.models.slide2.length; i++) {
      // draw the polygon
      this.drawConvexPolygon(
        this.models.slide2[i].vertices,
        this.models.slide2[i].color
      );
      this.drawConvexPolygon( this.models.slide2[i].vertices, this.models.slide2[i].color );

      // apply the scaling transformation to the polygon
      for (let j = 0; j < this.models.slide2[i].vertices.length; j++) {
        this.models.slide2[i].vertices[j] = Matrix.multiply([
          this.models.slide2[i].transform,
          this.models.slide2[i].vertices[j],
        ]);
        this.models.slide2[i].vertices[j] = Matrix.multiply( [this.models.slide2[i].transform, this.models.slide2[i].vertices[j],] );
      }
    }
  }

  drawSlide3() {
    // TODO: get creative!
    //   - animation should involve all three basic transformation types
    //     (translation, scaling, and rotation)
    //   - animation should involve all three basic transformation types (translation, scaling, and rotation)
    // TRANSLATION
    let color_arr = [ [147, 235, 129, 255], [80, 181, 60, 255], [90, 240, 60, 255], [44, 232, 7, 255], [34, 166, 8, 255], [169, 250, 152, 255] ];

    let model_list = [ this.models.slide3[0], this.models.slide3[1], this.models.slide3[2], this.models.slide3[3], this.models.slide3[4], this.models.slide3[5] ];
    for ( let model_idx = 0; model_idx < model_list.length; model_idx++ ) {
        // make referencing each model easier
        let current_model = this.models.slide3[model_idx];

        // draw the circle
        this.drawConvexPolygon(current_model.vertices, color_arr[model_idx]);

        // iterate over every vertex in the circle
        for (let i = 0; i < current_model.vertices.length; i++) {
          // apply the translation tranformation by multiplying the Vector3 w/ the transform
          current_model.vertices[i] = Matrix.multiply( [current_model.transform, current_model.vertices[i]] );
        }
    }

    // DILATION
    color_arr = [ [199, 29, 242, 255], [242, 29, 192, 255] ]; // purple, pink
    model_list = [ this.models.slide3[8], this.models.slide3[9] ];
    for ( let model_idx = 0; model_idx < model_list.length; model_idx++ ) {
      // make referencing each model easier
      let current_model = model_list[model_idx];

      current_model.color = color_arr[model_idx];

      // apply the scaling transformation to the polygon
      for (let j = 0; j < current_model.vertices.length; j++) {
        current_model.vertices[j] = Matrix.multiply( [current_model.transform, current_model.vertices[j],] );
      }
      this.drawConvexPolygon( current_model.vertices, current_model.color );
    }

    // ROTATION
    let velocity_arr = [ (Math.PI / 2), (-1 * Math.PI / 5) ];
    color_arr    = [ [242, 242, 29, 255], [242, 242, 29, 255] ]; // yellow, yellow
    let location_arr = [ [600, 400], [200, 200] ];

    model_list = [ this.models.slide3[6], this.models.slide3[7] ];
    for ( let model_idx = 0; model_idx < model_list.length; model_idx++ ) {
        // make referencing each model easier
        let current_model = model_list[model_idx];

        // initialize custom parameters velocity, color, and location on slide (translate) 
        current_model.velocity = velocity_arr[model_idx];
        current_model.color = color_arr[model_idx];
        CG.mat3x3Translate( current_model.translation, location_arr[model_idx][0], location_arr[model_idx][1] );

        // perform rotation, then translation from model at origin
        let updated_vertices = [];
        let num_edges = current_model.vertices.length;
        for ( let edge = 0; edge < num_edges; edge++ ) {
          let current_vertice = current_model.vertices[edge];
          let result = Matrix.multiply( [ current_model.translation, current_model.rotation, current_vertice ] );

          updated_vertices.push(result);
        }
        this.drawConvexPolygon(updated_vertices, current_model.color);
    }
  }

  // vertex_list:  array of object [Matrix(3, 1), Matrix(3, 1), ..., Matrix(3, 1)]
  // color:        array of int [R, G, B, A]
  drawConvexPolygon(vertex_list, color) {
    this.ctx.fillStyle =
      "rgba(" +
      color[0] +
      "," +
      color[1] +
      "," +
      color[2] +
      "," +
      color[3] / 255 +
      ")";
    this.ctx.beginPath();
    let x = vertex_list[0].values[0][0] / vertex_list[0].values[2][0];
    let y = vertex_list[0].values[1][0] / vertex_list[0].values[2][0];
    this.ctx.moveTo(x, y);
    for (let i = 1; i < vertex_list.length; i++) {
      x = vertex_list[i].values[0][0] / vertex_list[i].values[2][0];
      y = vertex_list[i].values[1][0] / vertex_list[i].values[2][0];
      this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
    this.ctx.fill();
  }
}
export { Renderer };