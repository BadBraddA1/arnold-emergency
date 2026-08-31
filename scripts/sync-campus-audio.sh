#!/usr/bin/env bash
# Copy live campus horn clips into this repo for the SOP audio reference page.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/audio"
GATEWAY_AUDIO="${GATEWAY_AUDIO:-$HOME/Code/arnold-alarm/apps/gateway/audio}"
PI_AUDIO="${PI_AUDIO:-$HOME/.config/arnold-alarm/audio}"

mkdir -p "$DEST"

copy_if() {
  local src="$1"
  local name="$2"
  if [[ -f "$src" ]]; then
    cp "$src" "$DEST/$name"
    echo "  + $name"
  else
    echo "  ! missing: $src" >&2
  fi
}

echo "Syncing campus audio → public/audio/"
copy_if "$GATEWAY_AUDIO/Start_Bell_Tone.mp3" "Start_Bell_Tone.mp3"
copy_if "$GATEWAY_AUDIO/Test_Start_Tone.mp3" "Test_Start_Tone.mp3"
copy_if "$GATEWAY_AUDIO/Bell_1.mp3" "Bell_1.mp3"
copy_if "$PI_AUDIO/Code_Red_Full_Master.ogg" "Code_Red_Full_Master.ogg"
copy_if "$PI_AUDIO/Code_Blue_Master.ogg" "Code_Blue_Master.ogg"
copy_if "$PI_AUDIO/Code_Green_au.ogg" "Code_Green_au.ogg"
copy_if "$PI_AUDIO/TEST_ACOC.ogg" "TEST_ACOC.ogg"
copy_if "$PI_AUDIO/manifest.json" "manifest.json"

if command -v ffmpeg >/dev/null 2>&1; then
  for ogg in "$DEST"/*.ogg; do
    [[ -f "$ogg" ]] || continue
    mp3="${ogg%.ogg}.mp3"
    echo "  → MP3 for iPhone: $(basename "$mp3")"
    ffmpeg -y -loglevel error -i "$ogg" -codec:a libmp3lame -qscale:a 8 "$mp3"
  done
else
  echo "  ! ffmpeg not found — iPhone may not play .ogg clips" >&2
fi
echo "Done."
