// script.js
class ThotAnalyzer {
    constructor() {
        this.alturaInput = document.getElementById('altura');
        this.pesoInput = document.getElementById('peso');
        this.mensaje = document.getElementById('mensaje');
        this.alarma = document.getElementById('alarma');
        this.bmiValue = document.getElementById('bmi-value');
        this.bmiCategory = document.getElementById('bmi-category');

        this.insultos = [
            "¡Criatura de Chernobyl!",
            "¡Bolsón de grasanga!",
            "¡Morsa terrestre!",
            "¡Fábrica de celulitis!",
            "¡Cúmulo de michelines!"
        ];

        this.weightTable = {
            150: [41.6, 56, 65],
            160: [48.6, 66, 77],
            170: [55.9, 76, 89],
            180: [63.5, 86, 101],
            190: [71.7, 97, 114]
        };

        this.init();
    }

    init() {
        document.getElementById('verificar').addEventListener('click', () => this.analyze());
        this.initMatrixEffect();
    }

    analyze() {
        const altura = parseInt(this.alturaInput.value);
        const peso = parseFloat(this.pesoInput.value);

        if (!this.validateInputs(altura, peso)) return;

        const alturaRedondeada = this.roundHeight(altura);
        const [min, max, obs] = this.getWeightRanges(alturaRedondeada);

        this.displayResults(peso, min, max, obs, alturaRedondeada);
    }

    getWeightRanges(height) {
        return this.weightTable[height] || [0, 0, 0];
    }

    displayResults(weight, min, max, obs, alturaRedondeada) {
        const bmi = (weight / ((alturaRedondeada / 100) ** 2)).toFixed(1);
        this.bmiValue.textContent = `BMI: ${bmi}`;

        let result;
        if (weight < min) {
            result = this.generateInsult('anorex', `¿Dieta de fotosíntesis? 🌱<br>Necesitas ${min}kg para ser humano`);
        } else if (weight <= max) {
            result = this.generateInsult('ok', `¡Nivel básico de dignidad! ✅<br>Zona no repugnante`);
        } else if (weight <= obs) {
            result = this.generateInsult('warning', `¡Alerta de michelines! 🚨<br>${this.randomInsult()}`);
        } else {
            result = this.generateInsult('danger', `¡NIVEL BALLENATO! 🐋<br>${this.randomInsult()}`, true);
        }

        this.mensaje.innerHTML = result.message;
        this.applyEffects(result.type);
    }

    generateInsult(type, text, emergency = false) {
        const styles = {
            anorex: { color: '#0ff', shadow: '0 0 20px #0ff' },
            ok: { color: '#0f0', shadow: '0 0 20px #0f0' },
            warning: { color: '#ff0', shadow: '0 0 20px #ff0' },
            danger: { color: '#f00', shadow: '0 0 30px #f00' }
        };

        return {
            type,
            message: `${text}<div class="insult">${emergency ? this.randomInsult().toUpperCase() : ''}</div>`,
            style: styles[type]
        };
    }

    validateInputs(altura, peso) {
        if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
            this.mensaje.innerHTML = "¡ERROR!<br>Insertar valores humanos";
            return false;
        }
        return true;
    }

    roundHeight(height) {
        return Math.ceil(height / 10) * 10;  // Redondeo a la decena más cercana
    }

    applyEffects(type) {
        const colors = {
            anorex: '#0ff',
            ok: '#0f0',
            warning: '#ff0',
            danger: '#f00'
        };

        const intensity = type === 'danger' ? '20px' : '5px';
        document.body.style.textShadow = `0 0 ${intensity} ${colors[type]}`;
        if (type === 'danger') {
            this.alarma.play();
            setTimeout(() => document.body.style.textShadow = '', 2000);
        }
    }

    randomInsult() {
        return this.insultos[Math.floor(Math.random() * this.insultos.length)];
    }

    initMatrixEffect() {
        // Código para efecto Matrix...
    }
}

const analyzer = new ThotAnalyzer();
