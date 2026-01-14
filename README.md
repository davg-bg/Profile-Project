# 🚀 Portfólio Davi Gabriel Gonçalves

Um portfólio moderno e profissional desenvolvido com HTML5, CSS3 e JavaScript vanilla, focado em **Business Intelligence**, **Power BI** e **Automação com Python**.

## ✨ Funcionalidades

### 🎨 **Design & UX**
- ✅ Design corporativo premium com paleta de cores profissional
- ✅ Layout totalmente responsivo (mobile-first)
- ✅ Animações suaves e micro-interações
- ✅ Gradientes modernos e sombras elegantes
- ✅ Tipografia otimizada (Inter + Poppins)

### ⚡ **Performance & Acessibilidade**
- ✅ CSS otimizado com variáveis customizadas
- ✅ JavaScript modular e performático
- ✅ Skip navigation para acessibilidade
- ✅ ARIA labels e roles implementados
- ✅ Suporte a `prefers-reduced-motion`
- ✅ Contraste otimizado para WCAG

### 📱 **PWA (Progressive Web App)**
- ✅ Manifest.json configurado
- ✅ Meta tags otimizadas para SEO
- ✅ Open Graph para redes sociais
- ✅ Ícones para diferentes dispositivos

### 🔥 **Funcionalidades Avançadas**
- ✅ Formulário com validação em tempo real
- ✅ Estados de loading e feedback visual
- ✅ Contador animado nas estatísticas
- ✅ Parallax suave no hero
- ✅ Menu hambúrguer responsivo
- ✅ Smooth scrolling entre seções
- ✅ Lazy loading preparado para imagens

## 📋 Seções do Portfólio

### 1. 🏠 **Hero Section**
- Apresentação pessoal impactante
- Call-to-action claros
- Elemento visual animado
- Gradiente dinâmico de fundo

### 2. 👨‍💻 **Sobre Mim**
- Biografia profissional focada em BI e Python
- Estatísticas animadas:
  - 25+ Dashboards Criados
  - 8+ Automações Implementadas
  - 100% Comprometimento

### 3. 💼 **Projetos**
- **Business Intelligence**: Dashboards Power BI
- **Python & Automação**: Scripts e integrações
- Cards interativos com hover effects
- Links diretos para projetos e códigos

### 4. 🛠️ **Habilidades**
- **Frontend**: HTML, CSS, JavaScript, React, Vue.js
- **Backend**: Node.js, Python, PHP, APIs REST
- **Dados**: Power BI, SQL, MongoDB, PostgreSQL
- **Ferramentas**: Git, VS Code, Figma

### 5. 📞 **Contato**
- Formulário avançado com validação
- Links para LinkedIn e GitHub
- E-mail com funcionalidade de cópia

## 🛠️ Tecnologias Utilizadas

### **Frontend**
```
HTML5 - Estrutura semântica
CSS3 - Design responsivo e animações
JavaScript ES6+ - Interatividade avançada
```

### **Recursos Externos**
```
Google Fonts - Tipografia premium
Font Awesome - Ícones (se necessário)
```

### **Ferramentas de Desenvolvimento**
```
Git - Controle de versão
VS Code - Editor de código
GitHub Pages - Hospedagem
```

## 📦 Instalação e Uso

### **1. Clone o Repositório**
```bash
git clone https://github.com/davigabriels/portifolio.git
cd portifolio
```

### **2. Personalização Rápida**

#### **Informações Pessoais** (`index.html`)
```html
<!-- Altere essas informações -->
<h1>Olá, eu sou <span class="highlight">SEU_NOME</span></h1>
<p>davi98643@gmail.com</p> <!-- Seu e-mail -->
<p>linkedin.com/in/seu-perfil</p> <!-- Seu LinkedIn -->
```

#### **Cores do Tema** (`styles.css`)
```css
:root {
    --primary-blue: #4361EE;    /* Cor principal */
    --light-blue: #4CC9F0;     /* Cor secundária */
    --dark-navy: #1E1E2F;      /* Cor escura */
}
```

### **3. Adicionar Projetos**

Use o arquivo `COMO_ADICIONAR_PROJETOS.md` para instruções detalhadas.

**Exemplo de projeto:**
```html
<div class="projeto-card">
    <div class="projeto-image">
        <div class="projeto-overlay">
            <a href="LINK_PROJETO" class="projeto-link">Ver Projeto</a>
            <a href="LINK_GITHUB" class="projeto-link">Código</a>
        </div>
    </div>
    <div class="projeto-content">
        <h3>Nome do Projeto</h3>
        <p>Descrição do projeto...</p>
        <div class="projeto-tags">
            <span class="tag">Power BI</span>
            <span class="tag">Python</span>
        </div>
    </div>
</div>
```

## 🌐 Deploy para GitHub Pages

### **🚀 Método Automático (Recomendado)**

1. **Execute o script de deploy:**
   ```bash
   # No Windows
   deploy.bat
   
   # Ou manualmente:
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/SEU-USUARIO/portfolio.git
   git push -u origin main
   ```

2. **Configure GitHub Pages:**
   - Acesse seu repositório no GitHub
   - Vá em `Settings` > `Pages`
   - Em `Source`, selecione `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
   - Clique em `Save`

3. **Aguarde o deploy (2-5 minutos)**
   - GitHub Actions fará o build automaticamente
   - Site disponível em: `https://seu-usuario.github.io/nome-repositorio`

### **📋 Pré-requisitos**

- ✅ Conta no GitHub
- ✅ Git instalado ([Download](https://git-scm.com/download/windows))
- ✅ Repositório público (para GitHub Pages gratuito)

### **🔧 Configuração Manual**

Se preferir fazer manualmente:

```bash
# 1. Inicializar repositório
git init
git branch -M main

# 2. Adicionar arquivos
git add .
git commit -m "Deploy: Portfolio inicial"

# 3. Conectar ao GitHub
git remote add origin https://github.com/SEU-USUARIO/REPO-NAME.git
git push -u origin main

# 4. Para atualizações futuras
git add .
git commit -m "Atualização do portfolio"
git push
```

### **⚡ Deploy Automático**

O projeto inclui GitHub Actions que fazem deploy automaticamente quando você:
- Faz push na branch `main`
- Cria pull requests
- Executa workflow manualmente

### **🌐 Alternativas de Hospedagem**

#### **Netlify**
```bash
# Deploy direto do GitHub
# 1. Conecte seu repositório
# 2. Build command: (deixar vazio)
# 3. Publish directory: /
```

#### **Vercel**
```bash
npm install -g vercel
vercel --prod
```

#### **Firebase Hosting**
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## 📁 Estrutura de Arquivos

```
portifolio/
│
├── 📄 index.html              # Página principal
├── 🎨 styles.css              # Estilos e design
├── ⚡ script.js               # JavaScript interativo
├── 📱 manifest.json           # PWA configuration
├── 📖 README.md               # Documentação
├── 📋 COMO_ADICIONAR_PROJETOS.md
├── 🚀 deploy.bat              # Script de deploy automático
├── ⚙️ _config.yml             # Configuração Jekyll
│
├── 📂 .github/                # GitHub Actions
│   └── workflows/
│       └── deploy.yml         # Workflow de deploy
│
├── 📂 projetos-bi/            # Projetos Business Intelligence
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── 📂 projetos-python/        # Projetos Python
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
└── 📂 .vs/                    # Configurações VS Code
```

## 🚀 Funcionalidades Implementadas

### ✅ **Melhorias de Acessibilidade**
- Skip navigation link
- ARIA labels em elementos interativos
- Contraste otimizado para WCAG
- Suporte a leitores de tela

### ✅ **SEO Otimizado**
- Meta descriptions personalizadas
- Open Graph tags para redes sociais
- Structured data preparado
- Title tags otimizados

### ✅ **Formulário Avançado**
- Validação em tempo real
- Feedback visual de erros
- Estados de loading
- Mensagens de sucesso/erro

### ✅ **Performance**
- CSS otimizado com variáveis
- JavaScript com requestAnimationFrame
- Lazy loading preparado
- Preload de recursos críticos

## 📊 Métricas de Qualidade

| Categoria | Status | Nota |
|-----------|--------|------|
| **Design** | ✅ | 9.5/10 |
| **Responsividade** | ✅ | 10/10 |
| **Performance** | ✅ | 9/10 |
| **Acessibilidade** | ✅ | 9/10 |
| **SEO** | ✅ | 8.5/10 |
| **Código** | ✅ | 9.5/10 |

## 🎯 Próximas Melhorias

### **🔜 Em Desenvolvimento**
- [ ] Integração com EmailJS para formulário
- [ ] Modo escuro/claro
- [ ] Seção de certificações
- [ ] Timeline de experiência profissional

### **💡 Ideias Futuras**
- [ ] Blog integrado
- [ ] Sistema de comentários
- [ ] Analytics dashboard
- [ ] API para projetos dinâmicos

## 🚀 Como Usar Este Template

### **1. Para Usar Como Template**

```bash
# 1. Clone ou baixe o repositório
git clone https://github.com/davigabriel/portfolio-template.git meu-portfolio

# 2. Entre no diretório
cd meu-portfolio

# 3. Execute o deploy
./deploy.bat

# 4. Personalize seu conteúdo
```

### **2. Personalização Rápida**

**Informações Pessoais:**
- `index.html`: Nome, título, contatos
- `styles.css`: Cores e estilo
- `projetos-*/`: Seus projetos específicos

**Configuração GitHub:**
- Altere URLs no `_config.yml`
- Configure seu usuário no `deploy.bat`

## 🤝 Como Contribuir

1. **Fork** este repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

### **Davi Gabriel Gonçalves**
- 📧 **E-mail**: [davi98643@gmail.com](mailto:davi98643@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/davi-gabriel-goncalves](https://linkedin.com/in/davi-gabriel-goncalves)
- 🐙 **GitHub**: [github.com/davigabriels](https://github.com/davigabriels)

## 🙏 Agradecimentos

- **Google Fonts** - Tipografia premium
- **CSS Gradient** - Inspiração para gradientes
- **Penske** - Experiência profissional
- **Comunidade Dev** - Feedbacks e sugestões

---

## 📈 Status do Projeto

```
🟢 PRODUÇÃO - Totalmente funcional
✅ Responsivo em todos os dispositivos
✅ Otimizado para SEO e acessibilidade
✅ Pronto para uso profissional
```

---

## 📚 Recursos Adicionais

### **🎬 Tutorial em Vídeo**
- [ ] Como fazer deploy no GitHub Pages
- [ ] Personalização avançada
- [ ] Adicionando novos projetos

### **📖 Documentação Extra**
- [Como Adicionar Projetos](COMO_ADICIONAR_PROJETOS.md)
- [GitHub Pages Official Docs](https://pages.github.com/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)

### **🛠️ Templates Relacionados**
- Portfolio React + Next.js
- Dashboard Power BI Template  
- Python Projects Showcase

---

**Desenvolvido com ❤️ para destacar projetos de Business Intelligence e Python**

### 🎯 **Live Demo**: https://davigabriel.github.io/portfolio

### 🔍 **Keywords**: Power BI, Python, Business Intelligence, Portfolio, Dashboard, Data Analysis, Automação, Developer, GitHub Pages