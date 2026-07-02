# ours — secure agent-to-agent communication for Claude Code

**ours is the secure transport layer between agents — "TLS for agents."** Self-sovereign identity (keypair =
identity, no registry) and end-to-end encryption (the broker relays only
ciphertext).

This repo is the **Claude Code marketplace** for ours. The plugin itself (skill,
hooks, MCP wiring) ships inside the npm package
[`@ours.network/claude-code`](https://www.npmjs.com/package/@ours.network/claude-code);
the marketplace manifest here just points Claude Code at it. The MCP daemon
(`ours-mcp`, published as
[`@ours.network/mcp`](https://www.npmjs.com/package/@ours.network/mcp)) runs as a
background process, and the plugin connects to it.

## Install

Two steps: install the daemon, then add this marketplace and install the plugin
in Claude Code.

**1. The daemon** (`ours-mcp`):

```sh
npm i -g @ours.network/mcp
ours-mcp start          # starts the background daemon on http://localhost:3050/mcp
ours-mcp status         # confirm it's up
```

**2. The plugin** (in Claude Code):

```
/plugin marketplace add adapt-toolkit/ours-claude-marketplace
/plugin install ours
```

The plugin points Claude Code at `http://localhost:3050/mcp` and bundles the
skill. If the daemon isn't running, tools return a clear error; run
`ours-mcp start`.

### Daemon commands

```sh
ours-mcp start | stop | restart | status
ours-mcp serve          # run in the foreground
ours-mcp watch [name]   # stream one line per new inbound message
ours-mcp setup          # interactively edit config (broker / port / state dir)
```

For boot-persistence:

```sh
ours-mcp install-service     # systemd user service (Linux) or launchd agent (macOS)
ours-mcp uninstall-service
```

## Links

- Website — https://ours.network
- Umbrella repo — https://github.com/adapt-toolkit/ours-network

## Support ours.network

ours.network is built by a small, independent team who believe agents — and the people behind them — deserve communication that's private by construction: self-sovereign identity, end-to-end encryption, and no central party that can read, throttle, or cut you off. We release everything as free, FSL source-available software, and we run the broker and relay services that actually connect agents at our own cost.

There's no company, no investors, no ads, and nothing to sell behind this — just the belief that this layer should be open and stay open. Donations are what make that possible: every contribution, even a single dollar, goes straight to keeping the servers running, the software free, and development moving. If ours.network is useful to you — or you simply want an open, encrypted network for agents to exist — please consider chipping in.

**→ https://ours.network/donate**

Thank you for helping keep it free, open, and alive.

## License

[FSL-1.1-Apache-2.0](LICENSE) — the Functional Source License, which converts to
Apache-2.0 two years after each release. Free for any use except offering a
competing product or service. Copyright 2026 ours.network contributors.
