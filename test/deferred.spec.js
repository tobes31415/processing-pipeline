import Deferred from '../libSrc/deferred.js';
import assert from 'assert';

describe('Deferred', function()
{
    it('returns a function', function()
    {
        assert(typeof Deferred === "function");
    });
    it('the instance object has a promise', function()
    {
        var instance = Deferred();
        assert(typeof instance.promise.then, "function");
    });

    it('the instance object has a resolve and reject function', function()
    {
        var instance = Deferred();
        assert(typeof instance.resolve, "function");
        assert(typeof instance.reject, "function");
    });

    it('calling resolve resolves the promise', function(done)
    {
        var instance = Deferred();
        instance.resolve();
        instance.promise.then(done);
    });

    it('calling reject rejects the promise', function(done)
    {
        var instance = Deferred();
        instance.reject();
        instance.promise.then(null, done);
    });
});
