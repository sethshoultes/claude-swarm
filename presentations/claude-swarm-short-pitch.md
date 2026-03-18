# Claude Code Agent Swarm — Short Pitch Script

Runtime: 3-4 minutes.

---

## Scene 1: The Hook
**Visual:** Single terminal. One Claude Code session working. Slow.

**Script:**
"You have one AI assistant. It does one thing at a time. What if you had a team?"

---

## Scene 2: What Is It
**Visual:** Terminal splits into three. Three Claude Code sessions light up simultaneously.

**Script:**
"The Claude Code Agent Swarm is a shell script that launches a coordinated team of Claude Code agents in tmux — each with its own git worktree — that can delegate tasks, communicate through send-keys, and build across multiple codebases simultaneously."

---

## Scene 3: Why It Matters
**Visual:** Side-by-side comparison. Left: "Before" — one agent, sequential tasks ticking off slowly. Right: "After" — three agents, tasks completing in parallel.

**Script:**
"Instead of working on your API, then your frontend, then your integrations — one after another — three agents build all three at the same time. The admin watches the integration points between them. When one agent changes an interface, the admin tells the others immediately. Not a merge conflict three days later. Real-time coordination."

---

## Scene 4: What Can You Build
**Visual:** Quick cuts between different project types appearing on screen.

**Script:**
"Plugin ecosystems — your core product and add-ons, built in parallel. Microservice platforms — API, MCP server, and frontend, all at once. Full-stack apps. Large-scale refactors. Anything where the work can be divided, the swarm can build faster."

---

## Scene 5: The Real Example
**Visual:** Three tmux windows labeled "AI Services," "MCP Server," "AI Abilities." Code scrolling in each.

**Script:**
"We used it to build three interconnected MemberPress systems simultaneously. AI Services — the backend intelligence layer. The MCP server — so AI assistants can understand your membership site. And AI Abilities — the user-facing features. Three codebases. Three agents. One admin keeping the contracts in sync. Shipped together."

---

## Scene 6: How It Works — 15 Seconds
**Visual:** Terminal typing each command as it's spoken.

**Script:**
"Tmux keeps agents alive forever — close your laptop, they keep working. Git worktrees give each agent its own copy of the code — zero conflicts. And tmux send-keys lets agents type into each other's sessions. That's the whole trick. One agent talks to another by literally typing into its terminal."

---

## Scene 7: What It Costs
**Visual:** Text appearing: "$0. One shell script. No framework. No cloud."

**Script:**
"Nothing. It's a shell script on top of tmux and git. Both free. Both already on your machine. No Docker. No Kubernetes. No subscriptions. The best architecture is the one you don't have to maintain."

---

## Scene 8: Getting Started
**Visual:** Four lines of terminal commands.

```
brew install tmux
claude-swarm ~/your-project 3
tmux attach -t claude-swarm
# Tell the admin what to build.
```

**Script:**
"Four commands. Thirty seconds. From zero to a working AI development team that coordinates, delegates, and never sleeps."

---

## Scene 9: Close
**Visual:** Three terminals working in parallel. Camera slowly pulls back. Fade to black.

**Script:**
"One AI is an assistant. A swarm is a team."
