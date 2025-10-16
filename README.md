## Cric‑ecom

Full‑stack e‑commerce app for cricket products. Backend powered by Node.js/Express/MongoDB; frontend is a React (CRA) single‑page app with Redux.

### Features
- Product listing, details, search, filters, pagination
- Cart, checkout, orders
- Auth: register/login, profile management
- Admin: products, orders, users, reviews
- Payments via Stripe

### Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Multer, Cloudinary, Stripe
- Frontend: React 18, Redux/Thunk, react‑router, MUI v4/v5 mix, SCSS

---

## Getting Started (Local)

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas project (or local MongoDB)
- Cloudinary account (optional for images)
- Stripe test keys (for payments)

### 1) Clone and install
```powershell
git clone <your-repo-url>
cd Cric-ecom

# Backend deps
cd backend
npm install --no-audit --no-fund

# Frontend deps
cd ..\frontend
npm install --legacy-peer-deps --no-audit --no-fund
```

### 2) Environment variables (backend/config/config.env)
Create (or edit) `backend/config/config.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/<dbname>?retryWrites=true&w=majority

CLOUDINARY_NAME=<cloud-name>
API_KEY=<cloudinary-api-key>
API_SECRET=<cloudinary-api-secret>

STRIPE_API_KEY=<stripe-publishable-key>
STRIPE_SECRET_KEY=<stripe-secret-key>
```

If SRV DNS fails in your network, use a non‑SRV URI from Atlas → Connect → Drivers → Standard connection string (includes three hosts and `replicaSet`). Example shape:
```env
MONGO_URI=mongodb://<username>:<password>@host-00:27017,host-01:27017,host-02:27017/<dbname>?ssl=true&replicaSet=<replicaSetName>&authSource=admin&retryWrites=true&w=majority
```

### 3) Development
Run backend and frontend in two terminals:
```powershell
# Terminal A (backend)
cd backend
$env:NODE_ENV="development"; npm run dev

# Terminal B (frontend)
cd frontend
npm start
```

Now open `http://localhost:3000`. The CRA dev server proxies API calls to `http://localhost:5000` (configured in `frontend/package.json` via `proxy`).

---

## Production build
- Build frontend: `cd frontend && npm run build`
- Serve build from Express (optional): ensure `backend/app.js` statically serves the correct directory. Note: fix the path typo if present — change `frotend` → `frontend` in the static serve lines.

---

## Scripts
Backend (`backend/package.json`):
- `npm run start` → `node server.js`
- `npm run dev` → `nodemon server.js`

Frontend (`frontend/package.json`):
- `npm start` → CRA dev server (with OpenSSL legacy flag)
- `npm run build` → production build

---

## Troubleshooting

### Frontend proxy ECONNREFUSED
- Ensure backend is running on port 5000 and shows:
  - `Server is listening on PORT 5000`
  - `MongoDB Connected Successfully`
- Check `frontend/package.json` has `"proxy": "http://localhost:5000"`.

### MongoDB Atlas SRV DNS errors (querySrv ENOTFOUND)
- Try standard (non‑SRV) URI from Atlas Drivers page.
- Or fix DNS (e.g., set IPv4 DNS to 8.8.8.8/1.1.1.1, then `ipconfig /flushdns`).
- Ensure Atlas Network Access allows your IP.

### Windows/OneDrive EPERM during npm install
- OneDrive can lock `node_modules`. Workarounds:
  - Run installs from inside the project folders (`cd backend`, `cd frontend`).
  - Close antivirus/OneDrive sync temporarily, or move the project outside OneDrive.
  - Use `--no-audit --no-fund` and avoid `npm ci` if pruning causes EPERM.

### Password special characters
- URL‑encode special characters in MongoDB password (e.g., `@` → `%40`, `#` → `%23`).

---

## Folder Structure
```
Cric-ecom/
  backend/
    config/config.env
    controllers/ routes/ model/ utils/
    app.js  server.js  db/connectDB.js
  frontend/
    src/ public/ package.json
    build/ (created by npm run build)
```

---

## License
MIT — see LICENSE (add one if missing).


