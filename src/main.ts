import { getLanguage, Notice, Plugin } from "obsidian";
import {
  DEFAULT_SETTINGS,
  type TemplatePluginSettings,
  TemplatePluginSettingTab,
} from "./core/settings";
import { createCommands } from "./core/commands";
import { VIEW_TYPE, TemplateSidebarView } from "./core/views";
import { setLocale, baseLocale, toLocale } from "./i18n/paraglide/runtime";

/**
 * Main plugin class. Obsidian calls {@link onload} when the plugin is enabled.
 */
export default class TemplatePlugin extends Plugin {
  settings: TemplatePluginSettings;

  async onload() {
    await this.loadSettings();

    /** I18n **/
    if (this.settings.locale === "app") {
      await setLocale(toLocale(getLanguage()) ?? baseLocale, { reload: false });
    } else {
      await setLocale(toLocale(this.settings.locale) ?? baseLocale, { reload: false });
    }

    /** Sidebar View **/
    this.registerView(VIEW_TYPE, (leaf) => new TemplateSidebarView(leaf));

    /** Ribbon Icon **/
    this.addRibbonIcon("dice", "Open sidebar", (_evt: MouseEvent) => {
      void this.activateView();
    });

    /** Status Bar **/
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("Status bar text");

    /** Commands **/
    for (const cmd of createCommands(this.app)) {
      this.addCommand(cmd);
    }

    /** SettingTab  **/
    this.addSettingTab(new TemplatePluginSettingTab(this.app, this));

    /** Register **/
    this.registerDomEvent(activeDocument, "click", (_evt: MouseEvent) => {
      new Notice("Click");
    });
    this.registerInterval(window.setInterval(() => new Notice("Interval notice"), 5 * 60 * 1000));
  }

  async activateView(): Promise<void> {
    const { workspace } = this.app;

    const existing = workspace.getLeavesOfType(VIEW_TYPE)[0];
    if (existing) {
      await workspace.revealLeaf(existing);
      return;
    }

    const leaf = workspace.getRightLeaf(false);
    if (leaf) {
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
      await workspace.revealLeaf(leaf);
    }
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
