import { definePlugin, type PluginDescriptor } from "emdash";

export function mathPlugin(): PluginDescriptor {
	return {
		id: "katex-math",
		version: "1.0.0",
		entrypoint: "./src/plugins/math/index.ts",
		componentsEntry: "./src/plugins/math/astro/index.ts",
	};
}

export function createPlugin() {
	return definePlugin({
		id: "katex-math",
		version: "1.0.0",
		admin: {
			portableTextBlocks: [
				{
					type: "math",
					label: "Math Formula",
					icon: "function",
					description: "Insert a LaTeX math formula",
					category: "Content",
					fields: [
						{
							type: "text_input",
							action_id: "formula",
							label: "LaTeX Formula",
							placeholder: "e.g. E = mc^2",
							multiline: true,
						},
						{
							type: "toggle",
							action_id: "display",
							label: "Display mode (block)",
						},
					],
				},
			],
		},
	});
}
