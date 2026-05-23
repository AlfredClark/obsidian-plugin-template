import { App, PluginSettingTab, Setting } from "obsidian";
import type TemplatePlugin from "./main";

export interface TemplatePluginSettings {
  mySetting: string;
}

export const DEFAULT_SETTINGS: TemplatePluginSettings = {
  mySetting: "default",
};

export class TemplatePluginSettingTab extends PluginSettingTab {
  plugin: TemplatePlugin;

  constructor(app: App, plugin: TemplatePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Settings #1")
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder("Enter your secret")
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            this.plugin.settings.mySetting = value;
            await this.plugin.saveSettings();
          }),
      );
  }
}
