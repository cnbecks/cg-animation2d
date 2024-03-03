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

    // had to add two more properties
    // this is circle velocity x and y,
    // both set to 100 px/sec
    this.circle_vx = 500;
    this.circle_vy = 500;

    this.models = {
      slide0: [
        // example model (diamond) -> should be replaced with actual model
        {
          vertices: [],
          transform: new Matrix(3, 3),
        },
      ],
      slide1: [],
      slide2: [],
      slide3: [],
    };

    // define the circle's radius and origin
    let circ_radius = 50;
    let circ_origin = 400;
    let circ_sides = 30;

    // a circle with 30 sides looks pretty good,
    // so I iterate 30 times here defining a new
    // vertex in each iteration

    for (let i = 1; i < circ_sides; i++) {
      // calculating the current angle here.
      // basically just making my way around
      // the unit circle by iterating from 0 to
      // 2PI by increments of (2PI / num sides)
      let currentTheta = 0 + (i / circ_sides) * (2 * Math.PI);

      // calculate the new vertex position and
      // push it to the list of vertices in the
      // models.slide0[0] object as a Vector3
      this.models.slide0[0].vertices.push(
        CG.Vector3(
          circ_origin + circ_radius * Math.cos(currentTheta),
          circ_origin + circ_radius * Math.sin(currentTheta),
          1
        )
      );
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

    // update the model's transform matrix.
    // this method just overwrites whatever matrix
    // used to be referenced there, with a new one
    // of those homogeneous matrices. keep in mind
    // that delta time is in ms, so I div by 1k here
    // otherwise it would move too fast
    CG.mat3x3Translate(
      this.models.slide0[0].transform,
      (this.circle_vx * delta_time) / 1000,
      (this.circle_vy * delta_time) / 1000
    );
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
    console.log("drawing slide 0");
    // TODO: draw bouncing ball (circle that changes direction whenever it hits an edge)

    // define the color
    let purp = [150, 100, 230, 255];

    // draw the circle
    this.drawConvexPolygon(this.models.slide0[0].vertices, purp);

    // iterate over every vertex in the circle
    for (let i = 0; i < this.models.slide0[0].vertices.length; i++) {
      // apply the translation tranformation by
      // multiplying the Vector3 w/ the transform
      this.models.slide0[0].vertices[i] = Matrix.multiply([
        this.models.slide0[0].transform,
        this.models.slide0[0].vertices[i],
      ]);
    }

    // all code below just handles bouncing
    // had to do some weird stuff here to
    // make it work without glitches

    // iterate over all vertices
    for (let i = 0; i < this.models.slide0[0].vertices.length; i++) {
      // create reference to vector3 at index i
      let vector = this.models.slide0[0].vertices[i];

      // calculate its cartesian coordinates using
      // the homogeneous formula we saw in class
      let cartesianX = vector.values[0] / vector.values[2];
      let cartesianY = vector.values[1] / vector.values[2];

      // if the x coord of this particular vector3
      // is at the left of the canvas, change the
      // x velocity of the circle to be positive
      if (cartesianX <= 0) {
        this.circle_vx = Math.abs(this.circle_vx);
        break;
      }

      // if the x coord of this particular vector3
      // is at the right of the canvas, change the
      // x velocity of the circle to be negative
      if (cartesianX >= this.canvas.width) {
        this.circle_vx = Math.abs(this.circle_vx) * -1;
        break;
      }

      // if the y coord of this particular vector3
      // is at the bottom of the canvas, change the
      // y velocity of the circle to be positive
      if (cartesianY <= 0) {
        this.circle_vy = Math.abs(this.circle_vy);
        break;
      }

      // if the y coord of this particular vector3
      // is at the top of the canvas, change the
      // y velocity of the circle to be negative
      if (cartesianY >= this.canvas.height) {
        this.circle_vy = Math.abs(this.circle_vy) * -1;
        break;
      }

      // NOTE: I had to use the Math.abs stuff cause
      // sometimes the ball would get stuck on an edge
      // toggling back and forth between pos and neg
    }
  }

  //
  drawSlide1() {
    // TODO: draw at least 3 polygons that spin about their own centers
    //   - have each polygon spin at a different speed / direction
  }

  //
  drawSlide2() {
    // TODO: draw at least 2 polygons grow and shrink about their own centers
    //   - have each polygon grow / shrink different sizes
    //   - try at least 1 polygon that grows / shrinks non-uniformly in the x and y directions
  }

  //
  drawSlide3() {
    // TODO: get creative!
    //   - animation should involve all three basic transformation types
    //     (translation, scaling, and rotation)
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
