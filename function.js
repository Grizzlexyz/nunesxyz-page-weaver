(function() {
  'use strict';

  // ID único para controle de injeção e persistência
  const CONTAINER_ID = 'nunesxyz-devtools-universal-host';

  // Ícones SVG Inline para burlar o bloqueio de CDN (CSP) do Matific
  const SVGIcons = {
    wrench: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>`,
    activity: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    code2: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
    terminal: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    trash2: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`,
    mousePointer: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>`,
    save: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
    chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    edit3: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  };

  // =========================================================================
  // ENGENHARIA DE INJEÇÃO MULTI-CONTEXTO (IFRAMES & WEBGL CANVAS)
  // =========================================================================
  function buscarEInjetar(janelaAlvo) {
    try {
      if (janelaAlvo.document && janelaAlvo.document.body) {
        inicializarPainelProtegido(janelaAlvo.document, janelaAlvo);
      }
      
      for (let i = 0; i < janelaAlvo.frames.length; i++) {
        try {
          buscarEInjetar(janelaAlvo.frames[i]);
        } catch (e) {}
      }
    } catch (e) {}
  }

  function inicializarPainelProtegido(docContext, winContext) {
    if (docContext.getElementById(CONTAINER_ID)) return;

    const antigoOverlay = docContext.getElementById('nunesxyz-inspect-overlay');
    if (antigoOverlay) antigoOverlay.remove();

    const host = docContext.createElement('div');
    host.id = CONTAINER_ID;
    
    Object.assign(host.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '2147483647',
      display: 'block'
    });

    const shadowRoot = host.attachShadow({ mode: 'closed' });

    const painelRoot = docContext.createElement('div');
    painelRoot.id = 'nunesxyz-shadow-wrapper';
    painelRoot.style.pointerEvents = 'auto'; 
    shadowRoot.appendChild(painelRoot);

    montarEstruturaOriginal(painelRoot, docContext, winContext, shadowRoot);

    docContext.body.appendChild(host);

    const observadorDOM = new MutationObserver(() => {
      if (!docContext.getElementById(CONTAINER_ID)) {
        observadorDOM.disconnect();
        buscarEInjetar(winContext);
      }
    });
    observadorDOM.observe(docContext.body, { childList: true, subtree: false });
  }

  // =========================================================================
  // CORE OPERACIONAL ORIGINAL REESTRUTURADO
  // =========================================================================
  function montarEstruturaOriginal(rootElement, document, window, shadowContainer) {
    
    const container = document.createElement('div');
    container.id = 'nunesxyz-devtools-container';
    container.className = 'theme-dark'; 
    container.innerHTML = `
      <button id="nunesxyz-toggle" title="Abrir Nunesxyz">
        ${SVGIcons.wrench}
        <span>Nunesxyz</span>
      </button>

      <div id="nunesxyz-panel" class="hidden">
        
        <div class="nunesxyz-header" id="nunesxyz-drag-handle">
          <div class="nunesxyz-title">
            <span class="title-icon" style="display:inline-flex; align-items:center;">${SVGIcons.wrench}</span>
            <span style="margin-left:8px;">Nunesxyz</span>
          </div>
          <div class="header-actions">
            <button id="nunesxyz-theme-toggle" title="Alternar Tema" style="background:none; border:none; color:inherit; cursor:pointer;">
              <span id="theme-icon-container" style="display:inline-flex; align-items:center;">${SVGIcons.moon}</span>
            </button>
          </div>
        </div>

        <div class="nunesxyz-tabs">
          <button class="tab-btn active" data-tab="network">${SVGIcons.activity} Network</button>
          <button class="tab-btn" data-tab="elements">${SVGIcons.code2} Elements</button>
          <button class="tab-btn" data-tab="console">${SVGIcons.terminal} Console</button>
        </div>

        <div id="tab-network" class="tab-content active-content">
          <div class="actions-bar">
            <button id="btn-copy-selected" class="btn-primary">${SVGIcons.copy} Copiar Selecionadas</button>
            <button id="btn-clear-network" class="btn-danger">${SVGIcons.trash2} Limpar</button>
          </div>
          
          <div class="filter-bar">
            <select id="filter-method">
              <option value="ALL">TODOS</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input type="text" id="filter-search" placeholder="Buscar URL...">
            <input type="text" id="filter-exclude" placeholder="Ocultar termos (ex: bob, pop)...">
          </div>

          <div id="network-split">
            <div id="network-list"></div>
            <div id="network-details" class="hidden-detail">
              <div class="detail-header">
                <h4>Detalhes do Request</h4>
                <button id="btn-close-details">${SVGIcons.x}</button>
              </div>
              <div id="detail-content"></div>
            </div>
          </div>
        </div>

        <div id="tab-elements" class="tab-content">
          <div class="actions-bar">
            <button id="btn-toggle-inspect" class="btn-primary">${SVGIcons.mousePointer} Inspecionar Elemento</button>
            <button id="btn-save-element" class="btn-primary hidden">${SVGIcons.save} Salvar Elemento</button>
            <button id="btn-copy-saved-elements" class="btn-primary">${SVGIcons.copy} Copiar Selecionados</button>
            <button id="btn-clear-saved-elements" class="btn-danger">${SVGIcons.trash2} Limpar</button>
          </div>
          <div class="elements-instructions hint-text">💡 Dica: No modo mira, dê <b>Botão Direito</b> ou segure <b>Shift + Clique</b> para ignorar elementos da frente e ver os de trás!</div>
          <div id="elements-split">
            <div id="elements-left">
              <div id="html-editor-wrapper" class="hidden">
                <label>Editor HTML Visual:</label>
                <textarea id="html-live-editor" rows="12"></textarea>
              </div>
            </div>
            <div id="elements-right">
              <h4>Elementos Salvos</h4>
              <div id="saved-elements-list"></div>
            </div>
          </div>
        </div>

        <div id="tab-console" class="tab-content">
          <div id="console-log-list"></div>
          <div class="console-input-wrapper">
            <span class="prompt">${SVGIcons.chevronRight}</span>
            <input type="text" id="console-cmd-input" placeholder="Executar JavaScript...">
          </div>
        </div>

        <div id="api-modal" class="modal hidden">
          <div class="modal-content">
            <h3>${SVGIcons.edit3} Editar & Reenviar API</h3>
            <label>URL:</label><input type="text" id="modal-url">
            <label>Método:</label>
            <select id="modal-method">
              <option value="GET">GET</option><option value="POST">POST</option>
              <option value="PUT">PUT</option><option value="DELETE">DELETE</option>
            </select>
            <label>Headers (JSON):</label><textarea id="modal-headers" rows="2"></textarea>
            <label>Body / Payload (JSON):</label><textarea id="modal-body" rows="3"></textarea>
            <div class="modal-buttons">
              <button id="btn-modal-execute" class="btn-primary">${SVGIcons.zap} Executar</button>
              <button id="btn-modal-close" class="btn-danger">${SVGIcons.x} Fechar</button>
            </div>
            <div id="modal-response"></div>
          </div>
        </div>

        <div id="nunesxyz-resize-handle"></div>
      </div>
    `;
    rootElement.appendChild(container);

    const overlay = document.createElement('div');
    overlay.id = 'nunesxyz-inspect-overlay';
    rootElement.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
      #nunesxyz-devtools-container { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; position: fixed; bottom: 15px; right: 15px; direction: ltr; text-align: left; }
      #nunesxyz-inspect-overlay { position: fixed; background: rgba(0, 112, 243, 0.25); border: 2px dashed #0070f3; pointer-events: none; z-index: 2147483646; display: none; transition: all 0.05s ease-out; box-sizing: border-box; }
      .theme-dark #nunesxyz-toggle { background: #000000; color: #ffffff; border: 1px solid #333; }
      .theme-light #nunesxyz-toggle { background: #ffffff; color: #000000; border: 1px solid #ccc; }
      #nunesxyz-toggle { padding: 10px 18px; border-radius: 20px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.3); font-weight: bold; font-size: 13px; display: flex; align-items: center; gap: 8px; font-family: inherit; }
      #nunesxyz-toggle svg { display: block; }
      #nunesxyz-panel { width: 750px; height: 480px; min-width: 400px; min-height: 300px; position: fixed; bottom: 70px; right: 15px; border-radius: 8px; box-shadow: 0 10px 35px rgba(0,0,0,0.6); display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; }
      .theme-dark #nunesxyz-panel { background: #000000; color: #ffffff; border: 1px solid #222; }
      .theme-light #nunesxyz-panel { background: #ffffff; color: #000000; border: 1px solid #ccc; }
      .hidden { display: none !important; }
      .nunesxyz-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; cursor: move; user-select: none; }
      .theme-dark .nunesxyz-header { background: #050505; border-bottom: 1px solid #222; }
      .theme-light .nunesxyz-header { background: #f5f5f5; border-bottom: 1px solid #ccc; }
      .nunesxyz-title { display: flex; align-items: center; font-weight: bold; font-size: 15px; }
      .nunesxyz-title svg { color: #fff; }
      .theme-light .nunesxyz-title svg { color: #000; }
      .nunesxyz-tabs { display: flex; }
      .theme-dark .nunesxyz-tabs { background: #090909; border-bottom: 1px solid #222; }
      .theme-light .nunesxyz-tabs { background: #eaeaea; border-bottom: 1px solid #ccc; }
      .tab-btn { flex: 1; background: none; border: none; color: #777; padding: 10px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: inherit; }
      .tab-btn svg { display: block; }
      .theme-dark .tab-btn.active { background: #000000; color: #00ff66; font-weight: bold; }
      .theme-light .tab-btn.active { background: #ffffff; color: #0070f3; font-weight: bold; border-bottom: 2px solid #0070f3; }
      .tab-content { display: none; flex: 1; overflow-y: auto; padding: 12px; box-sizing: border-box; }
      .tab-content.active-content { display: flex; flex-direction: column; }
      #elements-split { display: flex; flex: 1; gap: 12px; overflow: hidden; margin-top: 5px; }
      #elements-left { flex: 1; display: flex; flex-direction: column; }
      #elements-right { width: 45%; border-left: 1px solid #222; padding-left: 10px; display: flex; flex-direction: column; overflow-y: auto; }
      .theme-light #elements-right { border-left: 1px solid #ccc; }
      #elements-right h4 { margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #888; }
      #saved-elements-list { flex: 1; overflow-y: auto; }
      .saved-element-item { border: 1px solid #1c1c1c; padding: 6px; margin-bottom: 4px; border-radius: 4px; background: #030303; display: flex; align-items: center; gap: 8px; }
      .theme-light .saved-element-item { border: 1px solid #eee; background: #fdfdfd; }
      .saved-element-tag { background: #331166; color: #cc99ff; padding: 2px 5px; border-radius: 3px; font-weight: bold; font-size: 9px; text-transform: uppercase; }
      .theme-light .saved-element-tag { background: #f0e6ff; color: #6600cc; }
      .saved-element-preview { flex: 1; font-size: 10px; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #aaa; }
      .theme-light .saved-element-preview { color: #555; }
      .hint-text { font-size: 11px; color: #00ff66; opacity: 0.8; margin-bottom: 8px; }
      .theme-light .hint-text { color: #0070f3; }
      .filter-bar { display: flex; gap: 6px; margin-bottom: 10px; }
      .filter-bar input, .filter-bar select { background: #0a0a0a; color: #fff; border: 1px solid #222; padding: 6px; border-radius: 4px; font-family: inherit; font-size: 11px; outline: none; }
      .theme-light .filter-bar input, .theme-light .filter-bar select { background: #f5f5f5; color: #000; border: 1px solid #ccc; }
      #filter-method { width: 80px; }
      #filter-search { flex: 1; }
      #filter-exclude { flex: 1; border-color: #441111; }
      .theme-light #filter-exclude { border-color: #ffcccc; }
      .actions-bar { display: flex; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
      .actions-bar button { font-family: inherit; font-size: 11px; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-weight: bold; }
      .actions-bar button svg { display: block; }
      .btn-primary { background: #222; color: #00ff66; border: 1px solid #333 !important; }
      .theme-light .btn-primary { background: #f0f0f0; color: #0070f3; border: 1px solid #ccc !important; }
      .btn-danger { background: #222; color: #ff3333; border: 1px solid #333 !important; }
      .theme-light .btn-danger { background: #fff0f0; color: #ff3333; border: 1px solid #ffcccc !important; }
      #nunesxyz-resize-handle { width: 14px; height: 14px; cursor: se-resize; position: absolute; bottom: 0; right: 0; background: transparent; z-index: 1001; }
      #network-split { display: flex; flex: 1; overflow: hidden; gap: 8px; }
      #network-list { flex: 1; overflow-y: auto; }
      #network-details { width: 50%; display: flex; flex-direction: column; padding: 10px; box-sizing: border-box; overflow-y: auto; border-left: 1px solid #222; background: #050505; }
      .theme-light #network-details { border-left: 1px solid #ccc; background: #fafafa; }
      #network-details.hidden-detail { display: none; }
      .detail-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; padding-bottom: 5px; margin-bottom: 8px; }
      .detail-header h4 { margin: 0; font-size: 11px; text-transform: uppercase; color: #888; }
      .detail-header button { background: none; border: none; color: inherit; cursor: pointer; display: inline-flex; align-items: center; }
      .detail-section { margin-bottom: 8px; font-size: 11px; }
      .detail-section h5 { margin: 0 0 3px 0; color: #666; font-size: 10px; text-transform: uppercase; }
      .detail-section pre { margin: 0; background: #090909; padding: 6px; border-radius: 4px; overflow-x: auto; white-space: pre-wrap; max-height: 100px; border: 1px solid #1c1c1c; }
      .theme-light .detail-section pre { background: #eee; border: 1px solid #ddd; }
      .network-item { border: 1px solid #1c1c1c; padding: 6px 8px; margin-bottom: 4px; border-radius: 4px; background: #030303; cursor: pointer; }
      .theme-light .network-item { border: 1px solid #eee; background: #fdfdfd; }
      .network-row { display: flex; align-items: center; gap: 8px; }
      .method-badge { padding: 2px 5px; border-radius: 3px; font-weight: bold; font-size: 9px; color: white; }
      .GET { background: #0e639c; } .POST { background: #107c41; } .PUT { background: #a4373a; } .DELETE { background: #df4e26; }
      .url-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; font-family: monospace; }
      .net-buttons { display: flex; gap: 4px; margin-left: auto; }
      .net-buttons button { background: #111; color: #aaa; border: 1px solid #222; padding: 3px 6px; cursor: pointer; border-radius: 3px; font-size: 10px; }
      .theme-light .net-buttons button { background: #f0f0f0; color: #333; border: 1px solid #ccc; }
      #html-editor-wrapper { display: flex; flex-direction: column; gap: 4px; flex: 1; }
      #html-live-editor { width: 100%; background: #020202; color: #00ff66; border: 1px solid #222; border-radius: 4px; font-family: monospace; padding: 6px; box-sizing: border-box; font-size: 11px; resize: none; }
      .theme-light #html-live-editor { background: #f9f9f9; color: #b11010; border: 1px solid #ccc; }
      #console-log-list { flex: 1; overflow-y: auto; background: #010101; border: 1px solid #1f1f1f; border-radius: 4px; padding: 6px; font-family: monospace; font-size: 11px; min-height: 150px; }
      .theme-light #console-log-list { background: #fafafa; border: 1px solid #ddd; }
      .console-input-wrapper { display: flex; align-items: center; background: #050505; border: 1px solid #222; margin-top: 6px; border-radius: 4px; padding: 4px 8px; }
      .console-input-wrapper .prompt svg { color: #00ff66; margin-right: 4px; display: block; }
      #console-cmd-input { background: transparent; border: none; color: inherit; flex: 1; font-family: monospace; font-size: 11px; outline: none; }
      .log-item { border-bottom: 1px solid #111; padding: 3px 0; white-space: pre-wrap; }
      .log-err { color: #ff3333; } .log-ret { color: #00ffff; }
      .modal { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 2147483647; }
      .modal-content { background: #050505; width: 90%; max-width: 480px; padding: 18px; border-radius: 8px; border: 1px solid #222; display: flex; flex-direction: column; gap: 5px; font-size: 11px; }
      .theme-light .modal-content { background: #fff; border: 1px solid #ccc; }
      .modal-content label { color: #666; font-size: 9px; text-transform: uppercase; }
      .modal-content input, .modal-content textarea, .modal-content select { background: #000; color: #fff; border: 1px solid #222; padding: 5px; border-radius: 4px; font-family: monospace; width: 100%; box-sizing: border-box; }
      .modal-buttons { display: flex; gap: 6px; justify-content: flex-end; margin-top: 8px; }
      .modal-buttons button { display: flex; align-items: center; gap: 4px; font-family: inherit; font-size: 11px; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
      .modal-buttons button svg { display: block; }
      #modal-response { margin-top: 6px; max-height: 80px; overflow-y: auto; background: #000; padding: 6px; border-radius: 4px; color: #00ff66; font-size: 11px; white-space: pre-wrap; border: 1px solid #222; }
    `;
    shadowContainer.appendChild(style);

    let isInspecting = false;
    let currentTargetId = null; 
    let ignoredElementsList = []; 

    const getEl = (id) => shadowContainer.getElementById(id);
    const getAllEl = (selector) => shadowContainer.querySelectorAll(selector);

    getEl('nunesxyz-toggle').addEventListener('click', () => {
      getEl('nunesxyz-panel').classList.toggle('hidden');
    });

    getAllEl('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        getAllEl('.tab-btn').forEach(b => b.classList.remove('active'));
        getAllEl('.tab-content').forEach(c => c.classList.remove('active-content'));
        
        const target = e.currentTarget;
        target.classList.add('active');
        const tabId = target.getAttribute('data-tab');
        getEl(`tab-${tabId}`).classList.add('active-content');
      });
    });

    getEl('nunesxyz-theme-toggle').addEventListener('click', () => {
      const root = getEl('nunesxyz-devtools-container');
      const iconContainer = getEl('theme-icon-container');
      if (root.classList.contains('theme-dark')) {
        root.classList.remove('theme-dark'); root.classList.add('theme-light');
        iconContainer.innerHTML = SVGIcons.sun;
      } else {
        root.classList.remove('theme-light'); root.classList.add('theme-dark');
        iconContainer.innerHTML = SVGIcons.moon;
      }
    });

    const dragHandle = getEl('nunesxyz-drag-handle');
    const panel = getEl('nunesxyz-panel');
    let isDragging = false, offsetX = 0, offsetY = 0;

    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('button') || e.target.closest('input')) return;
      isDragging = true;
      offsetX = e.clientX - panel.getBoundingClientRect().left;
      offsetY = e.clientY - panel.getBoundingClientRect().top;
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        panel.style.right = 'auto'; panel.style.bottom = 'auto';
        panel.style.left = `${e.clientX - offsetX}px`;
        panel.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => { isDragging = false; document.body.style.userSelect = ''; });

    const resizeHandle = getEl('nunesxyz-resize-handle');
    let isResizing = false;

    resizeHandle.addEventListener('mousedown', (e) => {
      isResizing = true; document.body.style.userSelect = 'none'; e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      const rect = panel.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const newHeight = e.clientY - rect.top;
      if (newWidth > 400) panel.style.width = `${newWidth}px`;
      if (newHeight > 300) panel.style.height = `${newHeight}px`;
    });

    document.addEventListener('mouseup', () => { isResizing = false; });

    function renderNetworkList() {
      const listContainer = getEl('network-list');
      if (!listContainer) return;
      listContainer.innerHTML = '';

      const methodFilter = getEl('filter-method').value;
      const searchFilter = getEl('filter-search').value.toLowerCase();
      const excludeFilter = getEl('filter-exclude').value.toLowerCase();

      const excludedTerms = excludeFilter.split(',').map(term => term.trim()).filter(term => term !== '');

      window.nunesxyzRequests.forEach(req => {
        const matchMethod = (methodFilter === 'ALL' || req.method === methodFilter);
        const matchSearch = req.url.toLowerCase().includes(searchFilter);
        const containsExcluded = excludedTerms.some(term => req.url.toLowerCase().includes(term));

        if (matchMethod && matchSearch && !containsExcluded) {
          const item = document.createElement('div');
          item.className = 'network-item';
          item.innerHTML = `
            <div class="network-row" id="net-item-${req.id}">
              <input type="checkbox" class="net-checkbox" value="${req.id}">
              <span class="method-badge ${req.method}">${req.method}</span>
              <span class="url-text" title="${req.url}">${req.url.split('?')[0]}</span>
              <div class="net-buttons">
                <button id="edit-${req.id}">✏️ Editar</button>
                <button id="resp-${req.id}">📋 Resposta</button>
              </div>
            </div>
          `;
          listContainer.appendChild(item);

          shadowContainer.getElementById(`net-item-${req.id}`).addEventListener('click', () => window.showNetworkDetails(req.id));
          shadowContainer.getElementById(`edit-${req.id}`).addEventListener('click', (ev) => { ev.stopPropagation(); window.openEditModal(req.id); });
          shadowContainer.getElementById(`resp-${req.id}`).addEventListener('click', (ev) => { ev.stopPropagation(); window.copyResponseOnly(req.id); });
          shadowContainer.querySelector(`#net-item-${req.id} .net-checkbox`).addEventListener('click', (ev) => ev.stopPropagation());
        }
      });
    }

    getEl('filter-method').addEventListener('change', renderNetworkList);
    getEl('filter-search').addEventListener('input', renderNetworkList);
    getEl('filter-exclude').addEventListener('input', renderNetworkList);

    window.showNetworkDetails = function(id) {
      const req = window.nunesxyzRequests.find(r => r.id === id);
      if (!req) return;
      getEl('network-details').classList.remove('hidden-detail');
      getEl('detail-content').innerHTML = `
        <div class="detail-section"><h5>URL</h5><div>${req.url}</div></div>
        <div class="detail-section"><h5>Método</h5><div>${req.method}</div></div>
        <div class="detail-section"><h5>Payload</h5><pre>${typeof req.body === 'object' ? JSON.stringify(req.body) : req.body || 'Nenhum'}</pre></div>
        <div class="detail-section"><h5>Response</h5><pre>${req.response || 'Vazio'}</pre></div>
      `;
    };

    window.copyResponseOnly = function(id) {
      const req = window.nunesxyzRequests.find(r => r.id === id);
      if (req) { window.navigator.clipboard.writeText(req.response); alert('Response copiado!'); }
    };

    getEl('btn-close-details').addEventListener('click', () => {
      getEl('network-details').classList.add('hidden-detail');
    });

    getEl('btn-clear-network').addEventListener('click', () => {
      window.nunesxyzRequests = []; renderNetworkList();
      getEl('network-details').classList.add('hidden-detail');
    });

    getEl('btn-copy-selected').addEventListener('click', () => {
      const checkboxes = getAllEl('.net-checkbox:checked');
      const ids = Array.from(checkboxes).map(c => c.value);
      if (ids.length === 0) return alert('Selecione primeiro.');
      const filtered = window.nunesxyzRequests.filter(r => ids.includes(r.id));
      window.navigator.clipboard.writeText(JSON.stringify(filtered, null, 2));
      alert('APIs copiadas!');
    });

    window.refreshNetworkDashboard = renderNetworkList;

    const inspectBtn = getEl('btn-toggle-inspect');
    const saveElementBtn = getEl('btn-save-element');
    const inspectOverlay = getEl('nunesxyz-inspect-overlay');

    inspectBtn.addEventListener('click', () => {
      isInspecting = !isInspecting;
      inspectBtn.style.color = isInspecting ? '#ff9900' : '';
      inspectBtn.innerHTML = isInspecting ? `${SVGIcons.mousePointer} Mirando...` : `${SVGIcons.mousePointer} Inspecionar Elemento`;
      
      if (!isInspecting) {
        inspectOverlay.style.display = 'none';
        resetIgnoredElements();
      }
    });

    function resetIgnoredElements() {
      ignoredElementsList.forEach(el => {
        if (el) el.style.pointerEvents = '';
      });
      ignoredElementsList = [];
    }

    document.addEventListener('mousemove', function(e) {
      if (!isInspecting) return;
      if (container.contains(e.target)) {
        inspectOverlay.style.display = 'none';
        return;
      }

      const target = e.target;
      if (target) {
        const rect = target.getBoundingClientRect();
        inspectOverlay.style.width = `${rect.width}px`;
        inspectOverlay.style.height = `${rect.height}px`;
        inspectOverlay.style.top = `${rect.top}px`;
        inspectOverlay.style.left = `${rect.left}px`;
        inspectOverlay.style.display = 'block';
      }
    }, true);

    document.addEventListener('click', function(e) {
      if (!isInspecting) return;
      if (container.contains(e.target)) return;

      e.preventDefault(); e.stopPropagation();

      if (e.shiftKey || e.button === 2) {
        const targetToIgnore = e.target;
        targetToIgnore.style.pointerEvents = 'none';
        ignoredElementsList.push(targetToIgnore);    
        inspectOverlay.style.display = 'none';       
        return;
      }

      document.querySelectorAll('[data-nunes-target]').forEach(el => el.removeAttribute('data-nunes-target'));

      currentTargetId = 'el_' + Date.now();
      e.target.setAttribute('data-nunes-target', currentTargetId);

      isInspecting = false;
      inspectOverlay.style.display = 'none';
      resetIgnoredElements(); 

      inspectBtn.style.color = '';
      inspectBtn.innerHTML = `${SVGIcons.mousePointer} Inspecionar Elemento`;

      getEl('html-editor-wrapper').classList.remove('hidden');
      saveElementBtn.classList.remove('hidden');
      getEl('html-live-editor').value = e.target.outerHTML;
    }, true);

    document.addEventListener('contextmenu', function(e) {
      if (!isInspecting) return;
      if (container.contains(e.target)) return;
      
      e.preventDefault(); e.stopPropagation();
      
      const targetToIgnore = e.target;
      targetToIgnore.style.pointerEvents = 'none';
      ignoredElementsList.push(targetToIgnore);
      inspectOverlay.style.display = 'none';
    }, true);

    getEl('html-live-editor').addEventListener('input', (e) => {
      if (!currentTargetId) return;
      const realElement = document.querySelector(`[data-nunes-target="${currentTargetId}"]`);
      
      if (realElement) {
        try {
          const parser = document.createElement('div');
          parser.innerHTML = e.target.value;
          const newStructure = parser.firstElementChild;
          
          if (newStructure) {
            newStructure.setAttribute('data-nunes-target', currentTargetId);
            realElement.replaceWith(newStructure);
          }
        } catch(err) {}
      }
    });

    function renderSavedElements() {
      const listContainer = getEl('saved-elements-list');
      if (!listContainer) return;
      listContainer.innerHTML = '';

      window.nunesxyzSavedElements.forEach(el => {
        const matchTag = el.html.match(/^<([a-z1-6]+)/i);
        const tagName = matchTag ? matchTag[1] : 'elem';
        const cleanPreview = el.html.replace(/\s+/g, ' ').substring(0, 50) + '...';

        const item = document.createElement('div');
        item.className = 'saved-element-item';
        item.innerHTML = `
          <input type="checkbox" class="elem-checkbox" value="${el.id}">
          <span class="saved-element-tag">${tagName}</span>
          <span class="saved-element-preview" title="${el.html.replace(/"/g, '&quot;')}">${cleanPreview}</span>
        `;
        listContainer.appendChild(item);
      });
    }

    saveElementBtn.addEventListener('click', () => {
      const htmlContent = getEl('html-live-editor').value;
      if (!htmlContent.trim()) return alert('O editor está vazio.');

      const id = 'el_saved_' + Date.now();
      window.nunesxyzSavedElements.push({ id, html: htmlContent });
      renderSavedElements();
    });

    getEl('btn-copy-saved-elements').addEventListener('click', () => {
      const checkboxes = getAllEl('.elem-checkbox:checked');
      const ids = Array.from(checkboxes).map(c => c.value);
      if (ids.length === 0) return alert('Selecione ao menos um elemento salvo da lista.');

      const filtered = window.nunesxyzSavedElements.filter(el => ids.includes(el.id));
      const textToCopy = filtered.map(el => el.html).join('\n');

      window.navigator.clipboard.writeText(textToCopy);
      alert(`${filtered.length} elemento(s) copiado(s)!`);
    });

    getEl('btn-clear-saved-elements').addEventListener('click', () => {
      window.nunesxyzSavedElements = [];
      renderSavedElements();
    });

    const cmdInput = getEl('console-cmd-input');
    const consoleList = getEl('console-log-list');

    function pushLog(text, typeClass = '') {
      const entry = document.createElement('div'); entry.className = `log-item ${typeClass}`;
      entry.innerText = text; consoleList.appendChild(entry);
      consoleList.scrollTop = consoleList.scrollHeight;
    }

    const nativeLog = console.log;
    console.log = function(...args) {
      pushLog(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
      nativeLog.apply(console, args);
    };

    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && cmdInput.value.trim() !== '') {
        const code = cmdInput.value; pushLog(`> ${code}`);
        try { pushLog(`= ${window.eval(code)}`, 'log-ret'); } catch(err) { pushLog(`Error: ${err.message}`, 'log-err'); }
        cmdInput.value = '';
      }
    });

    window.openEditModal = function(id) {
      const req = window.nunesxyzRequests.find(r => r.id === id); if (!req) return;
      getEl('modal-url').value = req.url;
      getEl('modal-method').value = req.method;
      getEl('modal-headers').value = JSON.stringify(req.headers || {}, null, 2);
      getEl('modal-body').value = typeof req.body === 'object' ? JSON.stringify(req.body, null, 2) : req.body || "";
      getEl('modal-response').innerText = "";
      getEl('api-modal').classList.remove('hidden');
    };

    getEl('btn-modal-close').addEventListener('click', () => { getEl('api-modal').classList.add('hidden'); });

    getEl('btn-modal-execute').addEventListener('click', async () => {
      const url = getEl('modal-url').value;
      const method = getEl('modal-method').value;
      const headersText = getEl('modal-headers').value;
      const bodyText = getEl('modal-body').value;
      let headers = {}; try { if(headersText) headers = JSON.parse(headersText); } catch(e) { return alert("Headers Inválidos"); }
      const options = { method, headers }; if (method !== 'GET' && method !== 'HEAD' && bodyText) options.body = bodyText;
      getEl('modal-response').innerText = "Processando disparo...";
      try {
        const res = await window.fetch(url, options); const data = await res.text();
        getEl('modal-response').innerText = `Status: ${res.status}\n\nResponse:\n${data}`;
      } catch(err) { getEl('modal-response').innerText = `Falha: ${err.message}`; }
    });
  }

  // =========================================================================
  // INTERCEPTADORES DE REDE GLOBAIS
  // =========================================================================
  if (!window.nunesxyzRequests) {
    window.nunesxyzRequests = [];
    window.nunesxyzSavedElements = [];

    function registrarRequisicaoCapturada(method, url, response, headers = {}, body = "") {
      const id = 'req_' + Date.now() + Math.random().toString(36).substr(2, 4);
      window.nunesxyzRequests.push({ id, method, url, response, headers, body });
      if (typeof window.refreshNetworkDashboard === 'function') {
        window.refreshNetworkDashboard();
      }
    }

    const oldXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
      const realXHR = new oldXHR();
      realXHR.addEventListener('readystatechange', function() {
        if (realXHR.readyState === 4) {
          registrarRequisicaoCapturada(realXHR._method || 'GET', realXHR._url, realXHR.responseText, {}, realXHR._body);
        }
      }, false);
      const oldOpen = realXHR.open;
      realXHR.open = function(method, url) { realXHR._method = method; realXHR._url = url; return oldOpen.apply(realXHR, arguments); };
      const oldSend = realXHR.send;
      realXHR.send = function(data) { realXHR._body = data; return oldSend.apply(realXHR, arguments); };
      return realXHR;
    };

    const oldFetch = window.fetch;
    window.fetch = async function(...args) {
      const url = args[0]; const options = args[1] || {}; const method = options.method || 'GET';
      const res = await oldFetch(...args); const clone = res.clone();
      let text = ""; try { text = await clone.text(); } catch(e) {}
      registrarRequisicaoCapturada(method, url, text, options.headers, options.body);
      return res;
    };
  }

  buscarEInjetar(window);
  console.log("%c[Nunesxyz DevTools] Sistema acoplado e ícones SVG inline renderizados com sucesso.", "color: #00ff66; background: #000; font-weight: bold; padding: 4px;");
})();
