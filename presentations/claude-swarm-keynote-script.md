# Claude Code Agent Swarm — Keynote Script

Runtime: 14-18 minutes. Paced slow. Let silence do the work.

---

## SLIDE 1: Black Screen
*Walk out. Stand still. Say nothing for five seconds. Let the room settle.*

---

## SLIDE 2: "Every once in a while..."

"Every once in a while... a tool comes along that changes everything.

The printing press. The personal computer. The internet.

They don't look revolutionary at first. They look simple. Obvious, even. And that's exactly how you know they're real."

*Pause. Let it breathe.*

---

## SLIDE 3: "One developer. One terminal."

"This is how we build software today. One developer. One terminal. One thing at a time.

We have AI now. And it's extraordinary. It can write code. It can debug. It can architect entire systems. But we give it one task... and we wait. Then another task... and we wait. We have this incredible intelligence — and we put it in a box."

*Slow shake of the head.*

"That's not good enough."

---

## SLIDE 4: "It works alone."

"You have an AI that can write code. But it works alone. It finishes one task... then starts the next... then the next.

What does that remind you of? That's a typewriter. We're using a typewriter in the age of the internet."

---

## SLIDE 5: "What if you had a team?"

*Pause. Look at the audience.*

"What if it didn't have to?"

*Click.*

"What if you had a team?"

*Let the silence hold for three full seconds.*

---

## SLIDE 6: Title Reveal

"Today, we're introducing the Claude Code Agent Swarm."

*Pause.*

"Multiple AI agents. Working together. In your terminal. Right now. Today."

---

## SLIDE 7: Architecture Diagram

"Let me show you what this looks like.

You have a tmux session. Inside it, windows. An admin agent that understands your project. Worker agents — each one focused on a different part of your codebase. And in the center, a shared coordination layer where they pass information back and forth.

The admin reads your design document. It breaks the work into pieces. It assigns each piece to a worker. The workers build. They report back. The admin coordinates.

It's not a pipeline. It's a *team*."

---

## SLIDE 8: "Three beautiful ideas."

"And it's built on three beautiful ideas. All of them already on your machine. All of them free."

---

## SLIDE 9: Tmux

"Number one. Tmux.

Now, some of you have never heard of tmux. That's okay. It's been quietly running the world's servers for fifteen years. Every DevOps engineer knows it. Every sysadmin depends on it. And today, it becomes the foundation of something entirely new.

Tmux is a terminal multiplexer. What that means — in plain language — is that it keeps your terminal sessions alive. You can close your laptop. You can go home. You can come back tomorrow morning. And your agents... are still working. Still thinking. Still building.

They don't time out. They don't crash. They don't quit. Tmux won't let them."

---

## SLIDE 10: Tmux — What It Is

"For those who've never seen it — this is all it takes."

*Point to the code.*

"Brew install tmux. One line. Then `tmux new`. You're in. See that green bar at the bottom? That means everything above it is persistent. Close the window. Open a new one. `tmux attach`. You're right back. Nothing lost."

*Pause.*

"Insanely simple."

---

## SLIDE 11: Tmux Keys

"And you only need six keystrokes. I'm going to put them up here. That's your entire vocabulary.

Control-b, then a letter. Two keystrokes. New window. Switch windows. Split the screen. Move around. Detach — which means walk away while everything keeps running.

That's it. You could teach this to someone in sixty seconds. And that's the point. The best tools are the ones you can learn between meetings."

---

## SLIDE 12: Git Worktrees

"Number two. Git worktrees.

Here's the problem with multiple agents. If they're all editing the same files in the same directory... chaos. Agent one changes line 47. Agent two overwrites it. You end up with garbage.

Git worktrees solve this elegantly. One command creates a complete, independent copy of your codebase on its own branch. Every agent gets its own desk. Its own files. Its own reality. When they're done, you merge. Clean.

This has been in git for years. Almost nobody uses it. We're about to change that."

---

## SLIDE 13: Worktrees Visual

*Point to the code.*

"One command. Full independent copy. Worker one edits here. Worker two edits there. They could both change the same file and it doesn't matter. Separate branches. Separate worlds. Merge when you're ready.

It's like giving each developer their own desk instead of sharing one keyboard."

---

## SLIDE 14: send-keys

"Number three. And this is the one that changes everything.

Two words. send. keys.

Tmux has a feature — and I don't think the person who wrote it realized what they were creating — that lets any program type into any other terminal window. Read that again. Any program. Can type into. Any other window.

That means one AI agent can send instructions directly to another AI agent. No API. No message bus. No framework. One agent literally types into another agent's session. They talk."

*Pause. Let this land.*

"When I first saw this work, I got goosebumps."

---

## SLIDE 15: send-keys Code

*Point to the code.*

"This is how agents talk to each other. The admin sends a task to worker one. Two lines. One to type the message. One to press enter. That's the entire communication protocol.

No API. No websockets. No message queue. Just one terminal typing into another.

You know what I love about this? It's the simplest possible thing that could work. And it works beautifully."

---

## SLIDE 16: The Three Together

*Slow, deliberate.*

"Tmux keeps them alive. Worktrees keep them safe. send-keys lets them think together.

Three old tools. One new idea. And suddenly you have something that didn't exist before."

---

## SLIDE 17: How It Comes Together

"So here's how the whole thing comes together.

You type one command. One. The system creates worktrees — independent copies for each agent. It launches Claude Code in every window. It gives the admin its instructions.

Then you talk to the admin. You say: 'Build me a strategy game from this design document.' And the admin reads your document. It breaks the work into pieces. Galaxy generation goes to worker one. Combat system goes to worker two. Data models go to worker three.

And then..."

*Pause.*

"...you go get coffee. They keep working. Come back whenever you want."

---

## SLIDE 18: Real Project

"We didn't just theorize about this. We built a real project with it.

Nova Imperium. A 4X space strategy game inspired by Master of Orion. Three hundred and ninety-four lines of game design document. Eight alien races, each with unique mechanics. Two hundred technologies. Procedural galaxy generation. Tactical fleet combat.

We pointed the admin at the design doc and said: go.

Worker one built the galaxy generator — star systems, planet classification, procedural maps. Worker two built the ship designer and all eight races. The admin coordinated. Tracked progress. Managed the merge."

*Gesture broadly.*

"All at the same time."

---

## SLIDE 19: Results

"All three workers. Coding simultaneously. On different parts of the codebase. Without stepping on each other.

This is not theoretical. This happened. On a laptop."

---

## SLIDE 20: The Numbers

"Let me put some numbers on this.

Three-x parallel throughput. Three agents, three tasks, same clock time.

Zero merge conflicts. Worktrees make collisions structurally impossible.

Infinite session lifetime. Detach. Sleep. Fly across the country. They're still building when you land.

And the cost of the orchestration layer? Zero dollars. Tmux and git are free. They've been free for fifteen years. They'll be free forever."

---

## SLIDE 21: vs Competitors

"Now, other tools give you background agents. You've seen them. You hit a button, an agent spins up, it does its thing, it comes back with a result.

That's fine. That's useful.

But our agents talk to each other."

*Pause.*

"Background agents are isolated processes. They run. They finish. They report. But they can't coordinate in real time. They can't ask each other questions. They can't adapt mid-task based on what another agent discovered.

Our agents are a conversation. Not a batch job. And that difference... is everything."

---

## SLIDE 22: Self-Healing

"And here's the part that gets really interesting.

We built a monitor agent. It watches every window. Every two minutes, it checks: is the agent alive? Is it working? And if one crashes — maybe it hit an error, maybe it finished and stopped — the monitor restarts it. Automatically. Same instructions. Same context.

Agents that keep each other alive. Indefinitely."

*Pause.*

"You build a system that maintains itself. Think about that."

---

## SLIDE 23: Simplicity

"The entire system is one shell script.

I want you to really hear that. One script. No Docker. No Kubernetes. No cloud. No framework. No dependencies you don't already have.

The best architecture is the one you don't have to maintain. We didn't add complexity. We removed it. Until only the essential parts remained."

---

## SLIDE 24: Getting Started

"Getting started takes thirty seconds.

Brew install tmux. Run the swarm script. Attach. Tell the admin what you want to build. That's it."

*Point to each line.*

"Four commands. From zero to a working AI development team."

---

## SLIDE 25: What You Can Build

"Now think about what you can build with this.

Full-stack applications. One agent on the frontend. One on the API. One on the database. All building at the same time.

Games. Procedural generation agent. Combat agent. UI agent. All working in parallel on an actual game.

Massive refactorings. Break a million-line codebase into zones. Each agent takes a zone. What used to take a sprint takes an afternoon.

Research and implementation. One agent reads documentation and explores APIs. Another implements based on what the first one finds. In real time."

---

## SLIDE 26: The Philosophy

*Slow. Almost quiet.*

"The people who are crazy enough to think they can build software with a swarm of AI agents..."

*Pause.*

"...are the ones who will."

---

## SLIDE 27: "Oh, and..."

*Almost offhand. Turn as if walking away, then stop.*

"Oh, and..."

---

## SLIDE 28: One More Thing

*Turn back. Smile slightly.*

"One more thing.

The swarm script — the tool that orchestrates all of this — was built by a swarm.

We used Claude Code inside tmux to build the tool that runs Claude Code inside tmux."

*Pause.*

"The system created itself."

*Let that land. Five seconds of silence.*

---

## SLIDE 29: Closing

"Claude Code Agent Swarm.

Tmux. Git worktrees. send-keys.

That's it. That's the whole thing."

*Walk offstage. No goodbye. No thank you. Just walk.*

---

## SLIDE 30: Black

*Music fades. Lights come up slowly.*

---

# Stage Directions

## Pacing
- Never rush. Every pause is intentional.
- The audience needs time to absorb each idea before the next one lands.
- When a slide has just a few words, let them sit for 3-5 seconds before speaking.
- After a big reveal (slide 6, 14, 28), count to five silently before continuing.

## Movement
- Start center stage. Stay there for slides 1-6.
- For the demo/technical slides (7-15), move slightly toward the screen. Point at specific code.
- For philosophy slides (16, 23, 26), move back to center. Make eye contact with the audience.
- For "one more thing" (27-28), physically turn away, stop, turn back.

## Voice
- Default tone: conversational, confident, slightly understated.
- For pain points (slides 3-4): slower, with weight. Like you're describing something that's been bothering you.
- For reveals (slides 6, 14, 28): slightly louder, then immediately drop to quiet. Contrast is power.
- For technical slides: brisk, efficient. Don't linger. The audience gets it.
- For philosophy (26): almost a whisper. Like sharing a secret.

## Slides
- Advance on your rhythm, not the audience's.
- Some slides should appear BEFORE you start speaking about them (anticipation).
- Some slides should appear AFTER you set them up verbally (payoff).
- Never read the slide. The slide is a backdrop. You are the show.

## The "One More Thing"
- This must feel spontaneous. Like you almost forgot.
- The turn-away-and-stop-and-turn-back is critical. Practice it.
- The silence after "The system created itself" is the climax of the entire talk.

## What NOT to Do
- Don't say "um" or "so." Silence is always better.
- Don't apologize for anything technical. Own it.
- Don't ask "Does that make sense?" It undermines authority.
- Don't end with Q&A. End with the black screen. Leave them wanting more.
