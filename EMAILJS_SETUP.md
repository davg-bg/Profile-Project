# 📧 Guia Completo: Configurar Envio de Emails com EmailJS

## 🎯 Visão Geral

Este guia mostra como configurar o EmailJS para que o formulário de contato do seu portfólio funcione e envie emails para você automaticamente.

---

## 📋 Pré-requisitos

- Conta de email (Gmail, Outlook, etc)
- Conta no 33 (grátis)
- 5 minutos para configuração

---

## 🚀 Passo 1: Criar Conta no EmailJS

1. Acesse: **https://www.emailjs.com/**
2. Clique em **"Sign Up"** (canto superior direito)
3. Use sua conta Google ou crie uma conta

   ```
   Email: seu_email@exemplo.com
   Senha: uma_senha_segura
   ```

4. Verifique seu email e confirme a conta

---

## 🔑 Passo 2: Criar Chave Pública

1. Após fazer login, acesse: **https://dashboard.emailjs.com**
2. No menu esquerdo, clique em **"Account"**
3. Role até encontrar **"API Keys"**
4. Copie sua **Public Key** (vai parecer com: `xyz123abc`) Minha public Key: "nOTNnNA-K5WXNEe7Q"

**⚠️ IMPORTANTE:** Salve esta chave em algum lugar seguro

---

## 📬 Passo 3: Criar Serviço de Email

### Opção 1: Gmail (Recomendado)

1. No dashboard, clique em **"Email Services"** (menu esquerdo)
2. Clique no botão **"Add Service"**
3. Selecione **"Gmail"**
4. Clique em **"Create Service"**
5. Uma nova aba vai abrir pedindo permissão
6. Selecione sua conta Gmail
7. Clique em **"Allow"** para dar permissão
8. **Copie o Service ID** que aparecerá (vai parecer com: `service_xyz123`) Meu service ID: "service_p3zfcjh"

**Salve este ID!**

---

### Opção 2: Outro Email (Outlook, Yahoo, etc)

1. No dashboard, clique em **"Email Services"**
2. Clique em **"Add Service"**
3. Selecione seu provedor (Outlook, SendGrid, etc)
4. Preencha as credenciais
5. Clique em **"Create Service"**
6. **Copie o Service ID**

---

## 📧 Passo 4: Criar Template de Email

1. No dashboard, clique em **"Email Templates"** (menu esquerdo)
2. Clique em **"Create New Template"**
3. Preencha assim:

   **Nome do Template:**
   ```
   contact_form_template
   ```

   **Subject (Assunto):**
   ```
   Nova mensagem de contato: {{nome}}
   ```

   **Email Content (Conteúdo):**
   ```
   <h2>Nova Mensagem de Contato</h2>
   
   <p><strong>Nome:</strong> {{nome}}</p>
   <p><strong>Email:</strong> {{email}}</p>
   <p><strong>Empresa:</strong> {{empresa}}</p>
   
   <h3>Mensagem:</h3>
   <p>{{mensagem}}</p>
   
   <hr>
   <p><em>Enviado via formulário de contato em davg-bg</em></p>
   ```

4. Clique em **"Save"**

**Copie o Template ID** que aparecerá (vai parecer com: `template_xyz123`) 

---

## 🔧 Passo 5: Atualizar o Código

Abra o arquivo `script.js` e procure por esta seção:

```javascript
// ===== FORMULÁRIO DE CONTATO COM EMAILJS =====
const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

 // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init('sua_chave_publica_emailjs'); // SUBSTITUIR COM SUA CHAVE
    }
```

**Substitua `sua_chave_publica_emailjs` pela sua Public Key.**

Exemplo:
```javascript
emailjs.init('abc123def456ghi789'); // Sua chave real aqui
```

---

## 🔄 Passo 6: Atualizar Template ID

No mesmo arquivo `script.js`, procure por:

```javascript
await emailjs.sendForm('seu_service_id', 'seu_template_id', form);
```

**Substitua pelos seus IDs:**

```javascript
await emailjs.sendForm('service_abc123xyz', 'template_def456ghi', form);
```

---

## 📝 Exemplo Completo

Após as configurações, a seção deve ficar assim:

```javascript
// ===== FORMULÁRIO DE CONTATO COM EMAILJS =====
const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init('abc123def456ghi789'); // ← Sua Public Key
    }

    // ... resto do código ...

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ... validações ...

try {
          // Tentar usar EmailJS
     if (typeof emailjs !== 'undefined') {
 await emailjs.sendForm(
    'service_abc123xyz',      // ← Seu Service ID
        'template_def456ghi',     // ← Seu Template ID
        form
   );
            } else {
 // Fallback: simular envio
           await new Promise(resolve => setTimeout(resolve, 2000));
    }
            showNotification('Mensagem enviada com sucesso! Em breve entrarei em contato.', 'success');
   form.reset();
   } catch (error) {
        console.error('Erro ao enviar:', error);
     showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
   submitBtn.textContent = originalText;
            submitBtn.disabled = false;
     }
    });
};
```

---

## ✅ Passo 7: Testar

1. Abra seu site: **https://seu-dominio.com**
2. Vá até a seção **"CONTATO"**
3. Preencha o formulário:
   - Nome: seu nome
   - Email: seu_email@exemplo.com
   - Empresa: sua empresa
   - Mensagem: teste do formulário

4. Clique em **"ENVIAR MENSAGEM"**
5. Verifique seu email

---

## 🐛 Troubleshooting

### Problema: "Erro ao enviar mensagem"

**Solução 1:** Verifique se as credenciais estão corretas
```javascript
emailjs.init('abc123def456ghi789');      // Chave pública
await emailjs.sendForm('service_abc123xyz', 'template_def456ghi', form);
```

**Solução 2:** Verifique se o Gmail tem permissão
- EmailJS precisa de permissão do Gmail
- Refaça a conexão em "Email Services"

**Solução 3:** Verificar console do navegador
- Abra Developer Tools: `F12`
- Vá para a aba "Console"
- Procure por mensagens de erro
- Copie e cole no GitHub Issues

### Problema: Email chega na spam

**Solução:**
1. Acesse sua bandeja de spam
2. Clique em "Não é spam"
3. Adicione o email à sua lista de contatos

### Problema: Template ID incorreto

**Solução:**
1. Vá para https://dashboard.emailjs.com
2. Clique em "Email Templates"
3. Procure pelo template `contact_form_template`
4. Copie o ID exato (normalmente entre parênteses)

---

## 📊 Verificar Envios

Para ver histórico de emails enviados:

1. Acesse: https://dashboard.emailjs.com
2. Clique em **"Email Activity"**
3. Você verá todos os emails enviados com status

---

## 🔐 Dicas de Segurança

✅ **O que fazer:**
- Usar variáveis de ambiente para chaves em produção
- Implementar rate limiting
- Validar campos do formulário

❌ **O que NÃO fazer:**
- Publicar chaves no GitHub público
- Mostrar errors detalhados ao usuário
- Enviar dados sensíveis em texto plano

---

## 🎓 Próximos Passos

### 1. Adicionar Validação Extra

```javascript
// Verificar se email é válido
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### 2. Implementar Rate Limiting

```javascript
// Limitar 1 envio por minuto por IP
const lastSubmitTime = {};
const checkRateLimit = (userID) => {
    const now = Date.now();
    const lastTime = lastSubmitTime[userID] || 0;
    if (now - lastTime < 60000) return false;
    lastSubmitTime[userID] = now;
    return true;
};
```

### 3. Enviar Confirmação ao Usuário

```javascript
// Template automático para confirmação
const confirmationTemplate = 'template_usuario_confirmacao';
await emailjs.sendForm(serviceID, confirmationTemplate, {
 to_email: email,
    nome: nome
});
```

---

## 📚 Recursos Úteis

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **GitHub Issues:** https://github.com/emailjs-com/emailjs-sdk/issues
- **Status Page:** https://status.emailjs.com/

---

## 🎉 Parabéns!

Seu formulário de contato agora está funcional! 

**Próximas etapas:**
1. ✅ Testar em produção
2. ✅ Monitorar email activity
3. ✅ Implementar confirmação automática
4. ✅ Adicionar suporte a anexos (opcional)

---

## 📞 Suporte

Se tiver dúvidas:
1. Verifique a documentação do EmailJS
2. Procure no GitHub Issues
3. Abra uma issue descrevendo o problema

**Bom envio! 📧🚀**
