
class Grid {
  constructor(d3Selector, width, height) {
    this.width = width;
    this.height = height;
    var gridData = this.initialGridData();

    this.grid = d3.select(d3Selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    
    var row = this.grid.selectAll(".row")
      .data(gridData)
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
      .on('mousedown', onMouseDown)
      .on('mouseup', onMouseUp);
  }
  
  onMouseDown() {
    column
      .on('click', function(d) {
        d.click ++;
        if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#fff"); }
        if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
        if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#F56C4E"); }
        if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
      });
  }

  onMouseUp(d) {

  }
  
  initialGridData() {
    var data = new Array();
    var click = 0;
    // x and y pos start from upper left
    var xpos = 1; // starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = 20;
    var height = 20;
    
    for (var row = 0; row < 30; row++) {
      data.push( new Array() );
      for (var column = 0; column < 30; column++) {
        data[row].push({
          x: xpos,
          y: ypos,
          width: width,
          height: height,
          click: click
        })
        xpos += width;
      }
      xpos = 1;
      ypos += height;	
    }
    return data;
  }
}

var grid = new Grid('#grid', "2048px", "2048px");

// I like to log the data to the console for quick debugging
// console.log(gridData);
console.log(d3);

