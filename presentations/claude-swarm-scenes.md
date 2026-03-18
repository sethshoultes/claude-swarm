# Claude Code Agent Swarm — Scene Outline

---

## Scene 1: Black Screen
**Visual:** Nothing. Black. Five seconds of silence.

**Script:** *(Walk out. Stand still. Say nothing. Let the room settle.)*

---

## Scene 2: The Setup
**Visual:** Text fades in: "Every once in a while, a tool comes along that changes everything."

**Script:**
"Every once in a while... a tool comes along that changes everything. The printing press. The personal computer. The internet. They don't look revolutionary at first. They look simple. Obvious, even. And that's exactly how you know they're real."

---

## Scene 3: The Problem
**Visual:** Text: "One developer. One terminal. One thing at a time."

**Script:**
"This is how we build software today. One developer. One terminal. One thing at a time. We have AI now. And it's extraordinary. It can write code. It can debug. It can architect entire systems. But we give it one task... and we wait. Then another task... and we wait. We have this incredible intelligence — and we put it in a box. That's not good enough."

---

## Scene 4: The Pain
**Visual:** Lines appearing one at a time, dimming as they go: "It finishes one task... then starts the next... then the next..."

**Script:**
"You have an AI that can write code. But it works alone. It finishes one task... then starts the next... then the next. What does that remind you of? That's a typewriter. We're using a typewriter in the age of the internet."

---

## Scene 5: The Shift
**Visual:** Text: "What if you had a team?"

**Script:**
*(Pause. Look at the audience.)*
"What if it didn't have to? What if you had a team?"
*(Let the silence hold for three full seconds.)*

---

## Scene 6: Title Reveal
**Visual:** Large text: "Claude Code Agent Swarm" — subtitle: "Multiple AI agents. Working together. In your terminal."

**Script:**
"Today, we're introducing the Claude Code Agent Swarm. Multiple AI agents. Working together. In your terminal. Right now. Today."

---

## Scene 7: The Architecture
**Visual:** Diagram building piece by piece — tmux session containing Admin, Worker 1, Worker 2, Worker 3, connected to a shared coordination layer.

```
┌──────────────────────────────────────────────┐
│  tmux session: "claude-swarm"                │
│                                              │
│  ┌────────┐  ┌────────┐  ┌────────┐         │
│  │ ADMIN  │  │WORKER 1│  │WORKER 2│         │
│  │        │──│ galaxy │  │ combat │         │
│  │ assigns│  │ gen    │  │ system │         │
│  └───┬────┘  └───┬────┘  └───┬────┘         │
│      └───────────┴─────┬─────┘              │
│               Shared Directory               │
└──────────────────────────────────────────────┘
```

**Script:**
"Let me show you what this looks like. You have a tmux session. Inside it, windows. An admin agent that understands your project. Worker agents — each focused on a different part of your codebase. And in the center, a shared coordination layer where they pass information back and forth. The admin reads your design document. Breaks the work into pieces. Assigns each piece to a worker. The workers build. They report back. The admin coordinates. It's not a pipeline. It's a *team*."

---

## Scene 8: Three Pillars Intro
**Visual:** Text: "Built on three beautiful ideas."

**Script:**
"And it's built on three beautiful ideas. All of them already on your machine. All of them free."

---

## Scene 9: Pillar 1 — Tmux
**Visual:** Large "1" with "Tmux" beneath it.

**Script:**
"Number one. Tmux. Some of you have never heard of tmux. That's okay. It's been quietly running the world's servers for fifteen years. Every DevOps engineer knows it. Every sysadmin depends on it. And today, it becomes the foundation of something entirely new. Tmux is a terminal multiplexer. What that means — in plain language — is that it keeps your terminal sessions alive. Close your laptop. Go home. Come back tomorrow morning. And your agents... are still working. Still thinking. Still building. They don't time out. They don't crash. They don't quit. Tmux won't let them."

---

## Scene 10: Tmux — For Beginners
**Visual:** Terminal demo showing:
```
$ brew install tmux
$ tmux new -s my-project
# Green bar appears at bottom
$ tmux attach -t my-project
# Everything is back
```

**Script:**
"For those who've never seen it — this is all it takes. Brew install tmux. One line. Then `tmux new`. You're in. See that green bar at the bottom? That means everything above it is persistent. Close the window. Open a new one. `tmux attach`. You're right back. Nothing lost. Insanely simple."

---

## Scene 11: Tmux — Six Keystrokes
**Visual:** Grid of six key combos:
- Ctrl+b then c — New window
- Ctrl+b then 1-9 — Switch windows
- Ctrl+b then | — Split side by side
- Ctrl+b then - — Split stacked
- Ctrl+b then d — Detach (agents keep running)
- Alt + Arrow — Move between panes

**Script:**
"You only need six keystrokes. Control-b, then a letter. Two keystrokes. New window. Switch windows. Split the screen. Move around. Detach — which means walk away while everything keeps running. That's it. You could teach this to someone in sixty seconds. And that's the point. The best tools are the ones you can learn between meetings."

---

## Scene 12: Pillar 2 — Git Worktrees
**Visual:** Large "2" with "Git Worktrees" beneath it.

**Script:**
"Number two. Git worktrees. Here's the problem with multiple agents. If they're all editing the same files in the same directory... chaos. Agent one changes line 47. Agent two overwrites it. You end up with garbage. Git worktrees solve this elegantly. One command creates a complete, independent copy of your codebase on its own branch. Every agent gets its own desk. Its own files. Its own reality. When they're done, you merge. Clean. This has been in git for years. Almost nobody uses it. We're about to change that."

---

## Scene 13: Worktrees — Visual
**Visual:** Terminal showing:
```
git worktree add -b worker-1 /tmp/worker1 main
git worktree add -b worker-2 /tmp/worker2 main

# Worker 1 edits /tmp/worker1/galaxy.gd
# Worker 2 edits /tmp/worker2/combat.gd
# Zero conflicts. Merge when done.
```

**Script:**
"One command. Full independent copy. Worker one edits here. Worker two edits there. They could both change the same file and it doesn't matter. Separate branches. Separate worlds. Merge when you're ready. Like giving each developer their own desk instead of sharing one keyboard."

---

## Scene 14: Pillar 3 — send-keys
**Visual:** Large "3" with "send-keys" beneath it.

**Script:**
"Number three. And this is the one that changes everything. Two words. send. keys. Tmux has a feature — and I don't think the person who wrote it realized what they were creating — that lets any program type into any other terminal window. Read that again. Any program. Can type into. Any other window. That means one AI agent can send instructions directly to another AI agent. No API. No message bus. No framework. One agent literally types into another agent's session. They talk."
*(Pause.)*
"When I first saw this work, I got goosebumps."

---

## Scene 15: send-keys — The Code
**Visual:** Terminal showing:
```
# Admin sends a task to Worker 1
tmux send-keys -t swarm:worker1 "Build the galaxy generator"
tmux send-keys -t swarm:worker1 Enter

# Worker 1 checks on Worker 2
tmux capture-pane -t swarm:worker2 -p | tail -20
```

**Script:**
"This is how agents talk to each other. The admin sends a task to worker one. Two lines. One to type the message. One to press enter. That's the entire communication protocol. No API. No websockets. No message queue. Just one terminal typing into another. You know what I love about this? It's the simplest possible thing that could work. And it works beautifully."

---

## Scene 16: The Three Together
**Visual:** Text: "Tmux keeps them alive. Worktrees keep them safe. send-keys lets them think together."

**Script:**
*(Slow, deliberate.)*
"Tmux keeps them alive. Worktrees keep them safe. send-keys lets them think together. Three old tools. One new idea. And suddenly you have something that didn't exist before."

---

## Scene 17: The Workflow
**Visual:** Vertical timeline:
1. You type one command → `claude-swarm ~/my-project 3`
2. Worktrees are created → Each worker gets its own branch
3. Claude Code launches in each window → Admin + 3 workers
4. You give the admin a task → "Build a strategy game from this design doc"
5. The admin breaks it down and delegates → Galaxy. Combat. Data models.
6. You go get coffee → They keep working.

**Script:**
"Here's how the whole thing comes together. You type one command. One. The system creates worktrees — independent copies for each agent. It launches Claude Code in every window. It gives the admin its instructions. Then you talk to the admin. You say: 'Build me a strategy game from this design document.' And the admin reads your document. Breaks the work into pieces. Galaxy generation to worker one. Combat system to worker two. Data models to worker three. And then... you go get coffee. They keep working. Come back whenever you want."

---

## Scene 18: Real Project
**Visual:** "MemberPress AI Platform" title card, with four agent cards below:
- Admin: Reads architecture specs, coordinates integration points, manages shared contracts
- Worker 1: MemberPress AI Services — the backend intelligence layer
- Worker 2: MemberPress MCP — the Model Context Protocol server
- Worker 3: MemberPress AI Abilities — the user-facing AI features in the plugin

**Script:**
"We didn't just theorize about this. We built a real product with it. MemberPress — the most popular WordPress membership plugin in the world. And we needed to add AI across the entire platform. Not one feature. Three interconnected systems. All at once.

MemberPress AI Services — the backend layer that handles model orchestration, prompt management, and API communication. MemberPress MCP — a Model Context Protocol server that lets AI assistants like Claude understand and interact with your membership site. And MemberPress AI Abilities — the user-facing features. Smart content gating recommendations. Automated membership analytics. AI-powered support.

Three separate codebases. Three different architectural patterns. But they all have to talk to each other. The AI Services layer is the spine that both the MCP server and the Abilities plugin depend on. Build them sequentially? You're waiting weeks. Misalign an interface between them? You're rewriting code.

So we pointed the swarm at it. Worker one built the AI Services API — endpoints, authentication, model routing. Worker two built the MCP server — tool definitions, resource handlers, the protocol layer. Worker three built the Abilities plugin — the UI, the WordPress hooks, the user-facing intelligence. And the admin? The admin watched the integration points. When worker one changed an API response format, the admin told workers two and three immediately. Real-time coordination. Not a merge conflict three days later.

All three systems. Built simultaneously. Talking to each other through the admin. Shipping together."

---

## Scene 19: The Results
**Visual:** Text: "Three codebases. Built at the same time. Integrated from day one."

**Script:**
"Three codebases. Built simultaneously. Integrated from day one. The MCP server could call AI Services before AI Services was even finished — because the admin kept the interface contract in sync across all three workers in real time. This is not theoretical. This shipped."

---

## Scene 20: The Numbers
**Visual:** Four large stats:
- **3x** — Parallel throughput
- **0** — Merge conflicts
- **∞** — Session lifetime
- **$0** — Extra cost

**Script:**
"Three-x parallel throughput. Three agents, three tasks, same clock time. Zero merge conflicts. Worktrees make collisions structurally impossible. Infinite session lifetime. Detach. Sleep. Fly across the country. They're still building when you land. And the cost of the orchestration layer? Zero dollars. Tmux and git are free. They've been free for fifteen years. They'll be free forever."

---

## Scene 21: vs The Competition
**Visual:** Text: "Other tools give you background agents." then: "Ours talk to each other."

**Script:**
"Other tools give you background agents. You've seen them. You hit a button, an agent spins up, does its thing, comes back with a result. That's fine. That's useful. But our agents talk to each other. Background agents are isolated processes. They run. They finish. They report. But they can't coordinate in real time. They can't ask each other questions. They can't adapt mid-task based on what another agent discovered. Our agents are a conversation. Not a batch job. And that difference... is everything."

---

## Scene 22: Self-Healing
**Visual:** Code snippet:
```
while true; do
  for agent in admin worker1 worker2; do
    if agent_is_dead "$agent"; then
      restart_agent "$agent"
    fi
  done
  sleep 120
done
```

**Script:**
"And here's the part that gets really interesting. We built a monitor agent. It watches every window. Every two minutes, it checks: is the agent alive? Is it working? And if one crashes — maybe it hit an error, maybe it finished and stopped — the monitor restarts it. Automatically. Same instructions. Same context. Agents that keep each other alive. Indefinitely. You build a system that maintains itself. Think about that."

---

## Scene 23: Simplicity
**Visual:** Text: "The entire system is one shell script."

**Script:**
"The entire system is one shell script. I want you to really hear that. One script. No Docker. No Kubernetes. No cloud. No framework. No dependencies you don't already have. The best architecture is the one you don't have to maintain. We didn't add complexity. We removed it. Until only the essential parts remained."

---

## Scene 24: Getting Started
**Visual:** Terminal showing:
```
brew install tmux
claude-swarm ~/your-project 3
tmux attach -t claude-swarm
# Give the admin your vision. Watch it happen.
```

**Script:**
"Getting started takes thirty seconds. Brew install tmux. Run the swarm script. Attach. Tell the admin what you want to build. Four commands. From zero to a working AI development team."

---

## Scene 25: What You Can Build
**Visual:** Four cards:
- Plugin Ecosystems — Core plugin, add-ons, and integrations built in parallel
- Microservice Platforms — API layer, MCP server, frontend — all at once
- Refactoring at Scale — Break a legacy codebase into zones, each agent modernizes one
- Multi-Repo Products — Shared contracts enforced across repos in real time

**Script:**
"Think about what you can build with this. Plugin ecosystems. Your core plugin, your add-ons, your third-party integrations — all built by different agents, all staying in sync. Microservice platforms. Your API layer, your MCP server, your frontend — three agents, three codebases, one coherent product. Massive refactorings. Break a legacy codebase into zones. Each agent modernizes its zone. What used to take a sprint takes an afternoon. Multi-repo products where the interface contracts actually stay aligned — because an agent is watching them in real time."

---

## Scene 26: The Philosophy
**Visual:** Text: "The people who are crazy enough to think they can build software with a swarm of AI agents... are the ones who will."

**Script:**
*(Almost a whisper.)*
"The people who are crazy enough to think they can build software with a swarm of AI agents... are the ones who will."

---

## Scene 27: The Turn
**Visual:** Small dim text: "Oh, and..."

**Script:**
*(Turn as if walking away. Stop. Turn back.)*
"Oh, and..."

---

## Scene 28: One More Thing
**Visual:** Text: "One more thing. The swarm script was built by a swarm."

**Script:**
"One more thing. The swarm script — the tool that orchestrates all of this — was built by a swarm. We used Claude Code inside tmux to build the tool that runs Claude Code inside tmux. The system created itself."
*(Five seconds of silence.)*

---

## Scene 29: Closing
**Visual:** "Claude Code Agent Swarm" — below it: "Tmux. Git Worktrees. send-keys. That's it. That's the whole thing."

**Script:**
"Claude Code Agent Swarm. Tmux. Git worktrees. send-keys. That's it. That's the whole thing."
*(Walk offstage. No goodbye. No thank you. Just walk.)*

---

## Scene 30: Black
**Visual:** Nothing. Music fades. Lights up slowly.

---

# Stage Directions

## Pacing
- Never rush. Every pause is intentional.
- After a big reveal (scenes 6, 14, 28), count to five silently before continuing.
- When a slide has just a few words, let them sit for 3-5 seconds before speaking.

## Voice
- Default: conversational, confident, slightly understated.
- Pain points (scenes 3-4): slower, with weight.
- Reveals (scenes 6, 14, 28): slightly louder, then immediately drop to quiet. Contrast is power.
- Technical slides: brisk, efficient. Don't linger.
- Philosophy (scene 26): almost a whisper. Like sharing a secret.

## Movement
- Scenes 1-6: center stage, still.
- Scenes 7-15: move toward the screen, point at code.
- Scenes 16-26: back to center, eye contact with audience.
- Scenes 27-28: the turn-away-stop-turn-back. Practice this.

## Rules
- Never say "um" or "so." Silence is always better.
- Never read the slide. You are the show.
- Never ask "Does that make sense?" It undermines authority.
- Never end with Q&A. End with the black screen. Leave them wanting more.
