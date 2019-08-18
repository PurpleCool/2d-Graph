class Canvas {
  constructor(parentNodeId, newCanvasWidth, newCanvasHeigh) {
    this.name = document.createElement('canvas');
    this.name.id = 'canvas';
    this.name.width = newCanvasWidth;
    this.name.height = newCanvasHeigh;
    document.getElementById(parentNodeId).appendChild(this.name);
    this.ctx = this.name.getContext('2d');
    this.scaleValue = 25;
    this.fontSizePx = 17;
    this.lrDirection = 0;
    this.udDirection = 0;
    this.xCenter = Math.floor(this.name.width / 2);
    this.yCenter = Math.floor(this.name.height / 2);
    this.xScaleStep = Math.floor(this.name.width / this.scaleValue);
    this.yScaleStep = Math.floor(this.name.height / this.scaleValue);
    this.xCoordinates = [];
    this.yCoordinates = [];
    this.graphColor = '#cc0011';
    this.xAxisLabel;
    this.yAxisLabel;
    this.x = this.xCenter + this.lrDirection + 0.5;
    this.y = this.yCenter + this.udDirection + 0.5;
    this.name.style.display = "block";
  }
  drawAxis() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(this.xCenter + this.lrDirection + 0.5, 0);
    this.ctx.lineTo(this.xCenter + this.lrDirection + 0.5, this.name.height);
    this.ctx.stroke();
    this.ctx.moveTo(0, this.yCenter + 0.5 + this.udDirection);
    this.ctx.lineTo(this.name.width, this.yCenter + 0.5 + this.udDirection);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  drawAxisLabels() {
    this.ctx.strokeStyle = 'black';
    this.ctx.textBaseline = "top";
    this.ctx.textAlign = "right";
    this.ctx.font = `${this.fontSizePx}px courier`;
    if (this.xAxisLabel != undefined) {
      this.ctx.fillText(this.xAxisLabel, this.name.width, this.yCenter + 0.5 + this.udDirection);
    }
    if (this.xAxisLabel != undefined) {
      this.ctx.fillText(this.yAxisLabel, this.xCenter + this.lrDirection + 0.5, 0);
    }
  }
  drawCoordinates() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'gray';
    //vertically
    for (let i = 0; i < this.xCoordinates.length; i++) {
      this.ctx.moveTo(this.x + this.xCoordinates[i] * this.xScaleStep, this.y - this.yCoordinates[i] * this.yScaleStep);
      this.ctx.lineTo(this.x + this.xCoordinates[i] * this.xScaleStep, this.y);
      this.ctx.stroke();
    }
    //horizontally
    for (let i = 0; i < this.xCoordinates.length; i++) {
      this.ctx.moveTo(this.x + this.xCoordinates[i] * this.xScaleStep, this.y - this.yCoordinates[i] * this.yScaleStep);
      this.ctx.lineTo(this.x, this.y - this.yCoordinates[i] * this.yScaleStep);
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }
  drawCoordValues() {
    this.ctx.strokeStyle = 'black';
    this.ctx.textBaseline = "top";
    this.ctx.textAlign = "right";
    this.ctx.font = `${this.fontSizePx}px Arial`;
    for (let i = 0; i < this.xCoordinates.length; i++) {
      this.ctx.fillText(this.xCoordinates[i], this.x + this.xCoordinates[i] * this.xScaleStep, this.y);
    }
    for (let i = 0; i < this.yCoordinates.length; i++) {
      this.ctx.fillText(this.yCoordinates[i], this.x, this.y - this.yCoordinates[i] * this.yScaleStep);
    }
  }
  drawGraph() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.lineJoin = "round";
    this.ctx.strokeStyle = this.graphColor;
    this.ctx.moveTo(this.x + this.xCoordinates[0] * this.xScaleStep, this.y - this.yCoordinates[0] * this.yScaleStep);
    for (let i = 1; i < this.xCoordinates.length; i++) {
      this.ctx.lineTo(this.x + this.xCoordinates[i] * this.xScaleStep, this.y - this.yCoordinates[i] * this.yScaleStep);
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }
  drawEverything() {
    this.ctx.clearRect(0, 0, this.name.width, this.name.height);

    this.xScaleStep = Math.floor(this.name.width / this.scaleValue);
    this.yScaleStep = Math.floor(this.name.height / this.scaleValue);

    this.x = this.xCenter + this.lrDirection + 0.5;
    this.y = this.yCenter + this.udDirection + 0.5;
    this.drawAxis();
    this.drawAxisLabels();
    this.drawCoordinates();
    this.drawGraph();
    this.drawCoordValues();
  }
  resetCoordinates() {
    this.xCoordinates = [];
    this.yCoordinates = [];
  }
  addCoordinates(x, y) {
    this.xCoordinates.push(x);
    this.yCoordinates.push(y);
  }
  increaseScale() {
    this.scaleValue /= 1.1;
    this.drawEverything();
  }
  decreaseScale() {
    this.scaleValue *= 1.1;
    this.drawEverything();
  }
  goLeft() {
    this.lrDirection -= 15;
    this.drawEverything();
  }
  goRight() {
    this.lrDirection += 15;
    this.drawEverything();
  }
  goUp() {
    this.udDirection -= 15;
    this.drawEverything();
  }
  goDown() {
    this.udDirection += 15;
    this.drawEverything();
  }
  getDefaultScale() {
    this.udDirection = 0;
    this.lrDirection = 0;
    this.scaleValue = 25;
    this.drawEverything();
  }
  renameLegend(legendButton) {
    let legendParent = legendButton.parentNode;
    let legendLabel = document.createElement("label");
    legendLabel.for = "renameLegendInput";
    legendLabel.innerHTML = "Enter new name: ";
    legendParent.appendChild(legendLabel);

    let renameLegendInput = document.createElement("input");
    renameLegendInput.type = "text";
    renameLegendInput.id = "renameLegendInput";
    legendParent.appendChild(renameLegendInput);

    let renameButton = document.createElement('button');
    renameButton.id = 'renameButton';
    renameButton.innerHTML = 'Rename';
    legendParent.appendChild(renameButton);

    renameButton.addEventListener("click", function() {
      legendButton.innerHTML = renameLegendInput.value;
      legendParent.removeChild(legendLabel);
      legendParent.removeChild(renameLegendInput);
      legendParent.removeChild(renameButton);
    })
  }
  viewHideCanvas() {
    if (this.name.style.display === "block") {
      this.name.style.display = "none";
    } else {
      this.name.style.display = "block";
    }
  }
  getCoordinates(evt) {
    let x;
    let y;
    var rect = canvas.getBoundingClientRect();
    x = ((evt.clientX - rect.left - this.xCenter - this.lrDirection) / this.xScaleStep);
    y = (evt.clientY - rect.top - this.yCenter - this.udDirection) / this.yScaleStep;
    x = Math.floor(x * 100) / 100;
    y = Math.floor(y * 100) / 100;
    return {
      x: x,
      y: y
    }
  }
  nameAxis(xName, yName) {
    this.xAxisLabel = xName;
    this.yAxisLabel = yName;
    this.drawEverything();
  }
  rgb(num) {
    return Math.floor(Math.random() * num);
  }
  randomColor() {
    this.graphColor = 'rgb(' + this.rgb(255) + ',' + this.rgb(255) + ',' + this.rgb(255) + ')';
    this.drawEverything();
  }
}



//end of the library
const myCanvas = new Canvas('placeCanvasHere', 700, 500);
myCanvas.drawEverything();

document.getElementById('buildGraphButton').onclick = () => {
  myCanvas.resetCoordinates();
  let form = document.getElementById('form');
  for (let i = 0; i < form.length / 2; i++) {
    myCanvas.addCoordinates(document.getElementById(`x${i}`).value, document.getElementById(`y${i}`).value);
  }
  myCanvas.drawEverything();
}

document.getElementById('randomButton').onclick = () => {
  myCanvas.resetCoordinates();
  let num1;
  let num2;
  let randomInput = document.getElementById('randomInput');
  for (let i = 0; i < randomInput.value; i++) {
    num1 = Math.floor(Math.random() * 10000 - Math.random() * 10000) / 1000;
    num2 = Math.floor(Math.random() * 10000 - Math.random() * 10000) / 1000;
    myCanvas.addCoordinates(num1, num2);
  }
  myCanvas.drawEverything();
}

document.getElementById('plusScaleButton').onclick = () => {
  myCanvas.increaseScale();
}

document.getElementById('minusScaleButton').onclick = () => {
  myCanvas.decreaseScale();
}

document.getElementById('leftButton').onclick = () => {
  myCanvas.goLeft();
}

document.getElementById('rightButton').onclick = () => {
  myCanvas.goRight();
}

document.getElementById('upButton').onclick = () => {
  myCanvas.goUp();
}

document.getElementById('downButton').onclick = () => {
  myCanvas.goDown();
}

document.getElementById('defaultScale').onclick = () => {
  myCanvas.getDefaultScale();
}

document.getElementById("legendButton").ondblclick = () => {
  myCanvas.renameLegend(legendButton);
}

document.getElementById("legendButton").oncontextmenu = () => {
  myCanvas.viewHideCanvas();
  return false;
}

document.getElementById('changeColorButton').onclick = () => {
  myCanvas.graphColor = document.getElementById('currentColorInput').value;
  myCanvas.drawEverything();
}

myCanvas.name.onmousemove = () => {
  document.getElementById('currentCoord').innerHTML = "X: " + myCanvas.getCoordinates(event).x + " Y: " + myCanvas.getCoordinates(event).y;
}

myCanvas.name.onclick = () => {
  myCanvas.randomColor();
  document.getElementById('currentColorInput').value = myCanvas.graphColor;
}

renameAxis.onclick = () => {
  let horizontalAxis = document.getElementById('horizontalAxis');
  let verticalAxis = document.getElementById('verticalAxis');
  myCanvas.nameAxis(horizontalAxis.value, verticalAxis.value);
}
