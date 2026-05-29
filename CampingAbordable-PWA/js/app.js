'use strict';

const WIX_SITE = 'https://www.campingabordable.ca';

const PAGES = {
    home: { title: 'Accueil', render: renderHome },
    carte: { title: 'Carte Haltes-VR', render: renderWebview, url: WIX_SITE + '/haltes-vr-carte-express' },
    ressources: { title: 'Ressources', render: renderWebview, url: WIX_SITE + '/ressources' },
    guide: { title: 'Guide SÉPAQ', render: renderWebview, url: WIX_SITE + '/guide' },
    blogue: { title: 'Blogue', render: renderBloc },
    calculatrice: { title: 'Calculatrice Essence', render: renderWebview, url: WIX_SITE + '/calculessence' },
    inscription: { title: 'Inscrire Halte-VR', render: renderWebview, url: WIX_SITE + '/inscrire-halte-vr' },
    membres: { title: 'Membres', render: renderWebview, url: WIX_SITE + '/inscription-1' },
    contact: { title: 'Contact', render: renderContact },
    apropos: { title: 'À propos', render: renderWebview, url: WIX_SITE + '/à-propos' }
};

const BLOG_POSTS = [
    { title: 'Voyager local, c\'est payant', excerpt: 'Pourquoi les caravaniers canadiens gagnent à rester au pays cet été?', url: WIX_SITE + '/post/voyager-local-c-est-payant-pourquoi-les-caravaniers-canadiens-gagnent-à-rester-au-pays-cet-été' },
    { title: 'Fort Prével, un camping pas comme les autres', excerpt: 'Découvrez ce camping unique au Québec...', url: WIX_SITE + '/post/fort-prével-un-camping-pas-comme-les-autres' },
    { title: 'Voyager en VR en 2026', excerpt: 'Ralentir pour mieux profiter avec campingabordable.ca', url: WIX_SITE + '/post/camping-abordable-ca' },
    { title: 'Mini-roulotte, mini-chien, maxi préparatifs', excerpt: 'Conseils pour voyager en mini-roulotte avec son chien...', url: WIX_SITE + '/post/mini-roulotte-mini-chien-maxi-préparatifs' },
    { title: 'Canada ou USA pour vos vacances?', excerpt: 'Comparatif des destinations pour vos vacances en VR...', url: WIX_SITE + '/post/canada-ou-usa-pour-vos-vacances-cet-été' }
];

// ============ DOM REFS ============
const $ = id => document.getElementById(id);
const splash = $('splash');
const main = $('mainContent');
const tabBar = $('tabBar');
const sideMenu = $('sideMenu');
const menuOverlay = $('menuOverlay');
const navLinks = document.querySelectorAll('.menu-list a, .tab-btn');

let currentPage = 'home';

// ============ SPLASH SCREEN ============
window.addEventListener('load', () => {
    setTimeout(() => splash.classList.add('hide'), 1000);
    registerSW();
});

function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js', { scope: '/' })
            .catch(() => {});
    }
}

// ============ NAVIGATION ============
function navigate(pageId) {
    if (!PAGES[pageId]) pageId = 'home';
    currentPage = pageId;

    const page = PAGES[pageId];
    document.title = page.title + ' - Camping Abordable';

    // Render
    main.innerHTML = '';
    page.render(pageId, page);

    // Update tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageId);
    });

    // Close menu
    closeMenu();
    main.scrollTop = 0;
}

function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('show');
}

function renderHome() {
    main.innerHTML = `
        <div class="page">
            <div class="hero-card">
                <div class="hero-badge">🔥 Nouveau</div>
                <h1>Camping Abordable</h1>
                <p>Haltes-VR gratuites et camping à petit prix au Québec</p>
                <a href="#" class="btn-primary" onclick="navigate('carte');return false">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Explorer la carte
                </a>
            </div>

            <div class="quick-grid">
                <a class="quick-item" onclick="navigate('carte');return false">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>Carte Haltes-VR</span>
                </a>
                <a class="quick-item" onclick="navigate('ressources');return false">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    <span>Ressources</span>
                </a>
                <a class="quick-item" onclick="navigate('guide');return false">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/></svg>
                    <span>Guide SÉPAQ</span>
                </a>
                <a class="quick-item" onclick="navigate('calculatrice');return false">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/></svg>
                    <span>Calcul essence</span>
                </a>
                <a class="quick-item" onclick="navigate('inscription');return false">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                    <span>Ajouter Halte-VR</span>
                </a>
                <a class="quick-item" onclick="navigate('membres');return false">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>Devenir membre</span>
                </a>
            </div>

            <div class="section-title">📰 Derniers articles du blogue</div>
            ${BLOG_POSTS.slice(0, 3).map(p => `
                <a class="post-card" href="${p.url}" target="_blank" rel="noopener" style="display:block;text-decoration:none;color:inherit">
                    <h4>${p.title}</h4>
                    <p>${p.excerpt}</p>
                </a>
            `).join('')}
            <div style="text-align:center;margin-top:8px">
                <a class="btn-primary" onclick="navigate('blogue');return false" style="background:var(--accent);color:#1a1a2e">
                    Voir tous les articles →
                </a>
            </div>

            <div style="text-align:center;margin-top:20px;padding:8px;font-size:12px;color:var(--text-light)">
                🌲 Voyager plus. Dépenser moins. Découvrir davantage.
            </div>
        </div>
    `;
}

function renderBloc() {
    main.innerHTML = `
        <div class="page">
            <div class="page-header">
                <h2>Blogue</h2>
                <p>Conseils et destinations pour vos voyages en VR</p>
            </div>
            ${BLOG_POSTS.map(p => `
                <a class="post-card" href="${p.url}" target="_blank" rel="noopener" style="display:block;text-decoration:none;color:inherit">
                    <h4>${p.title}</h4>
                    <p>${p.excerpt}</p>
                </a>
            `).join('')}
            <div style="text-align:center;margin-top:16px">
                <a href="${WIX_SITE}/blogue" target="_blank" rel="noopener" class="btn-primary" style="background:var(--accent);color:#1a1a2e">Voir sur le site →</a>
            </div>
        </div>
    `;
}

function renderContact() {
    main.innerHTML = `
        <div class="page">
            <div class="page-header">
                <h2>Contact</h2>
                <p>Une question? Écrivez-nous!</p>
            </div>
            <div class="info-card">
                <h3>📧 Courriel</h3>
                <p>Utilisez le formulaire de contact sur notre site web</p>
                <a class="card-link" href="${WIX_SITE}/contact" target="_blank" rel="noopener">Ouvrir le formulaire →</a>
            </div>
            <div class="info-card">
                <h3>🌐 Site web</h3>
                <p>www.campingabordable.ca</p>
                <a class="card-link" href="${WIX_SITE}" target="_blank" rel="noopener">Visiter le site →</a>
            </div>
            <div class="info-card">
                <h3>📱 Facebook</h3>
                <p>Suivez-nous pour les dernières nouvelles et offres</p>
                <a class="card-link" href="https://www.facebook.com/campingabordable.ca/" target="_blank" rel="noopener">Nous suivre →</a>
            </div>
            <div style="text-align:center;margin-top:16px">
                <a href="${WIX_SITE}/contact" target="_blank" class="btn-primary">Ouvrir le formulaire de contact</a>
            </div>
        </div>
    `;
}

function renderWebview(pageId, page) {
    main.innerHTML = `
        <div class="webview-page">
            <div style="padding:12px 16px;background:var(--bg);border-bottom:1px solid var(--border);font-size:13px;color:var(--text-light);display:flex;align-items:center;gap:8px">
                <span style="flex:1">${page.title}</span>
                <a href="${page.url}" target="_blank" rel="noopener" style="color:var(--primary);font-weight:600;text-decoration:none">Ouvrir dans Safari →</a>
            </div>
            <iframe src="${page.url}" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" title="${page.title}"></iframe>
        </div>
    `;
}

// ============ EVENT LISTENERS ============
document.addEventListener('click', e => {
    const tabBtn = e.target.closest('.tab-btn');
    if (tabBtn) navigate(tabBtn.dataset.page);
});

$('menuBtn').addEventListener('click', () => {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('show');
});

$('closeMenu').addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.menu-list a').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        navigate(a.dataset.page);
    });
});

$('refreshBtn').addEventListener('click', () => {
    navigate(currentPage);
});

// Keyboard escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});

// Prevent overscroll on iOS
document.body.addEventListener('touchmove', e => {
    if (e.target.closest('#mainContent')) return;
}, { passive: true });

// ============ INIT ============
navigate('home');
