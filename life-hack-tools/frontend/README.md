# **Frontend — Brahma Muhurta Viewer**

This is the static frontend for the **MomThings** project.  
It loads the Brahma Muhurta table from the backend API and displays it in the browser.

The frontend is fully static (HTML, CSS, JS) and is deployed on **GitHub Pages** for easy access from any device.

---

## **📄 Files**

```
index.html     → Main UI
script.js      → Fetches table HTML from backend API
styles.css     → Basic styling
```

---

## **🚀 Running Locally**

You can open the frontend directly in your browser:

```
frontend/index.html
```

However, the page needs to know **which backend to call** (local or Render).  
This is controlled using a simple URL query parameter.

---

## **🔀 Switching Between Local and Deployed Backend (Option 3)**

The frontend supports selecting the backend environment using the `env` query parameter.

### **Use the local backend**
```
index.html?env=local
```

### **Use the Render backend**
```
index.html?env=render
```

Your `script.js` automatically reads this parameter and switches the API URL accordingly.  
This makes it easy to compare local and deployed versions without modifying any code.

---

## **🌐 Deployment (GitHub Pages)**

To deploy the frontend:

1. Go to **Settings → Pages** in your GitHub repo  
2. Select:
   - **Branch:** `main`
   - **Folder:** `/frontend`
3. Save

Your site will be available at:

```
https://arpikhadayate.github.io/momthings/
```

