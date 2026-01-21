# ? Guia Rápido: 5 Minutos para Ativar Email

## ?? O que você precisa fazer

### Passo 1: Ir para EmailJS (2 minutos)
```
1. Abra: https://www.emailjs.com/
2. Clique em "Sign Up"
3. Use sua conta Google ou crie uma
4. Verifique o email
```

### Passo 2: Copiar Public Key (1 minuto)
```
1. Abra: https://dashboard.emailjs.com
2. Vá em: Account ? API Keys
3. Copie a "Public Key" (exemplo: abc123xyz789)
```

### Passo 3: Criar Email Service (1 minuto)
```
1. No dashboard, vá em: Email Services
2. Clique em "Add Service"
3. Selecione "Gmail"
4. Clique em "Create Service"
5. Autorize sua conta Gmail
6. Copie o "Service ID" que aparecerá
```

### Passo 4: Criar Template (1 minuto)
```
1. No dashboard, vá em: Email Templates
2. Clique em "Create New Template"
3. Cole o conteúdo abaixo:
```

**Template Name:**
```
contact_form_template
```

**Subject:**
```
Nova mensagem de {{nome}} - Portfólio
```

**Content:**
```
<html>
<body>
<h2>?? Nova Mensagem de Contato</h2>

<p><strong>Nome:</strong> {{nome}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Empresa:</strong> {{empresa}}</p>

<h3>Mensagem:</h3>
<p>{{mensagem}}</p>

<hr>
<p><small>Enviado via formulário de contato</small></p>
</body>
</html>
```

4. Clique em "Save"
5. Copie o "Template ID"

---

## ?? Atualizar Código

Abra o arquivo: **`script.js`**

Procure por esta linha (perto de linha 1100):

```javascript
const PUBLIC_KEY = 'SUA_PUBLIC_KEY_AQUI';
const SERVICE_ID = 'SUA_SERVICE_ID_AQUI';
const TEMPLATE_ID = 'SUA_TEMPLATE_ID_AQUI';
```

Substitua pelos seus valores:

```javascript
const PUBLIC_KEY = 'abc123xyz789'; // Sua Public Key
const SERVICE_ID = 'service_abc123xyz'; // Seu Service ID
const TEMPLATE_ID = 'template_def456ghi'; // Seu Template ID
```

---

## ? Testar

1. Abra seu site
2. Vá para a seção "CONTATO"
3. Preencha o formulário
4. Clique em "ENVIAR MENSAGEM"
5. Verifique seu email ??

---

## ?? Pronto!

Seu formulário agora envia emails automaticamente!

### Troubleshooting Rápido

**"Erro ao enviar"**
- Verifique se copiou os IDs corretamente
- Sem espaços em branco extras
- Verifique a console (F12) para ver o erro

**"Email não chega"**
- Procure na pasta de SPAM
- Adicione à lista de contatos
- Aguarde alguns minutos (primeiro envio pode atrasar)

---

**Documentação completa em:** `EMAILJS_SETUP.md`
