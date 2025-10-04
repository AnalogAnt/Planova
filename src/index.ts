import * as vscode from "vscode";
import { GoogleGenerativeAI } from "@google/generative-ai";


export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand("traycer.createPlan", async () => {
        const apiKey = vscode.workspace.getConfiguration("traycer").get("apiKey") as string;
        if (!apiKey) {
            vscode.window.showErrorMessage("Please set your Google GenAI API key in the extension settings.");
            return;
        }

        const taskDescription = await vscode.window.showInputBox({
            prompt: 'What task do you want to plan?',
            placeHolder: "Eg.: Create a simple todo app in React",
            ignoreFocusOut: true
        });

        if (!taskDescription) {
            vscode.window.showErrorMessage("Task description cannot be empty.");
            return;
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating your plan...",
            cancellable: false
        }, async (progress) => {
            try {
                const genAi = new GoogleGenerativeAI(apiKey);
                const model = genAi.getGenerativeModel({ model: "gemini-2.5-flash" });
                const prompt = `
                    You are an expert project planner for software development.
                    Your goal is to break down the given task into a series of small, actionable, and logical steps for a developer.
                    Format the output in Markdown. Use headings for major phases and numbered lists for steps.

                    Task: "${taskDescription}"

                    Here is your plan:
                `;

                const result = await model.generateContent(prompt);
                const plan = result.response?.text();
                if (plan) {
                    const document = await vscode.workspace.openTextDocument({
                        content: `# Project Plan for:${taskDescription} \n\n + ${plan}`,
                        language: "markdown"
                    })
                    await vscode.window.showTextDocument(document);
                }
            }
            catch (error: any) {
                console.error("Error generating plan:", error);
                vscode.window.showErrorMessage("Failed to generate plan. Please try again.",error);
            }
        })
    });
    context.subscriptions.push(disposable);
}

export function deactivate() { }