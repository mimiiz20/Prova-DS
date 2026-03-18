async function atualizarDados() {
    try {
        const resposta = await fetch('/monitoramento');
        const dados = await resposta.json();

        // Atualiza valores
        const cpuEl = document.getElementById('cpu');
        const ramEl = document.getElementById('ram');
        const tempEl = document.getElementById('temp');

        cpuEl.innerText = dados.cpu;
        ramEl.innerText = dados.ram;
        tempEl.innerText = dados.temperatura;

        // Pega o card (pai do valor)
        const cpuCard = cpuEl.parentElement;
        const ramCard = ramEl.parentElement;
        const tempCard = tempEl.parentElement;

        // Lógica de alerta
        // CPU > 80% → crítico
        if (parseFloat(dados.cpu) > 80) {
            cpuCard.classList.add('alerta-critico');
        } else {
            cpuCard.classList.remove('alerta-critico');
        }

        // RAM > 24GB → crítico
        if (parseFloat(dados.ram) > 24) {
            ramCard.classList.add('alerta-critico');
        } else {
            ramCard.classList.remove('alerta-critico');
        }

        // Temperatura > 70°C → crítico
        if (parseFloat(dados.temperatura) > 70) {
            tempCard.classList.add('alerta-critico');
        } else {
            tempCard.classList.remove('alerta-critico');
        }

    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

// Atualiza a cada 2 segundos
setInterval(atualizarDados, 2000);

// Executa ao abrir
atualizarDados();