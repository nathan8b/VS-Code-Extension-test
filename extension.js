// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "test" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('test.displayMessage', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('This is a test message!');
	});

	//command to copy text to a new file
	const copy = vscode.commands.registerCommand('extension.copyToFile', async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage('No editor is active.');
			return;
		  }

		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		if (!selectedText) {
			vscode.window.showErrorMessage('No text selected.');
			return;
		  }

		const currentFilePath = editor.document.uri.fsPath;
		const currentDirectory = require('path').dirname(currentFilePath);
	
		const newFileName = await vscode.window.showInputBox({
		prompt: 'Enter new file name',
		placeHolder: 'newFile.js'
		});

		if (!newFileName) {
			vscode.window.showErrorMessage('File name cannot be empty.');
			return;
		  }	

		const newFilePath = require('path').join(currentDirectory, newFileName);

		const fs = require('fs');
		fs.writeFile(newFilePath, selectedText, (err) => {
		if (err) {
			vscode.window.showErrorMessage('Error creating file: ' + err.message);
		} else {
			vscode.window.showInformationMessage(`File created: ${newFilePath}`);
			vscode.workspace.openTextDocument(newFilePath).then((doc) => {
			vscode.window.showTextDocument(doc);
			});
		}
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(copy);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
