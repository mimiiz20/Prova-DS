const express = require('express');
const app = express();
const path = require('path');

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// CLASSES DE HARDWARE
class ComponenteHardware {
    gerarValor() { throw new Error("Método deve ser implementado"); }
    formatar(valor) { return valor; }
}

class CPU extends ComponenteHardware {
    gerarValor() { return (Math.random() * 100).toFixed(2); }
    formatar(valor) { return `${valor} %`; }
}

class RAM extends ComponenteHardware {
    gerarValor() { return (Math.random() * 32).toFixed(2); }
    formatar(valor) { return `${valor} GB`; }
}

class Temperatura extends ComponenteHardware {
    gerarValor() { return (Math.random() * (90 - 30) + 30).toFixed(2); }
    formatar(valor) { return `${valor} °C`; }
}

// MOTOR DE HARDWARE
class HardwareEngine {
    constructor() {
        this.componentes = [ new CPU(), new RAM(), new Temperatura() ];
    }
    obterDados() {
        return {
            cpu: this.componentes[0].formatar(this.componentes[0].gerarValor()),
            ram: this.componentes[1].formatar(this.componentes[1].gerarValor()),
            temperatura: this.componentes[2].formatar(this.componentes[2].gerarValor())
        };
    }
}

// Rota /monitoramento retorna os dados simulados
app.get('/monitoramento', (req, res) => {
    const engine = new HardwareEngine();
    res.json(engine.obterDados());
});

// Rota principal serve o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
