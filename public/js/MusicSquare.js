/* ------------ Grid Item Class START ------------ */

// Note that x and y denote the index of square clicked
// color is in hexadecimal
function GridItem(x, y, row, column, width, height, hue, saturation, dateCreated) {
  this.x = x;
  this.y = y;
  this.row = row;
  this.column = column;
  this.width = width;
  this.height = height;
  this.hue = hue;
  this.saturation = saturation;
  this.click = 0;
  this.dateCreated = dateCreated; 
}


/* ------------ Grid Class START ------------ */

class Grid {
  constructor(d3Selector, initialColor, width, height, squaresPerRow) {
    this.colorToDraw = initialColor;
    this.isMouseDown = false;
    this.mode = "draw"; // Options: "draw", "select"

    this.width = width;
    this.height = height;
    const squareWidth = width/squaresPerRow;
    this.gridData = this.initializeGrid(squareWidth, squaresPerRow, Math.ceil(height/squareWidth));
    console.log(this.gridData);

    const grid = d3.select(d3Selector)
      .append("svg")
        .attr("width", width)
        .attr("height", height)
//         .call(d3.zoom().on("zoom", function () {
//           grid.attr("transform", d3.event.transform)
//         }));
    this.grid = grid;
    
    var row = this.grid.selectAll(".row")
      .data(this.gridData)
      .enter().append("g")
      .attr("class", "row");
      
    var column = row.selectAll(".square")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("class","square")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .style("fill", "#fff")
      .style("stroke", "#222")
      .on('click', this.onMouseClick)
      .on('mousedown', this.onMouseDown)
      .on('mouseup', this.onMouseUp)
      .on('mouseenter', this.onMouseEnter);
  }
  
  /**
   * Updates this.colorToDraw
   * @param {String} color - hex code
   */
  updateColorToDraw(color) {
    
  }

  initializeGrid(squareWidth, squaresPerRow, squaresPerColumn) {
    let data = [];
    let click = 0;
    // x and y pos start from upper left corner
    let xpos = 0; 
    let ypos = 0;
    const width = squareWidth;
    const height = squareWidth;
    const date = new Date().toISOString();
    
    for (var row = 0; row < squaresPerColumn; row++) {
      data.push( [] );
      for (var column = 0; column < squaresPerRow; column++) {
        data[row].push(new GridItem(xpos, ypos, row, column, width, height, 0, 0, date));
        xpos += width;
      }
      xpos = 0;
      ypos += height;	
    }
    return data;
  }

  onMouseDown(d) {
    this.isMouseDown = true;
    

  }

  onMouseUp(d) {
    // click++ for all changed colors
    this.isMouseDown = false;
  }

  onMouseEnter(d) {
    if (this.isMouseDown) {
      console.log(d)
    }
  }
  

}


/* ------------ Grid Class END ------------ */



/* ------------ MusicSquare Class START ------------ */


class MusicSquare {
  constructor() {

  }
}


/* ------------ MusicSquare Class END ------------ */