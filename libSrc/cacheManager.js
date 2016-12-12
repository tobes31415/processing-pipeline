"use strict";

export default CacheManager;

const CacheContextSymbol = Symbol("cacheManagerContext");

function CacheManager()
{
    var self = this;
    var internalCache = {};
    var id = rndId();
    
    self.clear = clear;
    self.get = getCache;
    ////////////////////
    
    function clear()
    {
        internalCache = {};
    }
    
    function getContext(obj)
    {
        if (!obj){throw new Error("CacheContext cannot be null");}
        if (typeof obj !== "object" && typeof obj !== "function"){throw new Error("CacheContext must be an object or function");}
        var ctx = obj[CacheContext];
        if (!ctx)
        {
            ctx = ""+Math.floor(Math.random()*99999);
            obj[CacheContextSymbol] = ctx;
        }
        return ctx;
    }
    
    function getCache()
    {
        var args = Array.prototype.slice.call(arguments, 0);
        var ctx = args.reduce(function(result, obj){return (result|"")+getContext(obj)+"|";});
        var cache = internalCache[ctx];
        if (!cache){
            cache = {};
            internalCache[ctx] = cache;
        }
        return cache;
    }
}