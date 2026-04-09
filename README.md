# Spin Factor Bot - Professional Monorepo

Benvenuto nella struttura professionale di **Spin Factor Bot**. Il progetto è diviso in due macro-aree per garantire scalabilità e manutenibilità.

## 📁 Struttura Cartelle

- **/client**: Contiene il frontend React + Vite + Framer Motion. È il cuore dell'esperienza utente.
- **/server**: Contiene il backend (Node/Express) per l'integrazione AI e i servizi API.

## 🚀 Come iniziare

Dalla radice del progetto, puoi avviare entrambi i servizi (Client e Server) in contemporanea con un unico comando:

```bash
npm install
npm run dev
```

Questo comando userà **Concurrently** per gestire i processi, colorando i log per distinguere facilmente tra frontend (Ciano) e backend (Magenta).

### Comandi Singoli
- **Frontend**: `npm run client`
- **Backend**: `npm run server`
- **Installazione Totale**: `npm run install-all`

## 📜 Deployment (Vercel)
Per il deploy su Vercel, assicurati di configurare la **Root Directory** su `client/` se desideri deployare solo il frontend, oppure usa un approccio monorepo.

---
*Progetto stabilizzato e rifinito da Antigravity.*
