# Currency Converter Fullstack App (Monorepo)

Fullstack app for currency exchanges

---

## Project Structure
- **Frontend:** React + Vite + TypeScript + css
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB

## Project requirements
- **NodeJS:** >= 18
- **npm:** >= v11
- **MongoDB**

---

## MongoDB
Start mongo on MAC with
```
brew services start mongodb-community@VERSION (7.0)
```

## ENV
Missing env setup for react due to lack of time

SERVER_PORT=3800
CLIENT_PORT=3600
MONGO_URI=mongodb://localhost:27017
FIXER_API_KEY=your fixer api key

## How to start
1. Run setup
```
npm run setup
```

2. Run worker for initial exchange rates sync and register periodic job once a day
```
npm run worker
```

3. Run full monorepo
```
npm run start
```

## API Endpoints
1. Statistics are available with paging and with all useful data
```
GET /api/statistics
```

2. Currency endpoints are avaialble for exchange rates and getting available currencies
```
GET /api/currency
```

```
POST /api/currency/convert
```

## Additional info
- Fixer api and others from list are limited to one base currency, subscription is needed for all currency rates
- AI used mostly on picking react framework, styles and structure planning. Copilot suggestion in VSCode
- Authentication not needed for small scope project with public endoints

### Time elapsed 7H - 8H