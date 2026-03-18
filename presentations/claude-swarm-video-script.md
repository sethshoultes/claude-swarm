# Claude Code Agent Swarm — Video Script

Total estimated runtime: 12-15 minutes

---

## SCENE 1: Hook
**Visual:** Dark screen. A single terminal cursor blinks. Then suddenly 4 terminal windows tile across the screen, each running Claude Code, text flying. Camera zooms out to show them all working simultaneously.

**Script:**
"What if you could run four AI coding agents at the same time — and they could actually talk to each other? No special framework. No cloud platform. Just your terminal and two tools you can install in thirty seconds. Let me show you how."

---

## SCENE 2: Title Card
**Visual:** Clean title card on dark background. "Claude Code Agent Swarm" in teal/green. Subtitle: "Multi-Agent AI with Tmux." Your name/handle below.

**Script:**
(Pause 3 seconds, no voiceover — let the title breathe. Optional background music starts here.)

---

## SCENE 3: The Problem
**Visual:** Screen recording of a single Claude Code session. The user gives it a big task. Claude is working on one file while other files need attention. Show a clock speeding up — it takes a long time to do everything sequentially.

**Script:**
"Here's the problem. Claude Code is powerful, but it's one agent doing one thing at a time. If you have a project with a frontend, an API, and a database layer, Claude has to work through them sequentially. That's slow. And if you close your terminal? The session dies. You lose everything.

What we really want is a team. An orchestrator that breaks the work up, and workers that handle each piece in parallel. That's exactly what we're going to build."

---

## SCENE 4: The Two Tools
**Visual:** Split screen. Left side: tmux logo or terminal showing tmux. Right side: Claude Code CLI. Then show them combining with a simple animation or side-by-side.

**Script:**
"We only need two things. Tmux — a terminal multiplexer that's been around for over a decade. And Claude Code — Anthropic's command-line interface for Claude. Tmux keeps our sessions alive. Claude Code does the thinking. Together, they give us something neither can do alone: agents that coordinate."

---

## SCENE 5: What is Tmux — For the Uninitiated
**Visual:** Screen recording of a plain terminal. Type `tmux` and hit enter. Point out the green status bar at the bottom with an arrow or highlight annotation. Then demonstrate: create a split, move between panes, detach, reattach.

**Script:**
"If you've never used tmux, here's the thirty-second version. It's a program that runs inside your terminal. When you start it, you get this green bar at the bottom — that means you're inside tmux now.

The magic is that tmux sessions are persistent. I can close this terminal window entirely..."

(Close the terminal window.)

"...open a new one, type `tmux attach`..."

(Open new terminal, type `tmux attach`.)

"...and everything is exactly where I left it. Programs keep running. Nothing is lost. That's why tmux is perfect for long-running AI agents."

---

## SCENE 6: Tmux Basics — The Prefix Key
**Visual:** Screen recording inside tmux. Show a keystroke overlay or on-screen keyboard graphic that lights up when Ctrl+b is pressed, then lights up the second key.

**Script:**
"Every tmux shortcut starts with a prefix key: Control-b. You press Control-b, let go, then press the next key. It's always two steps.

Control-b then c — new window.
Control-b then a number — switch windows.
Control-b then d — detach. That's the important one. Detach means 'go away but keep everything running.'

That's really all you need to know. Let's build the swarm."

---

## SCENE 7: The Architecture
**Visual:** Animated diagram building up piece by piece. Start with an empty tmux session. Add the admin window. Add worker windows one at a time. Then show the shared directory appearing below. Draw lines connecting them. Use the ASCII diagram from the presentation as a reference, but animate it.

**Script:**
"Here's what we're building. One tmux session called 'claude-swarm.' Inside it, named windows: an admin agent, three worker agents, and a monitor.

The admin lives in the main repo. Each worker gets its own git worktree — that's a full, independent copy of the codebase on its own branch. They can all edit files at the same time without stepping on each other.

And in the middle, a shared directory where agents write status updates, task assignments, and results. Think of it as their bulletin board."

---

## SCENE 8: The Secret — tmux send-keys
**Visual:** Screen recording showing two tmux windows side by side (use tmux panes for the demo so both are visible). In the left pane, type the `tmux send-keys` command. Show the text appearing in the right pane as if by magic. Highlight the two-step process with annotations.

**Script:**
"Here's the trick that makes the whole thing work. Tmux has a command called send-keys. It lets one program type into another tmux window.

Watch this. I'm in the admin pane on the left. I run: `tmux send-keys -t claude-swarm:worker1` followed by my message in quotes. Then — and this is critical — a separate command: `tmux send-keys -t claude-swarm:worker1 Enter`.

Look at the right pane. The text appeared and Enter was pressed. The worker just received instructions from the admin. That's inter-agent communication. No API. No message bus. Just tmux."

(Type it out live, show it working.)

"The message and Enter must be two separate commands. If you combine them, it breaks. I learned that the hard way."

---

## SCENE 9: Git Worktrees Explained
**Visual:** File explorer or terminal showing the main repo. Then show `git worktree add` creating new directories. Show a split view: two different worktrees open, each editing a different file. Maybe show `git branch` in each to prove they're on different branches.

**Script:**
"Quick sidebar on git worktrees, because this is what prevents chaos.

Normally, a git repo is one directory with one branch checked out. If two agents edit the same file, they'll overwrite each other.

Git worktrees solve this. Watch: `git worktree add` creates a whole new directory with a full copy of the code, on its own branch. Worker one edits over here. Worker two edits over there. Completely independent. When they're done, we merge the branches back together.

It's a built-in git feature that most people don't know about. And it's perfect for parallel agents."

---

## SCENE 10: The Launch Script
**Visual:** Show the terminal. Open the `claude-swarm` script briefly in an editor — don't linger, just show it exists and is readable. Then run it.

**Script:**
"I wrote a script called `claude-swarm` that automates all of this. It takes a repo path and the number of workers you want. Let me run it."

(Type: `claude-swarm ~/projects/space-adventures 3`)

"It's creating git worktrees for each worker... setting up the shared directory... writing system prompts that teach each agent who it is and how to communicate... and launching Claude Code in every window."

(Show the output as it runs.)

"Done. Four Claude Code instances, each in their own tmux window, each with their own copy of the codebase. Let's attach."

---

## SCENE 11: Live Demo — Attaching
**Visual:** Type `tmux attach -t claude-swarm`. Show the admin window. Point out the status bar at the bottom showing all windows: admin, worker1, worker2, worker3, monitor.

**Script:**
"Here we go. I'm in the admin window. See the bottom bar? Those are my windows. Admin, worker one, worker two, worker three, monitor. I can jump between them with Control-b then the window number.

The admin is waiting for instructions. Let's give it something to do."

---

## SCENE 12: Live Demo — Giving a Task
**Visual:** Type a task into the admin window. Something visual and easy to follow, like: "Review the codebase. Assign worker1 to the Godot frontend, worker2 to the Python API services, worker3 to the infrastructure and Docker setup. Each worker should write a summary to /tmp/claude-shared/results/"

**Script:**
"I'll type: 'Review the codebase. Assign worker one to the Godot frontend, worker two to the Python API, worker three to the Docker infrastructure. Write summaries to the shared results directory.'

Now watch what happens."

(Pause. Let the admin start working.)

"The admin is reading the codebase, figuring out the structure, and now — there it is — it's using `tmux send-keys` to send instructions to worker one."

---

## SCENE 13: Live Demo — Watching the Workers
**Visual:** Switch between windows. Control-b 2 to show worker1 receiving instructions and starting to work. Control-b 3 for worker2. Show them actively coding in parallel. Maybe use a split view to show two workers simultaneously.

**Script:**
"Let me switch to worker one. Control-b, two."

(Switch to worker1 window.)

"It received the task and it's already reading through the Godot scripts. Let me check worker two."

(Switch to worker2 window.)

"Worker two is analyzing the Python API gateway. These are running simultaneously. While I'm watching one, the others are still working."

---

## SCENE 14: Live Demo — The Monitor
**Visual:** Switch to the monitor window. Show the status loop output displaying recent activity from each agent.

**Script:**
"And if I go to the monitor window — Control-b, five — I can see a dashboard of what every agent is doing. It captures the last few lines from each window every two minutes. Quick way to check on everyone without switching back and forth."

---

## SCENE 15: Live Demo — Detach and Reattach
**Visual:** Press Ctrl+b d to detach. Show the terminal drop back to a normal prompt. Wait a beat. Then type `tmux attach -t claude-swarm`. Show the agents still working.

**Script:**
"Here's the best part. I'll detach. Control-b, d."

(Detach. Normal terminal appears.)

"I'm out. But the agents are still running in the background. I could close this terminal. I could go get coffee. I could come back tomorrow.

`tmux attach -t claude-swarm`"

(Reattach.)

"They're still going. That's the power of tmux. Your agents never sleep."

---

## SCENE 16: How Agents Stay Alive
**Visual:** Show the self-healing monitor code. Maybe animate the concept: an agent dies (terminal shows an error), then the monitor detects it and restarts it automatically.

**Script:**
"For extra resilience, you can set up a self-healing monitor. It checks every two minutes whether Claude is still running in each window. If an agent dies — maybe it hit an error, maybe it finished and exited — the monitor restarts it automatically with the same system prompt.

Agents that keep each other alive. Indefinitely."

---

## SCENE 17: Security Warning
**Visual:** Red-tinted slide or screen. Show the `--dangerously-skip-permissions` flag highlighted. List what agents can do.

**Script:**
"Important disclaimer. The `--dangerously-skip-permissions` flag is what makes this autonomous — but it means these agents can read and write any file, run any command, and push code to your remotes. That's powerful and dangerous.

For anything sensitive, run this in a container or VM. Review what the agents produce before merging to main. And don't run this on a machine with credentials you wouldn't want an AI to access."

---

## SCENE 18: Cleanup
**Visual:** Show the cleanup commands being run. Worktrees being pruned. Session being killed. Clean terminal at the end.

**Script:**
"When you're done, cleanup is simple. `tmux kill-session` stops everything. `git worktree prune` cleans up the working copies. You're back to a clean slate."

(Run the commands.)

---

## SCENE 19: Recap and Close
**Visual:** Return to the architecture diagram, fully built out. Then transition to terminal showing the one-liner launch command. End with title card.

**Script:**
"Let's recap. Install tmux — one command. Run the swarm script — one command. Attach. Tell the admin what to build. Detach and let them work.

No frameworks. No cloud services. No monthly fees beyond your Claude subscription. Just your terminal, tmux, and as many Claude Code agents as you need.

The script is linked in the description. If you build something cool with it, I'd love to see it. Thanks for watching."

---

## SCENE 20: End Card
**Visual:** Dark screen with links. GitHub repo, socials, subscribe prompt. Background music fades out.

**Script:**
(No voiceover. 5 seconds. Optional text: "Links in description.")

---

# Production Notes

## Screen Recording Tips
- Use a large, clean terminal font (16-18pt)
- Set terminal to dark theme with high contrast
- Record at 1920x1080 minimum
- Use a keystroke visualizer like KeyCastr (macOS) so viewers can see what you're pressing
- Zoom into relevant parts of the screen when showing code

## Recommended Tools
- **Screen recording:** OBS Studio (free) or ScreenFlow (macOS)
- **Keystroke overlay:** KeyCastr (free, macOS) — shows keystrokes on screen
- **Terminal:** iTerm2 with a clean dark profile
- **Annotations:** Add arrows and highlights in post-production
- **Diagrams:** Animate the architecture diagram in Keynote, Figma, or After Effects

## B-Roll Ideas
- Close-up of terminal text scrolling
- Time-lapse of agents working (speed up screen recording 4x)
- Side-by-side comparison: one agent vs. four agents on the same task
- Show the /tmp/claude-shared/ directory filling up with status files in real time

## Thumbnail Suggestion
- Four terminal windows in a grid, each showing Claude Code
- Teal/green accent color matching the tmux status bar
- Text: "AI Agent Swarm" in bold
- Subtitle: "Claude Code + Tmux"
