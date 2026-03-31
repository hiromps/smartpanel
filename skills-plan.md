# skills-plan.md

## Selected primary skill
- openclaw-saas-builder

## Supporting skill
- gemini-cli

## Why this pair

- openclaw-saas-builder: project orchestration, requirements package, architecture, phased build
- gemini-cli: fast planning, code drafting, refactors, review, structured generation

## Build approach

1. OpenClaw defines and maintains the spec package.
2. Gemini CLI is used as a copilot for implementation planning and code generation.
3. OpenClaw reviews/edits files and validates outputs.
4. For larger implementation loops, spawn a coding session if needed.

## Practical execution model

- Use Gemini for bounded outputs, not blind execution.
- Keep milestones small and testable.
- Prefer local validation after each meaningful change.
- If code generation gets messy, switch to a persistent ACP/coding session.

## Project-specific guidance for Gemini

Gemini should:
- scaffold feature modules
- draft Prisma schema
- draft page/layout structure
- generate typed mock data
- suggest admin/customer dashboard UX
- review architecture adherence

Gemini should not:
- decide business policy without the requirements docs
- copy competitor wording
- invent secrets or deployment credentials
- skip validation or testing steps
