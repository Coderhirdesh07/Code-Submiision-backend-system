# 🚀 Code Submission Backend System

This project is a modular backend system designed to handle **code execution submissions** with asynchronous processing and real-time notifications. It includes:

- **Primary API Server** – Accepts and validates code submissions via REST.
- **Queue Worker** – Processes code execution in a sandboxed environment.
- **Pub/Sub System** – Used to publish results and decouple services.
- **WebSocket Server** – Sends real-time updates to clients when code is executed.

---

## 📦 System Architecture

    [Client App]
         |
     [HTTP API]
         |
    [Primary Server]
         |
       [Queue] <-------+
         |             |
    [Queue Worker]     |
         |             |
     [Execution Result Pub/Sub]
         |
    [WebSocket Server]
         |
    [Client receives result]


---

## 🧱 Components

### 🖥️ Primary API Server

- Receives code submissions (`POST /submit`)
- Validates payload
- Pushes job into a message queue (e.g., Redis, RabbitMQ)
- Responds with a `submissionId` to track execution

### ⚙️ Queue Worker

- Listens to the job queue
- Executes the submitted code in a secure, sandboxed environment (e.g., Docker)
- Publishes the result using a Pub/Sub channel

### 📢 Pub/Sub System

- Used to broadcast code execution results
- Decouples the worker and WebSocket server for scalability
- Powered by Redis Pub/Sub or similar

### 🔔 WebSocket Server

- Clients connect using WebSockets and listen for updates using their `submissionId`
- When the result is received from the Pub/Sub channel, it’s emitted to the correct client
- Enables real-time code execution feedback

---

## 🛠️ Installation & Setup

### 🔧 Prerequisites

- Node.js vXX+
- Redis (for queue and pub/sub)
- Docker (optional, for code sandboxing)

### 📥 Clone Repository

```bash
git clone https://github.com/your-org/code-submission-backend.git
cd code-submission-backend
