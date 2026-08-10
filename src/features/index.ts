import type TemplatePlugin from "../main";

/**
 * 聚合初始化全部 feature 模块（命令、视图等业务功能）。
 * 首个 feature 落地后在此依序追加各模块的 init 调用。
 * @param plugin 插件实例；type-only 导入具体类，运行时无循环
 */
export async function initFeatures(plugin: TemplatePlugin): Promise<void> {
  // 首个 feature 落地后在此处依序调用各模块的 init 方法
  void plugin;
}
