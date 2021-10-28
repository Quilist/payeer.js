# payeer.js
Unofficial client for working with the "bulk payments" section for Payeer.
# Install
```
npm i payeer.js
```
# Basic Usage
```js
const Payeer = require('payeer.js')

const client = new Payeer.default(
    'P100000',
    'api_id',
    'api_password'
);

client.getPaySystems().then(data => console.log(data))

client.on('data', async (data) => {
  console.log(data.id)
})
```
# Methods

- __payeer.AuthorizationСheck();__
  - Authorization check.  

- __payeer.getBalance();__
  - Getting the balance of the wallet.

- __payeer.getPaySystems();__
  - List of payment systems for withdrawal.

- __payeer.history();__
  - Getting the history of account transactions.

- __payeer.checkUser(user);__
  - Checking the existence of a Payeer account number.
  - Options:
    - user (Payeer account number) 

- __payeer.getExchangeRate(output);__
  - Automatic conversion rates.
  - Options:
    - output ("Y" - input courses. "N" - withdrawal rates.)  

- __payeer.paymentDetails(merchantId, referenceId);__
  - Payment information.
  - Options:
    - merchantId (merchant id)
    - referenceId (id of the transaction in the seller's accounting system) 

- __payeer.transfer(curIn, sum, curOut, to);__
  - Transfer of funds within the Payeer payment system.
  - Options:
    - curIn (currency to be debited: USD, EUR, RUB)
    - sum (the amount to be debited)
    - curOut (write-off currency: USD, EUR, RUB)
    - to (Payeer account number or recipient email)

- __payeer.payoutDetails(referenceId);__
  - Payout information.
  - Options:
    - referenceId (identification number in your accounting system) 

- __payeer.payout(payout_id, sumIn, curIn, curOut, param_ACCOUNT_NUMBER);__
  - Payout to any payment system supported by Payeer.
  - Options:
    - payout_id (id of the selected payment system)
    - curIn (currency to be debited: USD, EUR, RUB)
    - sumIn (amount to be debited)
    - curOut (write-off currency: USD, EUR, RUB)
    - param_ACCOUNT_NUMBER (beneficiary's account number in the selected payment system)   

- __payeer.payoutChecking(payout_id, sumIn, curIn, curOut, param_ACCOUNT_NUMBER);__
  - Checking the possibility of payment.
  - Options:
    - payout_id (id of the selected payment system)
    - sumIn (amount to be debited)
    - curIn (currency to be debited: USD, EUR, RUB)
    - curOut (write-off currency: USD, EUR, RUB)
    - param_ACCOUNT_NUMBER (beneficiary's account number in the selected payment system)   

- __payeer.invoiceCreate(m_shop, m_orderid, m_amount, m_curr, m_desc);__
  - Create an invoice for payment. 
  - Options:
    - m_shop (merchant id)
    - m_orderid (account id to the seller's accounting system)
    - m_amount (invoice amount)
    - m_curr (account currency)
    - m_desc (description)

- __payeer.on(EventName, function);__
  - Event handler. At the moment, only a transaction processor exists in this library. 
  - Options:
    - EventName ("data")
    - function (any function name)  

# Examples
```js
payeer.AuthorizationСheck().then(res => console.log(res);
```

```js
payeer.getBalance().then(res => console.log(res);
```

```js
payeer.getPaySystems().then(res => console.log(res);
```

```js
payeer.history().then(res => console.log(res);
```

```js
payeer.checkUser("P12345678").then(res => console.log(res);
```

```js
payeer.getExchangeRate("Y").then(res => console.log(res);
```

```js
payeer.getExchangeRate("N").then(res => console.log(res);
```

```js
payeer.paymentDetails("11111", "123d3a31-d951-4763-a63d-5b7182ab51b4").then(res => console.log(res));
```

```js
payeer.transfer("USD", 2, "RUB", "P12345678").then(res => console.log(res);
```

```js
payeer.payoutDetails("b24d3a31-d951-3763-a63d-5b7182qb51b4").then(res => console.log(res);
```

```js
payeer.payout("1136053", 1, "USD", "EUR", "P12345678").then(res => console.log(res));
```

```js
payeer.payoutChecking("1136053", 2, "USD", "EUR", "P12345678").then(res => console.log(res));
```

```js
payeer.invoiceCreate("11111", "ananas", 1, "USD", "Hi bro").then(res => console.log(res));
```

```js
payeer.on('data', async (data) => { console.log(data.id) })
```



