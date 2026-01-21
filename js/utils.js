// ================================
// UTILIDADES GLOBAIS
// Funções reutilizáveis e seguras
// ================================

/**
 * Módulo de utilitários para aplicação
 * @namespace Utils
 */
const Utils = (() => {
    'use strict';

    /**
     * Obtém um elemento DOM com validação
     * @param {string} selector - Seletor CSS
     * @returns {HTMLElement|null}
   */
    function getElement(selector) {
        if (typeof selector !== 'string') {
       console.error('getElement: seletor deve ser uma string', selector);
            return null;
        }

      try {
   const element = document.querySelector(selector);
 if (!element) {
       console.warn(`Elemento não encontrado: ${selector}`);
       }
          return element;
        } catch (error) {
    console.error(`Erro ao buscar elemento ${selector}:`, error);
         return null;
        }
    }

  /**
     * Obtém múltiplos elementos DOM com validação
     * @param {string} selector - Seletor CSS
     * @returns {Array<HTMLElement>}
     */
    function getElements(selector) {
        if (typeof selector !== 'string') {
       console.error('getElements: seletor deve ser uma string', selector);
    return [];
    }

        try {
 return Array.from(document.querySelectorAll(selector));
        } catch (error) {
   console.error(`Erro ao buscar elementos ${selector}:`, error);
      return [];
      }
    }

    /**
* Debounce function para otimizar eventos
     * @param {Function} func - Função a executar
   * @param {number} wait - Tempo em ms
     * @returns {Function}
     */
    function debounce(func, wait = 300) {
  if (typeof func !== 'function') {
      console.error('debounce: primeiro argumento deve ser uma função');
            return () => {};
        }

        if (typeof wait !== 'number' || wait < 0) {
          console.error('debounce: wait deve ser um número positivo');
            wait = 300;
        }

        let timeout;
        return function executedFunction(...args) {
            const later = () => {
  clearTimeout(timeout);
  try {
            func(...args);
   } catch (error) {
           console.error('Erro ao executar função debounced:', error);
     }
    };

     clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function para otimizar eventos
     * @param {Function} func - Função a executar
     * @param {number} limit - Tempo em ms
     * @returns {Function}
     */
    function throttle(func, limit = 300) {
    if (typeof func !== 'function') {
         console.error('throttle: primeiro argumento deve ser uma função');
            return () => {};
        }

        if (typeof limit !== 'number' || limit < 0) {
     console.error('throttle: limit deve ser um número positivo');
    limit = 300;
     }

        let inThrottle;
        return function() {
            const args = arguments;
 const context = this;

  if (!inThrottle) {
        try {
     func.apply(context, args);
        } catch (error) {
                  console.error('Erro ao executar função throttled:', error);
      }
                inThrottle = true;
    setTimeout(() => inThrottle = false, limit);
          }
        };
    }

    /**
  * Escapar HTML para evitar XSS
 * @param {string} text - Texto a escapar
     * @returns {string}
  */
    function escapeHtml(text) {
        if (typeof text !== 'string') {
            return '';
        }

        const map = {
   '&': '&amp;',
     '<': '&lt;',
     '>': '&gt;',
         '"': '&quot;',
            "'": '&#039;'
        };

      return text.replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Validar email
     * @param {string} email - Email a validar
     * @returns {boolean}
     */
    function isValidEmail(email) {
      if (typeof email !== 'string') {
          return false;
        }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Adicionar classe com validação
   * @param {HTMLElement} element - Elemento
     * @param {string} className - Nome da classe
     */
    function addClass(element, className) {
        if (!element || typeof className !== 'string') {
  return;
        }

        try {
            element.classList.add(className);
        } catch (error) {
      console.error('Erro ao adicionar classe:', error);
        }
    }

    /**
     * Remover classe com validação
     * @param {HTMLElement} element - Elemento
     * @param {string} className - Nome da classe
     */
    function removeClass(element, className) {
        if (!element || typeof className !== 'string') {
     return;
  }

  try {
       element.classList.remove(className);
        } catch (error) {
   console.error('Erro ao remover classe:', error);
        }
    }

    /**
     * Toggle classe com validação
     * @param {HTMLElement} element - Elemento
     * @param {string} className - Nome da classe
     */
    function toggleClass(element, className) {
        if (!element || typeof className !== 'string') {
        return;
        }

      try {
            element.classList.toggle(className);
        } catch (error) {
   console.error('Erro ao fazer toggle de classe:', error);
        }
    }

  /**
     * Adicionar event listener com limpeza
     * @param {HTMLElement} element - Elemento
     * @param {string} event - Tipo de evento
     * @param {Function} handler - Handler
     * @returns {Function} Função para remover listener
     */
  function addEventListener(element, event, handler) {
        if (!element || typeof event !== 'string' || typeof handler !== 'function') {
       console.error('addEventListener: parâmetros inválidos');
        return () => {};
        }

        try {
            element.addEventListener(event, handler);

            // Retornar função para remover listener
            return () => {
   try {
          element.removeEventListener(event, handler);
     } catch (error) {
               console.error('Erro ao remover event listener:', error);
            }
     };
     } catch (error) {
     console.error('Erro ao adicionar event listener:', error);
       return () => {};
   }
    }

    /**
     * Criar elemento DOM com segurança
     * @param {string} tag - Tag HTML
     * @param {Object} attributes - Atributos
 * @param {string} textContent - Conteúdo de texto
     * @returns {HTMLElement}
     */
    function createElement(tag, attributes = {}, textContent = '') {
        if (typeof tag !== 'string') {
         console.error('createElement: tag deve ser uma string');
            return null;
        }

  try {
 const element = document.createElement(tag);

    // Adicionar atributos com segurança
     Object.entries(attributes).forEach(([key, value]) => {
             if (typeof key === 'string' && value !== null && value !== undefined) {
      element.setAttribute(key, String(value));
       }
   });

      // Adicionar conteúdo de texto (não HTML)
  if (typeof textContent === 'string' && textContent) {
        element.textContent = textContent;
       }

         return element;
        } catch (error) {
         console.error('Erro ao criar elemento:', error);
       return null;
        }
    }

    /**
     * Verificar se elemento está visível na viewport
     * @param {HTMLElement} element - Elemento
     * @returns {boolean}
     */
    function isInViewport(element) {
if (!element) return false;

        try {
      const rect = element.getBoundingClientRect();
   return (
                rect.top >= 0 &&
        rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        } catch (error) {
            console.error('Erro ao verificar viewport:', error);
    return false;
   }
    }

    /**
 * Smooth scroll para elemento
 * @param {HTMLElement} element - Elemento alvo
     * @param {number} offset - Offset em pixels
     */
    function smoothScrollTo(element, offset = 100) {
        if (!element) {
   console.error('smoothScrollTo: elemento inválido');
 return;
        }

        try {
            const elementPosition = element.getBoundingClientRect().top;
         const offsetPosition = elementPosition + window.pageYOffset - offset;

         window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } catch (error) {
      console.error('Erro ao fazer smooth scroll:', error);
        }
    }

    /**
     * API pública
     */
    return {
   getElement,
        getElements,
        debounce,
        throttle,
        escapeHtml,
  isValidEmail,
   addClass,
   removeClass,
        toggleClass,
        addEventListener,
        createElement,
      isInViewport,
        smoothScrollTo
    };
})();

// Exportar para uso global
window.Utils = Utils;
