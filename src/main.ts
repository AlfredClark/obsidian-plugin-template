import { App, Editor, getLanguage, MarkdownView, Modal, Notice, Plugin } from "obsidian";
import {
  DEFAULT_SETTINGS,
  type TemplatePluginSettings,
  TemplatePluginSettingTab,
} from "./settings";
import { setLocale, baseLocale, toLocale } from "./i18n/paraglide/runtime";

export default class TemplatePlugin extends Plugin {
  settings: TemplatePluginSettings;

  async onload() {
    await this.loadSettings();
    if (this.settings.locale === "app") {
      await setLocale(toLocale(getLanguage()) ?? baseLocale, { reload: false });
    } else {
      await setLocale(toLocale(this.settings.locale) ?? baseLocale, { reload: false });
    }

    this.addRibbonIcon("dice", "Sample", (_evt: MouseEvent) => {
      new Notice("This is a notice!");
    });

    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("Status bar text");

    this.addCommand({
      id: "open-modal-simple",
      name: "Open modal (simple)",
      callback: () => {
        new TemplatePluginModal(this.app).open();
      },
    });

    this.addCommand({
      id: "replace-selected",
      name: "Replace selected content",
      editorCallback: (editor: Editor, _view: MarkdownView) => {
        editor.replaceSelection("Sample editor command");
      },
    });

    this.addCommand({
      id: "open-modal-complex",
      name: "Open modal (complex)",
      checkCallback: (checking: boolean) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView) {
          if (!checking) {
            new TemplatePluginModal(this.app).open();
          }
          return true;
        }
        return false;
      },
    });

    this.addSettingTab(new TemplatePluginSettingTab(this.app, this));

    this.registerDomEvent(activeDocument, "click", (_evt: MouseEvent) => {
      new Notice("Click");
    });

    this.registerInterval(window.setInterval(() => new Notice("Interval notice"), 5 * 60 * 1000));
  }

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      (await this.loadData()) as Partial<TemplatePluginSettings>,
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class TemplatePluginModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.setText("Woah!");
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
