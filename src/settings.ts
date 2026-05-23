import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import type TemplatePlugin from "./main";
import LocaleSettings from "./components/settings/LocaleSettings.svelte";
import { SvelteComponent } from "./components/utils";

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
      .setName("语言 / language")
      .setDesc("设置系统语言")
      .addComponent((controlEl) => {
        const comp = new SvelteComponent(controlEl, LocaleSettings, {
          locale: this.plugin.settings.locale,
          onLocaleChange: (locale: string) => {
            this.plugin.settings.locale = locale;
            new Notice(locale);
            void this.plugin.saveSettings();
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
