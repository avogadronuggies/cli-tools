# CLI Tool Suite Helper VS Code Extension

This extension displays your recent PowerShell terminal commands in a VS Code view, allowing you to quickly send them to the integrated terminal with a click.

## Features

- Shows your recent PowerShell terminal history in a custom VS Code view
- Click any command to send it to the integrated terminal
- Helps you reuse, recall, and manage your command-line workflow

## Usage

1. Install and open this extension in VS Code.
2. Open the Explorer sidebar and find the "CLI Tool Suite Commands" view.
3. Browse your recent terminal commands.
4. Click a command to send it to the active terminal.

## How It Works

- The extension reads your PowerShell command history from:
  `C:\Users\<YourUser>\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt`
- It displays the last 100 unique commands (most recent first).
- Only PowerShell is supported at this time.

## Development

- Written in TypeScript using the VS Code Extension API.
- To test locally, run `npm install` and `npm run compile`, then launch the extension in a VS Code Extension Development Host.

## Roadmap

- [ ] Support for other shells (CMD, Git Bash, WSL, etc.)
- [ ] Search and filter history
- [ ] Drag-and-drop to terminal
- [ ] Pin or favorite commands

## License

MIT
