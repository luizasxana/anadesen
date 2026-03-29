let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const form = document.getElementById("formTarefa");
const tabela = document.getElementById("tabelaTarefas");

function salvarNoStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function formatarData(data) {
    if(!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function listarTarefas(dados = tarefas) {
    tabela.innerHTML = "";
    const msgVazia = document.getElementById("mensagemVazia");

    if (dados.length === 0) {
        msgVazia.innerHTML = "<p style='text-align:center; padding:20px;'>Nenhuma tarefa encontrada.</p>";
        return;
    }
    msgVazia.innerHTML = "";

    dados.forEach((item, index) => {
        const tr = document.createElement("tr");
        if (item.status === "Concluída") tr.classList.add("concluida");

        tr.innerHTML = `
            <td>${item.status}</td>
            <td><strong>${item.titulo}</strong><br><small>${item.descricao}</small></td>
            <td>${item.prioridade}</td>
            <td>${formatarData(item.dataCriacao)}</td>
            <td>
                <button class="btn-concluir" onclick="alterarStatus(${index})">✔</button>
                <button class="btn-editar" onclick="prepararEdicao(${index})">✏</button>
                <button class="btn-excluir" onclick="removerTarefa(${index})">🗑</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("index").value;
    const tarefaObj = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        prioridade: document.getElementById("prioridade").value,
        status: document.getElementById("status").value,
        dataCriacao: document.getElementById("dataCriacao").value
    };

    if (id === "") {
        tarefas.push(tarefaObj);
    } else {
        tarefas[id] = tarefaObj;
        document.getElementById("index").value = "";
    }

    salvarNoStorage();
    listarTarefas();
    form.reset();
});

function alterarStatus(i) {
    tarefas[i].status = "Concluída";
    salvarNoStorage();
    listarTarefas();
}

function removerTarefa(i) {
    if (confirm("Deseja excluir?")) {
        tarefas.splice(i, 1);
        salvarNoStorage();
        listarTarefas();
    }
}

function prepararEdicao(i) {
    const t = tarefas[i];
    document.getElementById("titulo").value = t.titulo;
    document.getElementById("descricao").value = t.descricao;
    document.getElementById("prioridade").value = t.prioridade;
    document.getElementById("status").value = t.status;
    document.getElementById("dataCriacao").value = t.dataCriacao;
    document.getElementById("index").value = i;
}

function buscarTarefa() {
    const termo = document.getElementById("busca").value.toLowerCase();
    const filtradas = tarefas.filter(t => t.titulo.toLowerCase().includes(termo));
    listarTarefas(filtradas);
}

listarTarefas();