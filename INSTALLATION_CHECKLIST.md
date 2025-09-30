# ✅ CHECKLIST DE INSTALAÇÃO - Kwizi Enhanced

## 📋 Antes de Começar

### Pré-requisitos
- [ ] Node.js 18+ instalado
- [ ] npm, yarn, pnpm ou bun instalado
- [ ] Editor de código (VS Code recomendado)
- [ ] Navegador moderno (Chrome, Firefox, Safari, Edge)

### Verificar instalação Node.js
```bash
node --version  # deve mostrar v18 ou superior
npm --version   # deve mostrar versão do npm
```

---

## 🚀 INSTALAÇÃO PASSO A PASSO

### Passo 1: Navegar para a pasta ✅
```bash
cd kwizi-enhanced
```
✅ Você deve estar dentro da pasta kwizi-enhanced

### Passo 2: Instalar dependências ✅
```bash
npm install
```

**O que esperar:**
- ⏱️ Demora ~2-5 minutos
- 📦 Baixa ~200MB de pacotes
- ✅ Termina com "added X packages"

**Se der erro:**
```bash
# Limpar cache e tentar novamente
npm cache clean --force
npm install
```

### Passo 3: Executar o projeto ✅
```bash
npm run dev
```

**O que esperar:**
- ✅ Mostra "compiled successfully"
- ✅ Mostra "Local: http://localhost:3000"
- ⚠️ NÃO feche o terminal!

### Passo 4: Abrir no navegador ✅
```
http://localhost:3000
```

**O que esperar:**
- ✅ Página carrega instantaneamente
- ✅ Vê "Kwizi Enhanced" no topo
- ✅ Vê 6 categorias de quiz

---

## 🎯 VERIFICAÇÃO DE SUCESSO

### A interface deve mostrar:
- [ ] Logo "Kwizi Enhanced" no topo
- [ ] 3 cards com estatísticas (Pontuação, Quizzes, Conquistas)
- [ ] Botão de Dark Mode (☀️/🌙)
- [ ] Botão de Conquistas (🏆)
- [ ] 6 categorias coloridas:
  - [ ] 💻 Programação (azul)
  - [ ] 🔬 Ciências (verde)
  - [ ] 📜 História (laranja)
  - [ ] 🌍 Geografia (roxo)
  - [ ] 🔢 Matemática (vermelho)
  - [ ] 🎬 Cultura Pop (rosa/roxo)

### Teste básico:
1. [ ] Clique em uma categoria
2. [ ] Vê uma questão com 4 opções
3. [ ] Clique em uma resposta
4. [ ] Aparece pop-up com explicação
5. [ ] Clique em "Próxima Questão"
6. [ ] Funciona!

---

## 🔧 COMANDOS ÚTEIS

### Durante o desenvolvimento:
```bash
# Executar em modo desenvolvimento (hot reload)
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm start

# Verificar erros de código
npm run lint
```

### Parar o servidor:
```
Ctrl + C (no terminal)
```

### Reiniciar o servidor:
```bash
npm run dev
```

---

## 🎨 PERSONALIZANDO

### Adicionar mais questões:
1. [ ] Abra `data/quizData.ts`
2. [ ] Encontre a categoria desejada
3. [ ] Copie uma questão existente
4. [ ] Modifique os dados
5. [ ] Salve (servidor recarrega automaticamente)

### Criar nova categoria:
1. [ ] Abra `data/quizData.ts`
2. [ ] Copie um objeto de categoria inteiro
3. [ ] Mude: id, name, icon, description, color
4. [ ] Adicione questões
5. [ ] Salve

### Mudar cores:
1. [ ] Abra `tailwind.config.js`
2. [ ] Modifique valores em `colors`
3. [ ] Salve

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### Erro: "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Opção 1: Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Opção 2: Usar outra porta
PORT=3001 npm run dev
```

### Página em branco
```bash
# Limpar cache do Next.js
rm -rf .next
npm run dev
```

### Erro de TypeScript
```bash
# Verificar erros
npm run build

# Ignorar erros de tipo (não recomendado)
# Edite next.config.js e adicione:
# typescript: { ignoreBuildErrors: true }
```

---

## 📱 TESTANDO RESPONSIVIDADE

### No navegador:
1. [ ] Abra DevTools (F12)
2. [ ] Clique em "Toggle device toolbar" (Ctrl+Shift+M)
3. [ ] Teste diferentes dispositivos:
   - [ ] iPhone SE
   - [ ] iPhone 12 Pro
   - [ ] iPad
   - [ ] Desktop

### O que verificar:
- [ ] Layout não quebra
- [ ] Botões são clicáveis
- [ ] Texto é legível
- [ ] Scroll funciona suave

---

## 🌙 TESTANDO DARK MODE

1. [ ] Clique no ícone ☀️/🌙
2. [ ] Tema muda suavemente
3. [ ] Todos os elementos têm boa visibilidade
4. [ ] Recarregue a página
5. [ ] Tema permanece (salvo no localStorage)

---

## 🏆 TESTANDO CONQUISTAS

1. [ ] Complete um quiz
2. [ ] Veja "🏆 Primeira Vitória" desbloqueada
3. [ ] Clique no troféu no canto
4. [ ] Veja modal com todas conquistas
5. [ ] Tente desbloquear mais!

---

## 📊 DADOS SALVOS

### Ver dados salvos:
1. [ ] Abra DevTools (F12)
2. [ ] Vá em "Application" ou "Storage"
3. [ ] Clique em "Local Storage"
4. [ ] Veja `quizProgress` e `darkMode`

### Limpar dados:
```javascript
// No console do navegador (F12)
localStorage.clear()
// Recarregue a página
```

---

## 🎓 PRÓXIMOS PASSOS

Depois da instalação:

1. [ ] Jogue todos os 6 temas
2. [ ] Tente desbloquear todas conquistas
3. [ ] Teste o dark mode
4. [ ] Adicione suas próprias questões
5. [ ] Customize cores e temas
6. [ ] Compartilhe com amigos!

---

## 📚 RECURSOS ADICIONAIS

### Documentação:
- [ ] `README.md` - Info técnica completa
- [ ] `GUIDE.md` - Guia de uso
- [ ] `EXECUTIVE_SUMMARY.md` - Visão geral

### Comunidade Next.js:
- [Documentação Next.js](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

## ✅ CHECKLIST FINAL

Marque quando completar:

- [ ] ✅ Node.js instalado
- [ ] ✅ Dependências instaladas (`npm install`)
- [ ] ✅ Servidor rodando (`npm run dev`)
- [ ] ✅ Abre no navegador (localhost:3000)
- [ ] ✅ Interface carrega corretamente
- [ ] ✅ Consegue jogar um quiz
- [ ] ✅ Pop-ups de explicação funcionam
- [ ] ✅ Dark mode funciona
- [ ] ✅ Estatísticas são salvas
- [ ] ✅ Conquistas desbloqueiam

---

## 🎉 PARABÉNS!

Se marcou todos os itens acima, seu Kwizi Enhanced está funcionando perfeitamente!

**Agora é só se divertir aprendendo! 🚀📚**

---

## 🆘 PRECISA DE AJUDA?

Se algo não funcionou:
1. Leia a documentação completa (README.md)
2. Verifique os logs de erro no terminal
3. Pesquise o erro no Google
4. Abra uma issue no GitHub

**Boa sorte! 🍀**
