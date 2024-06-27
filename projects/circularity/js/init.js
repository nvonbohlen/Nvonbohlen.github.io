var init = function (window) {
  "use strict";
  var draw = window.opspark.draw,
    physikz = window.opspark.racket.physikz,
    app = window.opspark.makeApp(),
    canvas = app.canvas,
    view = app.view,
    fps = draw.fps("#000");

  window.opspark.makeGame = function () {
    window.opspark.game = {};
    var game = window.opspark.game;

    ////////////////////////////////////////////////////////////
    ///////////////// PROGRAM SETUP ////////////////////////////
    ////////////////////////////////////////////////////////////

    // TODO 1 : Declare and initialize our variables
    var circle;
    var circles = [];

    // TODO 2 : Create a function that draws a circle
    function drawCircle() {
      circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
      physikz.addRandomVelocity(circle, canvas, 2.5, 2.5);
      view.addChild(circle);
      circles.push(circle);
    }

    // TODO 3 / 7 : Call the drawCircle() function
    var loopsCompleted = 0;
while (loopsCompleted < 10) {
  drawCircle() 
  loopsCompleted++;
}

    ////////////////////////////////////////////////////////////
    ///////////////// PROGRAM LOGIC ////////////////////////////
    ////////////////////////////////////////////////////////////

    /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
    function update() {
      physikz.updatePosition(circles[0]);
      physikz.updatePosition(circles[1]);
      physikz.updatePosition(circles[2]);
      physikz.updatePosition(circles[3]);
      physikz.updatePosition(circles[4]);

      // TODO 4 : Update the circle's position //
      // TODO 5 / 10 : Call game.checkCirclePosition() on your
      game.checkCirclePosition(circles[0]);
      game.checkCirclePosition(circles[1]);
      game.checkCirclePosition(circles[2]);
      game.checkCirclePosition(circles[3]);
      game.checkCirclePosition(circles[4]);
      game.checkCirclePosition = function (circle) {
       
        if (circle.x > canvas.width) {
          circle.x = 0;
        }

        // TODO 7 : YOUR CODE STARTS HERE //////////////////////
        if (circle.x < 0) {
          circle.x = 0;
          if (circle.y > canvas.height) circle.y = 0;
          if (circle.y < 0) {
            circle.y = 0;
          }
        }

        // YOUR TODO 7 CODE ENDS HERE //////////////////////////

        // TODO 9 : Iterate over the array
      };

      // YOUR TODO 6 CODE ENDS HERE //////////////////////////
    }

    /////////////////////////////////////////////////////////////
    // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
    /////////////////////////////////////////////////////////////

    view.addChild(fps);
    app.addUpdateable(fps);

    game.circle = circle;
    game.circles = circles;
    game.drawCircle = drawCircle;
    game.update = update;

    app.addUpdateable(window.opspark.game);
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = init;
}
