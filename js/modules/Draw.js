export class Draw {

    constructor() {
        this.canvas = document.getElementById('ecard');
        this.context = this.canvas.getContext('2d');
        this.rect = this.canvas.getBoundingClientRect();
        this.isDrawing = false;
        this.x = 0;
        this.y = 0;

        this.colorPicker = document.querySelector('.colorPicker')
        this.eraser = document.querySelector('.eraser');
        this.reset = document.querySelector('.reset');

        this.displayColor = document.querySelector('.selected');
        this.displayColor.style.backgroundColor = 'black';

        this.currentSize = 1;
        this.currentColor = 'black';
        this.defaultColor = '#000000'

        this.oldSize = 1;
        this.oldColor = 'black';

        this.init();
    }

    init() {
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;
    
        this.canvas.addEventListener('mousedown', this.onStartCanvas.bind(this));
        this.canvas.addEventListener('mousemove', this.onMoveCanvas.bind(this));
        this.canvas.addEventListener('mouseup', this.onStopCanvas.bind(this));

        this.colorPicker.addEventListener('change', this.colorChange.bind(this), false)
        this.eraser.addEventListener('click', this.eraseLine.bind(this));
        this.reset.addEventListener('click', this.onReset.bind(this));

        const colorBtn = document.querySelectorAll('.color');
        for (const btn of colorBtn) {
            btn.addEventListener('click', this.onClickColor.bind(this));
        }

        const sizeBtn = document.querySelectorAll('.thick');
        for (const btnSize of sizeBtn) {
            btnSize.addEventListener('click', this.onSize.bind(this));
        }
    }

    onStartCanvas(event) {
        this.x = event.offsetX; 
        this.y = event.offsetY;
        this.isDrawing = true;
    }

    onMoveCanvas(event) {
        if (this.isDrawing === true) {
            this.drawLine(this.x, this.y, event.offsetX, event.offsetY);
            this.x = event.offsetX;
            this.y = event.offsetY;
            }
    }

    onStopCanvas(event) {
        if (this.isDrawing === true) {
            this.drawLine(this.x, this.y, event.offsetX, event.offsetY);
            this.x = 0;
            this.y = 0;
            this.isDrawing = false;
        }
    }

    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.closePath();
    }

    eraseLine() {
        this.eraser.classList.toggle('hideLine');
        this.context.lineWidth = 10;
        if (this.context.strokeStyle == '#ffffff') {
            this.context.strokeStyle = this.oldColor;
            this.context.lineWidth = this.oldSize;
        } else {
            this.oldSize = this.currentSize;
            this.oldColor = this.context.strokeStyle;
            this.context.strokeStyle = '#ffffff';
        }
    }

    onReset() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    onClickColor(event) {
        const color = event.currentTarget.dataset.color;
        this.context.strokeStyle = color;
        this.currentColor = color;
        this.displayColor.style.backgroundColor = color;
        const colorSelect = document.querySelector('.colorSelected');
        if (colorSelect) {
            colorSelect.classList.remove('colorSelected');
        }
        event.currentTarget.classList.add('colorSelected');
        this.oldColor = this.context.strokeStyle ;
        this.eraser.classList.remove('hideLine');
    }

    onSize(event) {
        const size = event.currentTarget.dataset.size;
        this.context.lineWidth = size;
        this.currentSize = size;
        const thicknessSelect = document.querySelector('.thicknessSelected');
        if (this.eraser.classList.contains('hideLine')) {
            this.context.strokeStyle = this.oldColor;
        } 
        if (thicknessSelect) {
            thicknessSelect.classList.remove('thicknessSelected');
            this.eraser.classList.remove('hideLine');
        }
        event.currentTarget.classList.add('thicknessSelected');
        event.currentTarget.classList.add('colorSelected');
    }

    colorChange(event) {
        this.context.strokeStyle = event.target.value;
        this.currentColor = event.target.value;
        this.displayColor.style.backgroundColor = event.target.value;
        const colorSelect = document.querySelector('.colorSelected');
        if (colorSelect) {
            colorSelect.classList.remove('colorSelected');
            this.eraser.classList.remove('hideLine');
            this.oldColor = this.context.strokeStyle ;
       }
    }
}