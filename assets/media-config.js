// ================================
// CONFIGURAÇÃO DE MÍDIAS - PORTFOLIO
// Dashboards Power BI e Automações Python
// ================================

const mediaConfig = {
    // Configurações globais
    settings: {
        lazyLoading: true,
        videoAutoplay: false,
        imageCompression: 'webp',
        fallbackFormat: 'jpg',
        maxImageWidth: 1920,
        thumbnailSize: {
            width: 400,
            height: 300
        }
    },

    // Projetos Power BI
    powerBI: {
        "dashboard-vendas": {
            title: "Dashboard Comercial - Vendas e Performance",
            description: "Dashboard executivo com KPIs de vendas, análise de performance por região e acompanhamento de metas comerciais.",
            images: [
                {
                    src: "assets/images/dashboards/vendas-overview.jpg",
                    thumbnail: "assets/thumbnails/vendas-overview-thumb.jpg",
                    alt: "Visão geral dashboard de vendas",
                    caption: "Página principal com KPIs e métricas de vendas"
                },
                {
                    src: "assets/images/dashboards/vendas-regional.jpg",
                    thumbnail: "assets/thumbnails/vendas-regional-thumb.jpg",
                    alt: "Análise regional de vendas",
                    caption: "Breakdown por região e análise geográfica"
                },
                {
                    src: "assets/images/dashboards/vendas-produtos.jpg",
                    thumbnail: "assets/thumbnails/vendas-produtos-thumb.jpg",
                    alt: "Performance por produtos",
                    caption: "Análise detalhada de produtos e categorias"
                }
            ],
            video: {
                src: "assets/videos/dashboard-vendas-demo.mp4",
                thumbnail: "assets/thumbnails/vendas-video-thumb.jpg",
                duration: "2:30",
                description: "Demonstração interativa do dashboard"
            },
            technologies: ["Power BI", "DAX", "Power Query", "SQL Server"],
            metrics: {
                datasources: 5,
                visuals: 25,
                pages: 4,
                users: 50
            }
        },

        "dashboard-financeiro": {
            title: "Dashboard Financeiro - Controle Orçamentário",
            description: "Acompanhamento financeiro com análise de orçamento vs realizado, fluxo de caixa e indicadores econômicos.",
            images: [
                {
                    src: "assets/images/dashboards/financeiro-overview.jpg",
                    thumbnail: "assets/thumbnails/financeiro-overview-thumb.jpg",
                    alt: "Dashboard financeiro principal",
                    caption: "KPIs financeiros e controle orçamentário"
                },
                {
                    src: "assets/images/dashboards/financeiro-fluxo.jpg",
                    thumbnail: "assets/thumbnails/financeiro-fluxo-thumb.jpg",
                    alt: "Análise de fluxo de caixa",
                    caption: "Projeções e controle de fluxo de caixa"
                }
            ],
            video: {
                src: "assets/videos/dashboard-financeiro-demo.mp4",
                thumbnail: "assets/thumbnails/financeiro-video-thumb.jpg",
                duration: "1:45",
                description: "Navegação pelos indicadores financeiros"
            },
            technologies: ["Power BI", "Excel", "SharePoint", "DAX"],
            metrics: {
                datasources: 3,
                visuals: 18,
                pages: 3,
                users: 25
            }
        },

        "dashboard-rh": {
            title: "Dashboard RH - Gestão de Pessoas",
            description: "Indicadores de recursos humanos com métricas de turnover, performance e análise de headcount.",
            images: [
                {
                    src: "assets/images/dashboards/rh-overview.jpg",
                    thumbnail: "assets/thumbnails/rh-overview-thumb.jpg",
                    alt: "Dashboard RH principal",
                    caption: "Métricas de gestão de pessoas"
                },
                {
                    src: "assets/images/dashboards/rh-turnover.jpg",
                    thumbnail: "assets/thumbnails/rh-turnover-thumb.jpg",
                    alt: "Análise de turnover",
                    caption: "Indicadores de retenção e rotatividade"
                }
            ],
            technologies: ["Power BI", "SQL Server", "Azure AD", "Excel"],
            metrics: {
                datasources: 4,
                visuals: 20,
                pages: 3,
                users: 15
            }
        }
    },

    // Projetos Python
    python: {
        "automacao-danfe": {
            title: "Automação DANFE - Renomeação e Organização",
            description: "Sistema Python para processamento automático de documentos fiscais com OCR e organização inteligente.",
            images: [
                {
                    src: "assets/images/automations/danfe-interface.jpg",
                    thumbnail: "assets/thumbnails/danfe-interface-thumb.jpg",
                    alt: "Interface do sistema DANFE",
                    caption: "Interface de configuração e monitoramento"
                },
                {
                    src: "assets/images/automations/danfe-processo.jpg",
                    thumbnail: "assets/thumbnails/danfe-processo-thumb.jpg",
                    alt: "Fluxo de processamento",
                    caption: "Visualização do fluxo de automação"
                },
                {
                    src: "assets/images/automations/danfe-resultados.jpg",
                    thumbnail: "assets/thumbnails/danfe-resultados-thumb.jpg",
                    alt: "Resultados da automação",
                    caption: "Relatório de processamento e estatísticas"
                }
            ],
            video: {
                src: "assets/videos/automacao-danfe-demo.mp4",
                thumbnail: "assets/thumbnails/danfe-video-thumb.jpg",
                duration: "3:15",
                description: "Demonstração completa da automação"
            },
            technologies: ["Python", "OCR", "Pandas", "tkinter", "PyPDF2"],
            metrics: {
                filesProcessed: "1000+",
                timeReduction: "80%",
                errorReduction: "95%",
                recognition: "Premio Interno"
            }
        },

        "centralizacao-nfs": {
            title: "Centralização NFs - Integração Protheus",
            description: "Sistema automático para recebimento, processamento e integração de notas fiscais via email ao ERP.",
            images: [
                {
                    src: "assets/images/automations/nfs-dashboard.jpg",
                    thumbnail: "assets/thumbnails/nfs-dashboard-thumb.jpg",
                    alt: "Dashboard de monitoramento NFs",
                    caption: "Painel de controle e monitoramento"
                },
                {
                    src: "assets/images/automations/nfs-processo.jpg",
                    thumbnail: "assets/thumbnails/nfs-processo-thumb.jpg",
                    alt: "Fluxo de processamento",
                    caption: "Arquitetura do sistema de integração"
                }
            ],
            video: {
                src: "assets/videos/centralizacao-nfs-demo.mp4",
                thumbnail: "assets/thumbnails/nfs-video-thumb.jpg",
                duration: "2:45",
                description: "Funcionamento da integração automática"
            },
            technologies: ["Python", "SQL Server", "IMAP", "Protheus", "Schedule"],
            metrics: {
                emailsProcessed: "5000+",
                integrationSuccess: "98%",
                processTime: "5 min",
                dataIntegrity: "100%"
            }
        },

        "relatorio-automatico": {
            title: "Relatórios Automáticos - Business Intelligence",
            description: "Geração automática de relatórios executivos com envio programado e dashboards dinâmicos.",
            images: [
                {
                    src: "assets/images/automations/relatorio-config.jpg",
                    thumbnail: "assets/thumbnails/relatorio-config-thumb.jpg",
                    alt: "Configuração de relatórios",
                    caption: "Painel de configuração e agendamento"
                },
                {
                    src: "assets/images/automations/relatorio-template.jpg",
                    thumbnail: "assets/thumbnails/relatorio-template-thumb.jpg",
                    alt: "Template de relatório",
                    caption: "Modelo de relatório executivo"
                }
            ],
            technologies: ["Python", "Matplotlib", "Pandas", "SMTP", "Schedule"],
            metrics: {
                reportsGenerated: "500+",
                executivesReached: 25,
                frequency: "Diário",
                satisfaction: "95%"
            }
        }
    },

    // Configurações de exibição
    display: {
        lightbox: {
            enabled: true,
            showNavigation: true,
            showCounter: true,
            closeOnClick: true,
            keyboard: true
        },
        carousel: {
            autoplay: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            arrows: true,
            dots: true
        },
        video: {
            controls: true,
            muted: true,
            loop: false,
            preload: "metadata"
        }
    },

    // Placeholders para desenvolvimento
    placeholders: {
        dashboard: "https://via.placeholder.com/800x600/4361EE/FFFFFF?text=Dashboard+Preview",
        automation: "https://via.placeholder.com/800x600/FFD700/000000?text=Automation+Demo",
        video: "https://via.placeholder.com/800x450/1E1E2F/FFFFFF?text=Video+Demo"
    }
};

// Funções utilitárias
const mediaUtils = {
    // Gerar URL de thumbnail
    getThumbnail(imageSrc, customSize = null) {
        if (customSize) {
            return imageSrc.replace('.jpg', `-thumb-${customSize.width}x${customSize.height}.jpg`);
        }
        return imageSrc.replace('.jpg', '-thumb.jpg');
    },

    // Verificar se arquivo existe
    async fileExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    },

    // Carregar imagem com fallback
    async loadImageWithFallback(src, fallback = null) {
        const exists = await this.fileExists(src);
        if (!exists && fallback) {
            return fallback;
        }
        return exists ? src : mediaConfig.placeholders.dashboard;
    },

    // Gerar galeria de imagens
    generateImageGallery(projectId, projectType) {
        const project = mediaConfig[projectType]?.[projectId];
        if (!project || !project.images) return [];

        return project.images.map((img, index) => ({
            id: `${projectId}-${index}`,
            src: img.src,
            thumbnail: img.thumbnail,
            alt: img.alt,
            caption: img.caption,
            lazy: mediaConfig.settings.lazyLoading
        }));
    },

    // Obter configurações de vídeo
    getVideoConfig(projectId, projectType) {
        const project = mediaConfig[projectType]?.[projectId];
        if (!project || !project.video) return null;

        return {
            ...project.video,
            ...mediaConfig.display.video
        };
    }
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mediaConfig, mediaUtils };
} else if (typeof window !== 'undefined') {
    window.mediaConfig = mediaConfig;
    window.mediaUtils = mediaUtils;
}
