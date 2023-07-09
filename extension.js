
const vscode = require('vscode');
const axios = require('axios');
const https = require('https');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	https.globalAgent.options.rejectUnauthorized = false;

	console.log('Congratulations, your extension "vscode-palm" is now active!');
	
	let disposable = vscode.commands.registerCommand('vscode-palm.AnalyseCode',async function () {
		
		const panel = vscode.window.createWebviewPanel(
			"analyseCode",
			"Analyse Code",
			vscode.ViewColumn.One
		)
		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		const url = "http://127.0.0.1:8000/analyse";
		
		if (selection && !selection.isEmpty){
			const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
			const highlighted = editor.document.getText(selectionRange);
			axios.post(url,{
				"code": highlighted,
				"language": "python"
			  }).then((result) => {
				panel.webview.html = getWebviewContent(result.data);
			  }).catch((err) => {
				panel.webview.html = getWebviewContent(err.data);
			  });
			
		}
		
	});
	
	context.subscriptions.push(disposable);
}

function getWebviewContent(data) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <h1>${data}</h1>
  </body>
  </html>`;
  }
  
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
