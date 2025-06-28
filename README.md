# Shroud

A userscript limiting behavioral fingerprinting by obfuscating typing, scrolling, and timing behavior.<br>
By introducing non-uniform jitter and subtle noise, *Shroud* prevents websites from accurately profiling users based on their behavioral patterns, while not compromising on UX.

## Features

- **Randomized Timing Jitter**: Introducing varying intensities of noise to timing functions (`performance.now()`, `Date.now()`, and `Date.prototype.getTime()`) to break predictable patterns
- **Dynamic Jitter Scaling**: Jitter intensity changes over time, making the script's actions harder to detect, denoise or filter
- **Scroll Fingerprinting Protection**: Subtle randomization of scroll positions, mitigating the risk of tracking based on scroll behavior
- **Typing Behavior Obfuscation**: Jitter introduced to typing timings to obscure typing patterns, enhancing privacy without affecting the user experience

## How It Works

The core of this userscript is a dynamic jitter generator, which introduces randomness in e.g. scroll behavior.
This ensures that each action is slightly different, preventing predictable timing patterns.
This would however be susceptible to denoising efforts.
Addressing this, periodically, the jitter is scaled to avoid repetitive patterns that could be recognized and mitigated by tracking systems.

## Limitations

Some websites may rely on precise timings for functionality. While this userscript minimizes perceivable impact, occasional issues may arise.

## License

MIT. See [LICENSE](LICENSE) for details.

This tool is a research project intended to showcase the obfuscation of timing and scrolling behavior.<br>
It is not intended for applied use.
