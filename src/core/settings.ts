import { App, PluginSettingTab, Setting } from "obsidian";
import type TemplatePlugin from "../main";
import LocaleSettings from "../components/settings/LocaleSettings.svelte";
import { HTMLComponent, ObsidianSvelteComponent } from "../components/types";
import { m } from "../i18n/paraglide/messages";
import { setLocale, toLocale, baseLocale } from "../i18n/paraglide/runtime";

/** Persisted plugin settings stored via {@link Plugin.loadData} / {@link Plugin.saveData}. */
export interface TemplatePluginSettings {
  locale: string;
}

/** Default settings applied on first load or when a new setting key is added. */
export const DEFAULT_SETTINGS: TemplatePluginSettings = {
  locale: "app",
};

/**
 * Settings tab rendered in Obsidian's settings panel.
 * Uses a Svelte component via {@link ObsidianSvelteComponent} for the locale picker.
 */
export class TemplatePluginSettingTab extends PluginSettingTab {
  activeSubTab: string;
  plugin: TemplatePlugin;
  components: ObsidianSvelteComponent[] | undefined;

  constructor(app: App, plugin: TemplatePlugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.components = [];
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    // Tab Bar
    const tabBar = containerEl.createEl("div", { cls: "my-tab-bar" });
    const contentEl = containerEl.createEl("div", { cls: "my-tab-content" });

    // Show Tab
    const showTab = (tab: string) => {
      this.activeSubTab = tab;
      contentEl.empty();
      if (tab === "general") {
        // General Settings
        new Setting(contentEl)
          .setName(m.settings_language())
          .setDesc(m.settings_language_desc())
          .addComponent((el) => {
            const comp = new ObsidianSvelteComponent(el, LocaleSettings, {
              locale: this.plugin.settings.locale,
              onLocaleChange: async (locale: string) => {
                this.plugin.settings.locale = locale;
                await setLocale(toLocale(locale) ?? baseLocale, { reload: false });
                void this.plugin.saveSettings();
                this.display();
              },
            });
            this.components?.push(comp);
            return comp;
          });
      } else if (tab === "about") {
        // About Settings
        new Setting(contentEl).setName(m.settings_version()).addComponent((el) => {
          return new HTMLComponent(el, "span", { text: this.plugin.manifest.version });
        });
      }
    };

    // Tab Buttons
    const generalBtn = tabBar.createEl("button", { text: m.settings_general() });
    generalBtn.onclick = () => showTab("general");
    const aboutBtn = tabBar.createEl("button", { text: m.settings_about() });
    aboutBtn.onclick = () => showTab("about");

    showTab("general");
  }

  hide(): void {
    this.components?.forEach((component) => {
      component.destroy();
    });
    this.components = [];
  }
}
