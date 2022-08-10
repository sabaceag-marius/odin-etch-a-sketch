function main()
{
    //Initialize the grid
    resizeCanvas(16);
    
    let canvasSize = 16;
    let grid = document.querySelectorAll('.cell');

    //Changing the color

    const penColorPicker = document.querySelector('.penColorPicker');
    let currentPenColor ='#000000';
    const BGColor = '#edede8';
    penColorPicker.addEventListener('change', (event) =>
    {
        currentPenColor = event.target.value;
    });


    //Drawing
    let clickActive = false;

    window.addEventListener('mousedown',() => 
    {
        clickActive = true;
    });

    window.addEventListener('mouseup',() => 
    {
        clickActive = false;
    });


    grid.forEach(cell => 
    {
        
        cell.addEventListener('mousedown',() =>
        {
            if(penMode) cell.setAttribute('style',`background-color: ${currentPenColor}`);
            else cell.removeAttribute('style');
        });

        cell.addEventListener('mouseenter',() => 
        {
            if(!clickActive) return;

            if(penMode) cell.setAttribute('style',`background-color: ${currentPenColor}`);
            else cell.removeAttribute('style');
        });
        
    });

    
    
    //Buttons
    let penMode = true;
    
    const penBttn = document.querySelector('.pen-bttn');
    const eraserBttn = document.querySelector('.eraser-bttn');
    const sizeBttn = document.querySelector('.size-bttn');
    const clearBttn = document.querySelector('.clear-bttn')

    penBttn.addEventListener('click', () =>
    {
        penMode = true;
    });
    
    eraserBttn.addEventListener('click', () =>
    {
        penMode = false;
    });

    sizeBttn.addEventListener('click', () =>
    {
        let width = Number(prompt("Size"));
        
        if(width == NaN)
        {
            alert('error');
            return;
        }
        
        resizeCanvas(width);

        canvasSize =  width;
        grid = document.querySelectorAll('.cell');
    });
    
    clearBttn.addEventListener('click', () =>
    {
        
        grid.forEach(cell =>
        {
            cell.removeAttribute('style');
        });
    
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
        cell.classList.add('cell');
        canvas.appendChild(cell);
    }
    
    canvas.style.gridTemplateColumns = `repeat(${x},auto)`;
}


main();