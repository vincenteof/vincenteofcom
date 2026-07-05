---
title: "Type safety from database to browser"
date: "2026-03-15"
tags:
  - tech
  - typescript
---

Modern full-stack work is less about picking a framework and more about keeping contracts honest across boundaries.

When I design a feature, I start at the data edge: schema migrations, validation at the API boundary, and typed loaders that feed the UI. TanStack Router's loader pattern fits this well — the server resolves data once, and the client receives a typed result without ad-hoc `fetch` wrappers.

A few practices that have saved me from late-night regressions:

- **Share types, not DTO soup.** One source of truth for post metadata, user settings, or trade journal entries.
- **Validate at the boundary.** Parse unknown input before it touches business logic.
- **Prefer small pure modules.** Sorting posts, formatting dates, and markdown rendering should be testable without booting a server.

The goal is not perfection on day one. It is a codebase where changing one layer does not silently break another.