# Claude Code Agent Swarm with Tmux

A shell script that launches a coordinated team of Claude Code agents in tmux — each with its own git worktree — that can delegate tasks, communicate through send-keys, and build across multiple codebases simultaneously.

[![Watch the demo](https://img.youtube.com/vi/ahcOcMX2od0/maxresdefault.jpg)](https://youtu.be/ahcOcMX2od0)

## Prerequisites

1. **tmux** — terminal multiplexer
   ```bash
   brew install tmux
   ```

2. **Claude Code CLI** — Anthropic's CLI for Claude
   ```bash
   # Install from https://docs.anthropic.com/en/docs/claude-code
   # Verify it's installed:
   claude --version
   ```

3. **git** — already on your machine

4. **A git repository** — the script requires one to create worktrees

## Install the Script

```bash
mkdir -p ~/.local/bin
curl -o ~/.local/bin/claude-swarm https://raw.githubusercontent.com/sethshoultes/claude-swarm/main/claude-swarm
chmod +x ~/.local/bin/claude-swarm

# Add to PATH if not already (add to ~/.zshrc or ~/.bashrc)
export PATH="$HOME/.local/bin:$PATH"
```

## Quick Start

```bash
# Launch admin + 2 workers on any git project
claude-swarm ~/my-project

# Or specify more workers
claude-swarm ~/my-project 4

# Attach to the swarm
tmux attach -t claude-swarm

# The admin is already reading the codebase and assigning workers.
# Just watch — then give it your task when it reports ready.
```

That's it. Three commands. The admin automatically reads the codebase, identifies the major areas, assigns each worker a section to study, and reports back when the swarm is ready for instructions.

## Architecture

```
tmux session: "claude-swarm"
├── Window 1: admin      → orchestrator on main repo
├── Window 2: worker1    → git worktree (own branch)
├── Window 3: worker2    → git worktree (own branch)
├── Window 4: worker3    → git worktree (own branch)
└── Window 5: monitor    → status loop checking all agents

/tmp/claude-shared/
├── status/       → each agent writes heartbeats here
├── tasks/        → admin writes task assignments
├── results/      → workers write completed work
├── messages/     → direct agent-to-agent messages
└── prompts/      → system prompts for each agent
```

Each worker gets its own git worktree — a full working copy on its own branch. Agents edit files simultaneously without conflicts.

## How It Works

### Agents talk by typing into each other's terminals

```bash
# Admin sends a task to worker1 (TWO separate commands — critical)
tmux send-keys -t claude-swarm:worker1 "please review the auth module"
tmux send-keys -t claude-swarm:worker1 Enter
```

The message and Enter **must** be separate commands. Combining them doesn't work.

### Agents observe each other silently

```bash
tmux capture-pane -t claude-swarm:worker1 -p | tail -20
```

### Agents coordinate through shared files

```
/tmp/claude-shared/
├── status/admin.md       → "Assigned tasks to all workers. Waiting."
├── status/worker1.md     → "Reviewing frontend. 60% complete."
├── tasks/task-001.md     → "Review all API endpoints for consistency"
├── results/task-001.md   → "Found 3 issues: ..."
└── messages/worker1-to-admin.md → "Need clarification on scope"
```

### The feedback loop

1. You tell the admin what you want
2. Admin reads the codebase, breaks it into tasks, delegates to workers
3. Workers do the work, report back via send-keys
4. Admin checks progress via capture-pane, sends corrections if needed
5. Repeat until done

## What the Script Does

1. Finds the `claude` binary automatically (checks `~/.claude/bin`, `~/.local/bin`, `/usr/local/bin`, PATH)
2. Validates the target is a git repo and warns about uncommitted changes
3. Creates N git worktrees branched from the current branch
4. Creates the shared communication directory
5. Writes system prompts to files for each agent
6. Creates a tmux session with named windows
7. Launches `claude --dangerously-skip-permissions` in each window with staggered starts (12s apart to avoid memory spikes)
8. Sends each agent its instructions from the prompt files
9. **Auto-starts the admin** — it reads the codebase, identifies major areas, and sends each worker to study their assigned area automatically
10. Starts a monitor loop that checks agent status every 2 minutes

## Navigating the Swarm

| Keys | Action |
|------|--------|
| `Ctrl+b` then `1` | Switch to admin |
| `Ctrl+b` then `2` | Switch to worker1 |
| `Ctrl+b` then `3` | Switch to worker2 |
| `Ctrl+b` then `d` | Detach (agents keep running) |
| `Alt + Arrow` | Move between panes |
| `Ctrl+b` then `z` | Zoom a pane to fullscreen (toggle) |

### View all agents in one screen

```bash
# From inside tmux, merge windows into panes:
tmux join-pane -s claude-swarm:worker1 -t claude-swarm:admin -h
tmux join-pane -s claude-swarm:worker2 -t claude-swarm:admin -v
tmux join-pane -s claude-swarm:worker3 -t claude-swarm:admin -v

# Auto-tile into a grid:
# Ctrl+b then Alt+5
```

## Cleanup

```bash
# Kill the swarm
tmux kill-session -t claude-swarm

# Remove worktrees
cd ~/my-project
git worktree prune

# Remove shared files
rm -rf /tmp/claude-shared /tmp/claude-worktrees
```

## Troubleshooting

### "command not found: claude" inside tmux
Tmux starts a fresh shell that may not have your PATH. The script now auto-detects the claude binary location and exports it. If you're running manually, add to `~/.zshrc`:
```bash
export PATH="$HOME/.claude/bin:$PATH"
```

### "zsh: killed" when launching claude
Not enough free memory. Each Claude Code instance uses ~400-500MB. Close other apps or reduce the number of workers. The script staggers launches 12 seconds apart to avoid spikes.

### Agents don't respond to send-keys
Make sure Claude Code has finished loading (look for the `>` prompt) before sending messages. The script waits 12 seconds between launches for this reason.

### Paths with spaces break
The script single-quotes all paths. If running manually, always quote paths: `cd '~/Local Sites/my project'`.

### Trust prompt blocks worker startup
Worktree directories may trigger Claude Code's folder trust prompt. The script can't auto-accept this. Attach and press Enter in any blocked window, or pre-trust the `/tmp/claude-worktrees` path.

## Memory Requirements

| Setup | Approximate RAM |
|-------|----------------|
| Admin + 1 worker | ~1 GB |
| Admin + 2 workers | ~1.5 GB |
| Admin + 3 workers | ~2 GB |
| Admin + 4 workers | ~2.5 GB |

Plus whatever your existing session uses (~500MB if you're running Claude Code already).

## Lessons Learned

**Two-step send-keys:** Always separate the message and Enter into two commands. One combined command is unreliable.

**Staggered launches:** Launching all agents at once causes memory spikes and OOM kills. The 12-second delay between launches prevents this.

**Prompts in files, not arguments:** `--system-prompt` with a huge inline string gets killed. Writing prompts to files and having agents read them is reliable.

**`-p` is one-shot:** `claude -p "prompt"` answers and exits. For persistent interactive agents, just launch `claude` and send instructions via send-keys.

**Worktree branches must be unique:** The script uses `worker-{N}-{timestamp}` to avoid conflicts across multiple launches.

## Security Warning

`--dangerously-skip-permissions` means agents can read/write/delete files, run shell commands, push to remotes, and install packages without asking. Only use on repos and machines you trust. Consider a VM or container for sensitive work.

## Advanced: Self-Healing Monitor

Replace the default monitor with one that restarts dead agents:

```bash
while true; do
  for window in admin worker1 worker2 worker3; do
    if ! tmux capture-pane -t claude-swarm:$window -p | grep -q "❯"; then
      echo "$(date): Restarting $window..."
      tmux send-keys -t claude-swarm:$window "claude --dangerously-skip-permissions" Enter
      sleep 12
      tmux send-keys -t claude-swarm:$window "Read /tmp/claude-shared/prompts/${window}.md for your instructions. Resume your previous task."
      tmux send-keys -t claude-swarm:$window Enter
    fi
  done
  sleep 120
done
```

## Credits

Inspired by [this Reddit post](https://www.reddit.com/r/ClaudeAI/comments/1lp9c7p/) on r/ClaudeAI about multi-agent collaboration with Claude Code and Tmux.
