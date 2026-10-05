# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The repo has no version tags; entries are grouped by commit date.

## [Unreleased]

### Added
- Handover documentation: README sections (data and storage, testing), `docs/RUNBOOK.md`, this changelog.

### Security
- Progress export no longer includes credentials (settings fields whose names match key/token/secret are skipped).
- Progress import does not overwrite locally stored credentials; export files are ignored by git (`*-progress-*.json`).

## 2026-09-07

### Added
- Full PL/EN interface and content toggle, with an English starter set of 8 encounters whose outputs were verified by executing the snippets (3a9d30e).
- Standalone edition: offline, `localStorage` persistence, fresh start with no preloaded personal data, local helper server `_serve.js` (ea2ebf0).
- MIT license, README with motivation and usage (ea2ebf0).

### Changed
- Removed leftover personal data and reset the skill baseline (56cf82e).
