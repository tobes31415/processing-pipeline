import * as PipelineFactory from '../libSrc/pipelineFactory.js';
import assert from 'assert';
import sinon from 'sinon';

describe.only('Pipeline', function()
{
    var stub;
    var pipeline;
    var noop = function(){}

    beforeEach(function()
    {
        pipeline = PipelineFactory.create();
        stub = sinon.stub();
    });

    it('runs a processor defined as a function', function(done)
    {
        pipeline.process(null, stub).then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('runs a processor defined as an array', function(done) {
        pipeline.process(null, [stub]).then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('runs a processor defined as an object', function() {
        pipeline.process(null, {runs:stub}).then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('runs a processor defined as a string', function() {
        pipeline.process({processors:{foo: stub}}, "foo").then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('runs an object processor if watched property has changed since last check', function() {
        pipeline.process({foo:'abc'}, {watches:['foo'], runs:stub}).then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('runs an object processor if watched property has already changed', function() {
        pipeline.process({foo:'abc'}, [{watches:['foo'], runs:noop},{watches:['foo'], runs:stub}]).then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('does not run an object processor if watched property has not changed', function() {
        pipeline.process({foo:' abc'}, {watches:['foo'], runs:noop}).then(function()
        {
            pipeline.process({foo:'abc'}, {watches:['foo'], runs:stub}).then(function()
            {
                assert(!stub.called);
                done();
            });
        });
    });
});
