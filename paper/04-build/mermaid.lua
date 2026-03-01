-- Render fenced mermaid code blocks to PNG via mmdc for PDF output.
local counter = 0

local function sh_quote(s)
  return "'" .. tostring(s):gsub("'", "'\\''") .. "'"
end

local function ensure_dir(path)
  os.execute("mkdir -p " .. sh_quote(path))
end

function CodeBlock(el)
  local is_mermaid = false
  for _, c in ipairs(el.classes or {}) do
    if c == "mermaid" then
      is_mermaid = true
      break
    end
  end

  if not is_mermaid then
    return nil
  end

  local out_dir = os.getenv("MERMAID_OUT_DIR") or "."
  ensure_dir(out_dir)

  counter = counter + 1
  local stem = string.format("mermaid-%03d", counter)
  local in_file = out_dir .. "/" .. stem .. ".mmd"
  local out_file = out_dir .. "/" .. stem .. ".png"

  local f = assert(io.open(in_file, "w"))
  f:write(el.text)
  f:close()

  local cmd = table.concat({
    "mmdc",
    "-i", sh_quote(in_file),
    "-o", sh_quote(out_file),
    "-b", sh_quote("transparent")
  }, " ")

  local rc = os.execute(cmd)
  if rc ~= true and rc ~= 0 then
    io.stderr:write("ERROR: failed to render mermaid block using mmdc\n")
    os.exit(1)
  end

  return pandoc.Para({ pandoc.Image("", out_file, "") })
end
