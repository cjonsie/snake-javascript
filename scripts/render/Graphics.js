// ------------------------------------------------------------------
//
// This namespace provides the rendering code for the game.
//
// ------------------------------------------------------------------
Snake.graphics = (function() {
    'use strict';

    var canvas = document.getElementById('canvas-main'),
        context = canvas.getContext('2d');


    //
    // Place a 'clear' function on the Canvas prototype, this makes it a part
    // of the canvas, rather than making a function that calls and does it.
    CanvasRenderingContext2D.prototype.clear = function() {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
        this.clearRect(0, 0, canvas.width, canvas.height);
        this.restore();
    };

    //------------------------------------------------------------------
    //
    // Public method that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        context.clear();
    }

    //------------------------------------------------------------------
    //
    // Draws a rectangle
    //
    //------------------------------------------------------------------
    function drawRectangle(spec) {
        context.fillStyle = spec.fill;
        context.fillRect(spec.x, spec.y, spec.width, spec.height);

        context.strokeStyle = spec.stroke;
        context.strokeRect(spec.x, spec.y, spec.width, spec.height);
    }

    function drawCircle(spec) {
        context.beginPath();
        context.fillStyle = spec.fill;
        context.strokeStyle = spec.stroke
        context.arc(spec.x, spec.y, spec.radius, 0, 2*Math.PI)
        context.stroke();
        context.fill();
        context.closePath();
    }
    //------------------------------------------------------------------
    //
    // Draws a Grid
    //
    //------------------------------------------------------------------
    function drawGrid(spec) {
        context.strokeStyle = "black"
        context.beginPath();
        for(let i=0; i <= spec.width; i+=spec.spacing){
            context.moveTo(i, 0);
            context.lineTo(i, spec.height);
            context.stroke();
        }

        for(let i=0; i <= spec.height; i+=spec.spacing){
        context.strokeStyle = "black"
        context.beginPath();
            context.moveTo(0, i);
            context.lineTo(spec.width, i);
            context.stroke();
    
        }
    }
    //------------------------------------------------------------------
    //
    // Returns the width of the specified text, in pixels.
    //
    //------------------------------------------------------------------
    function measureTextWidth(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fill;
        if (spec.hasOwnProperty('stroke')) {
            context.strokeStyle = spec.stroke;
        }
        var width = context.measureText(spec.text).width;

        context.restore();

        return width;
    }

    //------------------------------------------------------------------
    //
    // Returns the height of the specified text, in pixels.
    //
    //------------------------------------------------------------------
    function measureTextHeight(spec) {
        var saveText = spec.text;

        spec.text = 'm';    // Clever trick to get font height
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fill;
        if (spec.hasOwnProperty('stroke')) {
            context.strokeStyle = spec.stroke;
        }
        var width = context.measureText(spec.text).width;
        spec.text = saveText;

        context.restore();

        return width;
    }

    //------------------------------------------------------------------
    //
    // Draw some text to the screen
    //
    //------------------------------------------------------------------
    function drawText(spec) {
        context.save();

        context.font = spec.font,
        context.fillStyle = spec.fill;
        if (spec.hasOwnProperty('stroke')) {
            context.strokeStyle = spec.stroke;
        }
        context.textBaseline = 'top';

        context.fillText(spec.text, spec.position.x, spec.position.y);
        context.strokeText(spec.text, spec.position.x, spec.position.y);

        context.restore();
    }

    //------------------------------------------------------------------
    //
    // Expose an ability to draw an image/texture on the canvas.
    //
    //------------------------------------------------------------------
    function drawImage(spec) {
        context.save();

        context.translate(spec.center.x, spec.center.y);
        context.rotate(spec.rotation);
        context.translate(-spec.center.x, -spec.center.y);

        context.drawImage(
            spec.image,
            spec.center.x - spec.size/2,
            spec.center.y - spec.size/2,
            spec.size, spec.size);

        context.restore();
    }

    return {
        clear : clear,
        drawRectangle : drawRectangle,
        drawCircle: drawCircle,
        drawText: drawText,
        drawImage: drawImage,
        measureTextWidth: measureTextWidth,
        measureTextHeight: measureTextHeight,
        drawGrid: drawGrid,

    };
}());
