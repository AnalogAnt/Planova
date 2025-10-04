# Planova VS Code Extension

Planova is a Visual Studio Code extension that helps you generate detailed project plans for software development tasks using Google Generative AI (Gemini models).

## Features
- Command: `Create a Plan` (Command Palette: `planova.createPlan`)
- Prompts you for a task description
- Uses Google Generative AI to break down your task into actionable steps
- Outputs a Markdown project plan in a new editor tab

## Requirements
- Visual Studio Code v1.80.0 or higher
- A valid Google Generative AI API key

## Setup
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Build the extension:**
   ```sh
   npm run build
   ```
3. **Set your API key:**
   - Open VS Code settings (`Ctrl+,`)
   - Search for `Planova`
   - Enter your Google GenAI API key in the `planova.apiKey` field

## Usage
1. Press `F5` to launch the Extension Development Host.
2. Open the Command Palette (`Ctrl+Shift+P`), type `Create a Plan`, and select it.
3. Enter your software task description (e.g., "Create a simple todo app in React").
4. Wait for the AI to generate a project plan. The plan will open in a new Markdown tab.

## Troubleshooting
- **Command not found:**
  - Make sure you have built the extension and are running in the Extension Development Host.
  - Check that your `package.json` has the correct `activationEvents` and `main` fields.
- **API errors:**
  - Ensure your API key is valid and has access to the Gemini models.
  - If you see a model not found error, try changing the model name in `src/index.ts` to a supported one (e.g., `gemini-2.5-flash`).

## Development
- Source code is in the `src/` directory.
- Compiled output is in the `dist/` directory.
- Main entry point: `src/index.ts`

## License
ISC
