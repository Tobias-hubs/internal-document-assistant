UC1 – Index Documents (Operator):  
Main flow: Register PDF → extract → chunk → embed → upsert in vector DB → status OK.
Alternative: Extraction error → status ERROR.

UC2 – Ask a Question (User):  
Main flow: Logged‑in query → embedding → top‑K chunks → prompt → LLM answer with sources → return.
Alternative: No relevant chunks → answer “no match”.

UC3 – Authenticate (User):  
Main flow: OIDC login → session/JWT → protect API.
Alternative: Invalid token → 401.

UC5 – Logging (System):  
Main flow: Search logged with fields and latency.