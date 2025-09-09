<h1>Eventinder — Full-Stack React App</h1>
<p>A simple events browser with categories, creators, and a lightweight Node/Express API. Built as a mid-term project during Winc Academy Full Stack Course, later developed further as a personal challenge.</p>

<p>
  <strong>Stack:</strong> React • Vite/CRA • Node • Express • REST API • Netlify (frontend) • Render (backend)
</p>

<hr />

<h2>Heads-up</h2>
<ul>
  <li><strong>Cold starts on Render:</strong> The free tier server may sleep. The first request can be slow while it wakes up, even though it’s pinged regularly via UptimeRobot.</li>
  <li><strong>Mock data:</strong> Some mock data (events, categories, user/creator fixtures) was modified or created with the help of ChatGPT.</li>
</ul>

<h2>Overview</h2>
<p>
  Eventinder lets users browse events by category, view details, and see creator info. The backend is intentionally minimal to highlight front-end skills and API integration.
</p>

<h2>Architecture</h2>
<ul>
  <li><strong>Frontend:</strong> React app that fetches categories and events, client-side routing for list/detail views, light state with hooks.</li>
  <li><strong>Backend:</strong> Node + Express REST API with public endpoints and a simple JSON/in-memory data store.</li>
</ul>

<h2>Live Deployments</h2>
<ul>
  <li><strong>Frontend:</strong> Netlify — <code>https://eventinder.netlify.app</code></li>
  <li><strong>Backend:</strong> Render — <code>https://eventinder-backend.onrender.com/</code></li>
</ul>

<h2>Features</h2>
<ul>
  <li>Browse events with category filters</li>
  <li>View event details and creator information</li>
  <li>Clean separation between API and UI</li>
  <li>Mock data for rapid iteration</li>
</ul>

<h2>Getting Started (Local)</h2>
<h3>Prerequisites</h3>
<ul>
  <li>Node.js (LTS) &amp; npm</li>
  <li>Git</li>
</ul>

<h3>Clone</h3>
<pre><code>git clone &lt;this-repo-url&gt;
cd Eventinder
</code></pre>

<h3>Install &amp; Run</h3>
<p>Install dependencies in both <code>backend</code> and <code>frontend</code> (adjust paths to your repo):</p>
<pre>
<code>
# Terminal 1
cd backend
npm install
npm run dev   # or: npm start
# Terminal 2
cd ../frontend
npm install
npm run dev   # typically http://localhost:5173
</code></pre>

<h3>Environment</h3>
<p>Create a <code>.env</code> for the frontend:</p>
<pre><code>VITE_API_BASE=http://localhost:3000
</code></pre>

<h2>API Quickstart</h2>
<p>With the backend running, the following endpoints should respond:</p>
<ul>
  <li><code>GET /categories</code> — list categories</li>
  <li><code>GET /events</code> — list events</li>
  <li><code>GET /events/:id</code> — single event</li>
</ul>

<h2>Monitoring</h2>
<p>
  UptimeRobot is configured to ping the Render backend at a 5-minute interval to reduce cold starts. Some wake-up delays can still occur on free tiers.
</p>

<h2>Roadmap</h2>
<ul>
  <li>Authentication &amp; protected routes</li>
  <li>Create/Edit events (creator dashboard)</li>
  <li>Pagination &amp; server-side filtering</li>
  <li>Image uploads &amp; richer media</li>
  <li>Improved error &amp; loading states</li>
</ul>

<h2>Development Notes</h2>
<ul>
  <li>Mock data partially authored/modified with ChatGPT.</li>
  <li>Creator IDs map to human-readable names and images in the dataset.</li>
  <li>Minimal dependencies to keep the project approachable for reviewers.</li>
</ul>

<h2>License</h2>
<p>MIT — feel free to use this as a starter/reference.</p>
