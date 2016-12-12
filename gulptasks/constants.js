module.exports = {
    root: './',
    
    testSrc : './test/',
    devSrc :'./devSrc/',
    libSrc : './libSrc/',
    
    libOut :'./dist/',
    devOut: './bin/',
    testOut: './binTest/',
    
    libName: 'processing-pipeline/dist',
    
    libSrcEntry:'pipelineFactory.js',
    devSrcEntry:'index.js',
    
    libOutEntry :'processing-pipeline.js',
    libOutMinEntry :'processing-pipeline.min.js',
    devOutEntry:'index.js'
}