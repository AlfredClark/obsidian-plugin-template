import { getLanguage, Notice, Plugin } from "obsidian";
import {
  DEFAULT_SETTINGS,
  type TemplatePluginSettings,
  TemplatePluginSettingTab,
} from "./core/settings";
import { createCommands } from "./core/commands";
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

    /** Ribbon Icon **/
    this.addRibbonIcon("dice", "Sample", (_evt: MouseEvent) => {
      new Notice("This is a notice!");
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
