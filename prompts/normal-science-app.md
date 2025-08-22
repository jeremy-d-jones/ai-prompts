You are an expert full-stack engineer. Build a minimal app that runs locally on my laptop. Requirements:

- Two directories: `/web` and `/api`.
- `/web` is a React + Vite + TypeScript app with Tailwind. It shows:
  - Landing page with a "Login" button (fake login, just sets a session variable in memory).
  - Welcome page after login that displays "Welcome, Test User" and a "Logout" button.
  - Chat page with a textbox, Send button, and transcript area. It calls the backend at POST /api/chat and displays the response.
- `/api` is a Node 20 + Express server with routes:
  - GET /healthz → return `{ status: "ok" }`.
  - POST /api/chat → accept `{ prompt: string }` and return `{ reply: "Placeholder response", prompt }`.
- Enable CORS so the React app can call the API during local dev. Lock origin to `http://localhost:5173`.

**Dependencies for /web:**
  react, react-dom, vite, typescript, @vitejs/plugin-react, tailwindcss, postcss, autoprefixer  
  Dev dependencies: @types/react, @types/react-dom  

**Dependencies for /api:**
  express, cors  
  Dev dependencies: typescript, ts-node, nodemon, @types/express, @types/cors  

**Conventions and Notes:**
1. Use CommonJS for `/api` TypeScript config (no `"type": "module"`). Compile to `dist` with `outDir`.
2. For `/web/tsconfig.json`, set `"jsx": "react-jsx"` and `"moduleResolution": "Bundler"`.
3. Tailwind config: include `content: ["./index.html", "./src/**/*.{ts,tsx}"]`.
4. In `/api/src/index.ts`, mount the chat router:  
   `app.use("/api", require("./routes/chat"));`
5. Keep environment simple: hardcode ports 5173 (web dev) and 4000 (api). No env files.
6. Basic error handling only. No extra middleware.
7. Provide a Vite dev proxy for `/api` → `http://localhost:4000` so the front end works without CORS during dev. Keep CORS in API for clarity.

**Scripts:**
- /web:  
  - "dev": "vite --port 5173"  
  - "build": "vite build"  
  - "preview": "vite preview --port 5173"  
- /api:  
  - "dev": "nodemon src/index.ts"  
  - "build": "tsc"  
  - "start": "node dist/index.js"  

**Deliverables:**
- Directory tree
- /web files:  
  package.json, tsconfig.json, vite.config.ts, tailwind.config.js, postcss.config.js, index.html, src/main.tsx, src/App.tsx, src/pages/{Landing.tsx,Welcome.tsx,Chat.tsx}, src/lib/session.ts
- /api files:  
  package.json, tsconfig.json, src/index.ts, src/routes/chat.ts
- README.md with local instructions:  
  1. cd api && npm install && npm run dev (runs on http://localhost:4000)  
  2. cd web && npm install && npm run dev (runs on http://localhost:5173)  
  3. Open browser to http://localhost:5173, click Login, go to Welcome, then Chat. Send a message and confirm reply.

**Quality gates:**
- All file imports and paths correct.
- CORS restricted to http://localhost:5173.
- Chat page handles error states.
- No external services, env vars, or secrets required.