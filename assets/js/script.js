/* DADOS DOS MÓDULOS */

const modulosData = [
    { name: 'Diário Online', icon: 'book-open', desc: 'Gestão pedagógica completa em um único lugar.' },
    { name: 'Aprendendo o Educa+', icon: 'play-circle', desc: 'Formação contínua para profissionais da educação, com videoaulas práticas e e-books completos.'},
    { name: 'Suporte ao Usuário', icon: 'headset', desc: 'Atendimento especializado para suporte e orientação ao usuário.'}
];

/* INICIALIZAÇÃO */

document.addEventListener('DOMContentLoaded', () => {

    // Inicializar ícones Lucide (se existir)
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    renderModules();
    setCurrentYear();
    initHeaderScrollEffect();
    initModal();
    initForm();
});


/* FUNÇÕES GERAIS */

function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}


/* EFEITO SCROLL HEADER */

function initHeaderScrollEffect() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}


/* RENDERIZAR MÓDULOS */

function renderModules() {
    const container = document.getElementById('modules-container');
    if (!container) return;

    container.innerHTML = modulosData.map(mod => `
        <div class="module-card">
            <div class="benefit-icon" style="margin: 0 0 1.5rem 0;">
                <i data-lucide="${mod.icon}"></i>
            </div>
            <h3>${mod.name}</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
                ${mod.desc}
            </p>
            <div 
                style="margin-top:auto; padding-top:1rem; color:var(--primary); font-weight:700; cursor:pointer; font-size: 0.9rem;" 
                onclick="openPlaylist('${mod.name}')">
                CONHECER →
            </div>
        </div>
    `).join('');

    // Recriar ícones após renderização
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}


/* MODAL */

function initModal() {
    const closeBtn = document.getElementById('close-playlist');
    const overlay = document.getElementById('playlist-overlay');

    if (!closeBtn || !overlay) return;

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Fechar ao clicar fora do modal
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
}


function openPlaylist(name) {
    const overlay = document.getElementById('playlist-overlay');
    const title = document.getElementById('modal-title');
    const videoList = document.getElementById('video-list');

    if (!overlay || !title || !videoList) return;

    title.textContent = name;

    videoList.innerHTML = `
        <p style="padding: 2rem 0; color: #666; text-align: center;">
            Carregando detalhes sobre ${name}... 
            Nossa equipe preparou um vídeo de 2 minutos para você.
        </p>
    `;

    overlay.style.display = 'flex';

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}


/* FORMULÁRIO */

function initForm() {
    const form = document.getElementById('form-contato');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button');
        if (!btn) return;

        btn.textContent = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Sua solicitação foi enviada com sucesso! Um especialista do Educa+ entrará em contato em breve através do e-mail informado.');

            form.reset();
            btn.textContent = 'Solicitar Demonstração';
            btn.disabled = false;
        }, 1500);
    });
}
