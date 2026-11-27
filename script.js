// Banco de dados do conteúdo de cada seção do índice
const conteudoSecoes = {
    "visao-geral": {
        tag: "Capítulo 01",
        titulo: "Visão Geral do Acervo",
        descricao: "Bem-vindo ao índice centralizado de documentos, referências normativas, manuais técnicos e protótipos. Utilize o menu lateral para navegar entre as categorias.",
        itens: [
            {
                titulo: "Como utilizar este índice",
                resumo: "Selecione qualquer categoria no menu à esquerda ou utilize o campo de busca superior para filtrar os capítulos.",
                data: "Atualizado em Nov/2026",
                status: "Ativo"
            },
            {
                titulo: "Estrutura de Publicação",
                resumo: "Este portal é hospedado como página estática no GitHub Pages, permitindo atualizações rápidas diretamente via código.",
                data: "Versão 1.0",
                status: "Estável"
            }
        ]
    },
    "manuais": {
        tag: "Capítulo 02",
        titulo: "Manuais Técnicos e Operacionais",
        descricao: "Guias práticos de operação, configuração de sistemas e instruções passo a passo.",
        itens: [
            {
                titulo: "Manual de Operação do Sistema",
                resumo: "Procedimentos padrão de inicialização, rotina diária, extração de relatórios e resolução de falhas.",
                data: "Rev. 04",
                status: "Publicado"
            },
            {
                titulo: "Guia de Boas Práticas de Dados",
                resumo: "Padrões para consultas, modelagem de fluxos e armazenamento seguro de registros.",
                data: "Rev. 02",
                status: "Publicado"
            }
        ]
    },
    "legislacao": {
        tag: "Capítulo 03",
        titulo: "Legislação Aplicável",
        descricao: "Leis, decretos, resoluções e dispositivos legais que fundamentam os processos.",
        itens: [
            {
                titulo: "Lei de Acesso à Informação (LAI)",
                resumo: "Diretrizes sobre transparência ativa, classificação de sigilo e prazos de atendimento.",
                data: "Lei nº 12.527",
                status: "Vigente"
            },
            {
                titulo: "Lei Geral de Proteção de Dados (LGPD)",
                resumo: "Regras para tratamento, anonimização e governança de dados pessoais.",
                data: "Lei nº 13.709",
                status: "Vigente"
            }
        ]
    },
    "normas": {
        tag: "Capítulo 04",
        titulo: "Normas & Procedimentos Internos",
        descricao: "Portarias, instruções normativas, fluxogramas BPMN e regras de governança.",
        itens: [
            {
                titulo: "IN-01: Gestão de Portfólio e Projetos",
                resumo: "Define os critérios de priorização, abertura e acompanhamento de entregas.",
                data: "2026",
                status: "Em vigor"
            },
            {
                titulo: "Padrão de Modelagem de Processos",
                resumo: "Convenções para desenho de fluxos de trabalho e tabelas de decisão.",
                data: "2026",
                status: "Em vigor"
            }
        ]
    },
    "prototipos": {
        tag: "Capítulo 05",
        titulo: "Protótipos & Sistemas",
        descricao: "Links e documentação de ferramentas em desenvolvimento, painéis e provas de conceito.",
        itens: [
            {
                titulo: "Protótipo de Gestão Bidirecional de Tarefas",
                resumo: "Interface experimental para alinhamento entre demandas operacionais e metas estratégicas.",
                data: "Fase de Testes",
                status: "Beta"
            },
            {
                titulo: "Painel de Indicadores (BI)",
                resumo: "Visualização consolidada de métricas de desempenho e prazos.",
                data: "Homologação",
                status: "Ativo"
            }
        ]
    },
    "agenda": {
        tag: "Capítulo 06",
        titulo: "Agenda & Cronograma",
        descricao: "Datas importantes, marcos de entrega, reuniões e prazos regimentais.",
        itens: [
            {
                titulo: "Fechamento do Ciclo Trimestral",
                resumo: "Consolidação dos relatórios de acompanhamento e revisão de metas.",
                data: "15/12/2026",
                status: "Agendado"
            },
            {
                titulo: "Oficina de Atualização Documental",
                resumo: "Revisão coletiva dos manuais e procedimentos operacionais.",
                data: "20/01/2027",
                status: "Previsto"
            }
        ]
    }
};

// Elementos do DOM
const contentArea = document.getElementById("content-area");
const navLinks = document.querySelectorAll(".nav-link");
const searchInput = document.getElementById("search-input");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

// Função para renderizar o conteúdo na tela
function carregarSecao(chave) {
    const dados = conteudoSecoes[chave];
    if (!dados) return;

    let cardsHTML = dados.itens.map(item => `
        <article class="doc-card">
            <h3>${item.titulo}</h3>
            <p>${item.resumo}</p>
            <div class="doc-meta">
                <span>${item.data}</span>
                <strong>${item.status}</strong>
            </div>
        </article>
    `).join("");

    contentArea.innerHTML = `
        <div class="section-header">
            <span class="section-tag">${dados.tag}</span>
            <h2>${dados.titulo}</h2>
        </div>
        <p>${dados.descricao}</p>
        <div class="doc-grid">
            ${cardsHTML}
        </div>
    `;
}

// Evento de clique nos itens do menu
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Atualiza classe ativa no menu
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");

        // Carrega o conteúdo correspondente
        const secao = link.getAttribute("data-section");
        carregarSecao(secao);

        // Fecha o menu no celular após clicar
        sidebar.classList.remove("open");
    });
});

// Filtro de busca no menu lateral
searchInput.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();
    navLinks.forEach(link => {
        const texto = link.textContent.toLowerCase();
        link.parentElement.style.display = texto.includes(termo) ? "block" : "none";
    });
});

// Botão de menu para telas pequenas
menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// Carrega a primeira seção ao abrir a página
carregarSecao("visao-geral");