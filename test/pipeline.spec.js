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
        pipeline.suppressConsole = true;
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
    describe("when failBehaviour is set to halt and there is a failure, ", function()
    {
        beforeEach(function()
        {
            pipeline.onFail("halt");
        });
        it('the promise is rejected', function(done)
        {
            var willFail = sinon.stub().throws();
            var spy = sinon.spy();
            var finishTest = function()
            {
                done();
            };
            pipeline.process(
            {}, [willFail, spy]).then(null, finishTest)
        });
        it('subsequent processes are NOT called', function(done)
        {
            var willFail = sinon.stub().throws();
            var spy = sinon.spy();
            var finishTest = function()
            {
                assert(!spy.called);
                done();
            };
            pipeline.process(
            {}, [willFail, spy]).then(finishTest, finishTest)
        });
    });
    describe("when failBehaviour is set to warn and there is a failure, ", function()
    {
        beforeEach(function()
        {
            pipeline.onFail("warn");
        });
        it('the promise is resolved', function(done)
        {
            var willFail = sinon.stub().throws();
            var spy = sinon.spy();
            var finishTest = function()
            {
                done();
            };
            pipeline.process(
            {}, [willFail, spy]).then(finishTest);
        });
        it('subsequent processes ARE called', function(done)
        {
            var willFail = sinon.stub().throws();
            var spy = sinon.spy();
            var finishTest = function()
            {
                assert(spy.called);
                done();
            };
            pipeline.process(
            {}, [willFail, spy]).then(finishTest)
        });
    });
});
