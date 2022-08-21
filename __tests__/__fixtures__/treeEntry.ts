import { TreeEntryFieldsFragment } from "../../generated/graphql";
import { faker } from "@faker-js/faker";

// Kindly taken fron Sourcegraph API Console
const entries = [
  {
    path: ".github",
    type: "tree",
  },
  {
    path: ".github/ISSUE_TEMPLATE",
    type: "tree",
  },
  {
    path: ".github/workflows",
    type: "tree",
  },
  {
    path: "benchmarks",
    type: "tree",
  },
  {
    path: "benchmarks/big-table",
    type: "tree",
  },
  {
    path: "benchmarks/dbmon",
    type: "tree",
  },
  {
    path: "benchmarks/dbmon/lib",
    type: "tree",
  },
  {
    path: "benchmarks/reorder-list",
    type: "tree",
  },
  {
    path: "benchmarks/ssr",
    type: "tree",
  },
  {
    path: "benchmarks/svg",
    type: "tree",
  },
  {
    path: "benchmarks/uptime",
    type: "tree",
  },
  {
    path: "compiler-sfc",
    type: "tree",
  },
  {
    path: "dist",
    type: "tree",
  },
  {
    path: "examples",
    type: "tree",
  },
  {
    path: "examples/classic",
    type: "tree",
  },
  {
    path: "examples/classic/commits",
    type: "tree",
  },
  {
    path: "examples/classic/elastic-header",
    type: "tree",
  },
  {
    path: "examples/classic/firebase",
    type: "tree",
  },
  {
    path: "examples/classic/grid",
    type: "tree",
  },
  {
    path: "examples/classic/markdown",
    type: "tree",
  },
  {
    path: "examples/classic/modal",
    type: "tree",
  },
  {
    path: "examples/classic/move-animations",
    type: "tree",
  },
  {
    path: "examples/classic/select2",
    type: "tree",
  },
  {
    path: "examples/classic/svg",
    type: "tree",
  },
  {
    path: "examples/classic/todomvc",
    type: "tree",
  },
  {
    path: "examples/classic/tree",
    type: "tree",
  },
  {
    path: "examples/composition",
    type: "tree",
  },
  {
    path: "packages",
    type: "tree",
  },
  {
    path: "packages/compiler-sfc",
    type: "tree",
  },
  {
    path: "packages/compiler-sfc/src",
    type: "tree",
  },
  {
    path: "packages/compiler-sfc/src/stylePlugins",
    type: "tree",
  },
  {
    path: "packages/compiler-sfc/src/templateCompilerModules",
    type: "tree",
  },
  {
    path: "packages/compiler-sfc/test",
    type: "tree",
  },
  {
    path: "packages/compiler-sfc/test/__snapshots__",
    type: "tree",
  },
  {
    path: "packages/server-renderer",
    type: "tree",
  },
  {
    path: "packages/server-renderer/src",
    type: "tree",
  },
  {
    path: "packages/server-renderer/src/bundle-renderer",
    type: "tree",
  },
  {
    path: "packages/server-renderer/src/directives",
    type: "tree",
  },
  {
    path: "packages/server-renderer/src/modules",
    type: "tree",
  },
  {
    path: "packages/server-renderer/src/optimizing-compiler",
    type: "tree",
  },
  {
    path: "packages/server-renderer/src/template-renderer",
    type: "tree",
  },
  {
    path: "packages/server-renderer/src/webpack-plugin",
    type: "tree",
  },
  {
    path: "packages/server-renderer/test",
    type: "tree",
  },
  {
    path: "packages/server-renderer/test/fixtures",
    type: "tree",
  },
  {
    path: "packages/server-renderer/types",
    type: "tree",
  },
  {
    path: "packages/template-compiler",
    type: "tree",
  },
  {
    path: "packages/template-compiler/types",
    type: "tree",
  },
  {
    path: "scripts",
    type: "tree",
  },
  {
    path: "scripts/git-hooks",
    type: "tree",
  },
  {
    path: "src",
    type: "tree",
  },
  {
    path: "src/compiler",
    type: "tree",
  },
  {
    path: "src/compiler/codegen",
    type: "tree",
  },
  {
    path: "src/compiler/directives",
    type: "tree",
  },
  {
    path: "src/compiler/parser",
    type: "tree",
  },
  {
    path: "src/core",
    type: "tree",
  },
  {
    path: "src/core/components",
    type: "tree",
  },
  {
    path: "src/core/global-api",
    type: "tree",
  },
  {
    path: "src/core/instance",
    type: "tree",
  },
  {
    path: "src/core/instance/render-helpers",
    type: "tree",
  },
  {
    path: "src/core/observer",
    type: "tree",
  },
  {
    path: "src/core/util",
    type: "tree",
  },
  {
    path: "src/core/vdom",
    type: "tree",
  },
  {
    path: "src/core/vdom/helpers",
    type: "tree",
  },
  {
    path: "src/core/vdom/modules",
    type: "tree",
  },
  {
    path: "src/platforms",
    type: "tree",
  },
  {
    path: "src/platforms/web",
    type: "tree",
  },
  {
    path: "src/platforms/web/compiler",
    type: "tree",
  },
  {
    path: "src/platforms/web/compiler/directives",
    type: "tree",
  },
  {
    path: "src/platforms/web/compiler/modules",
    type: "tree",
  },
  {
    path: "src/platforms/web/runtime",
    type: "tree",
  },
  {
    path: "src/platforms/web/runtime/components",
    type: "tree",
  },
  {
    path: "src/platforms/web/runtime/directives",
    type: "tree",
  },
  {
    path: "src/platforms/web/runtime/modules",
    type: "tree",
  },
  {
    path: "src/platforms/web/util",
    type: "tree",
  },
  {
    path: "src/shared",
    type: "tree",
  },
  {
    path: "src/types",
    type: "tree",
  },
  {
    path: "src/v3",
    type: "tree",
  },
  {
    path: "src/v3/reactivity",
    type: "tree",
  },
  {
    path: "src/v3/sfc-helpers",
    type: "tree",
  },
  {
    path: "test",
    type: "tree",
  },
  {
    path: "test/e2e",
    type: "tree",
  },
  {
    path: "test/helpers",
    type: "tree",
  },
  {
    path: "test/transition",
    type: "tree",
  },
  {
    path: "test/unit",
    type: "tree",
  },
  {
    path: "test/unit/features",
    type: "tree",
  },
  {
    path: "test/unit/features/component",
    type: "tree",
  },
  {
    path: "test/unit/features/directives",
    type: "tree",
  },
  {
    path: "test/unit/features/filter",
    type: "tree",
  },
  {
    path: "test/unit/features/global-api",
    type: "tree",
  },
  {
    path: "test/unit/features/instance",
    type: "tree",
  },
  {
    path: "test/unit/features/options",
    type: "tree",
  },
  {
    path: "test/unit/features/v3",
    type: "tree",
  },
  {
    path: "test/unit/features/v3/reactivity",
    type: "tree",
  },
  {
    path: "test/unit/modules",
    type: "tree",
  },
  {
    path: "test/unit/modules/compiler",
    type: "tree",
  },
  {
    path: "test/unit/modules/observer",
    type: "tree",
  },
  {
    path: "test/unit/modules/server-compiler",
    type: "tree",
  },
  {
    path: "test/unit/modules/util",
    type: "tree",
  },
  {
    path: "test/unit/modules/vdom",
    type: "tree",
  },
  {
    path: "test/unit/modules/vdom/modules",
    type: "tree",
  },
  {
    path: "test/unit/modules/vdom/patch",
    type: "tree",
  },
  {
    path: "types",
    type: "tree",
  },
  {
    path: "types/test",
    type: "tree",
  },
  {
    path: "types/test/v3",
    type: "tree",
  },
  {
    path: ".editorconfig",
    type: "blob",
  },
  {
    path: ".git-blame-ignore-revs",
    type: "blob",
  },
  {
    path: ".github/CODE_OF_CONDUCT.md",
    type: "blob",
  },
  {
    path: ".github/COMMIT_CONVENTION.md",
    type: "blob",
  },
  {
    path: ".github/CONTRIBUTING.md",
    type: "blob",
  },
  {
    path: ".github/FUNDING.yml",
    type: "blob",
  },
  {
    path: ".github/ISSUE_TEMPLATE/config.yml",
    type: "blob",
  },
  {
    path: ".github/PULL_REQUEST_TEMPLATE.md",
    type: "blob",
  },
  {
    path: ".github/workflows/ci.yml",
    type: "blob",
  },
  {
    path: ".github/workflows/release-tag.yml",
    type: "blob",
  },
  {
    path: ".gitignore",
    type: "blob",
  },
  {
    path: ".prettierrc",
    type: "blob",
  },
  {
    path: "BACKERS.md",
    type: "blob",
  },
  {
    path: "CHANGELOG.md",
    type: "blob",
  },
  {
    path: "LICENSE",
    type: "blob",
  },
  {
    path: "README.md",
    type: "blob",
  },
  {
    path: "api-extractor.json",
    type: "blob",
  },
  {
    path: "api-extractor.tsconfig.json",
    type: "blob",
  },
  {
    path: "benchmarks/big-table/demo.css",
    type: "blob",
  },
  {
    path: "benchmarks/big-table/index.html",
    type: "blob",
  },
  {
    path: "benchmarks/big-table/style.css",
    type: "blob",
  },
  {
    path: "benchmarks/dbmon/ENV.js",
    type: "blob",
  },
  {
    path: "benchmarks/dbmon/app.js",
    type: "blob",
  },
  {
    path: "benchmarks/dbmon/index.html",
    type: "blob",
  },
  {
    path: "benchmarks/dbmon/lib/memory-stats.js",
    type: "blob",
  },
  {
    path: "benchmarks/dbmon/lib/monitor.js",
    type: "blob",
  },
  {
    path: "benchmarks/dbmon/lib/styles.css",
    type: "blob",
  },
  {
    path: "benchmarks/reorder-list/index.html",
    type: "blob",
  },
  {
    path: "benchmarks/ssr/README.md",
    type: "blob",
  },
  {
    path: "benchmarks/ssr/common.js",
    type: "blob",
  },
  {
    path: "benchmarks/ssr/renderToStream.js",
    type: "blob",
  },
  {
    path: "benchmarks/ssr/renderToString.js",
    type: "blob",
  },
  {
    path: "benchmarks/svg/index.html",
    type: "blob",
  },
  {
    path: "benchmarks/uptime/index.html",
    type: "blob",
  },
  {
    path: "compiler-sfc/index.d.ts",
    type: "blob",
  },
  {
    path: "compiler-sfc/index.js",
    type: "blob",
  },
  {
    path: "compiler-sfc/index.mjs",
    type: "blob",
  },
  {
    path: "compiler-sfc/package.json",
    type: "blob",
  },
  {
    path: "dist/vue.common.js",
    type: "blob",
  },
  {
    path: "dist/vue.runtime.common.js",
    type: "blob",
  },
  {
    path: "dist/vue.runtime.mjs",
    type: "blob",
  },
  {
    path: "examples/classic/commits/app.js",
    type: "blob",
  },
  {
    path: "examples/classic/commits/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/elastic-header/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/elastic-header/style.css",
    type: "blob",
  },
  {
    path: "examples/classic/firebase/app.js",
    type: "blob",
  },
  {
    path: "examples/classic/firebase/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/firebase/style.css",
    type: "blob",
  },
  {
    path: "examples/classic/grid/grid.js",
    type: "blob",
  },
  {
    path: "examples/classic/grid/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/grid/style.css",
    type: "blob",
  },
  {
    path: "examples/classic/markdown/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/markdown/style.css",
    type: "blob",
  },
  {
    path: "examples/classic/modal/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/modal/style.css",
    type: "blob",
  },
  {
    path: "examples/classic/move-animations/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/select2/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/svg/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/svg/style.css",
    type: "blob",
  },
  {
    path: "examples/classic/svg/svg.js",
    type: "blob",
  },
  {
    path: "examples/classic/todomvc/app.js",
    type: "blob",
  },
  {
    path: "examples/classic/todomvc/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/todomvc/readme.md",
    type: "blob",
  },
  {
    path: "examples/classic/tree/index.html",
    type: "blob",
  },
  {
    path: "examples/classic/tree/tree.js",
    type: "blob",
  },
  {
    path: "examples/composition/commits.html",
    type: "blob",
  },
  {
    path: "examples/composition/grid.html",
    type: "blob",
  },
  {
    path: "examples/composition/markdown.html",
    type: "blob",
  },
  {
    path: "examples/composition/svg.html",
    type: "blob",
  },
  {
    path: "examples/composition/todomvc.html",
    type: "blob",
  },
  {
    path: "examples/composition/tree.html",
    type: "blob",
  },
  {
    path: "package.json",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/api-extractor.json",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/package.json",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/babelUtils.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/compileScript.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/compileStyle.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/compileTemplate.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/cssVars.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/index.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/parse.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/parseComponent.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/prefixIdentifiers.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/rewriteDefault.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/stylePlugins/scoped.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/stylePlugins/trim.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/stylePreprocessors.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/templateCompilerModules/assetUrl.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/templateCompilerModules/srcset.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/templateCompilerModules/utils.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/types.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/src/warn.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/__snapshots__/compileScript.spec.ts.snap",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/__snapshots__/cssVars.spec.ts.snap",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/compileScript.spec.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/compileStyle.spec.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/compileTemplate.spec.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/cssVars.spec.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/parseComponent.spec.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/prefixIdentifiers.spec.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/rewriteDefault.spec.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/stylePluginScoped.spec.ts",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/tsconfig.json",
    type: "blob",
  },
  {
    path: "packages/compiler-sfc/test/util.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/README.md",
    type: "blob",
  },
  {
    path: "packages/server-renderer/client-plugin.d.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/index.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/package.json",
    type: "blob",
  },
  {
    path: "packages/server-renderer/server-plugin.d.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/bundle-renderer/create-bundle-renderer.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/bundle-renderer/create-bundle-runner.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/bundle-renderer/source-map-support.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/compiler.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/create-basic-renderer.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/create-renderer.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/directives/index.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/directives/model.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/directives/show.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/index-basic.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/index.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/modules/attrs.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/modules/class.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/modules/dom-props.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/modules/index.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/modules/style.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/optimizing-compiler/codegen.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/optimizing-compiler/index.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/optimizing-compiler/modules.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/optimizing-compiler/optimizer.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/optimizing-compiler/runtime-helpers.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/render-context.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/render-stream.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/render.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/template-renderer/create-async-file-mapper.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/template-renderer/index.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/template-renderer/parse-template.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/template-renderer/template-stream.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/util.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/webpack-plugin/client.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/webpack-plugin/server.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/webpack-plugin/util.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/src/write.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/async-loader.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/compile-with-webpack.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/app.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/async-bar.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/async-foo.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/cache-opt-out.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/cache.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/error.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/nested-cache.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/promise-rejection.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/split.js",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/test.css",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/test.png",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/fixtures/test.woff2",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/ssr-basic-renderer.spec.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/ssr-bundle-render.spec.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/ssr-reactivity.spec.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/ssr-stream.spec.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/ssr-string.spec.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/ssr-template.spec.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/test/tsconfig.json",
    type: "blob",
  },
  {
    path: "packages/server-renderer/types/index.d.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/types/plugin.d.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/types/test.ts",
    type: "blob",
  },
  {
    path: "packages/server-renderer/types/tsconfig.json",
    type: "blob",
  },
  {
    path: "packages/template-compiler/README.md",
    type: "blob",
  },
  {
    path: "packages/template-compiler/index.js",
    type: "blob",
  },
  {
    path: "packages/template-compiler/package.json",
    type: "blob",
  },
  {
    path: "packages/template-compiler/types/index.d.ts",
    type: "blob",
  },
  {
    path: "packages/template-compiler/types/test.ts",
    type: "blob",
  },
  {
    path: "packages/template-compiler/types/tsconfig.json",
    type: "blob",
  },
  {
    path: "pnpm-lock.yaml",
    type: "blob",
  },
  {
    path: "pnpm-workspace.yaml",
    type: "blob",
  },
  {
    path: "scripts/alias.js",
    type: "blob",
  },
  {
    path: "scripts/build.js",
    type: "blob",
  },
  {
    path: "scripts/config.js",
    type: "blob",
  },
  {
    path: "scripts/feature-flags.js",
    type: "blob",
  },
  {
    path: "scripts/gen-release-note.js",
    type: "blob",
  },
  {
    path: "scripts/git-hooks/commit-msg",
    type: "blob",
  },
  {
    path: "scripts/git-hooks/pre-commit",
    type: "blob",
  },
  {
    path: "scripts/release.js",
    type: "blob",
  },
  {
    path: "scripts/verify-commit-msg.js",
    type: "blob",
  },
  {
    path: "src/compiler/codeframe.ts",
    type: "blob",
  },
  {
    path: "src/compiler/codegen/events.ts",
    type: "blob",
  },
  {
    path: "src/compiler/codegen/index.ts",
    type: "blob",
  },
  {
    path: "src/compiler/create-compiler.ts",
    type: "blob",
  },
  {
    path: "src/compiler/directives/bind.ts",
    type: "blob",
  },
  {
    path: "src/compiler/directives/index.ts",
    type: "blob",
  },
  {
    path: "src/compiler/directives/model.ts",
    type: "blob",
  },
  {
    path: "src/compiler/directives/on.ts",
    type: "blob",
  },
  {
    path: "src/compiler/error-detector.ts",
    type: "blob",
  },
  {
    path: "src/compiler/helpers.ts",
    type: "blob",
  },
  {
    path: "src/compiler/index.ts",
    type: "blob",
  },
  {
    path: "src/compiler/optimizer.ts",
    type: "blob",
  },
  {
    path: "src/compiler/parser/entity-decoder.ts",
    type: "blob",
  },
  {
    path: "src/compiler/parser/filter-parser.ts",
    type: "blob",
  },
  {
    path: "src/compiler/parser/html-parser.ts",
    type: "blob",
  },
  {
    path: "src/compiler/parser/index.ts",
    type: "blob",
  },
  {
    path: "src/compiler/parser/text-parser.ts",
    type: "blob",
  },
  {
    path: "src/compiler/to-function.ts",
    type: "blob",
  },
  {
    path: "src/core/components/index.ts",
    type: "blob",
  },
  {
    path: "src/core/components/keep-alive.ts",
    type: "blob",
  },
  {
    path: "src/core/config.ts",
    type: "blob",
  },
  {
    path: "src/core/global-api/assets.ts",
    type: "blob",
  },
  {
    path: "src/core/global-api/extend.ts",
    type: "blob",
  },
  {
    path: "src/core/global-api/index.ts",
    type: "blob",
  },
  {
    path: "src/core/global-api/mixin.ts",
    type: "blob",
  },
  {
    path: "src/core/global-api/use.ts",
    type: "blob",
  },
  {
    path: "src/core/index.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/events.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/index.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/init.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/inject.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/lifecycle.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/proxy.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/bind-dynamic-keys.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/bind-object-listeners.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/bind-object-props.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/check-keycodes.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/index.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/render-list.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/render-slot.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/render-static.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/resolve-filter.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/resolve-scoped-slots.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render-helpers/resolve-slots.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/render.ts",
    type: "blob",
  },
  {
    path: "src/core/instance/state.ts",
    type: "blob",
  },
  {
    path: "src/core/observer/array.ts",
    type: "blob",
  },
  {
    path: "src/core/observer/dep.ts",
    type: "blob",
  },
  {
    path: "src/core/observer/index.ts",
    type: "blob",
  },
  {
    path: "src/core/observer/scheduler.ts",
    type: "blob",
  },
  {
    path: "src/core/observer/traverse.ts",
    type: "blob",
  },
  {
    path: "src/core/observer/watcher.ts",
    type: "blob",
  },
  {
    path: "src/core/util/debug.ts",
    type: "blob",
  },
  {
    path: "src/core/util/env.ts",
    type: "blob",
  },
  {
    path: "src/core/util/error.ts",
    type: "blob",
  },
  {
    path: "src/core/util/index.ts",
    type: "blob",
  },
  {
    path: "src/core/util/lang.ts",
    type: "blob",
  },
  {
    path: "src/core/util/next-tick.ts",
    type: "blob",
  },
  {
    path: "src/core/util/options.ts",
    type: "blob",
  },
  {
    path: "src/core/util/perf.ts",
    type: "blob",
  },
  {
    path: "src/core/util/props.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/create-component.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/create-element.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/create-functional-component.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/helpers/extract-props.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/helpers/get-first-component-child.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/helpers/index.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/helpers/is-async-placeholder.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/helpers/merge-hook.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/helpers/normalize-children.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/helpers/normalize-scoped-slots.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/helpers/resolve-async-component.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/helpers/update-listeners.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/modules/directives.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/modules/index.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/modules/template-ref.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/patch.ts",
    type: "blob",
  },
  {
    path: "src/core/vdom/vnode.ts",
    type: "blob",
  },
  {
    path: "src/global.d.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/directives/html.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/directives/index.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/directives/model.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/directives/text.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/index.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/modules/class.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/modules/index.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/modules/model.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/modules/style.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/options.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/compiler/util.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/entry-compiler.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/entry-runtime-esm.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/entry-runtime-with-compiler-esm.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/entry-runtime-with-compiler.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/entry-runtime.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime-with-compiler.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/class-util.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/components/index.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/components/transition-group.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/components/transition.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/directives/index.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/directives/model.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/directives/show.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/index.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/modules/attrs.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/modules/class.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/modules/dom-props.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/modules/events.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/modules/index.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/modules/style.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/modules/transition.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/node-ops.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/patch.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/runtime/transition-util.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/util/attrs.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/util/class.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/util/compat.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/util/element.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/util/index.ts",
    type: "blob",
  },
  {
    path: "src/platforms/web/util/style.ts",
    type: "blob",
  },
  {
    path: "src/shared/constants.ts",
    type: "blob",
  },
  {
    path: "src/shared/util.ts",
    type: "blob",
  },
  {
    path: "src/types/compiler.ts",
    type: "blob",
  },
  {
    path: "src/types/component.ts",
    type: "blob",
  },
  {
    path: "src/types/global-api.ts",
    type: "blob",
  },
  {
    path: "src/types/modules.d.ts",
    type: "blob",
  },
  {
    path: "src/types/options.ts",
    type: "blob",
  },
  {
    path: "src/types/ssr.ts",
    type: "blob",
  },
  {
    path: "src/types/utils.ts",
    type: "blob",
  },
  {
    path: "src/types/vnode.ts",
    type: "blob",
  },
  {
    path: "src/v3/apiAsyncComponent.ts",
    type: "blob",
  },
  {
    path: "src/v3/apiInject.ts",
    type: "blob",
  },
  {
    path: "src/v3/apiLifecycle.ts",
    type: "blob",
  },
  {
    path: "src/v3/apiSetup.ts",
    type: "blob",
  },
  {
    path: "src/v3/apiWatch.ts",
    type: "blob",
  },
  {
    path: "src/v3/currentInstance.ts",
    type: "blob",
  },
  {
    path: "src/v3/debug.ts",
    type: "blob",
  },
  {
    path: "src/v3/h.ts",
    type: "blob",
  },
  {
    path: "src/v3/index.ts",
    type: "blob",
  },
  {
    path: "src/v3/reactivity/computed.ts",
    type: "blob",
  },
  {
    path: "src/v3/reactivity/effect.ts",
    type: "blob",
  },
  {
    path: "src/v3/reactivity/effectScope.ts",
    type: "blob",
  },
  {
    path: "src/v3/reactivity/operations.ts",
    type: "blob",
  },
  {
    path: "src/v3/reactivity/reactive.ts",
    type: "blob",
  },
  {
    path: "src/v3/reactivity/readonly.ts",
    type: "blob",
  },
  {
    path: "src/v3/reactivity/ref.ts",
    type: "blob",
  },
  {
    path: "src/v3/sfc-helpers/useCssModule.ts",
    type: "blob",
  },
  {
    path: "src/v3/sfc-helpers/useCssVars.ts",
    type: "blob",
  },
  {
    path: "test/e2e/async-edge-cases.html",
    type: "blob",
  },
  {
    path: "test/e2e/async-edge-cases.spec.ts",
    type: "blob",
  },
  {
    path: "test/e2e/basic-ssr.html",
    type: "blob",
  },
  {
    path: "test/e2e/basic-ssr.spec.ts",
    type: "blob",
  },
  {
    path: "test/e2e/commits.mock.ts",
    type: "blob",
  },
  {
    path: "test/e2e/commits.spec.ts",
    type: "blob",
  },
  {
    path: "test/e2e/e2eUtils.ts",
    type: "blob",
  },
  {
    path: "test/e2e/grid.spec.ts",
    type: "blob",
  },
  {
    path: "test/e2e/markdown.spec.ts",
    type: "blob",
  },
  {
    path: "test/e2e/svg.spec.ts",
    type: "blob",
  },
  {
    path: "test/e2e/todomvc.spec.ts",
    type: "blob",
  },
  {
    path: "test/e2e/tree.spec.ts",
    type: "blob",
  },
  {
    path: "test/helpers/classlist.ts",
    type: "blob",
  },
  {
    path: "test/helpers/shim-done.ts",
    type: "blob",
  },
  {
    path: "test/helpers/test-object-option.ts",
    type: "blob",
  },
  {
    path: "test/helpers/to-have-warned.ts",
    type: "blob",
  },
  {
    path: "test/helpers/trigger-event.ts",
    type: "blob",
  },
  {
    path: "test/helpers/vdom.ts",
    type: "blob",
  },
  {
    path: "test/helpers/wait-for-update.ts",
    type: "blob",
  },
  {
    path: "test/test-env.d.ts",
    type: "blob",
  },
  {
    path: "test/transition/helpers.ts",
    type: "blob",
  },
  {
    path: "test/transition/karma.conf.js",
    type: "blob",
  },
  {
    path: "test/transition/package.json",
    type: "blob",
  },
  {
    path: "test/transition/transition-group.spec.ts",
    type: "blob",
  },
  {
    path: "test/transition/transition-mode.spec.ts",
    type: "blob",
  },
  {
    path: "test/transition/transition-with-keep-alive.spec.ts",
    type: "blob",
  },
  {
    path: "test/transition/transition.spec.ts",
    type: "blob",
  },
  {
    path: "test/tsconfig.json",
    type: "blob",
  },
  {
    path: "test/unit/features/component/component-async.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/component/component-keep-alive.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/component/component-scoped-slot.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/component/component-slot.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/component/component.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/debug.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/bind.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/class.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/cloak.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/for.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/html.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/if.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/model-checkbox.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/model-component.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/model-dynamic.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/model-file.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/model-parse.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/model-radio.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/model-select.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/model-text.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/on.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/once.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/pre.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/show.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/static-style-parser.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/style.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/directives/text.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/error-handling.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/filter/filter.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/global-api/assets.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/global-api/compile.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/global-api/config.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/global-api/extend.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/global-api/mixin.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/global-api/observable.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/global-api/set-delete.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/global-api/use.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/instance/init.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/instance/methods-data.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/instance/methods-events.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/instance/methods-lifecycle.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/instance/properties.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/instance/render-proxy.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/_scopeId.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/comments.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/components.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/computed.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/data.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/delimiters.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/directives.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/el.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/errorCaptured.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/extends.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/functional.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/inheritAttrs.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/inject.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/lifecycle.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/methods.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/mixins.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/name.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/parent.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/props.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/propsData.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/render.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/renderError.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/template.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/options/watch.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/template-ref.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/apiAsyncComponent.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/apiInject.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/apiLifecycle.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/apiSetup.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/apiWatch.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/reactivity/computed.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/reactivity/effectScope.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/reactivity/reactive.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/reactivity/readonly.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/reactivity/ref.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/reactivity/shallowReactive.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/reactivity/shallowReadonly.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/setupTemplateRef.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/features/v3/useCssVars.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/compiler/codeframe.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/compiler/codegen.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/compiler/compiler-options.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/compiler/optimizer.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/compiler/parser.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/observer/dep.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/observer/observer.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/observer/scheduler.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/observer/watcher.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/server-compiler/compiler-options.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/util/error.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/util/next-tick.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/create-component.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/create-element.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/modules/attrs.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/modules/class.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/modules/directive.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/modules/dom-props.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/modules/events.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/modules/style.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/patch/children.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/patch/edge-cases.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/patch/element.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/patch/hooks.spec.ts",
    type: "blob",
  },
  {
    path: "test/unit/modules/vdom/patch/hydration.spec.ts",
    type: "blob",
  },
  {
    path: "test/vitest.setup.ts",
    type: "blob",
  },
  {
    path: "tsconfig.json",
    type: "blob",
  },
  {
    path: "types/common.d.ts",
    type: "blob",
  },
  {
    path: "types/index.d.ts",
    type: "blob",
  },
  {
    path: "types/jsx.d.ts",
    type: "blob",
  },
  {
    path: "types/options.d.ts",
    type: "blob",
  },
  {
    path: "types/plugin.d.ts",
    type: "blob",
  },
  {
    path: "types/test/async-component-test.ts",
    type: "blob",
  },
  {
    path: "types/test/augmentation-test.ts",
    type: "blob",
  },
  {
    path: "types/test/es-module.ts",
    type: "blob",
  },
  {
    path: "types/test/options-test.ts",
    type: "blob",
  },
  {
    path: "types/test/plugin-test.ts",
    type: "blob",
  },
  {
    path: "types/test/setup-helpers-test.ts",
    type: "blob",
  },
  {
    path: "types/test/umd-test.ts",
    type: "blob",
  },
  {
    path: "types/test/utils.ts",
    type: "blob",
  },
  {
    path: "types/test/v3/define-async-component-test.tsx",
    type: "blob",
  },
  {
    path: "types/test/v3/define-component-test.tsx",
    type: "blob",
  },
  {
    path: "types/test/v3/inject-test.ts",
    type: "blob",
  },
  {
    path: "types/test/v3/reactivity-test.ts",
    type: "blob",
  },
  {
    path: "types/test/v3/setup-test.ts",
    type: "blob",
  },
  {
    path: "types/test/v3/tsx-test.tsx",
    type: "blob",
  },
  {
    path: "types/test/v3/watch-test.ts",
    type: "blob",
  },
  {
    path: "types/test/vue-test.ts",
    type: "blob",
  },
  {
    path: "types/tsconfig.json",
    type: "blob",
  },
  {
    path: "types/typings.json",
    type: "blob",
  },
  {
    path: "types/umd.d.ts",
    type: "blob",
  },
  {
    path: "types/v3-component-options.d.ts",
    type: "blob",
  },
  {
    path: "types/v3-component-props.d.ts",
    type: "blob",
  },
  {
    path: "types/v3-component-public-instance.d.ts",
    type: "blob",
  },
  {
    path: "types/v3-define-async-component.d.ts",
    type: "blob",
  },
  {
    path: "types/v3-define-component.d.ts",
    type: "blob",
  },
  {
    path: "types/v3-directive.d.ts",
    type: "blob",
  },
  {
    path: "types/v3-manual-apis.d.ts",
    type: "blob",
  },
  {
    path: "types/v3-setup-context.d.ts",
    type: "blob",
  },
  {
    path: "types/v3-setup-helpers.d.ts",
    type: "blob",
  },
  {
    path: "types/vnode.d.ts",
    type: "blob",
  },
  {
    path: "types/vue.d.ts",
    type: "blob",
  },
  {
    path: "vitest.config.ts",
    type: "blob",
  },
];

/*
 * Get mocked tree entries for a given path.
 * @param path - Path to get mock tree entries for.
 * @note We also map results to get the correct type.
 * @returns Mocked tree entries for the given path.
 */
export const getTreeEntries = (
  entryPath: string
): TreeEntryFieldsFragment[] => {
  let result: any[];
  if (entryPath === "/") {
    result = entries.filter(({ path }) => !path.includes("/"));
  } else {
    result = entries.filter(({ path }) =>
      path.match(new RegExp(`^${entryPath}\/[^/]*$`))
    );
  }

  return result.map(({ path, type }) => {
    return {
      __typename: "TreeEntry",
      name: path.split("/").pop() || "",
      oid: faker.datatype.uuid(),
      path,
      type,
    };
  });
};
