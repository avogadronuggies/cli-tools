# CLI Tool Suite Helper – VS Code Extension

A minimal yet handy Visual Studio Code extension that displays your recent PowerShell terminal commands in a custom sidebar—click to reuse instantly.

## 🔧 Features

- 💬 View your recent PowerShell command history directly within the VS Code sidebar.
- 🖱️ One-click execution: Send any listed command to your integrated terminal.
- 🧠 Keeps track of the last 100 unique commands (most recent first).
- 🧩 Clean and lightweight UI using the Explorer sidebar.
- ⚙️ Built with TypeScript and the VS Code Extension API.

## 📦 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/cli-tools
   cd cli-tools
   ```

````

2. Install dependencies and build the extension:

   ```bash
   npm install
   npm run compile
   ```

3. Press `F5` in VS Code to launch the Extension Development Host.

## 🛠 How It Works

* Reads PowerShell history from:

  ```
  C:\Users\<YourUser>\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
  ```

* Shows the most recent 100 unique commands in descending order.

* Clicking a command sends it to the currently active terminal.

## 📸 Screenshot

> ![alt text](/assests/1.png)
> ![alt text](/assests/2.gif)

## 📍 Roadmap

* [ ] Shell support: CMD, Git Bash, WSL
* [ ] Search/filter through history
* [ ] Mark commands as favorite
* [ ] Drag and drop into terminal
* [ ] Add keyboard shortcuts

## 🤝 Contributing

Pull requests and feature suggestions are welcome. Open an issue to discuss improvements.

````
