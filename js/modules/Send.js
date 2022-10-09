export class  Send {

    constructor() {
        this.sendForm = document.querySelector('.send');
        this.submit = document.querySelector('.submit');
        this.form = document.querySelector('.sendForm');
        this.init();
    }

    init() {
        this.sendForm.addEventListener('click', this.onHide.bind(this));
        this.submit.addEventListener('click', this.sendMail.bind(this));
    }

    onHide() {
        this.form.classList.toggle('hidden');
        document.querySelector('.messOK').innerHTML = '';
    }

    sendMail(event) {
        event.preventDefault();
        
        const image = document.getElementById('image');
        image.value = document.getElementById('ecard').toDataURL();

        const formData = new FormData(this.form);
        const mailSent = {
            method: 'POST',
            body: formData
        };

        fetch ('php/index.php', mailSent)
            .then(response => response.json())
            .then(data => this.onOK(data));
        
    }

    onOK(data) {
        if (data.message) {
            const canvas = document.getElementById('ecard');
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);    
    
            this.form.reset();
            this.form.classList.toggle('hidden');
        
            context.strokeStyle = 'black';
            const colorSelect = document.querySelector('.colorSelected');
            if (colorSelect) {
                colorSelect.classList.remove('colorSelected');
            }
            const black = document.querySelector('.black');
            black.classList.add('colorSelected');
            const displayColor = document.querySelector('.selected');
            displayColor.style.backgroundColor = 'black';
    
            context.lineWidth = 1;
            const thicknessSelect = document.querySelector('.thicknessSelected');
            if (thicknessSelect) {
                thicknessSelect.classList.remove('thicknessSelected');
            }
            const thin = document.querySelector('.thin');
            thin.classList.add('thicknessSelected');
            
            document.querySelector('.messKO').innerHTML ='';
            document.querySelector('.messOK').innerHTML = `
                <h2>Dessin Envoyé</h2>
            `

        } else {
            const KOMessage = document.querySelector('.messKO');

            for (const err of data.error) {
            KOMessage.innerHTML += `
                <h3>${err}</h3>
            `
            }
        }
    }
}