/**
 * My Money Friend - LocalStorage Mock API
 * Since the backend was removed, all data is now stored in the browser's localStorage.
 */

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getFromStorage(key: string) {
  try {
    const data = localStorage.getItem(`mymoneyfriend_${key}`);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return [];
  }
}

function saveToStorage(key: string, data: any) {
  try {
    localStorage.setItem(`mymoneyfriend_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

function createMockService(key: string) {
  return {
    getAll: async () => {
      await delay(50);
      return getFromStorage(key);
    },
    create: async (payload: any) => {
      await delay(50);
      const items = getFromStorage(key);
      const newItem = { ...payload, id: payload.id || crypto.randomUUID() };
      items.push(newItem);
      saveToStorage(key, items);
      return newItem;
    },
    update: async (id: string, payload: any) => {
      await delay(50);
      const items = getFromStorage(key);
      const index = items.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        items[index] = { ...items[index], ...payload, id };
        saveToStorage(key, items);
        return items[index];
      }
      throw new Error(`${key} not found`);
    },
    delete: async (id: string, type?: string) => {
      await delay(50);
      const items = getFromStorage(key);
      const filtered = items.filter((item: any) => item.id !== id);
      saveToStorage(key, filtered);
      return { success: true };
    },
  };
}

export const usersService = createMockService("users");
export const accountsService = createMockService("accounts");
export const goalsService = createMockService("goals");
export const categoriesService = createMockService("categories");
export const investmentsService = createMockService("investments");
export const budgetRulesService = createMockService("budgetRules");

/**
 * Custom Transactions Service that automatically adjusts the balance of the associated Account/Card.
 */
export const transactionsService = {
  getAll: async () => {
    await delay(50);
    return getFromStorage("transactions");
  },
  create: async (payload: any) => {
    await delay(50);
    const transactions = getFromStorage("transactions");
    const accounts = getFromStorage("accounts");

    const amount = Math.abs(parseFloat(payload.amount || "0"));
    const type = payload.type; // "income" | "expense"
    const newItem = {
      ...payload,
      amount,
      id: payload.id || crypto.randomUUID(),
    };

    // Find linked account (by accountId or matching paymentMethod name/id)
    const targetAccountId = payload.accountId || payload.paymentMethod;
    const accountIndex = accounts.findIndex(
      (a: any) =>
        a.id === targetAccountId ||
        a.name === payload.paymentMethod ||
        a.id === payload.accountId
    );

    if (accountIndex !== -1) {
      const account = accounts[accountIndex];
      newItem.accountId = account.id;

      const currentBalance = parseFloat(account.balance || "0");
      if (type === "income") {
        account.balance = currentBalance + amount;
      } else {
        // expense: reduces account balance (for credit cards, balance becomes more negative / debt increases)
        account.balance = currentBalance - amount;
      }

      accounts[accountIndex] = account;
      saveToStorage("accounts", accounts);
    }

    transactions.push(newItem);
    saveToStorage("transactions", transactions);
    return newItem;
  },
  update: async (id: string, payload: any) => {
    await delay(50);
    const transactions = getFromStorage("transactions");
    const index = transactions.findIndex((t: any) => t.id === id);
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...payload, id };
      saveToStorage("transactions", transactions);
      return transactions[index];
    }
    throw new Error("Transaction not found");
  },
  delete: async (id: string, type?: string) => {
    await delay(50);
    const transactions = getFromStorage("transactions");
    const accounts = getFromStorage("accounts");

    const targetTx = transactions.find((t: any) => t.id === id);
    if (targetTx) {
      // Revert the account balance change
      const amount = Math.abs(parseFloat(targetTx.amount || "0"));
      const txType = targetTx.type;

      const targetAccountId = targetTx.accountId || targetTx.paymentMethod;
      const accountIndex = accounts.findIndex(
        (a: any) =>
          a.id === targetAccountId ||
          a.name === targetTx.paymentMethod ||
          a.id === targetTx.accountId
      );

      if (accountIndex !== -1) {
        const account = accounts[accountIndex];
        const currentBalance = parseFloat(account.balance || "0");
        if (txType === "income") {
          // Revert income by subtracting
          account.balance = currentBalance - amount;
        } else {
          // Revert expense by adding back
          account.balance = currentBalance + amount;
        }

        accounts[accountIndex] = account;
        saveToStorage("accounts", accounts);
      }
    }

    const filtered = transactions.filter((t: any) => t.id !== id);
    saveToStorage("transactions", filtered);
    return { success: true };
  },
};
