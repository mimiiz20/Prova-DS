const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// 🔥 permite HTML, CSS e JS
app.use(express.static(path.join(__dirname)));

// CLASSE BASE
class ComponenteHardware {
    gerarValor() {
        throw new Error("Método deve ser implementado");
    }

    formatar(valor) {
        return valor;
    }
}

// CPU
class CPU extends ComponenteHardware {
    gerarValor() {
        return (Math.random() * 100).toFixed(2);
    }

    formatar(valor) {
        return `${valor} %`;
    }
}

// RAM
class RAM extends ComponenteHardware {
    gerarValor() {
        return (Math.random() * 32).toFixed(2);
    }

    formatar(valor) {
        return `${valor} GB`;
    }
}

// Temperatura
class Temperatura extends ComponenteHardware {
    gerarValor() {
        return (Math.random() * (90 - 30) + 30).toFixed(2);
    }

    formatar(valor) {
        return `${valor} °C`;
    }
}

// LÓGICA DE NEGÓCIO
class HardwareEngine {
    constructor() {
        this.componentes = [
            new CPU(),
            new RAM(),
            new Temperatura()
        ];
    }

    obterDados() {
        return {
            cpu: this.componentes[0].formatar(this.componentes[0].gerarValor()),
            ram: this.componentes[1].formatar(this.componentes[1].gerarValor()),
            temperatura: this.componentes[2].formatar(this.componentes[2].gerarValor())
        };
    }
}

// 🔥 API correta
app.get('/monitoramento', (req, res) => {
    const engine = new HardwareEngine();
    res.json(engine.obterDados());
});

// 🔥 Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// SERVIDOR
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});