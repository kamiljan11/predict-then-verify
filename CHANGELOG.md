# Changelog

## [Unreleased]

### Security
- Eksport postepu nie zawiera juz danych uwierzytelniajacych (pola ustawien o nazwach pasujacych do key/token/secret sa pomijane).
- Import postepu nie nadpisuje lokalnie zapisanych ustawien uwierzytelniajacych; pliki eksportu sa dodatkowo ignorowane przez git (`*-progress-*.json`).
