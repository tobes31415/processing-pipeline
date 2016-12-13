import * as PipelineFactory from '../libSrc/pipelineFactory.js';
import Pipeline from '../libSrc/pipeline.js';
import assert from 'assert';

describe('PipelineFactory', function()
{
    it('has a function called create', function()
    {
        assert.equal(typeof PipelineFactory.create, "function");
    });

    it('creates an instance of Pipeline', function()
    {
        var instance = PipelineFactory.create();
        assert(instance instanceof Pipeline);
    });
});
