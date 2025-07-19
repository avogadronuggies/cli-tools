import * as vscode from "vscode";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const provider = new TerminalHistoryProvider();
  vscode.window.registerTreeDataProvider("cliToolSuite.commandsView", provider);

  // Register a refresh command
  context.subscriptions.push(
    vscode.commands.registerCommand("cliToolSuite.refreshCommandsView", () => {
      provider.refresh();
    })
  );

  // Watch the PowerShell history file for changes and refresh the view
  const psHistoryPath = path.join(
    os.homedir(),
    "AppData",
    "Roaming",
    "Microsoft",
    "Windows",
    "PowerShell",
    "PSReadline",
    "ConsoleHost_history.txt"
  );
  if (fs.existsSync(psHistoryPath)) {
    fs.watch(psHistoryPath, { persistent: false }, () => {
      provider.refresh();
    });
  }

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "cliToolSuite.copyCommand",
      (cmd: string) => {
        const terminal =
          vscode.window.activeTerminal || vscode.window.createTerminal();
        terminal.show();
        terminal.sendText(cmd);
      }
    )
  );
}

export function deactivate() {}

class TerminalHistoryItem extends vscode.TreeItem {
  override command?: vscode.Command;
  constructor(public readonly commandText: string) {
    super(commandText, vscode.TreeItemCollapsibleState.None);
    this.tooltip = commandText;
    this.description = commandText;
    this.contextValue = "terminalCommand";
    this.command = {
      command: "cliToolSuite.copyCommand",
      title: "Copy Command",
      arguments: [commandText],
    };
  }
}

class TerminalHistoryProvider
  implements vscode.TreeDataProvider<TerminalHistoryItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    TerminalHistoryItem | undefined | void
  > = new vscode.EventEmitter<TerminalHistoryItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<
    TerminalHistoryItem | undefined | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: TerminalHistoryItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Promise<TerminalHistoryItem[]> {
    const history = getTerminalHistory();
    return Promise.resolve(history.map((cmd) => new TerminalHistoryItem(cmd)));
  }
}

function getTerminalHistory(): string[] {
  // PowerShell history file location
  const userHome = os.homedir();
  const psHistoryPath = path.join(
    userHome,
    "AppData",
    "Roaming",
    "Microsoft",
    "Windows",
    "PowerShell",
    "PSReadline",
    "ConsoleHost_history.txt"
  );
  if (!fs.existsSync(psHistoryPath)) return [];
  const content = fs.readFileSync(psHistoryPath, "utf-8");
  // Return last 100 unique commands, most recent last
  return Array.from(new Set(content.split(/\r?\n/).filter(Boolean)))
    .slice(-100)
    .reverse();
}
