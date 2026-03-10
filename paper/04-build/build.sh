#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WHITEPAPER_DIR="$ROOT_DIR/01-whitepaper"
OUT_DIR="$ROOT_DIR/04-build/out"
OUT_PDF_FILE="$OUT_DIR/nusantara-trace-whitepaper.pdf"
OUT_DOCX_FILE="$OUT_DIR/nusantara-trace-whitepaper.docx"
TMP_MD="$OUT_DIR/.whitepaper_combined.md"
TITLE="Nusantara Trace: Institution-Aware Traceability Profile over EventDB Core"
MERMAID_FILTER="$ROOT_DIR/04-build/mermaid.lua"

if [[ ! -d "$WHITEPAPER_DIR" ]]; then
  echo "Error: whitepaper directory not found: $WHITEPAPER_DIR" >&2
  exit 1
fi

if ! command -v pandoc >/dev/null 2>&1; then
  echo "Error: pandoc is required but not installed." >&2
  exit 1
fi

PDF_ENGINE="/Library/TeX/texbin/xelatex"

mkdir -p "$OUT_DIR"

# Ordered whitepaper sources
SOURCES=(
  "$WHITEPAPER_DIR/01-abstract.md"
  "$WHITEPAPER_DIR/02-introduction.md"
  "$WHITEPAPER_DIR/03-problem-statement.md"
  "$WHITEPAPER_DIR/04-related-work.md"
  "$WHITEPAPER_DIR/05-scope-and-non-goals.md"
  "$WHITEPAPER_DIR/06-eventdb-dependency.md"
  "$WHITEPAPER_DIR/07-traceability-model.md"
  "$WHITEPAPER_DIR/08-domain-data-model.md"
  "$WHITEPAPER_DIR/09-transfer-protocol.md"
  "$WHITEPAPER_DIR/10-fraud-and-threat-model.md"
  "$WHITEPAPER_DIR/11-audit-and-certification.md"
  "$WHITEPAPER_DIR/12-adoption-and-governance.md"
  "$WHITEPAPER_DIR/13-use-cases-coffee.md"
  "$WHITEPAPER_DIR/14-mvp-and-pilot-plan.md"
  "$WHITEPAPER_DIR/15-roadmap.md"
  "$WHITEPAPER_DIR/16-conclusion.md"
)

for f in "${SOURCES[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "ERROR: missing source file: $f" >&2
    exit 1
  fi
done

{
  echo "% $TITLE"
  echo "% Version 0.1"
  echo "% $(date +%F)"
  echo
  echo "# $TITLE"
  echo
  for f in "${SOURCES[@]}"; do
    cat "$f"
    echo
  done
} > "$TMP_MD"

if rg -n '^```mermaid' "$TMP_MD" >/dev/null 2>&1; then
  if ! command -v mmdc >/dev/null 2>&1; then
    echo "ERROR: Mermaid blocks found but 'mmdc' is not installed." >&2
    exit 1
  fi
fi

BIB_FILE="$WHITEPAPER_DIR/references.bib"
PANDOC_COMMON_ARGS=(
  "$TMP_MD"
  --from gfm
  --standalone
  --resource-path "$OUT_DIR:$WHITEPAPER_DIR:$ROOT_DIR"
  --metadata "title=$TITLE"
  --toc
  --toc-depth=2
  --number-sections
  --lua-filter "$MERMAID_FILTER"
)

if [[ -f "$BIB_FILE" ]]; then
  PANDOC_COMMON_ARGS+=(--citeproc --bibliography "$BIB_FILE")
fi

PANDOC_DOCX_ARGS=(
  "${PANDOC_COMMON_ARGS[@]}"
  -o "$OUT_DOCX_FILE"
)

pandoc "${PANDOC_DOCX_ARGS[@]}"

if [[ ! -x "$PDF_ENGINE" ]]; then
  cat >&2 <<'MSG'
ERROR: required XeLaTeX engine not found at:
  /Library/TeX/texbin/xelatex
Install MacTeX and ensure this path is available.
MSG
  exit 1
fi

PANDOC_PDF_ARGS=(
  "${PANDOC_COMMON_ARGS[@]}"
  --pdf-engine="$PDF_ENGINE"
  -V geometry:margin=1in
  -V colorlinks=true
  -V linkcolor=blue
  -o "$OUT_PDF_FILE"
)

pandoc "${PANDOC_PDF_ARGS[@]}"

echo "Word generated: $OUT_DOCX_FILE"
echo "PDF generated: $OUT_PDF_FILE"
