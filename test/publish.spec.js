import assert from 'assert';

import library from './bower_components/processing-pipeline/dist/processing-pipeline.js';

describe('Published Library', function()
{
    it('has a function called create', function()
    {
        assert.equal(typeof library.create, "function");
    });
});
