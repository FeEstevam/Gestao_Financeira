import { Transaction, Goal, Account, CustomCategoryDef, BudgetRule } from "./finance-data";

export interface ChatContext {
  transactions: Transaction[];
  accounts: Account[];
  goals: Goal[];
  customCategories: CustomCategoryDef[];
  budgetRules: BudgetRule[];
  userName: string;
}

export interface QuickSuggestion {
  label: string;
  query: string;
  category?: "dados" | "app" | "educacao";
}

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  { label: "💰 Saldo Atual", query: "qual meu saldo atual?", category: "dados" },
  { label: "📉 Gastos do Mês", query: "quanto gastei este mês?", category: "dados" },
  { label: "🛡️ Reserva de Emergência", query: "como calcular minha reserva de emergência?", category: "educacao" },
  { label: "📷 Scanner OCR", query: "como funciona o scanner de comprovante?", category: "app" },
  { label: "✈️ Milhas & Pontos", query: "como funciona o programa de acumulacao de milhas e pontos?", category: "educacao" },
  { label: "🏢 Finanças PF vs PJ", query: "como separar as financas da pessoa fisica e juridica?", category: "educacao" },
  { label: "⚖️ Regra 50/30/20", query: "qual é a regra dos 50/30/20 para divisão de gastos?", category: "educacao" },
  { label: "💳 Cartão Clonado / Fraude", query: "socorro meu cartao foi clonado o que eu faco?", category: "educacao" },
  { label: "🏦 Salário CLT vs PJ", query: "qual o custo real de contratar um funcionario clt versus pj?", category: "educacao" },
  { label: "🏛️ Holding Patrimonial", query: "o que e uma holding patrimonial e quando vale a pena?", category: "educacao" },
];

/**
 * Normaliza o texto removendo acentos e pontuações para matching robusto
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s%]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Motor local inteligente de atendimento, suporte e educação financeira
 */
export function processLocalQuery(message: string, context: ChatContext): string {
  const norm = normalizeText(message);

  // ══════════════════════════════════════════════════════════════════════════════
  // CARTÕES DE CRÉDITO (BENEFÍCIOS, MILHAS, ANUIDADE E LIMITES)
  // ══════════════════════════════════════════════════════════════════════════════

  // 1. Acumulação de milhas e pontos
  if (
    norm.includes("milhas e pontos") ||
    norm.includes("acumulacao de milhas") ||
    norm.includes("pontos no cartao") ||
    norm.includes("programa de pontos")
  ) {
    return (
      `✈️ **Como Funciona a Acumulação de Milhas e Pontos no Cartão:**\n\n` +
      `• **Conversão em Dólar:** A cada US$ 1 gasto na fatura, você acumula entre **1,0 a 4,0 pontos** no programa do banco (Livelo, Esfera, C6 Átomos, Itaú IUPP).\n` +
      `• **Transferência Bonificada para Companhias Aéreas:**\n` +
      `  - Nunca transfira pontos no dia a dia. Espere **promoções de transferência bonificada (80% a 100% de bônus)** para programas como Smiles (Gol), Latam Pass e Azul Fidelidade.\n` +
      `  - Seus 50.000 pontos viram 100.000 milhas instantaneamente!\n` +
      `• **Monetização:** Milhas acumuladas podem ser usadas para emitir passagens com desconto de até 70% ou vendidas em plataformas especializadas para gerar renda extra.`
    );
  }

  // 2. Cashback vs Pontos
  if (
    norm.includes("cashback e programa de pontos") ||
    norm.includes("cashback vs pontos") ||
    norm.includes("pontos ou cashback") ||
    norm.includes("diferenca entre cashback e pontos")
  ) {
    return (
      `💵 **Cashback vs. Programa de Pontos Tradicional — Qual o Melhor?**\n\n` +
      `• **Cashback (Dinheiro de Volta):**\n` +
      `  - Vantagens: Simplicidade absoluta. Devolve entre **0,5% a 2% do valor gasto** diretamente na sua conta corrente ou como desconto na fatura. Sem validade, sem burocracia e sem risco de expirar.\n` +
      `  - Ideal para quem não quer perder tempo gerenciando tabelas de companhias aéreas.\n\n` +
      `• **Programa de Pontos / Milhas:**\n` +
      `  - Vantagens: Maior retorno financeiro potencial (**3% a 6% de retorno efetivo** se transferido com bônus de 100% e emitido em passagens internacionais executivas ou viagens).\n` +
      `  - Desvantagens: Exige acompanhamento frequente de promoções e controle de prazos de validade.`
    );
  }

  // 3. Isenção de anuidade
  if (
    norm.includes("isencao de anuidade") ||
    norm.includes("isentar anuidade") ||
    norm.includes("anuidade no meu cartao") ||
    norm.includes("como nao pagar anuidade")
  ) {
    return (
      `💳 **Como Conseguir Isenção de Anuidade no Cartão de Crédito:**\n\n` +
      `1. **Gasto Médio Mensal (Regra Automática):** Quase todos os cartões Black/Infinite isentam a anuidade se você atingir uma meta de gastos (ex: R$ 5.000 a R$ 10.000/mês na fatura).\n` +
      `2. **Volume de Investimentos no Banco:** Manter valores aplicados (ex: a partir de R$ 30.000 a R$ 50.000 em CDBs ou Tesouro no banco emissor) costuma zerar a anuidade de cartões premium.\n` +
      `3. **Negociação Direta no Chat/Central:** Ligue para o SAC antes da renovação anual informando que pretende cancelar o cartão devido à anuidade. Mais de 80% dos bancos concedem desconto de 50% a 100% no mesmo instante.\n` +
      `4. **Cartões Sem Anuidade Nativos:** Nubank Ultravioleta (com gastos/investimentos), Inter Mastercard Black, C6 Carbon e XP Visa Infinite.`
    );
  }

  // 4. Salas VIP em aeroportos
  if (
    norm.includes("salas vip") ||
    norm.includes("sala vip") ||
    norm.includes("acesso a salas vip") ||
    norm.includes("loungekey") ||
    norm.includes("priority pass")
  ) {
    return (
      `🥂 **Como Funciona o Acesso a Salas VIP em Aeroportos:**\n\n` +
      `• **Programas Globais de Acesso:**\n` +
      `  - **Visa Airport Companion (DragonPass):** Usado pela maioria dos cartões Visa Infinite.\n` +
      `  - **LoungeKey / Priority Pass:** Usado por cartões Mastercard Black e Elo Diners Club.\n\n` +
      `• **Tipos de Acesso:**\n` +
      `  - **Ilimitado e Gratuito:** Cartões de alta renda (ex: BRB Dux, Inter Black Duo, Santander Unlimited);\n` +
      `  - **Cota de Acessos Gratuitos (ex: 2 a 4 por ano):** XP Infinite, C6 Carbon, Bradesco Elo Nanquim;\n` +
      `  - **Acesso Pago com Desconto:** Permite entrar na sala pagando taxa reduzida (US$ 32 por visita).\n\n` +
      `💡 *Dica:* Baixe o app do programa correspondente (*Visa Airport Companion* ou *LoungeKey*) e cadastre seu cartão antes de viajar!`
    );
  }

  // 5. Proteção de preço e compra protegida
  if (
    norm.includes("protecao de preco") ||
    norm.includes("compra protegida") ||
    norm.includes("seguro de protecao de preco")
  ) {
    return (
      `🛡️ **Como Funciona o Seguro de Proteção de Preço e Compra Protegida:**\n\n` +
      `São benefícios gratuitos oferecidos diretamente pelas bandeiras (**Visa e Mastercard** Gold, Platinum e Black/Infinite):\n\n` +
      `• **Proteção de Preço (Visa Gold / Platinum):**\n` +
      `  Se você comprou um produto elegível com o cartão e encontrar o **mesmo item mais barato em até 30 dias**, a bandeira reembolsa a diferença em dinheiro na sua conta!\n\n` +
      `• **Compra Protegida:**\n` +
      `  Cobre roubo, furto qualificado ou danos acidentais ao produto adquirido ocorridos nos primeiros 30 a 90 dias após a compra.\n\n` +
      `• **Garantia Estendida Original:**\n` +
      `  Dobra o prazo de garantia de fábrica do fabricante (em até +12 meses adicionais) sem custo extra.`
    );
  }

  // 6. Cartão virtual para compras internacionais
  if (
    norm.includes("cartao de credito virtual para compras internacionais") ||
    norm.includes("cartao virtual internacional") ||
    norm.includes("compras internacionais com cartao virtual")
  ) {
    return (
      `🌐 **Posso Usar Cartão Virtual para Compras Internacionais?**\n\n` +
      `• **Sim, com total segurança!** O cartão virtual nacional/internacional tem as mesmas funções do cartão físico, mas com CVV (código de segurança) dinâmico que expira periodicamente.\n` +
      `• **Por que é o método recomendado:** Evita fraudes e clonagens em sites estrangeiros. Se o site for invadido, você pode simplesmente apagar o cartão virtual no app do banco em 1 segundo sem precisar bloquear seu cartão de plástico físico!\n` +
      `• **Custos em moeda estrangeira:** Conversão na PTAX do dia + Spread bancário do seu banco + IOF federal de 4,38%.`
    );
  }

  // 7. Spread bancário no exterior
  if (
    norm.includes("spread bancario") ||
    norm.includes("o que e o spread") ||
    norm.includes("compras no exterior spread")
  ) {
    return (
      `💱 **O que é Spread Bancário em Compras no Exterior:**\n\n` +
      `O *spread* é a margem de lucro cambial que o banco emissor embute sobre a taxa de câmbio oficial (PTAX do Banco Central) nas suas compras em moeda estrangeira.\n\n` +
      `• **Variação por Banco:**\n` +
      `  - Grandes Bancos Tradicionais (Itaú, Bradesco, Santander): Cobram entre **4% e 6% de spread** (altíssimo);\n` +
      `  - Bancos Digitais e Fintechs (Inter, C6, Nubank): Cobram entre **1% e 4% de spread**;\n` +
      `  - Contas Globais (Nomad, Wise, Inter Global): Cobram entre **0,9% e 1,5% de spread** com IOF de apenas 1,1%!\n\n` +
      `💡 *Dica:* Para viagens e compras em dólar/euro, contas globais geram economia de **até 10% em relação ao cartão de crédito tradicional**.`
    );
  }

  // 8. Parcelamento sem juros pelo lojista
  if (
    norm.includes("parcelamento de compras sem juros") ||
    norm.includes("parcelamento pelo lojista") ||
    norm.includes("como funciona parcelado sem juros")
  ) {
    return (
      `🛍️ **Como Funciona o Parcelamento Sem Juros pelo Lojista:**\n\n` +
      `• **Mecanismo:** O lojista assume o custo do desconto financeiro junto à adquirente (maquininha) e você paga o valor da etiqueta dividido em parcelas mensais iguais.\n` +
      `• **Desconto à Vista no Pix:** Como o lojista paga taxas menores no Pix (0% a 1%), é muito comum conseguir **5% a 10% de desconto à vista** negociando antes de parcelar.\n` +
      `• **Impacto no Limite do Cartão:** O valor **TOTAL da compra** fica bloqueado no seu limite, liberando espaço mês a mês à medida que cada fatura é quitada.`
    );
  }

  // 9. Solicitar aumento de limite repetidas vezes
  if (
    norm.includes("solicitar aumento de limite") ||
    norm.includes("impacto de pedir aumento de limite") ||
    norm.includes("aumento de limite repetidas vezes")
  ) {
    return (
      `📉 **Pedir Aumento de Limite Repetidas Vezes Afeta o Score?**\n\n` +
      `• **Sim!** Cada vez que você solicita aumento de limite pelo app, a instituição realiza uma consulta formal de crédito (*Hard Inquiry*) no seu CPF junto ao Serasa e Boa Vista.\n` +
      `• **O Efeito nos Birôs:** Múltiplas consultas de crédito em um intervalo curto (menos de 6 meses) sinalizam ao mercado que você está desesperado por crédito, provocando **queda temporária na sua pontuação de Score**.\n` +
      `• **Como Conseguir Aumento Orgânico:** Concentre seus gastos no cartão, pague a fatura 100% em dia antes do vencimento e movimente a conta corrente para que o sistema libere limites automáticos.`
    );
  }

  // 10. Cartão com garantia de investimento (Secured Card)
  if (
    norm.includes("cartao de credito com garantia") ||
    norm.includes("secured card") ||
    norm.includes("limite garantido por investimento") ||
    norm.includes("nu limite garantido")
  ) {
    return (
      `🔒 **O que é Cartão com Garantia de Investimento (Secured Card):**\n\n` +
      `É uma modalidade onde o limite do seu cartão de crédito é proporcional ao valor que você mantém investido em um CDB específico ou caixinha do banco (ex: *Nu Limite Garantido, Inter Limite Invest, C6 Limite Garantido*).\n\n` +
      `• **Principais Vantagens:**\n` +
      `  - Aprovação imediata de limite, mesmo para negativados ou pessoas sem histórico de crédito;\n` +
      `  - O dinheiro continua rendendo **100% do CDI** enquanto garante seu limite;\n` +
      `  - Ajuda a construir score de crédito positivo para o futuro;\n` +
      `  - Você pode resgatar o investimento a qualquer momento, desde que a fatura esteja quitada.`
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // FINANÇAS PJ, CONTAS DE EMPRESAS E GESTÃO DE CAIXA
  // ══════════════════════════════════════════════════════════════════════════════

  // 11. Separar finanças PF e PJ
  if (
    norm.includes("separar as financas da pessoa fisica e da pessoa juridica") ||
    norm.includes("separar pf e pj") ||
    norm.includes("misturar dinheiro da empresa")
  ) {
    return (
      `🏢 **Como Separar as Finanças da Pessoa Física e Pessoa Jurídica:**\n\n` +
      `Misturar as contas é o erro nº 1 que leva pequenas empresas à falência. Siga a regra de ouro do **Princípio da Entidade**:\n\n` +
      `1. **Tenha Contas Bancárias Rigorosamente Separadas:** Abra uma conta PJ digital gratuita para a empresa e mantenha sua conta PF apenas para gastos pessoais.\n` +
      `2. **Defina um Pró-Labore Fixo Mensal:** Estabeleça um "salário" para você sócio. A empresa transfere o pró-labore na mesma data todo mês para sua conta PF.\n` +
      `3. **Nunca Pague Boletos Pessoais na Conta da Empresa:** Nem a escola dos filhos, nem a feira de casa na conta PJ.\n` +
      `4. **Distribuição de Lucros Trimestral/Semestral:** Só retire lucros da empresa após fechar o fluxo de caixa e garantir o capital de giro dos próximos 3 a 6 meses.`
    );
  }

  // 12. Melhor banco digital PJ para MEI
  if (
    norm.includes("melhor banco digital pj") ||
    norm.includes("conta pj para mei") ||
    norm.includes("banco pj sem tarifas")
  ) {
    return (
      `🏦 **Melhores Bancos Digitais Gratuitos para MEI e Pequenas Empresas:**\n\n` +
      `• **Banco Inter PJ:** Emissão gratuita de 100 boletos de cobrança/mês, Pix ilimitado gratuito, folha de pagamento automática e investimentos empresariais.\n` +
      `• **Nubank PJ:** Interface intuitiva, emissão de boletos, Pix PJ gratuito e suporte rápido.\n` +
      `• **Cora:** Focada 100% em PJs, com gestão de cobranças com envio automático de lembretes aos clientes por WhatsApp/e-mail e boletos gratuitos.\n` +
      `• **C6 Bank PJ:** Cartão de crédito empresarial C6 Business e maquininha C6 Pay integrada.`
    );
  }

  // 13. Pró-labore ideal
  if (
    norm.includes("calcular o pro labore") ||
    norm.includes("pro labore ideal") ||
    norm.includes("quanto tirar de pro labore")
  ) {
    return (
      `💼 **Como Calcular o Pró-Labore Ideal para o Sócio:**\n\n` +
      `O Pró-Labore é a remuneração pelo **trabalho efetivo** executado pelo sócio na operação da empresa (diferente da distribuição de lucros):\n\n` +
      `1. **Critério de Mercado (Custo de Substituição):** Pergunte-se: *"Se eu contratasse um profissional no mercado para fazer exatamente o que eu faço, quanto pagaria de salário?"* Esse é o valor justo do seu pró-labore.\n` +
      `2. **Tributação (INSS e IRPF):** Sobre o pró-labore incide 11% de INSS do sócio + tabela progressiva do IR. Por isso, empresários costumam fixar o pró-labore em um valor compatível e retirar o excedente como **Distribuição de Lucros Isenta de IR**.`
    );
  }

  // 14. Lucros e dividendos distribuídos (Isenção IR)
  if (
    norm.includes("lucros dividendos distribuidos") ||
    norm.includes("distribuicao de lucros") ||
    norm.includes("dividendos sao isentos de ir")
  ) {
    return (
      `💸 **Distribuição de Lucros e Dividendos PJ — Isenção de IR:**\n\n` +
      `• **Isenção Legal no Brasil:** No Brasil (Lei nº 9.249/95), os lucros e dividendos distribuídos por empresas (MEI, Simples Nacional, Lucro Presumido e Real) para seus sócios pessoas físicas são **100% ISENTOS de Imposto de Renda** na declaração IRPF.\n` +
      `• **Condição Obrigatória:** A empresa não pode possuir débitos em aberto com o INSS ou com a Receita Federal (PGFN) para poder distribuir lucros legalmente aos sócios.`
    );
  }

  // 15. Antecipação de recebíveis de maquininha
  if (
    norm.includes("antecipacao de receiveis") ||
    norm.includes("antecipacao de recebiveis") ||
    norm.includes("antecipar vendas da maquininha")
  ) {
    return (
      `💳 **Como Funciona a Antecipação de Recebíveis de Maquininha:**\n\n` +
      `É o adiantamento dos valores das vendas parceladas no cartão de crédito antes do prazo normal de 30 dias de cada parcela.\n\n` +
      `• **O Custo Financeiro:** A maquininha desconta uma taxa percentual mensal (de 1,5% a 3,5% ao mês por parcela antecipada). Em uma venda parcelada em 12x, a taxa total de antecipação pode **corroer mais de 15% a 20% do faturamento da venda**!\n` +
      `• **Quando Usar:** Apenas em emergências graves de liquidez imediata. O ideal é construir um **Capital de Giro próprio** para não depender de antecipação bancária cara.`
    );
  }

  // 16. Capital de Giro vs Financiamento de Longo Prazo
  if (
    norm.includes("capital de giro e financiamento") ||
    norm.includes("diferenca entre capital de giro e financiamento") ||
    norm.includes("capital de giro")
  ) {
    return (
      `🏭 **Capital de Giro vs. Financiamento de Longo Prazo:**\n\n` +
      `• **Capital de Giro (Curto Prazo - Operação Diária):**\n` +
      `  - Recursos necessários para cobrir o descasamento entre o pagamento de fornecedores e o recebimento das vendas de clientes (estoque, folha de pagamento, água/luz).\n` +
      `  - Deve ser financiado prioritariamente pelo próprio lucro retido da empresa.\n\n` +
      `• **Financiamento de Longo Prazo (Capex - Investimento em Ativos):**\n` +
      `  - Crédito destinado à compra de máquinas, expansão de galpões, frotas ou tecnologia com prazos de 3 a 10 anos (BNDES, Pronampe, Finame).`
    );
  }

  // 17. Emitir Nota Fiscal de Serviço (NFS-e)
  if (
    norm.includes("emitir notas fiscais de servico") ||
    norm.includes("nfs e") ||
    norm.includes("emissao de nota fiscal")
  ) {
    return (
      `📑 **Como Emitir Nota Fiscal de Serviço (NFS-e):**\n\n` +
      `• **Para MEI (Portal Nacional Unificado):**\n` +
      `  Desde 2023, todos os MEIs do Brasil emitem NFS-e de serviço exclusivamente pelo **Portal Nacional da NFS-e** (gov.br/nfse) ou pelo app mobile *NFS-e Mobile*.\n` +
      `• **Para Microempresas (ME) e EPP:**\n` +
      `  Emitidas pelo portal da Prefeitura do município onde a empresa é sediada ou através de sistemas integrados de gestão financeira (ERP).`
    );
  }

  // 18. Simples Nacional
  if (
    norm.includes("simples nacional") ||
    norm.includes("enquadrar no simples nacional") ||
    norm.includes("o que e o simples nacional")
  ) {
    return (
      `📊 **O que é o Simples Nacional e Quem Pode se Enquadrar:**\n\n` +
      `O Simples Nacional é um regime tributário simplificado e unificado para Microempresas (ME) e Empresas de Pequeno Porte (EPP).\n\n` +
      `• **Limite de Faturamento:** Receita bruta anual de até **R$ 4,8 milhões** (ou proporcional no ano de abertura);\n` +
      `• **Guia Única (DAS):** Unifica 8 impostos em uma única guia mensal (IRPJ, CSLL, PIS, COFINS, IPI, ICMS, ISS e CPP);\n` +
      `• **Tabelas (Anexos I a V):** Alíquotas progressivas conforme a atividade econômica (Comércio no Anexo I a partir de 4%, Serviços a partir de 6% ou 15,5%).`
    );
  }

  // 19. Fluxo de Caixa Projetado
  if (
    norm.includes("fluxo de caixa projetado") ||
    norm.includes("como criar fluxo de caixa") ||
    norm.includes("projecao de caixa")
  ) {
    return (
      `📈 **O que é Fluxo de Caixa Projetado e Como Criá-lo:**\n\n` +
      `O fluxo de caixa projetado é a ferramenta que antecipa todas as **entradas e saídas de dinheiro futuras** para os próximos 30, 60 e 90 dias.\n\n` +
      `• **Como Estruturar no CashFlow:**\n` +
      `  1. Lance todas as contas fixas (aluguel, fornecedores, DAS, salários) marcando como **Lançamentos Recorrentes**;\n` +
      `  2. Lance as previsões de recebíveis de clientes parcelados;\n` +
      `  3. Acompanhe no **Calendário Financeiro** os dias em que haverá déficit para antecipar cobranças ou cortar despesas antes do saldo ficar negativo!`
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // NEGÓCIOS, CONTRATOS E LEGISLAÇÃO FINANCEIRA
  // ══════════════════════════════════════════════════════════════════════════════

  // 20. Obrigações Fiscais Mensais do MEI
  if (
    norm.includes("obrigacoes fiscais mensais de uma mei") ||
    norm.includes("obrigacoes do mei") ||
    norm.includes("impostos do mei") ||
    norm.includes("das mei")
  ) {
    return (
      `📋 **Obrigações Fiscais Oficiais do MEI (Microempreendedor Individual):**\n\n` +
      `1. **Pagamento Mensal do DAS-MEI:** Guia única com valor fixo (~R$ 75 a R$ 85/mês) vencendo todo dia 20 (inclui 5% do salário mínimo para INSS/aposentadoria + ICMS/ISS);\n` +
      `2. **Declaração Anual de Faturamento (DASN-SIMEI):** Enviada até **31 de maio** de cada ano informando a receita bruta total do ano anterior;\n` +
      `3. **Emissão de Nota Fiscal:** Obrigatória sempre que prestar serviço ou vender produto para outras **Pessoas Jurídicas (empresas)**;\n` +
      `4. **Relatório Mensal de Receitas Brutas:** Manter preenchido o controle interno de faturamento até o dia 20 de cada mês.`
    );
  }

  // 21. Restituição de imposto retido para empresas (PER/DCOMP)
  if (
    norm.includes("restituicao de imposto retido na fonte") ||
    norm.includes("per dcomp") ||
    norm.includes("compensacao tributaria")
  ) {
    return (
      `⚖️ **Restituição e Compensação de Imposto Retido (PER/DCOMP):**\n\n` +
      `Quando uma empresa presta serviços para órgãos públicos ou grandes companhias, pode sofrer retenção na fonte de IRRF, PIS, COFINS e CSLL.\n\n` +
      `• Se ao final do período de apuração o valor retido for superior ao imposto devido, a empresa pode solicitar a **Restituição em dinheiro** ou fazer a **Compensação cruzada** com outros tributos federais através do sistema **PER/DCOMP Web** no portal e-CAC da Receita Federal.`
    );
  }

  // 22. Capital Social de uma Empresa
  if (
    norm.includes("capital social de uma empresa") ||
    norm.includes("o que e capital social") ||
    norm.includes("capital social na abertura")
  ) {
    return (
      `🏢 **O que é Capital Social na Abertura de uma Empresa:**\n\n` +
      `Capital Social é o montante bruto de recursos financeiros ou bens (dinheiro, equipamentos, veículos) que os sócios investem inicialmente para abrir a empresa e mantê-la funcionando até atingir o ponto de equilíbrio.\n\n` +
      `• **Definição de Responsabilidade:** Em sociedades limitadas (LTDA), o capital social delimita a responsabilidade financeira máxima de cada sócio perante credores em caso de falência.`
    );
  }

  // 23. Empréstimos via Pronampe
  if (
    norm.includes("pronampe") ||
    norm.includes("emprestimos via pronampe") ||
    norm.includes("credito pronampe")
  ) {
    return (
      `🏛️ **Como Funcionam os Empréstimos via Pronampe para PMEs:**\n\n` +
      `O Pronampe (*Programa Nacional de Apoio às Microempresas e Empresas de Pequeno Porte*) é uma linha de crédito com aval do Governo Federal (via Fundo Garantidor de Operações - FGO):\n\n` +
      `• **Taxa de Juros Máxima:** Taxa Selic + até **6% ao ano** (uma das menores do mercado corporativo);\n` +
      `• **Prazo de Pagamento:** Até **48 a 72 meses**, com carência inicial de até 12 meses para começar a pagar;\n` +
      `• **Limite de Crédito:** Até 30% da receita bruta anual declarada na ECF/DASN do ano anterior.`
    );
  }

  // 24. Custo Real: Funcionário CLT vs PJ
  if (
    norm.includes("contratar um funcionario clt versus pj") ||
    norm.includes("clt vs pj") ||
    norm.includes("custo de funcionario clt") ||
    norm.includes("clt versus pj")
  ) {
    return (
      `👥 **Custo Real de Contratação: CLT vs. PJ:**\n\n` +
      `• **Funcionário CLT (Custo Total para a Empresa):**\n` +
      `  O custo de um funcionário CLT para a empresa custa entre **1,6x a 1,8x o valor do salário nominal** (ou até 2,0x em empresas fora do Simples):\n` +
      `  - Encargos: 13º salário (8,33%), férias + 1/3 (11,11%), FGTS (8%), provisão de multa rescisória (4%), INSS patronal e vale-transporte/alimentação.\n\n` +
      `• **Contratação PJ (Prestador de Serviços B2B):**\n` +
      `  - Sem encargos trabalhistas diretos, porém o prestador não pode ter subordinação hierárquica direta, controle de ponto rígido ou habitualidade exclusiva (para evitar risco de reconhecimento de vínculo trabalhista na Justiça do Trabalho).`
    );
  }

  // 25. Juros de mora e multas por atraso em boletos
  if (
    norm.includes("juros de mora e multas") ||
    norm.includes("cobranca de juros de mora") ||
    norm.includes("multa por atraso em boletos")
  ) {
    return (
      `🧾 **Regras Legais de Juros de Mora e Multa por Atraso em Boletos:**\n\n` +
      `Conforme o Código de Defesa do Consumidor (Art. 52, § 1º) e Código Civil:\n\n` +
      `• **Multa Máxima por Atraso:** Limitada a **2,0% (dois por cento)** sobre o valor da prestação (cobrada uma única vez);\n` +
      `• **Juros de Mora:** Limitados por lei a **1,0% ao mês (ou 0,033% por dia de atraso)** calculado proporcionalmente (*pro rata die*);\n` +
      `• **Correção Monetária:** Pode ser aplicada com base em índice oficial de inflação (IPCA ou INPC) se expressamente previsto em contrato.`
    );
  }

  // 26. Holding Patrimonial
  if (
    norm.includes("holding patrimonial") ||
    norm.includes("abrir uma holding") ||
    norm.includes("quando vale a pena abrir holding")
  ) {
    return (
      `🏛️ **O que é Holding Patrimonial e Quando Vale a Pena:**\n\n` +
      `Uma holding patrimonial é uma empresa criada para deter, administrar e proteger os bens físicos e financeiros (imóveis, cotas societárias, investimentos) de uma família.\n\n` +
      `• **3 Principais Vantagens:**\n` +
      `  1. **Planejamento Sucessório Sem Inventário:** As cotas da empresa são doadas em vida com cláusula de usufruto, evitando custos traumáticos de inventário e litígios;\n` +
      `  2. **Economia Tributária em Aluguéis:** A tributação de aluguéis em pessoa física chega a **27,5%**, enquanto na holding no Lucro Presumido cai para cerca de **11,33% a 14,5%**;\n` +
      `  3. **Blindagem Jurídica:** Segrega os bens familiares das atividades operacionais de risco das outras empresas dos sócios.\n\n` +
      `💡 *Quando vale a pena:* Geralmente viável a partir de **R$ 2 a 3 milhões de patrimônio imobiliário** ou alta receita recorrente de locação.`
    );
  }

  // 27. Proteger bens pessoais (Responsabilidade Limitada)
  if (
    norm.includes("proteger os bens pessoais") ||
    norm.includes("responsabilidade limitada") ||
    norm.includes("proteger bens de dividas da empresa")
  ) {
    return (
      `🛡️ **Como Proteger Bens Pessoais de Dívidas da Empresa (LTDA):**\n\n` +
      `Em sociedades limitadas (LTDA), o patrimônio pessoal dos sócios não responde pelas dívidas civis e comerciais da empresa por regra geral.\n\n` +
      `• **Como Evitar a Desconsideração da Personalidade Jurídica (Art. 50 do Código Civil):**\n` +
      `  1. **Zero Confusão Patrimonial:** Nunca pague contas pessoais na conta da empresa ou use o carro pessoal em nome da empresa sem contrato;\n` +
      `  2. **Não Cometa Fraude ou Desvio de Finalidade:** Mantenha a contabilidade e os livros fiscais rigorosamente em dia;\n` +
      `  3. **Atenção às Dívidas Trabalhistas e Fiscais:** Na Justiça do Trabalho e tributária, a responsabilização dos sócios é mais célere se a empresa fechar irregularmente.`
    );
  }

  // 28. Taxas de maquininha de cartão
  if (
    norm.includes("taxas uma maquininha de cartao cobra") ||
    norm.includes("taxas de maquininha") ||
    norm.includes("taxa no debito e credito")
  ) {
    return (
      `💳 **Quais Taxas as Maquininhas de Cartão Cobram do Lojista:**\n\n` +
      `• **1. Débito (MDR Débito):** Varia entre **0,9% e 1,5%** por transação (recebimento em 1 dia útil);\n` +
      `• **2. Crédito à Vista (MDR 1x):** Varia entre **2,5% e 3,5%** por transação (recebimento em 30 dias);\n` +
      `• **3. Crédito Parcelado (MDR + Antecipação):**\n` +
      `  - Vendas em 2x a 12x: Taxa base + acréscimo de cerca de **1,5% a 2,5% por parcela**;\n` +
      `• **4. Aluguel ou Compra do Aparelho:** Algumas empresas isentam a mensalidade ao atingir metas de faturamento (ex: R$ 3.000 a R$ 5.000/mês).`
    );
  }

  // 29. Análise de crédito de novos clientes antes de vender a prazo
  if (
    norm.includes("analise de credito de novos clientes") ||
    norm.includes("vender a prazo") ||
    norm.includes("consultar cliente antes de vender")
  ) {
    return (
      `🔍 **Como Fazer Análise de Crédito de Novos Clientes antes de Vender a Prazo:**\n\n` +
      `1. **Consulta aos Birôs de Crédito PJ/PF:** Utilize serviços como *Serasa Experian PJ*, *Boa Vista SCPC* ou *Quod* para verificar protestos, cheques sem fundo, ações judiciais e score do CNPJ.\n` +
      `2. **Verifique a Situação Cadastral no Sintegra e Receita Federal:** Certifique-se de que a empresa está ativa e com inscrição estadual regular.\n` +
      `3. **Defina um Limite de Crédito Gradativo:** No primeiro pedido, exija pagamento à vista ou entrada de 50%. Aumente o prazo (30/60 dias) apenas após a pontualidade comprovada nas primeiras faturas.\n` +
      `4. **Utilize Boletos Registrados e Contrato com Cláusula Executiva:** Para agilizar cobranças extrajudiciais em caso de atraso.`
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // DÚVIDAS RÁPIDAS E DESESPERO COTIDIANO (URGÊNCIAS BANCÁRIAS)
  // ══════════════════════════════════════════════════════════════════════════════

  // Cartão Clonado / Fraude
  if (
    norm.includes("cartao foi clonado") ||
    norm.includes("cartao clonado") ||
    norm.includes("compra fraudulenta") ||
    norm.includes("clonagem de cartao") ||
    norm.includes("fraude no cartao")
  ) {
    return (
      `🚨 **AÇÃO IMEDIATA: Cartão Clonado ou Compra Fraudulenta:**\n\n` +
      `1. **Bloqueie o Cartão no App:** Abra o aplicativo do seu banco imediatamente, vá na área de cartões e acione o **Bloqueio Temporário** ou clique em *"Reportar Perda/Roubo/Fraude"*.\n` +
      `2. **Conteste as Transações (Chargeback):** No extrato da fatura, clique sobre a compra suspeita e selecione *"Não reconheço esta compra"* ou *"Contestar compra"*.\n` +
      `3. **Gere um Cartão Virtual Novo:** Exclua cartões virtuais antigos que possam ter vazado em sites e crie novos com CVV dinâmico.\n` +
      `4. **Registre um Boletim de Ocorrência (B.O.):** Pela Delegacia Eletrônica do seu estado para resguardo jurídico caso a fraude envolva quantias elevadas.\n` +
      `5. **Prazo de Estorno:** Os bancos costumam creditar o valor de volta provisoriamente em até 2 a 5 dias úteis enquanto analisam o caso.`
    );
  }

  // Pix Errado / Estorno de Pix
  if (
    norm.includes("pix errado") ||
    norm.includes("estornar pix") ||
    norm.includes("devolver pix") ||
    norm.includes("mandei pix errado")
  ) {
    return (
      `⚠️ **Fiz um Pix Errado — O que Fazer para Recuperar:**\n\n` +
      `• **1. Se foi erro de digitação (transferência legítima para pessoa física errada):**\n` +
      `  - Entre em contato com a pessoa imediatamente (usando a chave Pix celular/e-mail ou solicitando ao seu banco os dados de contato do favorecido).\n` +
      `  - **Atenção Jurídica:** Reter Pix recebido por engano é crime de **Apropriação Indébita** (Art. 169 do Código Penal). A pessoa é obrigada por lei a devolver.\n\n` +
      `• **2. Se foi Golpe, Fraude ou Invasão (Mecanismo MED do Banco Central):**\n` +
      `  - Acione imediatamente o **MED (Mecanismo Especial de Devolução)** no app do seu banco em até 80 dias após a transação.\n` +
      `  - O banco bloqueia o valor na conta do golpista em até 7 dias para devolução.`
    );
  }

  // Pix não caiu
  if (
    norm.includes("pix nao caiu") ||
    norm.includes("pix demorando") ||
    norm.includes("pix em processamento")
  ) {
    return (
      `⏳ **Meu Pix Não Caiu — O que Pode Ter Acontecido:**\n\n` +
      `1. **Análise Cautelar de Segurança do Banco Central:** Transações atípicas para novos favorecidos ou valores altos podem ficar retidas em análise de segurança por **30 minutos a 1 hora**.\n` +
      `2. **Instabilidade no Sistema SPI do Banco Central:** Verifique o comprovante com o código de ponta a ponta (E2E ID).\n` +
      `3. **Agendamento Involuntário:** Verifique no comprovante se o Pix não foi cadastrado por engano como *Pix Agendado* para o próximo dia útil.\n` +
      `4. **Verifique os Dados do Destinatário:** Confirme se o CPF/CNPJ, chave ou instituição bancária no comprovante estão 100% corretos.`
    );
  }

  // Esqueci a senha do app do banco
  if (
    norm.includes("esqueci a senha do meu app") ||
    norm.includes("esqueci a senha do banco") ||
    norm.includes("recuperar senha do banco")
  ) {
    return (
      `🔑 **Como Recuperar a Senha do App do seu Banco:**\n\n` +
      `1. Na tela de login do app do seu banco, clique em *"Esqueci minha senha"* ou *"Primeiro acesso / Redefinir"*.\n` +
      `2. **Validação Biométrica / Facial:** A maioria dos bancos solicitará uma selfie em ambiente iluminado ou biometria cadastrada no celular.\n` +
      `3. **Código de Verificação:** Você receberá um código via SMS ou e-mail cadastrado.\n` +
      `4. **Caixa Eletrônico (Bancos Tradicionais):** Em alguns bancos físicos (Itaú, Bradesco, BB, Caixa), a redefinição da senha de transação eletrônica pode exigir validação biométrica em um caixa de autoatendimento.`
    );
  }

  // Dinheiro sumiu / Debitado duas vezes
  if (
    norm.includes("dinheiro sumiu") ||
    norm.includes("debitado duas vezes") ||
    norm.includes("cobranca duplicada") ||
    norm.includes("saldo sumiu")
  ) {
    return (
      `🔍 **Dinheiro Debitado Duas Vezes ou Saldo Ausente:**\n\n` +
      `1. **Duplicidade de Débito (Glitch de Maquininha/Pix):** Quando uma compra passa com instabilidade, o sistema bancário pode criar um bloqueio preventivo duplo. Na imensa maioria dos casos, o valor estorna automaticamente em até **24 a 48 horas**.\n` +
      `2. **Verifique Transações Agendadas ou DDA:** Confira na aba de lançamentos futuros se não houve pagamento de débito automático ou boleto DDA cadastrado.\n` +
      `3. **Abra Chamado com o Comprovante:** Se em 48h o saldo não retornar, envie o extrato ao chat do banco com o protocolo de atendimento para contestação manual imediata.`
    );
  }

  // Cancelar compra na internet (Direito de Arrependimento)
  if (
    norm.includes("cancelar uma compra que fiz na internet") ||
    norm.includes("cancelar compra na internet") ||
    norm.includes("direito de arrependimento")
  ) {
    return (
      `📦 **Como Cancelar Compra na Internet (Direito de Arrependimento):**\n\n` +
      `• **Artigo 49 do Código de Defesa do Consumidor (CDC):** Você tem até **7 dias corridos** após o recebimento do produto (ou contratação do serviço) para desistir da compra por qualquer motivo.\n` +
      `• **Estorno Integral:** O vendedor é obrigado a devolver 100% do valor pago, **inclusive o frete**, sem cobrar taxas ou multas de devolução.\n` +
      `• **Passo a Passo:** Solicite a devolução pelo painel da loja virtual ou SAC. A loja fornecerá um código de postagem reversa dos Correios gratuita.`
    );
  }

  // Limite estourou / Pagar fatura em partes
  if (
    norm.includes("limite do cartao estourou") ||
    norm.includes("pagar a fatura em partes") ||
    norm.includes("parcelar fatura do cartao")
  ) {
    return (
      `💳 **Limite Estourou: Devo Pagar a Fatura em Partes?**\n\n` +
      `• **Evite pagar valores avulsos/mínimos:** Pagar menos que o total aciona o crédito rotativo (juros de até 15% ao mês).\n` +
      `• **A Opção Mais Segura (Parcelamento de Fatura Pré-fixado):** Utilize o *Parcelamento de Fatura* oficial oferecido pelo banco, que tem juros muito menores (2% a 4% ao mês) do que os juros punitivos do rotativo.\n` +
      `• **Liberação de Limite Proporcional:** À medida que você paga uma parcela ou faz um pagamento adiantado, o limite proporcional correspondente ao valor pago é liberado instantaneamente.`
    );
  }

  // Saque com celular via QR Code
  if (
    norm.includes("sacar dinheiro no caixa") ||
    norm.includes("sacar com celular") ||
    norm.includes("saque via qr code") ||
    norm.includes("saque digital")
  ) {
    return (
      `🏧 **Como Sacar Dinheiro no Caixa Eletrônico Usando Só o Celular:**\n\n` +
      `1. **Caixas Banco24Horas:** Na tela do caixa eletrônico, selecione *"Saque Digital"* ou *"QR Code"*.\n` +
      `2. No app do seu banco (Nubank, Inter, Itaú, Santander, BB), vá em *Saque Digital*, aponte a câmera para a tela do caixa e leia o código QR gerado.\n` +
      `3. **Pix Saque no Comércio:** Você também pode sacar dinheiro vivo em supermercados, padarias e farmácias conveniadas: basta fazer um Pix para o estabelecimento e receber o valor em cédulas na hora, sem taxa de saque!`
    );
  }

  // Bloquear cartão temporariamente
  if (
    norm.includes("bloquear meu cartao temporariamente") ||
    norm.includes("bloquear cartao no aplicativo") ||
    norm.includes("bloqueio temporario")
  ) {
    return (
      `🔒 **Como Bloquear seu Cartão Temporariamente no App:**\n\n` +
      `• **No App do Banco:** Vá na seção **Cartões** ➔ Selecione o cartão físico ou virtual ➔ Ative a chave de **Bloqueio Temporário** (ícone de cadeado).\n` +
      `• **Quando Usar:** Se não encontrar a carteira, estiver em eventos públicos com aglomeração ou para evitar compras automáticas de renovação.\n` +
      `• **Desbloqueio Imediato:** Você pode reativar o cartão a qualquer segundo no mesmo botão sem precisar emitir uma nova via.`
    );
  }

  // Tarifa bancária indevida / Como recorrer
  if (
    norm.includes("tarifa que eu nao reconheco") ||
    norm.includes("banco cobrou tarifa") ||
    norm.includes("pacote de servicos essencial") ||
    norm.includes("tarifa abusiva")
  ) {
    return (
      `⚖️ **Banco Cobrou Tarifa Indevida? Como Cancelar e Receber em Dobro:**\n\n` +
      `• **Resolução nº 3.919 do Banco Central:** Todo cidadão brasileiro tem direito à **Conta com Serviços Essenciais Gratuita** (com direito a 4 saques, 2 extratos e transferências gratuitas por mês).\n` +
      `• **Como Cancelar:** Entre no chat ou SAC do banco e exija o enquadramento no *Pacote de Serviços Essenciais do BACEN* e o estorno da taxa mensal cobrada.\n` +
      `• **Cobrança Indevida (Art. 42 do CDC):** Tarifas cobradas sem sua autorização expressa geram direito à devolução do valor pago **em dobro com correção monetária**.`
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // CASOS PRÁTICOS, IMPOSTOS E DECLARAÇÕES
  // ══════════════════════════════════════════════════════════════════════════════

  // Declarar Renda Fixa no IR
  if (
    norm.includes("declarar investimentos em renda fixa") ||
    norm.includes("declarar renda fixa no imposto de renda") ||
    norm.includes("declarar cdb no ir") ||
    norm.includes("declarar tesouro direto")
  ) {
    return (
      `📋 **Como Declarar Renda Fixa no Imposto de Renda (IRPF):**\n\n` +
      `1. **Saldos / Posição em 31/12:**\n` +
      `   - Aba **Bens e Direitos** ➔ Grupo **04 (Aplicações e Investimentos)** ➔ Código **02 (Títulos públicos e privados: CDB, RDB, Tesouro)**.\n` +
      `   - Informe o CNPJ da instituição emissora e o saldo constante no seu Informe de Rendimentos oficial.\n\n` +
      `2. **Rendimentos Tributáveis Recebidos no Ano:**\n` +
      `   - Aba **Rendimentos Sujeitos à Tributação Exclusiva/Definitiva** ➔ Código **06 (Rendimentos sobre aplicações financeiras)**.\n\n` +
      `3. **LCI / LCA / Poupança (Isentos):**\n` +
      `   - Aba **Rendimentos Isentos e Não Tributáveis** ➔ Código **12**.`
    );
  }

  // Resgate antes de 30 dias (IOF Regressivo)
  if (
    norm.includes("antes de 30 dias") ||
    norm.includes("iof regressivo") ||
    norm.includes("resgatar cdb antes de 30 dias")
  ) {
    return (
      `⏳ **O que Acontece se Resgatar Aplicações Antes de 30 Dias (IOF Regressivo):**\n\n` +
      `• Se você resgatar um CDB, Tesouro Direto ou fundo antes de completar 30 dias, incidirá o **IOF (Imposto sobre Operações Financeiras)** sobre o rendimento (lucro).\n` +
      `• **Tabela Regressiva do IOF:**\n` +
      `  - **1º dia:** 96% do lucro retido pelo IOF;\n` +
      `  - **15º dia:** 50% do lucro retido pelo IOF;\n` +
      `  - **29º dia:** 3% do lucro retido pelo IOF;\n` +
      `  - **30º dia em diante:** **0% de IOF (Isenção Total!)**\n\n` +
      `💡 *Dica:* Deixe o dinheiro aplicado por pelo menos 30 dias para não perder rendimento para o IOF.`
    );
  }

  // Declarar Ações no Exterior e Criptomoedas
  if (
    norm.includes("declarar acoes no exterior") ||
    norm.includes("declarar criptomoedas") ||
    norm.includes("cripto no imposto de renda") ||
    norm.includes("bitcoin na receita federal")
  ) {
    return (
      `🌍 **Declaração de Criptomoedas e Ativos no Exterior à Receita Federal:**\n\n` +
      `• **Criptomoedas (Bitcoin, Ethereum, USDT):**\n` +
      `  - Obrigatório declarar na aba **Bens e Direitos (Grupo 08 - Criptoativos)** se o custo de aquisição for igual ou superior a **R$ 5.000,00** por tipo de moeda.\n` +
      `  - Vendas mensais acima de R$ 35.000 com lucro exigem pagamento de IR via GCAP.\n\n` +
      `• **Investimentos no Exterior (Offshore, Stocks, REITs):**\n` +
      `  - Com a Lei nº 14.754/2023, todos os rendimentos e ganhos de capital no exterior são tributados à alíquota uniforme de **15% no IRPF anual**, declarados no módulo específico de Ativos no Exterior.`
    );
  }

  // Carnê-Leão
  if (
    norm.includes("carne leao") ||
    norm.includes("o que e o carne leao") ||
    norm.includes("quem e obrigado a pagar carne leao")
  ) {
    return (
      `🦁 **O que é o Carnê-Leão e Quem é Obrigado a Pagar:**\n\n` +
      `O Carnê-Leão é o recolhimento mensal obrigatório do Imposto de Renda sobre rendimentos recebidos de **Pessoas Físicas** ou do **Exterior** sem retenção na fonte.\n\n` +
      `• **Quem é obrigado:**\n` +
      `  - Autônomos e freelancers sem CNPJ;\n` +
      `  - Proprietários que recebem aluguéis pagos por pessoa física;\n` +
      `  - Quem recebe pensão alimentícia judicial;\n` +
      `  - Trabalhadores remotos recebendo em moeda estrangeira.\n\n` +
      `• **Prazo:** O DARF deve ser emitido pelo portal e-CAC e pago até o **último dia útil do mês seguinte** ao do recebimento.`
    );
  }

  // Isenção de Ações abaixo de 20 mil reais
  if (
    norm.includes("isencao de venda de acoes") ||
    norm.includes("20 mil reais no mes") ||
    norm.includes("venda de acoes abaixo de 20 mil")
  ) {
    return (
      `📈 **Como Funciona a Isenção de Venda de Ações até R$ 20.000/mês:**\n\n` +
      `• **A Regra:** Se o valor total das suas vendas de ações ordinárias/preferenciais na Bolsa (operações comuns *Swing Trade*) for **inferior ou igual a R$ 20.000,00 dentro do mês civil**, todo o lucro obtido é **100% ISENTO de Imposto de Renda**.\n` +
      `• **Exceções que NÃO têm isenção dos 20 mil:**\n` +
      `  ❌ Operações de *Day Trade* (compra e venda no mesmo dia) pagam 20% de IR sobre o lucro;\n` +
      `  ❌ Fundos Imobiliários (FIIs) e ETFs pagam 20% e 15% sobre o lucro sem faixa de isenção;\n` +
      `  ❌ BDRs (ações estrangeiras negociadas na B3).`
    );
  }

  // Declarar Fundos Imobiliários (FIIs)
  if (
    norm.includes("declarar fundos imobiliarios") ||
    norm.includes("declarar fiis") ||
    norm.includes("rendimentos mensais isentos fiis")
  ) {
    return (
      `🏢 **Como Declarar Fundos Imobiliários (FIIs) no IRPF:**\n\n` +
      `1. **Posição em Cotas (Bens e Direitos):**\n` +
      `   - Grupo **07 (Fundos)** ➔ Código **03 (Fundos Imobiliários)**. Informe o CNPJ do fundo, quantidade de cotas e o seu **Custo Médio de Aquisição** (nunca o valor de cotação atual).\n\n` +
      `2. **Rendimentos Mensais (Dividendos dos Aluguéis):**\n` +
      `   - Aba **Rendimentos Isentos e Não Tributáveis** ➔ Código **99 (Outros)** ou código específico de FIIs conforme seu informe de rendimentos anual.\n\n` +
      `3. **Venda de Cotas com Lucro:**\n` +
      `   - Apurado no mês da venda com alíquota de **20% de IR sobre o ganho líquido** pago via DARF (código 6015).`
    );
  }

  // Informe de Rendimentos Bancários
  if (
    norm.includes("informe de rendimentos") ||
    norm.includes("quando os bancos devem entregar") ||
    norm.includes("data limite informe")
  ) {
    return (
      `📑 **Informe de Rendimentos — Prazos e Onde Acessar:**\n\n` +
      `• **Data Limite Legal:** Por determinação da Receita Federal, todos os bancos, corretoras, fontes pagadoras (empresas) e planos de saúde são obrigados a disponibilizar o documento até o **último dia útil de fevereiro** de cada ano.\n` +
      `• **Onde Encontrar no App:** Na seção de *Configurações ➔ Documentos / Informes de Rendimentos / IRPF* do aplicativo do seu banco.\n` +
      `• **Informações Cruciais:** O documento consolida saldos em 31/12, rendimentos tributáveis e isentos e impostos retidos na fonte.`
    );
  }

  // Retificar Declaração de IR
  if (
    norm.includes("retificar a declaracao") ||
    norm.includes("esqueci de incluir um investimento") ||
    norm.includes("retificacao de imposto de renda")
  ) {
    return (
      `✏️ **Como Retificar a Declaração de Imposto de Renda:**\n\n` +
      `1. Abra o programa da Receita Federal ou acesse o portal e-CAC (ou app Meu Imposto de Renda).\n` +
      `2. Selecione a opção **Declaração Retificadora** e informe o número do recibo da declaração original entregue.\n` +
      `3. Adicione ou corrija os dados do investimento que foram esquecidos.\n` +
      `4. **Prazo:** Você pode enviar a declaração retificadora em até **5 anos**, desde que a declaração não esteja sob procedimento de fiscalização ativa pela Receita Federal.`
    );
  }

  // Guardar Documentos Financeiros (Prazo 5 anos)
  if (
    norm.includes("documentos preciso guardar") ||
    norm.includes("guardar comprovantes") ||
    norm.includes("comprovar movimentacao financeira")
  ) {
    return (
      `🗂️ **Quais Documentos Financeiros Guardar e por Quanto Tempo:**\n\n` +
      `• **Regra Geral (5 Anos):** O prazo decadencial tributário e prescricional é de **5 anos** (contados a partir do primeiro dia do exercício seguinte ao da entrega do IR).\n` +
      `• **Documentos Essenciais para Guardar:**\n` +
      `  - Comprovantes de despesas médicas, odontológicas e instrução/educação;\n` +
      `  - Notas de corretagem e extratos anuais de custódia de ações/FIIs;\n` +
      `  - Escrituras, contratos de compra e venda e comprovantes de reformas em imóveis (guardar durante todo o período em que possuir o bem + 5 anos após a venda);\n` +
      `  - Informes anuais de rendimentos de bancos e empresas.`
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // BANCOS, CONTAS E FERRAMENTAS DIGITAIS
  // ══════════════════════════════════════════════════════════════════════════════

  // Portabilidade de Salário
  if (
    norm.includes("portabilidade de salario") ||
    norm.includes("levar salario para banco digital") ||
    norm.includes("transferir salario")
  ) {
    return (
      `💼 **Como Funciona a Portabilidade de Salário para Bancos Digitais:**\n\n` +
      `• **Direito Gratuito e Irrevogável:** Você pode transferir seu salário da conta-salário aberta pela empresa para qualquer outro banco ou fintech de sua preferência sem pagar nenhuma taxa.\n` +
      `• **Como Solicitar:** No app do banco de destino (Nubank, Inter, C6, etc.), busque por *"Trazer meu salário / Portabilidade"* e informe o CNPJ da empresa empregadora e o banco folha.\n` +
      `• **Prazo de Ativação:** O banco tem até **10 dias úteis** para concluir o processo. Nos meses seguintes, o salário cai automaticamente na nova conta no mesmo dia do pagamento.`
    );
  }

  // Taxas TED e DOC
  if (
    norm.includes("transferencias via ted ou doc") ||
    norm.includes("taxas cobradas em transferencias") ||
    norm.includes("doc ainda existe")
  ) {
    return (
      `💸 **Taxas de TED e Fim Definitivo do DOC:**\n\n` +
      `• **Extinção do DOC:** Em fevereiro de 2024, a Febraban extinguiu definitivamente as operações de DOC (Documento de Ordem de Crédito) no Brasil devido à supremacia do Pix.\n` +
      `• **TED (Transferência Eletrônica Disponível):** Ainda funciona para transações entre contas no mesmo dia útil, mas bancos tradicionais podem cobrar tarifas de R$ 10 a R$ 22 por TED avulsa.\n` +
      `• **Recomendação:** Utilize sempre o **Pix**, que é instantâneo, funciona 24/7 e é **100% gratuito para pessoas físicas** por regulamentação do Banco Central.`
    );
  }

  // Pix Saque e Pix Troco
  if (
    norm.includes("pix saque") ||
    norm.includes("pix troco") ||
    norm.includes("o que e pix saque e pix troco")
  ) {
    return (
      `🏪 **O que é Pix Saque e Pix Troco e Como Utilizá-los:**\n\n` +
      `• **Pix Saque:** Você faz um Pix no caixa de um comércio cadastrado (padarias, farmácias, mercados) e recebe o valor integral em cédulas físicas na hora.\n` +
      `• **Pix Troco:** Você realiza uma compra no estabelecimento (ex: R$ 30) e faz um Pix de valor maior (ex: R$ 80). A diferença (R$ 50) é entregue a você em dinheiro vivo de troco.\n` +
      `• **Gratuidade:** Todo cidadão tem direito a até **8 transações gratuitas de Pix Saque/Troco por mês**.`
    );
  }

  // Limites Noturnos de Segurança
  if (
    norm.includes("limites noturnos") ||
    norm.includes("pix noturno") ||
    norm.includes("limite noturno de seguranca")
  ) {
    return (
      `🌙 **Limites Noturnos de Segurança do Pix e TED:**\n\n` +
      `• **Regra Padrão do Banco Central:** No período noturno (**entre 20h e 06h**, ou ajustável das 22h às 06h), o limite padrão para transferências via Pix entre pessoas físicas é limitado a **R$ 1.000,00** por segurança contra sequestros-relâmpago.\n` +
      `• **Como Alterar ou Cadastrar Contatos Seguros:**\n` +
      `  - Pelo app do banco, você pode solicitar aumento do limite noturno (com prazo regulatório de 24h a 48h para entrar em vigor);\n` +
      `  - Você pode cadastrar contas de amigos e familiares como *"Contatos de Confiança"* para transferir valores maiores sem travas noturnas.`
    );
  }

  // Contas que rendem 100% CDI automaticamente
  if (
    norm.includes("rendem 100% do cdi automaticamente") ||
    norm.includes("conta remunerada") ||
    norm.includes("vale a pena manter dinheiro em contas que rendem")
  ) {
    return (
      `💰 **Vale a Pena Manter Dinheiro em Contas que Rendem 100% do CDI?**\n\n` +
      `• **Sim, muito superior à Poupança:** Enquanto a poupança rende apenas cerca de 6% a 7% ao ano, contas com 100% do CDI pagam rendimentos muito mais altos e com liquidez diária.\n` +
      `• **Atenção aos Detalhes de Emissão:**\n` +
      `  - Algumas contas remuneradas (Nubank, Mercado Pago, PicPay) só passam a render após 30 dias de permanência do saldo para isenção do IOF;\n` +
      `  - Verifique se o saldo está alocado em **RDB/CDB com proteção do FGC** ou em títulos públicos federais segregados.`
    );
  }

  // Caixinhas e Porquinhos de Bancos Digitais
  if (
    norm.includes("caixinhas e porquinhos") ||
    norm.includes("caixinhas") ||
    norm.includes("porquinhos de separacao")
  ) {
    return (
      `🐷 **Como Funcionam as Caixinhas e Cofrinhos dos Bancos Digitais:**\n\n` +
      `• **Separação Visual de Metas:** Permitem dividir seu saldo em diferentes "potes" com nomes específicos (*Ex: Reserva de Emergência, IPVA, Férias, Reforma*).\n` +
      `• **Rendimento Individual:** O dinheiro em cada caixinha fica investido em RDBs, CDBs ou fundos DI com rendimento de 100% a 105% do CDI.\n` +
      `• **Controle no CashFlow:** No nosso aplicativo, você pode criar essas mesmas metas na aba **Metas Financeiras** e cadastrar as contas correspondentes em **Contas & Cartões** para acompanhar o progresso unificado!`
    );
  }

  // Open Finance
  if (
    norm.includes("open finance") ||
    norm.includes("open banking") ||
    norm.includes("riscos e vantagens do open finance")
  ) {
    return (
      `🔗 **O que é o Open Finance: Vantagens e Cuidados:**\n\n` +
      `O Open Finance é o sistema regulado pelo Banco Central que permite o compartilhamento seguro de seus dados cadastrais e histórico financeiro entre diferentes instituições bancárias.\n\n` +
      `• **Principais Vantagens:** Taxas de juros menores em empréstimos, limites de crédito maiores em novos bancos e ofertas personalizadas com base no seu bom histórico.\n` +
      `• **Segurança:** A autorização é 100% voluntária, tem prazo determinado (até 12 meses) e pode ser cancelada por você a qualquer momento no app do banco.`
    );
  }

  // Fechar Conta em Banco Tradicional
  if (
    norm.includes("fechar uma conta em banco tradicional") ||
    norm.includes("fechar conta sem taxas") ||
    norm.includes("encerrar conta bancaria")
  ) {
    return (
      `🚪 **Como Fechar Conta em Banco Tradicional sem Taxas:**\n\n` +
      `1. **Zere o Saldo:** Transfira todos os centavos da conta e cancele débitos automáticos e limites de cheque especial.\n` +
      `2. **Solicite o Encerramento pelo App ou Internet Banking:** Conforme a Resolução BACEN nº 2.025/4.753, os bancos são **obrigados a permitir o encerramento de contas por meios eletrônicos**.\n` +
      `3. **Exija o Termo de Encerramento:** O banco tem até **30 dias corridos** para processar a baixa e emitir o comprovante definitivo de quitação e encerramento.`
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // MÓDULO GERAL: CONSULTAS DE SALDO, GASTOS E METAS DO USUÁRIO NO COFRE
  // ══════════════════════════════════════════════════════════════════════════════

  // Saldo e Resultados
  if (
    norm.includes("saldo") ||
    norm.includes("quanto tenho") ||
    norm.includes("meu dinheiro") ||
    norm.includes("balanco") ||
    norm.includes("patrimonio") ||
    norm.includes("posicao financeira")
  ) {
    const totalIncome = context.transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    const totalExpense = context.transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    const balance = totalIncome - totalExpense;

    const accBalances = context.accounts
      .map(
        (a) =>
          `• **${a.name}**: R$ ${Number(a.balance || 0).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`
      )
      .join("\n");

    return (
      `💰 **Visão Geral do seu Saldo no Cofre:**\n\n` +
      `• **Saldo Líquido:** R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n` +
      `• **Total de Receitas:** R$ ${totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n` +
      `• **Total de Despesas:** R$ ${totalExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n\n` +
      (context.accounts.length > 0
        ? `🏦 **Saldos por Conta / Banco:**\n${accBalances}\n\n`
        : "") +
      `💡 *Dica:* Acompanhe o gráfico histórico de fluxo de caixa diretamente no seu **Painel Principal**.`
    );
  }

  // Despesas
  if (
    norm.includes("gastei") ||
    norm.includes("despesa") ||
    norm.includes("gastos") ||
    norm.includes("saidas") ||
    norm.includes("extrato")
  ) {
    const expenses = context.transactions.filter((t) => t.type === "expense");
    const totalExpense = expenses.reduce((s, t) => s + Number(t.amount || 0), 0);

    if (expenses.length === 0) {
      return `Você ainda não possui despesas registradas no período. Clique em **Novo Lançamento** ou **Escanear** para adicionar sua primeira despesa.`;
    }

    const byCat = expenses.reduce<Record<string, number>>((acc, t) => {
      const cat = t.category || "Outros";
      acc[cat] = (acc[cat] || 0) + Number(t.amount || 0);
      return acc;
    }, {});

    const sortedCat = Object.entries(byCat)
      .sort((a, b) => b[1] - a[1])
      .map(
        ([cat, val]) =>
          `• **${cat}**: R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (${(
            (val / totalExpense) *
            100
          ).toFixed(0)}%)`
      )
      .join("\n");

    const highestExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0];

    return (
      `📉 **Resumo de Gastos do Período:**\n\n` +
      `• **Total Desembolsado:** R$ ${totalExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n` +
      (highestExpense
        ? `• **Maior Despesa:** ${highestExpense.description} (R$ ${highestExpense.amount.toLocaleString(
          "pt-BR",
          { minimumFractionDigits: 2 }
        )})\n\n`
        : "\n") +
      `🏷️ **Distribuição por Categoria:**\n${sortedCat}\n\n` +
      `💡 *Dica:* Mantenha seus gastos essenciais abaixo de 50% da sua receita para acelerar suas metas!`
    );
  }

  // Metas Financeiras
  if (
    norm.includes("meta") ||
    norm.includes("metas") ||
    norm.includes("sonho") ||
    norm.includes("objetivo")
  ) {
    if (context.goals.length === 0) {
      return (
        `🎯 Você ainda não possui metas ativas cadastradas.\n\n` +
        `Para cadastrar seus objetivos (ex: Reserva de Emergência, Viagem, Investimentos):\n` +
        `1. Acesse a página **Metas Financeiras** no menu lateral;\n` +
        `2. Clique em **Nova Meta**, defina o valor alvo e a data limite;\n` +
        `3. Registre aportes periódicos para acompanhar sua barra de progresso.`
      );
    }

    const goalsSummary = context.goals
      .map((g) => {
        const pct = g.target > 0 ? Math.min((g.current / g.target) * 100, 100).toFixed(0) : "0";
        return `• **${g.name}**: R$ ${g.current.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })} de R$ ${g.target.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })} (**${pct}%** alcançado)`;
      })
      .join("\n");

    return `🎯 **Suas Metas Financeiras em Andamento:**\n\n${goalsSummary}\n\nVocê pode adicionar novos aportes na aba **Metas**.`;
  }

  // Scanner OCR de Comprovantes
  if (
    norm.includes("scanner") ||
    norm.includes("escanear") ||
    norm.includes("comprovante") ||
    norm.includes("camera") ||
    norm.includes("ocr") ||
    norm.includes("foto") ||
    norm.includes("recibo")
  ) {
    return (
      `📷 **Como usar o Scanner de Comprovantes do CashFlow:**\n\n` +
      `1. **Acesso:** No painel principal ou no menu, clique em **Escanear**.\n` +
      `2. **Captura:** Tire uma foto com a câmera ou selecione um comprovante da sua galeria/PDF.\n` +
      `3. **Filtro Automático:** O sistema aplica automaticamente **Preto & Branco com Alto Contraste** e **Nitidez Convolucional** para máxima legibilidade do OCR.\n` +
      `4. **Extração Neural:** O valor (R$), data, favorecido e método de pagamento são preenchidos automaticamente.\n` +
      `5. **Salvar:** Revise os dados e clique em **Salvar no Fluxo**.`
    );
  }

  // Relatórios
  if (
    norm.includes("relatorio") ||
    norm.includes("relatorios") ||
    norm.includes("pdf") ||
    norm.includes("exportar csv")
  ) {
    return (
      `📑 **Exportação de Relatórios no CashFlow:**\n\n` +
      `• **Relatório PDF Executivo:** Acesse **Relatórios** no menu, selecione o período desejado e clique em **Exportar PDF**. Você terá um documento formatado com gráficos e detalhamento de entradas e saídas.\n` +
      `• **Planilha CSV / Excel:** Na mesma tela, clique em **Exportar CSV** para abrir seus lançamentos completos no Microsoft Excel, Google Sheets ou Apple Numbers.\n` +
      `• **Comprovantes:** Você também pode filtrar por categorias específicas antes de exportar.`
    );
  }

  // Categorias
  if (
    norm.includes("categoria") ||
    norm.includes("categorias") ||
    norm.includes("criar categoria") ||
    norm.includes("editar categoria")
  ) {
    return (
      `🏷️ **Gerenciamento de Categorias:**\n\n` +
      `• Acesse a página **Categorias** no menu lateral.\n` +
      `• Clique em **Nova Categoria** para adicionar uma classificação personalizada (ex: *Educação, Pet, Academia, Freelance*).\n` +
      `• Escolha a cor, o ícone e defina se é uma categoria de **Despesa** ou **Receita**.\n` +
      `• Todas as suas categorias sincronizam instantaneamente com os gráficos de pizza e formulários de lançamento.`
    );
  }

  // Lançamentos Recorrentes
  if (
    norm.includes("recorrente") ||
    norm.includes("recorrentes") ||
    norm.includes("fixas") ||
    norm.includes("conta fixa") ||
    norm.includes("salario") ||
    norm.includes("assinatura")
  ) {
    return (
      `🔄 **Lançamentos Fixos e Recorrentes:**\n\n` +
      `• Ao clicar em **Novo Lançamento**, marque a opção **Recorrente**.\n` +
      `• Escolha a periodicidade (*Mensal, Semanal, Anual*).\n` +
      `• Perfeito para salários, aluguel, condomínio, assinaturas de streaming e planos de saúde.\n` +
      `• As parcelas futuras aparecem organizadas no seu **Calendário Financeiro**.`
    );
  }

  // Modo Privacidade
  if (
    norm.includes("privacidade") ||
    norm.includes("ocultar") ||
    norm.includes("esconder") ||
    norm.includes("olho") ||
    norm.includes("furtivo")
  ) {
    return (
      `👁️ **Modo Privacidade / Furtivo:**\n\n` +
      `Para ocultar seus valores quando estiver usando o app em locais públicos ou no trabalho:\n` +
      `• Clique no ícone de **Olho (` +
      "`Eye`" +
      `)** na barra de navegação superior (Navbar).\n` +
      `• Todos os valores monetários serão substituídos por ` +
      "`R$ •••••`" +
      `.\n` +
      `• Clique novamente no olho a qualquer momento para revelar os saldos.`
    );
  }

  // Contas
  if (
    norm.includes("conta") ||
    norm.includes("contas") ||
    norm.includes("banco") ||
    norm.includes("limite")
  ) {
    if (context.accounts.length === 0) {
      return (
        `🏦 Você ainda não cadastrou contas ou bancos.\n\n` +
        `Acesse a aba **Contas & Cartões** no menu para cadastrar suas contas bancárias (ex: Nubank, Itaú, Inter, Carteira Física) e acompanhar saldos independentes.`
      );
    }

    const list = context.accounts
      .map(
        (a) =>
          `• **${a.name}** (${a.institution || "Geral"}): R$ ${Number(a.balance || 0).toLocaleString(
            "pt-BR",
            { minimumFractionDigits: 2 }
          )}${a.limit
            ? ` | Limite: R$ ${a.limit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
            : ""
          }`
      )
      .join("\n");

    return `🏦 **Suas Contas e Bancos Cadastrados:**\n\n${list}\n\nGerencie limites e adicione novas instituições em **Contas & Cartões**.`;
  }

  // Backup e Segurança
  if (
    norm.includes("backup") ||
    norm.includes("exportar") ||
    norm.includes("importar") ||
    norm.includes("seguranca") ||
    norm.includes("lgpd") ||
    norm.includes("vazam")
  ) {
    return (
      `🛡️ **Segurança Máxima & Privacidade 100% Offline:**\n\n` +
      `• **Zero Rastreamento Externo:** O CashFlow funciona com arquitetura *Local-First*. Seus dados financeiros residem exclusivamente no **LocalStorage** do seu navegador.\n` +
      `• **Nenhuma Conta Bancária Vinculada:** Você não precisa fornecer senhas bancárias ou tokens Open Finance.\n` +
      `• **Backup e Migração:** Para salvar uma cópia de segurança ou transferir para outro computador/celular, use o botão **Exportar Backup** no painel ou nas **Configurações**.`
    );
  }

  // Primeiros Passos
  if (
    norm.includes("primeiros passos") ||
    norm.includes("como comecar") ||
    norm.includes("como usar") ||
    norm.includes("por onde comeco") ||
    norm.includes("tutorial")
  ) {
    return (
      `🚀 **Guia de Primeiros Passos no CashFlow:**\n\n` +
      `1. **Cadastre suas Contas:** Acesse **Contas & Cartões** e adicione seus bancos e saldo atual inicial.\n` +
      `2. **Lance suas Contas Fixas:** Cadastre suas receitas (salário) e despesas fixas (aluguel, contas) marcando como *Recorrentes*.\n` +
      `3. **Defina uma Meta:** Vá em **Metas Financeiras** e crie seu primeiro objetivo (ex: *Reserva de Emergência*).\n` +
      `4. **Digitalize Comprovantes:** Use o **Scanner OCR** para lançar cupons e notas fiscais sem digitação manual.\n` +
      `5. **Acompanhe a Regra 50/30/20:** Veja na aba **Estratégia** se seus gastos estão dentro dos limites saudáveis.`
    );
  }

  // Perfil, Foto, Senha
  if (
    norm.includes("perfil") ||
    norm.includes("foto") ||
    norm.includes("avatar") ||
    norm.includes("mudar nome") ||
    norm.includes("trocar senha") ||
    norm.includes("alterar senha")
  ) {
    return (
      `👤 **Configurações de Perfil e Acesso:**\n\n` +
      `• Clique no seu avatar ou nome no topo superior direito e selecione **Meu Perfil**.\n` +
      `• **Foto de Perfil:** Escolha uma nova imagem ou avatar para exibir na barra de navegação e no chat.\n` +
      `• **Nome & E-mail:** Atualize seus dados cadastrais.\n` +
      `• **Senha:** Altere sua senha mestra de acesso ao cofre quando desejar.`
    );
  }

  // Quem é você
  if (
    norm.includes("quem e voce") ||
    norm.includes("quem e vc") ||
    norm.includes("o que voce faz") ||
    norm.includes("sobre voce") ||
    norm.includes("quem te criou")
  ) {
    return (
      `🤖 **Olá! Sou o Assistente Inteligente do CashFlow.**\n\n` +
      `Fui projetado para ser seu copiloto financeiro particular e tutor do aplicativo:\n` +
      `• Realizo consultas analíticas ao seu cofre (saldos, despesas, maiores gastos, metas);\n` +
      `• Ensino conceitos de educação financeira avançada (Cartões & Milhas, Finanças PJ, Holding, CLT vs PJ, Impostos, Renda Fixa e Aposentadoria);\n` +
      `• Oriento sobre todas as ferramentas do sistema (Scanner OCR, Relatórios, Backup, Categorias);\n` +
      `• Opero de forma segura, rápida e privada!`
    );
  }

  // Agradecimentos
  if (
    norm === "obrigado" ||
    norm === "obrigada" ||
    norm === "valeu" ||
    norm === "agradeco" ||
    norm === "muito obrigado" ||
    norm === "show" ||
    norm === "perfeito" ||
    norm === "top"
  ) {
    return (
      `Disponha sempre, **${context.userName || "Usuário"}**! 🤝\n\n` +
      `Estou à disposição sempre que precisar consultar seu saldo, analisar despesas ou tirar dúvidas financeiras. Bons investimentos!`
    );
  }

  // Identificação
  if (
    norm === "qual meu nome" ||
    norm === "como me chamo" ||
    norm === "qual meu nick"

  ) {
    return (
      `Olá, **${context.userName || "Usuário"}**! 🤝\n\n` +
      `Estou à disposição sempre que precisar de alguma consulta ou tiver alguma dúvida.`
    );
  }

  /* Valor de Moedas
  if (
    norm === "quanto esta o dolar" ||
    norm === "quanto esta o euro"
  ) {
    return (
      `O valor do dólar é **${context.userPhone || "Usuário"}**! 🤝\n\n` +
      `Estou à disposição sempre que precisar de alguma consulta ou tiver alguma dúvida.`
    )
  }
  */

  // Despedidas
  if (
    norm === "tchau" ||
    norm === "ate mais" ||
    norm === "ate logo" ||
    norm === "falou" ||
    norm === "boa noite"
  ) {
    return `Até logo, **${context.userName || "Usuário"}**! 👋 Tenha um ótimo dia e mantenha seu fluxo de caixa no verde!`;
  }

  // Saudações
  if (
    norm === "ola" ||
    norm === "oi" ||
    norm === "oizinho" ||
    norm === "opa" ||
    norm === "bom dia" ||
    norm === "boa tarde" ||
    norm === "boa noite" ||
    norm === "como vai" ||
    norm === "como o senhor esta" ||
    norm === "como a senhora esta" ||
    norm === "e ai" ||
    norm === "e ai beleza" ||
    norm === "fala chefe" ||
    norm === "fala meu querido" ||
    norm === "fala minha querida" ||
    norm === "tudo bem" ||
    norm === "tudo joia" ||
    norm === "tudo em ordem" ||
    norm === "tudo bom" ||
    norm === "como andam as coisas" ||
    norm === "quanto tempo" ||
    norm === "salve" ||
    norm === "beleza" ||
    norm === "tranquilo" ||
    norm === "firmeza" ||
    norm === "tranquilidade" ||
    norm === "e a boy" ||
    norm === "oxe" ||
    norm === "mano" ||
    norm === "help" ||
    norm === "ajuda" ||
    norm === "preciso de ajuda" ||
    norm === "pode me ajudar" ||
    norm === "tem alguem ai" ||
    norm === "eae mno" ||
    norm === "eae mano" ||
    norm === "e ai man" ||
    norm === "socorro"
  ) {
    return (
      `Olá, **${context.userName || "Usuário"}**! 👋 Sou a Inteligência Financeira do **CashFlow**.\n\n` +
      `Posso te ajudar com:\n` +
      `• **Consultas Reais:** Pergunte sobre seu saldo, gastos do mês, maior despesa ou progresso de metas.\n` +
      `• **Cartões & Milhas:** Acumulação de milhas, cashback vs pontos, salas VIP e isenção de anuidade.\n` +
      `• **Finanças PJ & Negócios:** Separação PF vs PJ, MEI, pró-labore, custos CLT vs PJ e holding patrimonial.\n` +
      `• **Urgências Cotidianas:** Cartão clonado, Pix errado, tarifas indevidas e cancelamento de compras.\n` +
      `• **Investimentos & Impostos:** Declaração de IR, Renda Fixa, Selic, FIIs e planejamento de aposentadoria.\n\n` +
      `Como posso orientar você hoje?`
    );
  }

  // Fallback Inteligente
  return (
    `Entendido! Como assistente financeiro do **CashFlow**, posso te orientar sobre diversos tópicos:\n\n` +
    `💡 **Perguntas frequentes que você pode fazer:**\n` +
    `• *"Como funciona o programa de acumulação de milhas e pontos no cartão?"*\n` +
    `• *"Como separar as finanças da pessoa física e da pessoa jurídica?"*\n` +
    `• *"Qual o custo real de contratar um funcionário CLT versus PJ?"*\n` +
    `• *"O que é uma holding patrimonial e quando vale a pena abrir uma?"*\n` +
    `• *"Socorro, meu cartão foi clonado, o que eu faço agora?"*\n` +
    `• *"Como declarar investimentos em renda fixa e FIIs no Imposto de Renda?"*\n` +
    `• *"Qual meu saldo atual e maiores despesas?"*`
  );
}

/**
 * Consulta opcional à API do Google Gemini se o usuário configurar a API Key
 */
export async function queryGeminiAI(
  userMessage: string,
  context: ChatContext,
  apiKey: string
): Promise<string> {
  const financialSummary = {
    usuario: context.userName,
    totalTransacoes: context.transactions.length,
    saldoLiquido: context.transactions.reduce(
      (s, t) => s + (t.type === "income" ? t.amount : -t.amount),
      0
    ),
    despesasMes: context.transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0),
    receitasMes: context.transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0),
    contas: context.accounts.map((a) => ({ nome: a.name, saldo: a.balance })),
    metas: context.goals.map((g) => ({ nome: g.name, atual: g.current, alvo: g.target })),
  };

  const systemPrompt = `Você é o assistente de inteligência financeira e suporte do CashFlow (plataforma de gestão financeira patrimonial).
Responda de forma clara, didática, prestativa, elegante e concisa em Português do Brasil.
Dados financeiros atuais do usuário:
${JSON.stringify(financialSummary, null, 2)}
Instruções:
- Se for dúvida sobre o app (scanner, metas, contas, 50/30/20, privacidade, relatórios), explique com passo a passo.
- Se for análise financeira, use os dados fornecidos com respeito à privacidade.
- Se for conceito de finanças, cartões/milhas, finanças PJ, impostos, bancos ou emergências cotidianas, responda com riqueza e clareza.
- Use formatação Markdown (negrito, tópicos).`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt },
                { text: `Pergunta do usuário: ${userMessage}` },
              ],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Erro na API Gemini: ${res.statusText}`);
    }

    const json = await res.json();
    const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || processLocalQuery(userMessage, context);
  } catch (err) {
    console.error("[ChatSupport] Erro ao consultar Gemini:", err);
    return processLocalQuery(userMessage, context);
  }
}
