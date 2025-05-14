# Shroud

**Shroud** is a lightweight userscript against behavioral fingerprinting by obfuscating typing, scrolling, and timing behavior.<br>
By introducing non-uniform jitter and subtle noise, *Shroud* prevents websites from accurately profiling users based on their behavioral patterns, while not compromising UX.

## Features

- **Randomized Timing Jitter**: Introduces varying amounts of noise to timing functions (`performance.now()`, `Date.now()`, and `Date.prototype.getTime()`) to break predictable patterns.
- **Dynamic Jitter Scaling**: Jitter intensity changes over time, making the script's actions harder to detect, denoise or filter.
- **Scroll Fingerprinting Protection**: Subtle randomization of scroll positions, mitigating the risk of tracking based on scroll behavior.
- **Typing Behavior Obfuscation**: Lightweight jitter introduced to typing timings to obscure typing patterns, enhancing privacy without affecting the user experience.
- **Minimal Performance Overhead**: The script is optimized for high efficiency.

## How It Works

- **Jitter Injection**: The core of this userscript is its dynamic jitter generator, which alters time-sensitive functions (like `performance.now()`, `Date.now()`, and `getTime()`) by introducing randomness. This ensures that each call is slightly different, preventing predictable timing patterns.
- **Scroll and Typing Obfuscation**: By adding subtle noise to scrolling and typing behaviors, we make it difficult for trackers to correlate these events across sessions, websites and users.
- **Dynamic Behavior Over Time**: Periodically, the jitter is scaled to avoid repetitive patterns that could be recognized and mitigated by tracking systems.

## Limitations

- **Potential Site Breakage**: Some websites may rely on precise timings for functionality. While this userscript minimizes perceivable impact, occasional issues may arise.

## License

MIT. See [LICENSE](LICENSE) for details.

This tool is a research project intended to showcase the obfuscation of timing and scrolling behavior. It is not intended for applied use.