class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    if (this.account.balance - this.amount >= 0) {
      this.approval = true;
    } else {
      this.approval = false;
    }
    return this.approval;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    this.approval = true;
    return this.approval;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('snow-patrol');

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1, '\n----');

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2, '\n----');

const t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3, '\n----');

const t4 = new Withdrawal(59.76, myAccount);
t4.commit();
console.log('Transaction 4:', t4, '\n----');

const t5 = new Deposit(679.56, myAccount);
t5.commit();
console.log('Transaction 5:', t5, '\n----');

const t6 = new Withdrawal(1000, myAccount);
t6.commit();
console.log('Transaction 6:', t6, '\n----');

console.log('Balance:', myAccount.balance, '\n----');

console.log(myAccount.transactions);
