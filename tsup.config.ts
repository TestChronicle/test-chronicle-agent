import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        cli: 'src/cli.ts',
        action: 'src/action.ts',
    },
    noExternal: ['dotenv', 'glob', 'simple-git'],
    format: ['cjs'],
    target: 'es2020',
    dts: true,
    clean: true,
    minify: false,
    sourcemap: true,
    shims: true,
    outDir: 'dist',
    banner: {
        js: '#!/usr/bin/env node',
    },
    esbuildOptions(options) {
        options.platform = 'node';
    },
});
