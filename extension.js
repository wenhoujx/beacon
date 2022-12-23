
const vscode = require('vscode');

const isDebug = false
const styles = [
	vscode.window.createTextEditorDecorationType(
		{
			color: '#fff',
			backgroundColor: '#ffbd2a',
			overviewRulerColor: 'rgba(255,189,42,0.8)',
		}
	),
]
function beacon() {
	vscode.window.onDidChangeActiveTextEditor(editor => {
		isDebug && console.log('onDidChangeActiveTextEditor')
		if (!editor) {
			return
		}
		_setBeacon(editor)
	})
	vscode.window.onDidChangeTextEditorVisibleRanges(event => {
		isDebug && console.log('onDidChangeTextEditorVisibleRanges')
		_setBeacon(event.textEditor)
	})
}

function _setBeacon(editor) {
	const lineNumber = editor.selection.start.line
	isDebug && console.log(`fire beacon ${lineNumber}`)
	editor.setDecorations(styles[0],
		// mark the whole line 
		[new vscode.Range(
			new vscode.Position(lineNumber, 0),
			new vscode.Position(lineNumber, 100),
		)])

	setTimeout(() => _clearBeacon(), 100);
}

function _clearBeacon() {
	vscode.window.activeTextEditor.setDecorations(styles[0], [])
}

function activate(context) {
	beacon()
	// context.subscriptions.push(vscode.commands.registerCommand('beacon.where-cursor', () => beacon()));
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
