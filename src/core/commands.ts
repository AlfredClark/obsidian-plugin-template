import { App, Editor, MarkdownView, type Command, Modal } from "obsidian";

/**
 * Returns the plugin's command palette entries.
 * Each command is registered via {@link Plugin.addCommand} in `main.ts`.
 */
export function createCommands(app: App): Command[] {
  return [
    {
      id: "open-modal-simple",
      name: "Open modal (simple)",
      callback: () => {
        new Modal(app).setTitle("Open modal").setContent("Open modal (simple)").open();
      },
    },
    {
      id: "replace-selected",
      name: "Replace selected content",
      editorCallback: (editor: Editor, _view: MarkdownView) => {
        editor.replaceSelection("Sample editor command");
      },
    },
    {
      id: "open-modal-complex",
      name: "Open modal (complex)",
      checkCallback: (checking: boolean) => {
        const markdownView = app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView) {
          if (!checking) {
            new Modal(app).setTitle("Open modal").setContent("Open modal (complex)").open();
          }
          return true;
        }
        return false;
      },
    },
  ];
}
