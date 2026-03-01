#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WHITEPAPER_DIR="$ROOT_DIR/01-whitepaper"
DIST_DIR="$ROOT_DIR/dist"
OUTPUT_PDF="$DIST_DIR/nusantara-trace-whitepaper.pdf"
PDF_ENGINE="${PDF_ENGINE:-xelatex}"

if [[ ! -d "$WHITEPAPER_DIR" ]]; then
  echo "Error: whitepaper directory not found: $WHITEPAPER_DIR" >&2
  exit 1
fi

if ! command -v pandoc >/dev/null 2>&1; then
  echo "Error: pandoc is required but not installed." >&2
  exit 1
fi

if ! command -v "$PDF_ENGINE" >/dev/null 2>&1; then
  echo "Error: PDF engine not found: $PDF_ENGINE" >&2
  exit 1
fi

mkdir -p "$DIST_DIR"

mapfile -t md_files < <(
  ls "$WHITEPAPER_DIR"/*.md 2>/dev/null | sort
)

if [[ "${#md_files[@]}" -eq 0 ]]; then
  echo "Error: no markdown files found in $WHITEPAPER_DIR" >&2
  exit 1
fi

bib_file="$WHITEPAPER_DIR/references.bib"
bib_args=()
if [[ -f "$bib_file" ]]; then
  bib_args+=(--bibliography "$bib_file")
fi

echo "Building PDF..."
echo "Source dir : $WHITEPAPER_DIR"
echo "PDF engine : $PDF_ENGINE"
echo "Output     : $OUTPUT_PDF"

pandoc \
  "${md_files[@]}" \
  --from=gfm \
  --toc \
  --pdf-engine="$PDF_ENGINE" \
  "${bib_args[@]}" \
  -o "$OUTPUT_PDF"

echo "Build completed: $OUTPUT_PDF"
