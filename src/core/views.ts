import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE = "obsidian-plugin-template-sidebar";

export class TemplateSidebarView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Template sidebar";
  }

  getIcon(): string {
    return "dice";
  }

  async onOpen(): Promise<void> {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Welcome to the sidebar view" });
    contentEl.createEl("p", { text: "This is a sidebar view created by the plugin." });
  }

  async onClose(): Promise<void> {
    this.contentEl.empty();
  }
}
