import * as fs from "fs";
import * as path from "path";

// Scrape CLI commands from the CLI Tool Suite src/index.ts file
export function getCliCommands(): { name: string; description: string }[] {
  const cliPath = path.resolve(__dirname, "../../src/index.ts");
  if (!fs.existsSync(cliPath)) return [];
  const content = fs.readFileSync(cliPath, "utf-8");
  const commandRegex =
    /\.command\(['"](.*?)['"]\)\s*\.description\(['"](.*?)['"]\)/g;
  const commands: { name: string; description: string }[] = [];
  let match;
  while ((match = commandRegex.exec(content))) {
    commands.push({ name: match[1], description: match[2] });
  }
  return commands;
}
