var metadata = require('./package');

var GulpConfig = (function () {
    function GulpConfig() {
        this.name = metadata.name;
        this.header = '// ' + this.name + ' v' + metadata.version + ' ' + metadata.homepage + '\n';
        this.dependencies = {
            // libs that MUST be included in a consuming app for this component to work
            libs: [
                'node_modules/base-component/dist/base-component.bundle.js',
                'node_modules/paper/dist/paper-full.min.js'
            ],
            // libs that MAY be included in a consuming app but are used here for example purposes
            examples: [
                'node_modules/openseadragon/build/**/*'
            ],
            // ts definitions to copy to the typings dir
            typings: [
                'node_modules/base-component/dist/base-component.d.ts'
            ]
        };
        this.fileNames = {
            cssOut: this.name + '.css',
            jsOut: this.name + '.js',
            jsMinOut: this.name + '.min.js',
            jsBundleOut: this.name + '.bundle.js',
            dtsOut: this.name + '.d.ts',
            dtsBundleOut: this.name + '.bundle.d.ts'
        };
        this.directories = {
            dist: './dist',
            examples: './examples',
            examplesCss: './examples/css',
            examplesImg: './examples/img',
            examplesJs: './examples/js',
            typings: './typings'
        };
        this.typescript = {
            src: [
                'src/_references.ts',
                'src/*.ts',
                'typings/*.ts',
                'typings/**/*.ts'
            ],
            config: {
                declarationFiles: true,
                noExternalResolve: true,
                noLib: false,
                module: 'commonjs',
                sortOutput: true
            }
        };
        this.browserify = {
            src: this.directories.dist,
            target: this.directories.dist,
            config: {
                standalone: this.name,
                debug: false
            }
        };
        this.sources = {
            css: 'src/css/**/*.less',
            img: './src/img/**'
        };
    }
    return GulpConfig;
})();

module.exports = GulpConfig;
