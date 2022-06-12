let GRID_SIZE = 16;
const etchASketch = document.querySelector("#etchasketch");

/* Mouse Tracking */
let isMouseDown = false;
document.addEventListener("mousedown", setMouseStatus);
document.addEventListener("mouseup", setMouseStatus);
document.addEventListener("mousemove", setMouseStatus);

/* Controls */
// Resize
const resizeButton = document.querySelector("#resize");
resizeButton.addEventListener('click', setNewGridSize);
// Reset (ShakeIt)
const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', clearGrid);
// Mode
const maxMode = 2;
let currentMode = 0;
const modeButton = document.querySelector("#mode");
modeButton.addEventListener('click', changeMode);

/* MAIN */
createGrid(GRID_SIZE);



/* FUNCTIONS */
function setNewGridSize(e)
{
	const userInput = prompt("Enter New Grid Size (16-100):");
	const numericUserInput = Number(userInput);
	if(!numericUserInput) 
	{
		alert("Failed: Invalid Number.");
		return;
	}

	if(numericUserInput < 16 || numericUserInput > 100)
	{
		alert("Failed: Input Out of Range. (16-100)");
		return;
	}

	GRID_SIZE = numericUserInput;
	createGrid(GRID_SIZE);
}

function setMouseStatus(e)
{
	// Primary Button (left click) is 0b1
	// see: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
	isMouseDown = ((e.buttons ?? 0) & 1) === 1;
}

function setHoverEffect(e)
{
	if(!this.classList.contains("etch-cell")) return;
	if(!isMouseDown) return;
	if(this.classList.contains("marked")) return;

	this.classList.add('marked');
	this.style.backgroundColor = getModeColor();
}


function changeMode(e) 
{
	modeButton.classList.remove(getClassStyle());
	currentMode++;
	if(currentMode > maxMode) currentMode = 0;
	modeButton.classList.add(getClassStyle());
}

function getClassStyle() 
{
	return `mode${currentMode}`;
}

function getModeColor()
{
	switch(currentMode)
	{
		case 2:
			return getModeColor2();
		case 1:
			return getModeColor1();
		case 0:
		default:
			return "black";
	}
}

let modeColor1Percent = 0;
function getModeColor1()
{
	modeColor1Percent += 0.1;
	if(modeColor1Percent > 1) modeColor1Percent = 0;
	return `rgb(${255*modeColor1Percent},${255*modeColor1Percent},${255*modeColor1Percent})`;
}

function getModeColor2()
{
	return `rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)})`;
}

function getRandomInt(min, max)
{
	return Math.floor((Math.random() * (max - min + 1)) + min);
}

function createGrid(gridSize) 
{
	removeAllChildren(etchASketch);
	for(let rowIndex=0; rowIndex<gridSize; rowIndex++) 
	{
		const row = document.createElement("div");
		row.classList.add("etch-row");
		for(let colIndex=0; colIndex<gridSize; colIndex++)
		{
			const column = document.createElement("div");
			column.classList.add("etch-cell");
			column.addEventListener('mouseover', setHoverEffect);
			//column.textContent = `${rowIndex}:${colIndex}`;
			row.append(column);
		}
		etchASketch.append(row);
	}
}

function removeAllChildren(element)
{
	if(!element) return;
	while(element.firstChild)
		element.removeChild(element.firstChild);
}

function clearGrid()
{
	createGrid(GRID_SIZE);
}