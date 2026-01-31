**Brahma Muhurta Tool**

A full‑stack personal tool that fetches and displays daily **Brahma Muhurta** timings using:

- A Node.js + Express backend (deployed on Render)
- Cheerio + Axios for scraping
- A static frontend (deployed on GitHub Pages)

This project is designed for personal convenience and cross‑device access.

---

## **🌐 Live Demo**

**Frontend (GitHub Pages)**  
`https://arpikhadayate.github.io/momthings/` [(arpikhadayate.github.io in Bing)](https://www.bing.com/search?q="https%3A%2F%2Farpikhadayate.github.io%2Fmomthings%2F")

**Backend API (Render)**  
`https://your-render-app.onrender.com/api/brahma`  
*TODO: (Replace with your actual Render URL once deployed.)*

---

## ** How It Works**

### **Backend**
- Generates the next 30 dates
- Scrapes Brahma Muhurta timings for each date
- Builds an HTML table
- Serves it at `/api/brahma`

### **Frontend**
- Loads the table from the backend API
- Injects it into the page dynamically
- Hosted on GitHub Pages for easy access from any device

---

## ** Running Locally**

### **Backend**
```bash commands
cd backend
npm install
npm start
```

This starts the API at:

```
http://localhost:3000/api/brahma
```

### **Frontend**
Open `frontend/index.html` directly in your browser.

---

## ** Deployment**

### **Backend (Render)**
- Create a new Web Service
- Connect your GitHub repo
- Set root directory to `/backend`
- Build command: `npm install`
- Start command: `npm start`

### **Frontend (GitHub Pages)**
- Go to **Settings → Pages**
- Select branch: `main`
- Select folder: `/frontend`
- Save

Your site will be available at:

```
https://arpikhadayate.github.io/momthings/
```

---

## ** License**

This project is licensed under the MIT License.  
See the `LICENSE` file for details.

---

