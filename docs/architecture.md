# Architecture – Proof of Concept Scope

## Purpose
This document defines the scope and architectural constraints of the AI-based document search Proof of Concept (PoC).

## Scope
- Limited to **5–10 PDF documents** for ingestion and search.
- Focus on **semantic search (RAG pipeline)** with source references.
- **Simple frontend**: login, search, result view.
- **Authentication** via OIDC (company account).
- **Logging** of queries, sources, and latency.

## Out of Scope
- Multi-tenant support.
- Advanced role-based access control.
- Large-scale database optimization.
- Production-grade deployment (PoC only).

## Architecture Overview
- **Frontend (Next.js)** → Login, Search, Result.
- **Backend (Node/Express)** → API routes for ingestion & search.
- **Vector DB (e.g., Pinecone/Weaviate/Postgres pgvector)** → store embeddings.
- **AI Integration (LangChain/OpenAI)** → RAG pipeline.
- **Docs folder** → requirements, use cases, UML, wireframes.

## Diagram Reference
See UML diagrams in `/docs/uml` for component, class, and sequence flows.
