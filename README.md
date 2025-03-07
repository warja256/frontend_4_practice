Установка и запуск
Шаг 1: Клонирование репозитория
Для начала клонируйте репозиторий:

```bash
git clone https://github.com/warja256/frontend_4_practice.git
```
Шаг 2: Установка зависимостей
Перейдите в папку проекта и установите все необходимые зависимости:

```bash
cd frontend_4_practice
npm install
```

Шаг 3: Установка и запуск серверов
Убедитесь, что у вас установлен Node.js.
Перейдите в папку backend:
```bash
cd backend
```
В разных терминалах запустите соответствующие серверы:
```bash
node shop-server.js
```
```bash
node admin-server.js
```
```bash
node shop-server-graphsql.js
```
```bash
node chat.js
```
Шаг 4: Открытие проекта в браузере
После того как все серверы запущены, откройте сайты в браузере по следующим адресам:

Клиентская часть: http://localhost:8080
Админка: http://localhost:3000
GraphQL: http://localhost:4000
