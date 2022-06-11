let GRID_SIZE = 16;
const etchASketch = document.querySelector("#etchasketch");

createGrid(16);


function setHoverEffect(e)
{
    this.classList.add('marked');
}

function createGrid(gridSize) 
{
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