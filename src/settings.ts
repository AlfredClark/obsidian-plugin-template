import { App, PluginSettingTab, Setting } from "obsidian";
import type TemplatePlugin from "./main";
import LocaleSettings from "./components/settings/LocaleSettings.svelte";
import { SvelteComponent } from "./components/utils";
import { m } from "./i18n/paraglide/messages";
import { setLocale, type Locale } from "./i18n/paraglide/runtime";

export interface TemplatePluginSettings {
  locale: string;
}

export const DEFAULT_SETTINGS: TemplatePluginSettings = {
  locale: "app",
};

export class TemplatePluginSettingTab extends PluginSettingTab {
  plugin: TemplatePlugin;
  #component: SvelteComponent | undefined;

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
        const comp = new SvelteComponent(controlEl, LocaleSettings, {
          locale: this.plugin.settings.locale,
          onLocaleChange: async (locale: string) => {
            this.plugin.settings.locale = locale;
            await setLocale(locale as Locale, { reload: false });
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
