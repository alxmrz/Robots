---
name: conventional-commit
description: Create a Conventional Commits commit. Use when the user says commit, /commit, "make a commit", or asks to commit changes.
---

# Conventional Commit

Inspect `git status`, `git diff`, and `git log --oneline -10`, then commit the intended changes.

- Stage only the intended files; never include secrets, `.env`, `vendor/`, `node_modules/`, build output, or other technical/generated files.
- Use a Conventional Commits type: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Subject: concise, imperative, no trailing period.
- Add a short body only when it clarifies the change.
- Make one commit unless other option is required
- Do not push.
