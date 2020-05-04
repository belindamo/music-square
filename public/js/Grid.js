/* ------------ Grid Item Class START ------------ */

// Note that x and y denote the index of square clicked
// color is in hexadecimal and hue/saturation/value
// 
function GridItem(x, y, row, column, width, height, hex, hsv, dateCreated) {
  this.x = x;
  this.y = y;
  this.row = row;
  this.column = column;
  this.width = width;
  this.height = height;
  this.hex = hex;
  this.hsv = hsv;
  this.click = 0;
  this.dateCreated = dateCreated; 
}


/* ------------ Grid Class START ------------ */

class Grid {

  // TODO: takes in pre-existing firebase data c: 
  constructor(d3Selector, colorToDraw, width, height, squaresPerRow) {
    this.colorToDraw = colorToDraw;
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
      .attr("id", function(d) { return `square-${d.row}-${d.column}` })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .style("fill", function(d) { return d.hex })
      .style("stroke", "#222")
      .on('mousedown', this.onMouseDown)
      .on('mouseup', this.onMouseUp)
      .on('mouseenter', this.onMouseEnter);
  }
  
  /**
   * Updates this.colorToDraw. Checks if color to change is hex color
   * @param {Object} color - with string hex and array hsv
   * @return {Boolean} - whether color successfully updated
   */
  updateColorToDraw = (color) => {
    console.log(color)
    this.colorToDraw = color;
    return true;
  }

  /**
   * Update mode. 
   * @param {String} mode - string must be "draw" or "select"
   * @return {Boolean} - whether mode updated
   */
  updateMode = (mode) => {
    if (mode === "draw" || mode === "select") {
      this.mode = mode;
      return true;
    }
    return false;
  }

  // TODO: link to firebase data here c: 
  initializeGrid(squareWidth, squaresPerRow, squaresPerColumn) {
    let data = [];
    // x and y pos start from upper left corner
    let xpos = 0; 
    let ypos = 0;
    const width = squareWidth;
    const height = squareWidth;
    const date = new Date().toISOString();
    
    for (var row = 0; row < squaresPerColumn; row++) {
      data.push( [] );
      for (var column = 0; column < squaresPerRow; column++) {
        data[row].push(new GridItem(xpos, ypos, row, column, width, height, "#FFFFFF", [0, 0, 100], date));
        xpos += width;
      }
      xpos = 0;
      ypos += height;	
    }
    return data;
  }

  onMouseDown = (d) => {
    this.isMouseDown = true;
    this.changeSquareColor(d.row, d.column);
  }

  onMouseUp = (d) => {
    this.isMouseDown = false;
  }

  onMouseEnter = (d) => {
    if (this.isMouseDown) {
      this.changeSquareColor(d.row, d.column)
    }
  }

  changeSquareColor(row, column) {
    console.log(this.colorToDraw)
    this.gridData[row][column].hex = this.colorToDraw.hex;
    this.gridData[row][column].hsv = this.colorToDraw.hsv;
    d3.select(`#square-${row}-${column}`)
      // .transition().delay(100)
      .style("fill", function(d) { return d.hex })
    // TODO: link to firebase here c: update in real time yas
  }

  // transition!! interpolation try it out https://bost.ocks.org/mike/transition/

  // thots: using enter, exit to update grid as it toggles size over time. 
}


/* ------------ Grid Class END ------------ */