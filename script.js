/* ==========================================================================
   BLOG ARTICLES DATA
   ========================================================================== */
const articlesData = {
    "rag-matters": {
        title: "What is RAG and Why It Matters",
        category: "AI / RAG",
        readTime: "3 min read",
        content: `
            <div class="modal-article-meta">
                <span>Category: <strong>AI / RAG</strong></span>
                <span>•</span>
                <span>Read Time: <strong>3 min read</strong></span>
            </div>
            <h1>What is RAG and Why It Matters</h1>
            
            <p>Large Language Models (LLMs) are incredibly powerful, but they suffer from two major limitations: a strict knowledge cutoff date and a complete lack of access to private or proprietary business data. This is where <strong>Retrieval-Augmented Generation (RAG)</strong> comes in.</p>
            
            <h2>What is RAG?</h2>
            <p>RAG is an architectural pattern that optimizes the output of an LLM by querying an external authoritative data source before generating the response. Instead of retraining or fine-tuning the model (which is slow and expensive), RAG pulls relevant context and appends it directly to the user's prompt.</p>
            
            <h2>How RAG Works in 5 Steps</h2>
            <ol>
                <li><strong>Ingestion:</strong> Private documents (PDFs, Markdown, Wikis) are loaded, parsed, and split into smaller chunks.</li>
                <li><strong>Embedding:</strong> Each chunk is converted into a numerical vector representing its semantic meaning using an embedding model.</li>
                <li><strong>Storage:</strong> These vectors are stored in a specialized database, called a Vector Database (like pgvector, Chroma, or Pinecone).</li>
                <li><strong>Retrieval:</strong> When a user asks a question, the query is also embedded, and the vector database finds the top-k chunks with the closest similarity (often using cosine similarity).</li>
                <li><strong>Generation:</strong> The retrieved text chunks and the original query are packaged into a prompt and sent to the LLM, which generates an accurate, context-aware answer.</li>
            </ol>
            
            <h2>Why it Matters</h2>
            <p>For businesses, RAG is the gold standard for integrating AI. It drastically reduces LLM "hallucinations," provides auditability (since you can reference the exact source chunks), and ensures real-time updates without the need for constant, expensive fine-tuning. If you are building AI agents today, RAG is a foundational skill you must master.</p>
        `
    },
    "fastapi-workings": {
        title: "How FastAPI Works Under the Hood",
        category: "Backend",
        readTime: "4 min read",
        content: `
            <div class="modal-article-meta">
                <span>Category: <strong>Backend</strong></span>
                <span>•</span>
                <span>Read Time: <strong>4 min read</strong></span>
            </div>
            <h1>How FastAPI Works Under the Hood</h1>
            
            <p>FastAPI has become the go-to web framework for modern Python backend development, especially in microservices and ML deployments. But why is it so fast, and how does it handle validation and asynchronous programming so seamlessly?</p>
            
            <h2>1. Starlette for Routing and Web Operations</h2>
            <p>Under the hood, FastAPI is not built from scratch. It is built directly on top of <strong>Starlette</strong>, a lightweight ASGI (Asynchronous Server Gateway Interface) toolkit. Starlette provides the high-performance routing, WebSocket support, background tasks, and middleware layers. Because Starlette is ASGI-native, it runs concurrently on servers like Uvicorn, making it far faster than traditional WSGI frameworks like Flask.</p>
            
            <h2>2. Pydantic for Serialization and Validation</h2>
            <p>FastAPI uses <strong>Pydantic</strong> for all data validation, serialization, and automatic JSON schema creation. When you define a request body using a Pydantic model, FastAPI handles:
                <ul>
                    <li>Type conversion (e.g., parsing "12" to 12 or converting a string to a datetime object).</li>
                    <li>Validation checks (and raising automatic 422 errors if parsing fails).</li>
                    <li>Generating OpenAPI metadata, which automatically feeds the interactive Swagger UI.</li>
                </ul>
            </p>
            
            <h2>3. Asynchronous Concurrency</h2>
            <p>One of FastAPI's greatest strengths is its support for <code>async def</code> syntax. In standard synchronous setups, each request blocks the thread. In FastAPI, using <code>async</code> allows the server to pause execution of a waiting task (like a slow database query or an external API fetch) and process other incoming requests in the meantime. This non-blocking behavior makes it incredibly efficient for I/O-bound operations.</p>
            
            <pre><code>@app.get("/items/{item_id}")
async def read_item(item_id: int):
    # This non-blocking database query frees the loop to process other API calls
    item = await db.fetch_item(item_id)
    return {"item": item}</code></pre>
            
            <p>By combining Starlette's speed, Pydantic's typing safety, and native async/await loops, FastAPI achieves Node.js and Go-like performance while maintaining Python's clean and expressive developer experience.</p>
        `
    },
    "jwt-explained": {
        title: "JWT Authentication and RBAC Explained",
        category: "Security",
        readTime: "3 min read",
        content: `
            <div class="modal-article-meta">
                <span>Category: <strong>Security</strong></span>
                <span>•</span>
                <span>Read Time: <strong>3 min read</strong></span>
            </div>
            <h1>JWT Authentication and RBAC Explained</h1>
            
            <p>Securing modern REST APIs requires a design that is stateless, scalable, and secure. JSON Web Tokens (JWT) combined with Role-Based Access Control (RBAC) is the industry standard for microservices.</p>
            
            <h2>The Mechanics of JWT</h2>
            <p>A JWT is a compact, URL-safe string split into three base64-encoded parts separated by dots:
                <ol>
                    <li><strong>Header:</strong> Specifies the algorithm used to sign the token (e.g., HS256).</li>
                    <li><strong>Payload:</strong> Contains claims, which are statements about the user (e.g., user ID, expiration time, and roles).</li>
                    <li><strong>Signature:</strong> Generated by signing the encoded header, payload, and a secret key known only to the backend. This prevents tampering.</li>
                </ol>
            </p>
            
            <h2>Why Statelessness Matters</h2>
            <p>Traditional session cookies require the backend server to look up session IDs in a database or Redis cache on every request. JWT, however, is stateless. The backend simply verifies the cryptographic signature of the token. If the signature matches and the token is not expired, the backend trusts the claims in the payload, eliminating database lookups for credentials.</p>
            
            <h2>Implementing RBAC</h2>
            <p>Role-Based Access Control (RBAC) restricts system access to authorized users. In a FastAPI setup, we parse the roles from the decrypted JWT payload and use dependency injection to authorize requests:</p>
            
            <pre><code>def check_role(required_role: str):
    def dependency(user: User = Depends(get_current_user)):
        if required_role not in user.roles:
            raise HTTPException(
                status_code=403, 
                detail="Operation not permitted"
            )
        return user
    return dependency

@app.post("/admin-panel", dependencies=[Depends(check_role("admin"))])
def load_admin():
    return {"message": "Welcome, Administrator!"}</code></pre>
            
            <p>By enforcing JWT authentication and injection-based RBAC dependencies, backend developers can secure endpoints with minimal overhead, maintaining high throughput and robust security policies.</p>
        `
    },
    "redis-caching": {
        title: "Redis Caching for Beginners",
        category: "Caching",
        readTime: "3 min read",
        content: `
            <div class="modal-article-meta">
                <span>Category: <strong>Caching</strong></span>
                <span>•</span>
                <span>Read Time: <strong>3 min read</strong></span>
            </div>
            <h1>Redis Caching for Beginners</h1>
            
            <p>Database queries are expensive. As your application grows, running heavy SQL SELECT queries on every single API request will degrade performance and increase database load. The solution? <strong>Redis caching</strong>.</p>
            
            <h2>What is Redis?</h2>
            <p>Redis is an open-source, in-memory, key-value data structure store. Because it holds all data in RAM rather than on a physical hard disk, read/write speeds are incredibly fast—often executing in microsecond timescales.</p>
            
            <h2>The Cache-Aside Pattern</h2>
            <p>The most common caching strategy is the <strong>Cache-Aside</strong> (or Lazy Loading) pattern:
                <ol>
                    <li>The client calls the API.</li>
                    <li>The backend checks if the requested data exists in Redis.</li>
                    <li><strong>Cache Hit:</strong> If found, the data is returned immediately. Response time: ~3ms.</li>
                    <li><strong>Cache Miss:</strong> If not found, the backend queries PostgreSQL. It then saves the query result in Redis with a <strong>Time-To-Live (TTL)</strong> expiration and returns it. Response time: ~100ms.</li>
                </ol>
            </p>
            
            <h2>Why TTL is Critical</h2>
            <p>A Time-To-Live (TTL) ensures that cached data automatically expires after a set period. Without a TTL, your cache would contain stale, outdated information when changes occur in the primary database. Setting a sensible TTL (e.g., 300 seconds) maintains a balance between speed and data accuracy.</p>
            
            <p>Integrating Redis into your FastAPI microservices is a simple yet powerful way to scale throughput, reduce server costs, and keep users happy with snappy response times.</p>
        `
    },
    "job-match-agent": {
        title: "Building an AI Job Match Agent",
        category: "AI / Guide",
        readTime: "5 min read",
        content: `
            <div class="modal-article-meta">
                <span>Category: <strong>AI / Guide</strong></span>
                <span>•</span>
                <span>Read Time: <strong>5 min read</strong></span>
            </div>
            <h1>Building an AI Job Match Agent</h1>
            
            <p>Manually reviewing hundreds of job applications is a massive bottleneck for recruiters, while candidates struggle to know if they fit a job description. In this article, I walk through the architecture of an <strong>AI Job Match Agent</strong> built to automate semantic matching.</p>
            
            <h2>The Core Architecture</h2>
            <p>The system is built as a FastAPI microservice, backed by PostgreSQL (with pgvector extension) and a local embedding model.</p>
            
            <h2>How It Works</h2>
            
            <h3>1. Parsing and Ingestion</h3>
            <p>When a candidate uploads a resume (PDF), the backend extracts the raw text. Similarly, job descriptions are scraped or input via a REST API.</p>
            
            <h3>2. Generating Embeddings</h3>
            <p>Instead of doing simple keyword matching (which misses context), we pass the text chunks through a <code>SentenceTransformer</code> model (like <code>all-MiniLM-L6-v2</code>). This model converts text into a dense vector (embedding) representing its semantic context.</p>
            
            <h3>3. Vector Search</h3>
            <p>The resume embeddings are saved in PostgreSQL. We then perform a vector query using <strong>cosine distance</strong> to fetch the top matching jobs. This finds jobs that match the applicant's experience, even if they use different terminology (e.g. mapping "FastAPI" to "Python REST Frameworks").</p>
            
            <pre><code># PostgreSQL similarity query using pgvector
SELECT id, title, 1 - (embedding <=> :resume_emb) AS similarity
FROM job_postings
ORDER BY similarity DESC
LIMIT 5;</code></pre>
            
            <h3>4. LLM Analysis & Agentic Refinement</h3>
            <p>The top matches are sent to a local LLM (via Ollama or LlamaCpp) or cloud LLM. The agent reviews the text side-by-side, scores the alignment out of 100, lists missing skills, and writes a short reasoning summary. Finally, an background worker triggers email notifications via SMTP.</p>
            
            <p>This project demonstrates how combining backend microservice design with vector databases and LLM reasoning can solve real-world productivity challenges.</p>
        `
    }
};

/* ==========================================================================
   NAVIGATION & INTERACTIONS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Menu Toggle Logic
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            navToggle.classList.toggle("nav-toggle-active");
        });
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navMenu && navMenu.classList.contains("active")) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove("active");
                navToggle.classList.remove("nav-toggle-active");
            }
        }
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu) {
                navMenu.classList.remove("active");
            }
            if (navToggle) {
                navToggle.classList.remove("nav-toggle-active");
            }
        });
    });

    // 2. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll("section[id]");

    const highlightActiveNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // adjust offset for navbar height
            const sectionId = section.getAttribute("id");
            const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    navLink.classList.add("active");
                }
            }
        });
    };

    window.addEventListener("scroll", highlightActiveNav);

    // 3. Blog Modal Logic
    const blogCards = document.querySelectorAll(".blog-card[data-article]");
    const blogModal = document.getElementById("blog-modal");
    const modalClose = document.getElementById("modal-close");
    const modalBody = document.getElementById("modal-body");

    const openBlogModal = (articleKey) => {
        const article = articlesData[articleKey];
        if (article && blogModal && modalBody) {
            modalBody.innerHTML = article.content;
            blogModal.classList.add("active");
            blogModal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        }
    };

    const closeBlogModal = () => {
        if (blogModal) {
            blogModal.classList.remove("active");
            blogModal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = ""; // Restore scroll
        }
    };

    blogCards.forEach(card => {
        card.addEventListener("click", () => {
            const articleKey = card.getAttribute("data-article");
            openBlogModal(articleKey);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeBlogModal);
    }

    if (blogModal) {
        blogModal.addEventListener("click", (e) => {
            // Close if clicking outside the modal container itself
            if (e.target === blogModal) {
                closeBlogModal();
            }
        });
    }

    // Escape key closes modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && blogModal && blogModal.classList.contains("active")) {
            closeBlogModal();
        }
    });

    console.log("Portfolio Loaded Successfully");
});