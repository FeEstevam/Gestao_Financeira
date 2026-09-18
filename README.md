# 💰 CashFlow - Gestão Financeira 

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tesseract.js](https://img.shields.io/badge/OCR-Tesseract.js_5-5c2d91?style=for-the-badge)](https://tesseract.projectnaptha.com/)

**CashFlow** é uma plataforma moderna e completa de gestão financeira pessoal e empresarial, desenvolvida com foco em ultra performance, design *Dark Luxury*, privacidade absoluta e processamento inteligente de comprovantes bancários diretamente no navegador (**100% offline via LocalStorage e OCR Neural no client**).

---

## ✨ Funcionalidades Principais

### 📷 1. Scanner Inteligente de Comprovantes (OCR Local)
- **Captura Flexível**: Tire fotos instantâneas via webcam/câmera do celular ou faça upload de arquivos da galeria/PDF.
- **Pipeline de Imagem em Preto e Branco + Alta Nitidez**:
  - Conversão em **Preto e Branco com alto contraste dinâmico** (histogram stretching).
  - Filtro de **nitidez convolucional (Unsharp Masking 3x3)** para realçar bordas finas de números, vírgulas e pontos.
  - Upscaling adaptativo para resolução ideal de leitura.
- **Extração Automatizada de Dados**:
  - Reconhecimento automático de **Valor (R$)**, **Data**, **Favorecido/Descrição**, **Método (PIX, TED, Boleto, Cartão)** e **Tipo (Receita/Despesa)**.
  - Parser multi-camada com normalização fonética e correção de ruídos de scanner.

### 📊 2. Visão Patrimonial & Painel Executivo
- **Saldo Líquido e KPIs em Tempo Real**: Cards 3D com efeito *Tilt Card* interativo exibindo saldo consolidado, receitas e despesas do mês.
- **Gráfico de Evolução de Fluxo Mensal**: Histórico comparativo de receitas versus saídas.
- **Distribuição por Categoria**: Gráfico donut interativo com legenda lateral, porcentagens e barras de progresso proporcionais.

### 📅 3. Calendário Térmico Financeiro
- Calendário mensal com indicadores visuais de dias com receitas (verde esmeralda) e despesas (rose/coral).
- **Detalhamento "Transações do Dia"**: Card escuro elegante listando todos os lançamentos ocorridos na data selecionada com rolagem suave.

### 🏦 4. Multi-Contas & Cartões de Crédito
- Cadastro e controle de saldos de contas bancárias (Nubank, Itaú, Bradesco, Inter, Santander, etc.), carteiras e cartões com limite de crédito e radar de teto de gastos.

### 🎯 5. Metas & Engenharia de Sonhos
- Definição de objetivos financeiros com cálculo de progresso percentual, aporte acumulado e prazo estimado.

### 🏷️ 6. Categorização & Centros de Custo Customizados
- Criação de categorias personalizadas com seleção de ícones minimalistas e cores exclusivas.

### 🔒 7. Privacidade & Modo Furtivo
- **Modo Privacidade (`Eye`)**: Oculte valores em tela com um clique (`R$ •••••`).
- **Privacidade Total**: Nenhum dado financeiro ou imagem de comprovante sai do seu dispositivo.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) + Tokens Dark Luxury
- **Componentes Base**: [Radix UI](https://www.radix-ui.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Gráficos**: [Recharts](https://recharts.org/)
- **OCR & Processamento de Imagem**: [Tesseract.js](https://tesseract.projectnaptha.com/) + Canvas API
- **Gerenciamento de Estado**: [TanStack Query](https://tanstack.com/query) + Custom Hooks
- **Manipulação de Datas**: [date-fns](https://date-fns.org/)
- **Ícones**: [Lucide React](https://lucide.dev/)

---

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- **Node.js** (v18 ou superior) ou **Bun**
- Gerenciador de pacotes (`npm`, `pnpm`, `yarn` ou `bun`)

### **Instalação e Execução**

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/cashflow.git

# 2. Acesse a pasta do projeto
cd cashflow

# 3. Instale as dependências
npm install
# ou
bun install

# 4. Inicie o servidor de desenvolvimento
npm run dev
# ou
bun dev
```

Abra o navegador em [http://localhost:5173](http://localhost:5173).

---

## 📁 Estrutura de Diretórios

```text
Cashflow/
├── src/
│   ├── client/
│   │   ├── components/       # Componentes de interface (finance, charts, ui)
│   │   │   ├── finance/      # ReceiptScanner, FinanceCalendar, TransactionList, etc.
│   │   │   ├── charts/       # CategoryChart, MonthlyChart
│   │   │   └── ui/           # Dialog, Input, Select, TiltCard, etc.
│   │   ├── hooks/            # useFinance, usePrivacy, useToast, etc.
│   │   ├── lib/              # receipt-scanner.ts, api.ts, finance-data.ts, icons.ts
│   │   ├── pages/            # Index (Dashboard), Accounts, Goals, Categories, etc.
│   │   ├── App.tsx           # Configuração de rotas
│   │   └── main.tsx          # Ponto de entrada do React
│   └── index.css             # Design system global e variáveis CSS
├── public/                   # Favicons e assets estáticos
├── package.json              # Dependências e scripts
├── tailwind.config.ts        # Configuração Tailwind
├── vite.config.ts            # Configuração do Vite
└── README.md                 # Documentação do projeto
```

---

## 📄 Licença

Este projeto é distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais detalhes.

---

> Desenvolvido com excelência por **CashFlow Team** · 2026
