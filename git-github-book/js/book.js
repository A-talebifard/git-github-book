/* ===== Git & GitHub Book — Interactive Features =====
 * - Mermaid.js initialization
 * - highlight.js initialization
 * - Sidebar TOC generation
 * - Active link tracking on scroll
 * - Reading progress bar
 * - Search functionality (Ctrl+K)
 * - Copy buttons for code blocks
 * - Keyboard navigation (Arrow keys)
 */

// ===== Mermaid Init =====
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
      darkMode: true,
      background: '#181825',
      primaryColor: '#313244',
      primaryTextColor: '#cdd6f4',
      primaryBorderColor: '#c084fc',
      lineColor: '#89b4fa',
      secondaryColor: '#45475a',
      tertiaryColor: '#1e1e2e',
      textColor: '#cdd6f4',
      mainBkg: '#313244',
      secondBkg: '#45475a',
      borderColor: '#c084fc',
      edgeLabelBackground: '#181825',
      clusterBkg: '#181825',
      clusterBorder: '#45475a',
      labelTextColor: '#cdd6f4',
      nodeTextColor: '#cdd6f4',
      titleColor: '#c084fc',
      git0: '#c084fc',
      git1: '#2dd4bf',
      git2: '#f38ba8',
      git3: '#f9e2af',
      git4: '#89b4fa',
      git5: '#a6e3a1',
      git6: '#fab387',
      git7: '#cba6f7',
      gitBranchLabel0: '#1e1e2e',
      gitBranchLabel1: '#1e1e2e',
      gitBranchLabel2: '#1e1e2e',
      gitBranchLabel3: '#1e1e2e',
      commitLabelColor: '#cdd6f4',
      commitLabelBackground: '#313244',
      commitLabelFontSize: '14px',
      tagLabelColor: '#1e1e2e',
      tagLabelBackground: '#f9e2af',
      tagLabelBorder: '#f9e2af',
      tagLabelFontSize: '12px'
    },
    flowchart: { curve: 'basis', htmlLabels: true },
    sequence: { actorMargin: 50, boxMargin: 10 },
    timeline: { padding: 16 }
  });

  // ===== Highlight.js =====
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre code').forEach(b => {
      try { hljs.highlightElement(b); } catch(e) {}
    });
  });

  // ===== Generate TOC from chapters =====
  const tocContainer = document.getElementById('toc-container');
  const chapters = [
    {id:'cover', title:'جلد', sub:false},
    {id:'ch1', title:'فصل ۱: تاریخچه Git', sub:false},
    {id:'ch2', title:'فصل ۲: مقایسه با VCSها', sub:false},
    {id:'ch3', title:'فصل ۳: مبانی Git', sub:false},
    {id:'ch4', title:'فصل ۴: نصب و تنظیم', sub:false},
    {id:'ch5', title:'فصل ۵: دستورات پایه', sub:false},
    {id:'ch6', title:'فصل ۶: Objects و Hashes', sub:false},
    {id:'ch7', title:'فصل ۷: Branching', sub:false},
    {id:'ch8', title:'فصل ۸: Rebase vs Merge', sub:false},
    {id:'ch9', title:'فصل ۹: حل Conflict', sub:false},
    {id:'ch10', title:'فصل ۱۰: استراتژی‌های Branching', sub:false},
    {id:'ch11', title:'فصل ۱۱: GitHub راه‌اندازی', sub:false},
    {id:'ch12', title:'فصل ۱۲: Pull Request', sub:false},
    {id:'ch13', title:'فصل ۱۳: Issues و Projects', sub:false},
    {id:'ch14', title:'فصل ۱۴: GitHub Actions', sub:false},
    {id:'ch15', title:'فصل ۱۵: GitHub Pages', sub:false},
    {id:'ch16', title:'فصل ۱۶: Undo و Reset', sub:false},
    {id:'ch17', title:'فصل ۱۷: Stash و Cherry-pick', sub:false},
    {id:'ch18', title:'فصل ۱۸: Submodules', sub:false},
    {id:'ch19', title:'فصل ۱۹: Hooks و Config', sub:false},
    {id:'ch20', title:'فصل ۲۰: Troubleshooting', sub:false},
    {id:'ch21', title:'فصل ۲۱: Best Practices', sub:false},
    {id:'ch22', title:'فصل ۲۲: Cheat Sheet', sub:false},
    {id:'glossary', title:'واژه‌نامه', sub:false},
    {id:'footer', title:'درباره نویسنده', sub:false}
  ];

  chapters.forEach(ch => {
    const a = document.createElement('a');
    a.href = '#' + ch.id;
    a.textContent = ch.title;
    a.dataset.target = ch.id;
    if (ch.sub) a.classList.add('sub');
    tocContainer.appendChild(a);
  });

  // ===== Active link on scroll =====
  const links = document.querySelectorAll('#sidebar a[data-target]');
  const sections = chapters.map(c => document.getElementById(c.id)).filter(Boolean);

  function updateActive() {
    let current = sections[0]?.id;
    const scrollY = window.scrollY + 120;
    sections.forEach(s => {
      if (s && s.offsetTop <= scrollY) current = s.id;
    });
    links.forEach(l => l.classList.toggle('active', l.dataset.target === current));
  }
  window.addEventListener('scroll', updateActive);
  updateActive();

  // ===== Progress bar =====
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progressBar.style.width = pct + '%';
  });

  // ===== Sidebar toggle (mobile) =====
  const sidebar = document.getElementById('sidebar');
  document.getElementById('menu-toggle').addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  links.forEach(l => l.addEventListener('click', () => {
    if (window.innerWidth <= 1024) sidebar.classList.remove('open');
  }));

  // ===== Copy button for code blocks =====
  function addCopyButtons() {
    document.querySelectorAll('.code-wrap').forEach(wrap => {
      if (wrap.querySelector('.copy-btn')) return;
      const header = wrap.querySelector('.code-header');
      if (!header) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', () => {
        const code = wrap.querySelector('pre code');
        if (!code) return;
        navigator.clipboard.writeText(code.textContent).then(() => {
          btn.textContent = '✓ Copied';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
        });
      });
      header.appendChild(btn);
    });
  }
  addCopyButtons();

  // ===== Search =====
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchBtn = document.getElementById('search-btn');

  function buildSearchIndex() {
    const idx = [];
    document.querySelectorAll('.chapter').forEach(ch => {
      const id = ch.id;
      const label = ch.querySelector('.chapter-label');
      const h2 = ch.querySelector('h2');
      const title = h2 ? h2.textContent.replace('#','').trim() : id;
      const text = ch.textContent.replace(/\s+/g,' ').trim().slice(0, 5000);
      idx.push({id, title, text});
    });
    return idx;
  }
  const searchIndex = buildSearchIndex();

  function doSearch(q) {
    if (!q || q.trim().length < 2) {
      searchResults.classList.remove('active');
      return;
    }
    const ql = q.toLowerCase();
    const results = searchIndex.filter(item =>
      item.title.toLowerCase().includes(ql) || item.text.toLowerCase().includes(ql)
    ).slice(0, 12);

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="empty">نتیجه‌ای یافت نشد</div>';
    } else {
      searchResults.innerHTML = results.map(r => {
        const idx = r.text.toLowerCase().indexOf(ql);
        const snippet = idx >= 0
          ? '...' + r.text.substring(Math.max(0, idx-40), idx+80) + '...'
          : r.text.substring(0, 120) + '...';
        return `<div class="result-item" data-target="${r.id}">
          <div class="result-title">${r.title}</div>
          <div class="result-snippet">${snippet}</div>
        </div>`;
      }).join('');
      searchResults.querySelectorAll('.result-item').forEach(item => {
        item.addEventListener('click', () => {
          document.getElementById(item.dataset.target).scrollIntoView({behavior:'smooth'});
          searchResults.classList.remove('active');
          searchInput.value = '';
        });
      });
    }
    searchResults.classList.add('active');
  }

  searchInput.addEventListener('input', e => doSearch(e.target.value));
  searchInput.addEventListener('focus', e => { if (e.target.value) doSearch(e.target.value); });
  searchBtn.addEventListener('click', () => searchInput.focus());
  document.addEventListener('click', e => {
    if (!e.target.closest('#search-input') && !e.target.closest('#search-results') && !e.target.closest('#search-btn')) {
      searchResults.classList.remove('active');
    }
  });

  // Keyboard shortcut: Ctrl+K / Cmd+K
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') {
      searchResults.classList.remove('active');
      searchInput.blur();
    }
  });

  // Keyboard arrow navigation
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    const currentIdx = chapters.findIndex(c => c.id === (document.querySelector('#sidebar a.active')?.dataset.target));
    if (e.key === 'ArrowLeft' && currentIdx < chapters.length - 1) {
      document.getElementById(chapters[currentIdx + 1].id)?.scrollIntoView({behavior:'smooth'});
    }
    if (e.key === 'ArrowRight' && currentIdx > 0) {
      document.getElementById(chapters[currentIdx - 1].id)?.scrollIntoView({behavior:'smooth'});
    }
  });