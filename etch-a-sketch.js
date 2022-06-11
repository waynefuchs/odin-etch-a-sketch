let GRID_SIZE = 16;
const etchASketch = document.querySelector("#etchasketch");

/* Mouse Tracking */
let isMouseDown = false;
document.addEventListener("mousedown", setMouseStatus);
document.addEventListener("mouseup", setMouseStatus);
document.addEventListener("mousemove", setMouseStatus);

/* Controls */
const resizeButton = document.querySelector("#resize");
resizeButton.addEventListener('click', setNewGridSize);

/* MAIN */
createGrid(GRID_SIZE);



/* FUNCTIONS */
function setNewGridSize(e)
{
    const userInput = prompt("Enter New Grid Size");
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
    if(isMouseDown) 
        this.classList.add('marked');
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