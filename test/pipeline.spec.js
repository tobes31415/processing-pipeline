import * as PipelineFactory from '../libSrc/pipelineFactory.js';
import assert from 'assert';
import sinon from 'sinon';

describe('Pipeline', function()
{
    var stub;
    var pipeline;
    var noop = function() {}

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
    it('runs a processor defined as an array', function(done)
    {
        pipeline.process(null, [stub]).then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('runs a processor defined as an object', function(done)
    {
        pipeline.process(null,
        {
            runs: stub
        }).then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('runs a processor defined as a string', function(done)
    {
        pipeline.process(
        {
            processors:
            {
                foo: stub
            }
        }, "foo").then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('runs an object processor if watched property has changed since last check', function(done)
    {
        pipeline.process(
        {
            foo: 'abc'
        },
        {
            watches: ['foo'],
            runs: stub
        }).then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('runs an object processor if watched property has already changed', function(done)
    {
        pipeline.process(
        {
            foo: 'abc'
        }, [
        {
            watches: ['foo'],
            runs: noop
        },
        {
            watches: ['foo'],
            runs: stub
        }]).then(function()
        {
            assert(stub.calledOnce);
            done();
        });
    });
    it('does not run an object processor if watched property has not changed', function(done)
    {
        pipeline.process(
        {
            foo: 'abc'
        },
        {
            watches: ['foo'],
            runs: noop
        }).then(function()
        {
            pipeline.process(
            {
                foo: 'abc'
            },
            {
                watches: ['foo'],
                runs: stub
            }).then(function()
            {
                assert(!stub.called);
                done();
            });
        });
    });
    it('updates the history at the end of an iteration', function(done)
    {
        var historySpy = sinon.spy();
        pipeline.process(
        {
            foo: 'abc',
            foo_ChangeMode:
            {
                detectChanges: sinon.stub().returns(true),
                updateHistory: historySpy
            }
        },
        {
            watches: ['foo'],
            runs: sinon.spy()
        }).then(function()
        {
            assert(historySpy.calledOnce);
            done();
        });
    });
});
