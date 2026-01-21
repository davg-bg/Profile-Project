// ================================
// STATE MANAGEMENT
// Gerenciamento centralizado de estado
// ================================

/**
 * Módulo de gerenciamento de estado
 * @namespace StateManager
 */
const StateManager = (() => {
    'use strict';

    // Estado global privado
    const state = {
        isMenuOpen: false,
        isModalOpen: false,
      activeModal: null,
        scrollTicking: false,
        currentFilter: 'all',
   preferences: {
    reducedMotion: false,
            highContrast: false
        }
    };

    // Listeners para mudanças de estado
    const listeners = [];

    /**
     * Inicializar preferências do usuário
     */
    function initializePreferences() {
        try {
        // Verificar preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            state.preferences.reducedMotion = prefersReducedMotion.matches;

    // Verificar preferência de alto contraste
            const prefersHighContrast = window.matchMedia('(prefers-contrast: more)');
  state.preferences.highContrast = prefersHighContrast.matches;

    // Escutar mudanças de preferências
 prefersReducedMotion.addEventListener('change', (e) => {
             setState({ preferences: { ...state.preferences, reducedMotion: e.matches } });
     });

            prefersHighContrast.addEventListener('change', (e) => {
         setState({ preferences: { ...state.preferences, highContrast: e.matches } });
    });
        } catch (error) {
            console.error('Erro ao inicializar preferências:', error);
        }
    }

    /**
     * Obter estado completo ou parcial
     * @param {string} path - Caminho no estado (ex: 'isMenuOpen')
     * @returns {any}
     */
    function getState(path = '') {
        if (!path) return { ...state };

   try {
            const keys = path.split('.');
       let value = state;

            for (const key of keys) {
   if (value && typeof value === 'object') {
       value = value[key];
 } else {
  return undefined;
       }
          }

 return value;
        } catch (error) {
          console.error('Erro ao obter estado:', error);
       return undefined;
        }
    }

    /**
     * Atualizar estado com validação
     * @param {Object} updates - Atualizações de estado
   */
    function setState(updates) {
    if (!updates || typeof updates !== 'object') {
      console.error('setState: updates deve ser um objeto');
   return;
      }

        try {
      const previousState = { ...state };
            const newState = { ...state, ...updates };

          // Validar tipos
            if (typeof updates.isMenuOpen !== 'undefined' && typeof updates.isMenuOpen !== 'boolean') {
                console.warn('setState: isMenuOpen deve ser boolean');
   newState.isMenuOpen = previousState.isMenuOpen;
      }

    if (typeof updates.isModalOpen !== 'undefined' && typeof updates.isModalOpen !== 'boolean') {
   console.warn('setState: isModalOpen deve ser boolean');
     newState.isModalOpen = previousState.isModalOpen;
      }

   if (typeof updates.scrollTicking !== 'undefined' && typeof updates.scrollTicking !== 'boolean') {
      console.warn('setState: scrollTicking deve ser boolean');
             newState.scrollTicking = previousState.scrollTicking;
     }

            // Apenas atualizar se houve mudança
          if (JSON.stringify(previousState) !== JSON.stringify(newState)) {
         Object.assign(state, newState);
 notifyListeners(previousState, newState);
         }
        } catch (error) {
   console.error('Erro ao atualizar estado:', error);
        }
    }

  /**
     * Registrar listener para mudanças de estado
   * @param {Function} callback - Função a chamar
     * @returns {Function} Função para desregistrar
     */
  function subscribe(callback) {
   if (typeof callback !== 'function') {
  console.error('subscribe: callback deve ser uma função');
            return () => {};
        }

        listeners.push(callback);

        // Retornar função para desinscrever
        return () => {
      const index = listeners.indexOf(callback);
         if (index > -1) {
          listeners.splice(index, 1);
   }
        };
    }

    /**
     * Notificar listeners sobre mudanças
     * @private
     */
    function notifyListeners(previousState, newState) {
     try {
       listeners.forEach(listener => {
          try {
                  listener(newState, previousState);
        } catch (error) {
     console.error('Erro ao notificar listener:', error);
       }
    });
        } catch (error) {
            console.error('Erro ao notificar listeners:', error);
        }
    }

    /**
     * Toggle menu
     */
    function toggleMenu() {
        setState({ isMenuOpen: !state.isMenuOpen });
}

    /**
     * Abrir menu
     */
    function openMenu() {
setState({ isMenuOpen: true });
    }

    /**
     * Fechar menu
     */
    function closeMenu() {
        setState({ isMenuOpen: false });
    }

    /**
     * Toggle modal
     */
    function toggleModal(modalId = null) {
        setState({
            isModalOpen: !state.isModalOpen,
 activeModal: !state.isModalOpen ? modalId : null
        });
    }

 /**
     * Abrir modal
     */
    function openModal(modalId) {
        if (typeof modalId !== 'string') {
   console.error('openModal: modalId deve ser uma string');
            return;
 }
     setState({ isModalOpen: true, activeModal: modalId });
    }

    /**
 * Fechar modal
     */
    function closeModal() {
        setState({ isModalOpen: false, activeModal: null });
    }

    /**
     * Mudar filtro
     */
    function setFilter(filter) {
     if (typeof filter !== 'string') {
    console.error('setFilter: filter deve ser uma string');
            return;
        }
     setState({ currentFilter: filter });
    }

    /**
     * Resetar estado para padrão
     */
    function reset() {
 try {
      Object.assign(state, {
           isMenuOpen: false,
  isModalOpen: false,
          activeModal: null,
        scrollTicking: false,
      currentFilter: 'all'
            });
 notifyListeners({}, state);
        } catch (error) {
            console.error('Erro ao resetar estado:', error);
        }
  }

    /**
   * Inicializar na carga do DOM
     */
    function init() {
  try {
      initializePreferences();
        } catch (error) {
            console.error('Erro ao inicializar StateManager:', error);
      }
    }

    // Limpar estado ao descarregar
  window.addEventListener('beforeunload', () => {
      try {
     reset();
        } catch (error) {
      console.error('Erro ao limpar estado:', error);
   }
    });

    // API pública
    return {
        init,
        getState,
        setState,
  subscribe,
  toggleMenu,
        openMenu,
        closeMenu,
        toggleModal,
        openModal,
        closeModal,
    setFilter,
        reset
    };
})();

// Inicializar ao carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', StateManager.init);
} else {
    StateManager.init();
}

// Exportar para uso global
window.StateManager = StateManager;
