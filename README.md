# 💰 CashFlow - Gestão Financeira 

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

**CashFlow** é uma plataforma de gestão financeira frontend de alta performance, projetada com uma estética moderna e suporte nativo a temas (Light/Dark). A aplicação oferece um controle patrimonial completo e rápido, armazenando todos os seus dados **100% offline** diretamente no navegador utilizando `localStorage`.

---

## ✨ Funcionalidades Principais

- 📊 **Dashboard Dinâmico**: Visualização instantânea de fluxos de caixa e distribuição de despesas.
- 🌓 **Tematização Híbrida**: Suporte total a modo claro e escuro em todos os componentes e gráficos.
- 🏦 **Multi-Contas**: Gerenciamento unificado de saldos bancários, carteiras e cartões de crédito.
- 🎯 **Engenharia de Sonhos**: Definição e acompanhamento de metas financeiras com barra de progresso premium.
- 🏷️ **Taxonomia Customizada**: Criação de categorias e ícones personalizados para sua rotina.
- 💡 **Estratégia Financeira**: Implementação nativa da regra 50/30/20 para otimização de gastos.
- 🛡️ **Segurança e Privacidade**: Todo o armazenamento de dados é feito localmente (LocalStorage), garantindo privacidade total. Nenhuma informação é enviada para a nuvem.

---

## 🚀 Tecnologias

### **Frontend**
- **React 18**: UI de ultra performance.
- **TypeScript**: Segurança de tipos em todo o fluxo de dados.
- **Vite**: Bundle e HMR ultra-rápido.
- **Tailwind CSS**: Estilização baseada em tokens com suporte a `dark:`.
- **Framer Motion**: Micro-animações e transições de página fluidas.
- **Lucide React**: Biblioteca de ícones consistente e minimalista.
- **Recharts**: Gráficos complexos e responsivos adaptáveis ao tema.

---

## 🛠️ Como Iniciar

### **Requisitos**
- **Node.js** (v18 ou superior) ou **Bun**

### **Passo a Passo**

```bash
# Na raiz do projeto
npm install                     # Instala dependências do client
npm run dev                     # Inicia o frontend em http://localhost:5173
```
*(Você também pode utilizar `bun install` e `bun dev` se preferir).*

---

## 🏗️ Estrutura do Projeto

```text
├── src/
│   └── client/            # Frontend React
│       ├── components/    # Componentes UI (Reutilizáveis)
│       ├── hooks/         # Custom Hooks (Lógica de estado)
│       ├── pages/         # Páginas da aplicação (Roteamento)
│       ├── lib/           # Utilitários, serviços (Mock LocalStorage) e Auth
│       ├── App.tsx        # Definição de rotas principais
│       └── main.tsx       # Entry point do React
├── index.html             # Entry point HTML do Vite
├── package.json           # Configuração de dependências
└── README.md              # Documentação
```

---

> Desenvolvido com ❤️ por [CashFlow Premium Finance] · 2026
