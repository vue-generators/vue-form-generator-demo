const path = require("path");

const generateDevProjects = () => {
	const devProjects = JSON.parse(process.env.VUE_APP_DEV_PROJECT);
	let devConfig = {
		index: {
			entry: "./src/examples/index.js",
			title: "vue-form-generator index"
		}
	};
	devProjects.forEach((projectName) => {
		devConfig[projectName] = {
			entry: `./src/examples/projects/${projectName}/main.js`,
			template: `./src/examples/projects/${projectName}/index.html`,
			filename: `${projectName}/index.html`,
			title: `vue-form-generator ${projectName} demo`
		};
	});
	return devConfig;
};

module.exports = {
	baseUrl: process.env.NODE_ENV === "production" ? "/my-project/" : "/",
	lintOnSave: true,
	runtimeCompiler: false,
	productionSourceMap: false,
	pages: generateDevProjects(),
	chainWebpack: (config) => {
		config.resolve.alias.set("vue-markdown", "vue-markdown/dist/vue-markdown.js");
	},
	css: {
		modules: false,
		sourceMap: false,
		loaderOptions: {}
	},
	devServer: {
		contentBase: [path.resolve("dev/projects")]
	}
};
