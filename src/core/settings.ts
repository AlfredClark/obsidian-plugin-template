import { App, PluginSettingTab, Setting } from "obsidian";
import type TemplatePlugin from "../main";
import LocaleSettings from "../components/settings/LocaleSettings.svelte";
import { ObsidianSvelteComponent } from "../components/utils";
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
  plugin: TemplatePlugin;
  #component: ObsidianSvelteComponent | undefined;

  constructor(app: App, plugin: TemplatePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName(m.language())
      .setDesc(m.settings_language())
      .addComponent((controlEl) => {
        const comp = new ObsidianSvelteComponent(controlEl, LocaleSettings, {
          locale: this.plugin.settings.locale,
          onLocaleChange: async (locale: string) => {
            this.plugin.settings.locale = locale;
            await setLocale(toLocale(locale) ?? baseLocale, { reload: false });
            void this.plugin.saveSettings();
            this.display();
          },
        });
        this.#component = comp;
        return comp;
      });
  }

  hide(): void {
    if (this.#component) {
      this.#component.destroy();
      this.#component = undefined;
    }
  }
}
