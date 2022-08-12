
let grid = document.querySelectorAll('.cell');
let clickActive = false;
let penMode = true;

const DEFAULT_PEN_COLOR = '#000000';
const DEFAULT_BG_COLOR = '#edede8';

let currentPenColor =DEFAULT_PEN_COLOR,
    currentBGColor = DEFAULT_BG_COLOR;
function main()
{
    //Initialize the grid
    resizeCanvas(16);

    //Changing the colors

    const penColorPicker = document.querySelector('.penColorPicker');
    const BGColorPicker =  document.querySelector('.BGColorPicker');
    
    penColorPicker.addEventListener('change', (event) =>
    {
        currentPenColor = event.target.value;
    });

    BGColorPicker.addEventListener('change', (event) =>
    {
        let previousBGColor = currentBGColor;
        currentBGColor = event.target.value;

        grid.forEach(cell => {
            let cellColor = cell.getAttribute('style').slice(-7);
            if(cellColor == previousBGColor) cell.setAttribute('style',`background-color: ${currentBGColor}`);

        });
    });

    //Buttons
    
    const penBttn = document.querySelector('.pen-bttn');
    const eraserBttn = document.querySelector('.eraser-bttn');
    const resetBttn = document.querySelector('.reset-bttn')

    penBttn.addEventListener('click', () =>
    {
        penMode = true;
        penBttn.classList.add('selected');
        eraserBttn.classList.remove('selected');
    });
    
    eraserBttn.addEventListener('click', () =>
    {
        penMode = false;
        eraserBttn.classList.add('selected');
        penBttn.classList.remove('selected');
    });
    
    resetBttn.addEventListener('click', () =>
    {
        
        grid.forEach(cell =>
        {
            cell.setAttribute('style',`background-color: ${currentBGColor}`);
        });
    
    });

    //Drawing
    window.addEventListener('mousedown',() => 
    {
        clickActive = true;
    });

    window.addEventListener('mouseup',() => 
    {
        clickActive = false;
    });

    //Size range
    const sizeRange = document.querySelector('.sizeRange');


    sizeRange.addEventListener('input', () => 
    {
        const rangeValue = document.querySelector('.rangeValue');
        rangeValue.textContent = sizeRange.value;
    });

    sizeRange.addEventListener('change',() => 
    {
        resizeCanvas(sizeRange.value);
    });

}



function resizeCanvas(x)
{
    const canvas = document.getElementById('canvas');
    
    //Delete every cell
    canvas.innerHTML='';
    
    for(let i = 1; i<=x*x; i++) 
    {
        const cell = document.createElement('div');
        cell.setAttribute('style',`background-color: ${currentBGColor}`);
        cell.classList.add('cell');
        canvas.appendChild(cell);
    }
    
    canvas.style.gridTemplateColumns = `repeat(${x},auto)`;
    grid = document.querySelectorAll('.cell');

    grid.forEach(cell => 
        {
            
            cell.addEventListener('mousedown',() =>
            {
                if(penMode) cell.setAttribute('style',`background-color: ${currentPenColor}`);
                else cell.setAttribute('style',`background-color: ${currentBGColor}`);
            });
    
            cell.addEventListener('mouseenter',() => 
            {
                if(!clickActive) return;
    
                if(penMode) cell.setAttribute('style',`background-color: ${currentPenColor}`);
                else cell.setAttribute('style',`background-color: ${currentBGColor}`);
            });
            
        });
}

main();
