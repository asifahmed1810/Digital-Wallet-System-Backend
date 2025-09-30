# 💳 Digital Wallet System Backend

A secure, modular, and role-based backend API for a **digital wallet system**  built with **Express.js & Mongoose**.  
This system allows **users, agents, and admins** to manage wallets, perform transactions, and control access with **role-based authentication**.

---

## 🌐 Live API
Base URL: [https://digital-wallet-system-backend-mu.vercel.app](https://digital-wallet-system-backend-mu.vercel.app)

---

## 📌 Project Overview
The Digital Wallet API provides:
- User and Agent registration with automatic wallet creation
- Role-based authorization (User, Agent, Admin)
- Secure transactions with atomic operations
- Trackable transaction history
- Wallet management features (block/unblock, cash-in/out, send money, withdraw)

---

## ✨ Features
✅ JWT-based authentication (User, Agent, Admin)  
✅ Secure password hashing with bcrypt  
✅ Automatic wallet creation at registration with **৳50 initial balance**  
✅ User operations:  
   - Add money (top-up)  
   - Withdraw money  
   - Send money to another user  
   - View transaction history  
✅ Agent operations:  
   - Add money to any user’s wallet (cash-in)  
   - Withdraw money from any user’s wallet (cash-out)  
✅ Admin operations:  
   - View all users, agents, wallets, transactions  
   - Block/unblock wallets  
   - Approve/suspend agents  
✅ Full transaction logging with audit trail  
✅ Role-based route protection  

---

## 🛠 Tech Stack
- **Backend Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT, bcrypt  
- **Hosting:** Vercel  
- **Validation:** Zod  

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint              | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | `/api/auth/register` | Register a new User or Agent         |
| POST   | `/api/auth/login`    | Login and receive JWT token          |

---

### 👤 User
| Method | Endpoint                  | Description                           |
|--------|---------------------------|---------------------------------------|
| GET    | `/api/users/me`           | Get profile of logged-in user         |
| GET    | `/api/users`              | (Admin) Get all users & agents        |

---

### 💳 Wallet
| Method | Endpoint                        | Description                                    |
|--------|---------------------------------|------------------------------------------------|
| GET    | `/api/wallets/me`               | Get logged-in user’s wallet                    |
| POST   | `/api/wallets/deposit`          | Add money (User only)                          |
| POST   | `/api/wallets/withdraw`         | Withdraw money (User only)                     |
| POST   | `/api/wallets/transfer`         | Send money to another user                     |
| PATCH  | `/api/wallets/block/:id`        | (Admin) Block a wallet                         |
| PATCH  | `/api/wallets/unblock/:id`      | (Admin) Unblock a wallet                       |

---

### 🔁 Transactions
| Method | Endpoint                  | Description                               |
|--------|---------------------------|-------------------------------------------|
| GET    | `/api/transactions/me`    | Get logged-in user’s transaction history  |
| GET    | `/api/transactions`       | (Admin) View all transactions             |

---


# Run development server
npm run dev
