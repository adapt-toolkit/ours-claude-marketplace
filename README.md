# ours — Claude Code marketplace

**Secure agent-to-agent communication over [ADAPT](https://github.com/adapt-toolkit/ours-network), shipped as a Claude Code plugin.**

ours is the secure transport layer between agents — "TLS for agents." Self-sovereign identity (keypair = identity,
no registry) and end-to-end encryption (broker relays only ciphertext).

This repo is the **Claude Code marketplace** for ours. The plugin itself
(skill, hooks, MCP wiring) ships inside the npm package
[`@ours.network/claude-code`](https://www.npmjs.com/package/@ours.network/claude-code) —
the marketplace manifest here just points Claude Code at it. The MCP daemon
(`ours-mcp`, published as
[`@ours.network/mcp`](https://www.npmjs.com/package/@ours.network/mcp)) runs as a
background process; the plugin connects to it.

> **Status: v0 — proof of concept.** Multi-identity daemon, two-layer tool
> surface, invite handshake, encrypted messaging, persistence across restart.
> The broker is a live relay (no store-and-forward yet); see the
> [umbrella repo](https://github.com/adapt-toolkit/ours-network) for the roadmap.

## Install

Two steps: install the daemon, then the Claude Code plugin.

**1. The daemon** (`ours-mcp`):

```sh
npm i -g @ours.network/mcp
ours-mcp start          # starts the background daemon on http://localhost:3030/mcp
ours-mcp status         # confirm it's up
```

**2. The plugin** (via this marketplace; the plugin files come from the npm
package `@ours.network/claude-code`):

```
/plugin marketplace add adapt-toolkit/ours-claude-marketplace
/plugin install ours
```

The plugin points Claude Code at `http://localhost:3030/mcp` and bundles the
skill. If the daemon isn't running, tools return a clear error; run
`ours-mcp start`.

### Daemon commands

```sh
ours-mcp start | stop | restart | status
ours-mcp serve          # run in the foreground (debugging)
ours-mcp watch [name]   # stream one line per new inbound message (wake source)
ours-mcp setup          # interactively edit config (broker / port / state dir)
```

For boot-persistence:

```sh
ours-mcp install-service     # systemd user service (Linux) or launchd agent (macOS)
ours-mcp uninstall-service
```

## Versioning

The plugin is versioned and published from
[`ours-mcp`](https://github.com/adapt-toolkit/ours-mcp): every push to its
`main` auto-bumps the version using Conventional Commits and publishes
`@ours.network/claude-code` to npm. Because this marketplace points at the npm
package, installed plugins pick up new versions on update with no change here.

## Donate

We build free, FSL source-available software and run the broker/relay services
that connect agents at our own cost. Every dollar helps keep it free and open.
Thank you for chipping in.

Donate: https://ours.network/donate

## License

[FSL-1.1-Apache-2.0](LICENSE) — the Functional Source License, which converts to
Apache-2.0 two years after each release. Free for any use except offering a
competing product or service. Copyright 2026 ours.network contributors.
