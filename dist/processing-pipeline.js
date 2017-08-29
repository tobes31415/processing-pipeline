(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipeline_js__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_js__ = __webpack_require__(6);
	/* harmony export */ exports["create"] = create;
	
	
	function create()
	{
	    "use strict";
	    return new /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__pipeline_js__["a"]();
	}
	
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_1__global_js__["a"].PipelineFactory = {
	    create: create
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony default export */ exports["a"] = CacheManager
	
	const CacheContextSymbol = Symbol("cacheManagerContext");
	
	function CacheManager()
	{
	    "use strict";
	
	    var self = this;
	    var internalCache = {};
	
	    self.clear = clear;
	    self.get = getCache;
	    ////////////////////
	
	    function clear()
	    {
	        internalCache = {};
	    }
	
	    function getContext(obj)
	    {
	        if (!obj)
	        {
	            throw new Error("CacheContext cannot be null");
	        }
	        if (typeof obj !== "object" && typeof obj !== "function")
	        {
	            throw new Error("CacheContext must be an object or function");
	        }
	        var ctx = obj[CacheContextSymbol];
	        if (!ctx)
	        {
	            ctx = "" + Math.floor(Math.random() * 99999);
	            obj[CacheContextSymbol] = ctx;
	        }
	        return ctx;
	    }
	
	    function getCache()
	    {
	        var args = Array.prototype.slice.call(arguments, 0);
	        var ctx = args.reduce(function(result, obj)
	        {
	            return (result | "") + getContext(obj) + "|";
	        });
	        var cache = internalCache[ctx];
	        if (!cache)
	        {
	            cache = {};
	            internalCache[ctx] = cache;
	        }
	        return cache;
	    }
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__changeDetector_JSON_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__changeDetector_Identity_js__ = __webpack_require__(3);
	/* harmony export */ exports["detectChanges"] = detectChanges;/* harmony export */ exports["updateHistory"] = updateHistory;
	
	
	const CHANGE_MODE_SUFFIX = "_ChangeMode";
	const MODE_JSON = "json";
	const MODE_Identity = "identity";
	const DEFAULT_MODE = MODE_JSON;
	
	function detectChanges(watch, context)
	{
	    return watch.reduce(function(changesDetected, key)
	    {
	        var valueChanged = context.changed[key] || false;
	        if (!valueChanged)
	        {
	            valueChanged = modeSelect(key, context).detectChanges(key, context);
	            if (valueChanged)
	            {
	                context.changed[key] = true;
	            }
	        }
	        return changesDetected || valueChanged;
	    }, null);
	}
	
	function updateHistory(context)
	{
	    var keys = {};
	    for (var key in context.model)
	    {
	        keys[key] = true;
	    }
	    for (key in context.changed)
	    {
	        keys[key] = true;
	    }
	    for (key in keys)
	    {
	        if (key.indexOf(CHANGE_MODE_SUFFIX) !== -1)
	        {
	            continue;
	        }
	        modeSelect(key, context).updateHistory(key, context);
	    }
	}
	
	function modeSelect(key, context)
	{
	    var mode = context.model[key + CHANGE_MODE_SUFFIX] || DEFAULT_MODE;
	    if (typeof mode === "object")
	    {
	        if (typeof mode.detectChanges === "function" && typeof mode.updateHistory === "function")
	        {
	            return mode;
	        }
	        else
	        {
	            throw new Error("When specifiying a custom mode you must supply a detectChanges function, and an updateHistory function");
	        }
	    }
	    else if (typeof mode !== "string")
	    {
	        throw new Error("Only String and Object are allowed values for ChangeMode");
	    }
	    mode = mode.toLowerCase();
	    if (mode === MODE_JSON)
	    {
	        return /* harmony namespace import */ __WEBPACK_IMPORTED_MODULE_0__changeDetector_JSON_js__;
	    }
	    else if (mode === MODE_Identity)
	    {
	        return /* harmony namespace import */ __WEBPACK_IMPORTED_MODULE_1__changeDetector_Identity_js__;
	    }
	    else
	    {
	        throw new Error("Change detection mode not recognized");
	    }
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["detectChanges"] = detectChanges;/* harmony export */ exports["updateHistory"] = updateHistory;function detectChanges(propName, context)
	{
	    var value = context.model[propName];
	    var history = context.history[propName];
	    if ((history === undefined) !== (value === undefined))
	    {
	        return true;
	    }
	    else if (value === undefined)
	    {
	        return false;
	    }
	    else if (typeof value === "object")
	    {
	        var checked = {};
	        var keys = [];
	        for (var key1 in value)
	        {
	            keys.push(key1);
	        }
	        for (var key2 in history)
	        {
	            keys.push(key2);
	        }
	        for (var i = 0; i < keys.length; i++)
	        {
	            var subkey = keys[i];
	            if (checked[subkey])
	            {
	                continue;
	            }
	            checked[subkey] = true;
	            if (value[subkey] !== history[subkey])
	            {
	                return true;
	            }
	        }
	        return false;
	    }
	    else
	    {
	        return history !== value;
	    }
	}
	
	function updateHistory(propName, context)
	{
	    var value = context.model[propName];
	    if (value === undefined)
	    {
	        delete context.history[propName];
	    }
	    else if (typeof value === "object")
	    {
	        context.history[propName] = {};
	        for (var subkey in value)
	        {
	            context.history[propName][subkey] = value[subkey];
	        }
	    }
	    else
	    {
	        context.history[propName] = context.model[propName];
	    }
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["detectChanges"] = detectChanges;/* harmony export */ exports["updateHistory"] = updateHistory;function detectChanges(key, context)
	{
	    if ((context.history[key] === undefined) !== (context.model[key] === undefined))
	    {
	        return true;
	    }
	    else if (context.model[key] === undefined)
	    {
	        return false;
	    }
	    else
	    {
	        return JSON.stringify(context.model[key]) !== context.history[key];
	    }
	}
	
	function updateHistory(key, context)
	{
	    if (context.model[key] === "undefined")
	    {
	        delete context.history[key];
	    }
	    else
	    {
	        context.history[key] = JSON.stringify(context.model[key]);
	    }
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = Deferred;function Deferred()
	{
	    var self = {};
	    self.promise = new Promise(function(resolve, reject)
	    {
	        self.resolve = resolve;
	        self.reject = reject;
	    });
	    return self;
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {function getGlobal()
	{
	    var globalRef;
	
	    (function()
	    {
	        globalRef = this;
	    })();
	    if (!globalRef)
	    {
	        try
	        {
	            globalRef = window;
	        }
	        catch (ignored)
	        {}
	        try
	        {
	            globalRef = global;
	        }
	        catch (ignored)
	        {}
	    }
	    return globalRef ||
	    {};
	}
	
	/* harmony default export */ exports["a"] = getGlobal()
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cacheManager_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__changeDetector_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__deferred_js__ = __webpack_require__(5);
	
	
	
	
	/* harmony default export */ exports["a"] = Pipeline
	
	const FAIL_BEHAVIOUR_HALT = "halt";
	const FAIL_BEHAVIOUR_WARN = "warn";
	const DEFAULT_PROCESSOR = "start";
	
	function Pipeline()
	{
	    "use strict";
	
	    var self = this;
	    var failBehaviour = FAIL_BEHAVIOUR_WARN;
	    var queue = [];
	    var cache = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__cacheManager_js__["a"]();
	    var isHalted = false;
	    var currentlyProcessing = false;
	    var history = {};
	    
	    var didRunOnceSymbol = Symbol("didRunOnce");
	
	    self.processors = {};
	    self.process = process;
	    self.halt = halt;
	    self.restart = restart;
	    self.onFail = onFail;
	    self.suppressConsole = false;
	    self.debug = false;
	
	    ////////////////////
	
	    function process(model, processor)
	    {
	        if (isHalted)
	        {
	            if (!self.suppressConsole)
	            {
	                console.error("Can't accept new process request because the pipeline is halted");
	            }
	            return Promise.reject("pipeline is halted");
	        }
	
	        var defer = /* harmony import */ __WEBPACK_IMPORTED_MODULE_2__deferred_js__["a"]();
	        queue.push(
	        {
	            deferred: defer,
	            model: model,
	            processor: processor || DEFAULT_PROCESSOR
	        });
	        checkState();
	        return defer.promise;
	    }
	
	    function halt()
	    {
	        isHalted = true;
	    }
	
	    function restart()
	    {
	        isHalted = false;
	        queue = [];
	        queue.push(
	        {
	            model:
	            {},
	            processor: cache.clear
	        });
	        checkState();
	    }
	
	    function checkState()
	    {
	        if (isHalted)
	        {
	            return;
	        }
	
	        if (currentlyProcessing)
	        {
	            return;
	        }
	
	        if (queue.length > 0)
	        {
	            currentlyProcessing = true;
	            var next = queue.shift();
	            var context = {
	                model: next.model,
	                history: history,
	                changed:
	                {}
	            };
	            var cleanup = function()
	            {
	                currentlyProcessing = false;
	                /* harmony namespace import */ __WEBPACK_IMPORTED_MODULE_1__changeDetector_js__.updateHistory(context);
	                if (self.debug)
	                {
	                    var fast = {};
	                    var slow = {};
	                    for (var key in context.performance){
	                        var value = context.performance[key];
	                        if (value >= 2) {
	                            slow[key] = value;
	                        } else {
	                            fast[key] = value;
	                        }
	                    }
	                    console.log(slow, fast);
	                }
	                setTimeout(checkState, 0);
	            };
	            var whenDone = runProcessor(context, next.processor);
	            whenDone.catch(handleError(next.deferred.reject));
	            whenDone.then(cleanup, cleanup);
	            whenDone.then(next.deferred.resolve, next.deferred.resolve);
	        }
	    }
	
	    function handleError(reject)
	    {
	        return function(err)
	        {
	            if (failBehaviour === FAIL_BEHAVIOUR_HALT)
	            {
	                self.halt();
	                if (!self.suppressConsole)
	                {
	                    console.error(err);
	                }
	                reject(err);
	            }
	            else if (failBehaviour === FAIL_BEHAVIOUR_WARN)
	            {
	                if (!self.suppressConsole)
	                {
	                    console.warn(err);
	                }
	            }
	            else
	            {
	                console.error("Wait... what?");
	            }
	        };
	    }
	
	    function runProcessor(context, processor)
	    {
	        if (!processor)
	        {
	            throw new Error("Processor undefined");
	        }
	        if (isHalted)
	        {
	            return Promise.resolve();
	        }
	        var runner;
	        if (typeof processor === "function")
	        {
	            runner = runProcessor_Function;
	        }
	        else if (typeof processor === "string")
	        {
	            runner = runProcessor_String;
	        }
	        else if (Array.isArray(processor))
	        {
	            runner = runProcessor_Array;
	        }
	        else if (typeof processor === "object")
	        {
	            runner = runProcessor_Object;
	        }
	        if (runner)
	        {
	            try
	            {
	                return runner(context, processor);
	            }
	            catch (err)
	            {
	                return Promise.reject(err);
	            }
	        }
	        else
	        {
	            throw new Error("Not sure how to run processor", processor);
	        }
	    }
	
	    function runProcessor_Function(context, processor)
	    {
	        return Promise.resolve(processor(
	        {
	            model: context.model,
	            changed: context.changed,
	            cache: cache.get(self, processor)
	        }));
	    }
	
	    function runProcessor_String(context, processor)
	    {
	        var runner;
	        var lname = processor.toLowerCase();
	        if (context.model && context.model.processors)
	        {
	            runner = context.model.processors[lname];
	        }
	        if (!runner)
	        {
	            runner = self.processors[lname];
	        }
	        if (!runner)
	        {
	            throw new Error("Couldn't find processor " + lname);
	        }
	
	        var start = performance.now();
	        var result = runProcessor(context, runner);
	        result.then(function()
	        {
	            var finish = performance.now();
	            context.performance = context.performance ||
	            {};
	            context.performance[lname] = Math.floor((finish - start) * 10000) / 10000;
	        });
	        return result;
	    }
	
	    function runProcessor_Object(context, processor)
	    {
	        if (!processor.runs || !(typeof processor.runs === "string" || typeof processor.runs === "object" || typeof processor.runs === "function"))
	        {
	            throw new Error("Object based processor must have a 'runs' property containing a processor defintion");
	        }
	        var runThis = true;
	        if (typeof processor.watches === "string")
	        {
	            processor.watches = [processor.watches];
	        }
	        if (Array.isArray(processor.watches))
	        {
	            runThis = /* harmony namespace import */ __WEBPACK_IMPORTED_MODULE_1__changeDetector_js__.detectChanges(processor.watches, context);
	        }
	        if (!processor[didRunOnceSymbol]) {
	            runThis = true;
	            processor[didRunOnceSymbol] = true;
	        }
	        if (runThis)
	        {
	            return runProcessor(context, processor.runs);
	        }
	        else
	        {
	            return Promise.resolve();
	        }
	    }
	
	    function runProcessor_Array(context, processor)
	    {
	        return new Promise(function(resolve, reject)
	        {
	            var temp = processor.slice();
	
	            function processNext()
	            {
	
	                if (temp.length === 0)
	                {
	                    resolve();
	                }
	                else
	                {
	                    var current = runProcessor(context, temp.shift());
	                    current.catch(handleError(reject));
	                    current.then(processNext, processNext);
	                }
	            }
	            processNext();
	        });
	    }
	
	    function onFail(behaviour)
	    {
	        if (behaviour !== FAIL_BEHAVIOUR_HALT && behaviour !== FAIL_BEHAVIOUR_WARN)
	        {
	            throw new Error("On fail only accepts a single string value which must be exactly '" + FAIL_BEHAVIOUR_HALT + "' or '" + FAIL_BEHAVIOUR_WARN + "'");
	        }
	        failBehaviour = behaviour;
	    }
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(0);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxOWMxYWJkMzdhYWJmNDhiYTQyYSIsIndlYnBhY2s6Ly8vLi9saWJTcmMvcGlwZWxpbmVGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jYWNoZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL2NoYW5nZURldGVjdG9yLmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvcl9JZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvY2hhbmdlRGV0ZWN0b3JfSlNPTi5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvZGVmZXJyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvcGlwZWxpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7aURDdENBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs2SEN0REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs2SEM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OzZIQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs4Q0MxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InByb2Nlc3NpbmctcGlwZWxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxOWMxYWJkMzdhYWJmNDhiYTQyYVxuICoqLyIsImltcG9ydCBQaXBlbGluZUluc3RhbmNlIGZyb20gJy4vcGlwZWxpbmUuanMnO1xyXG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsLmpzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKVxyXG57XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBuZXcgUGlwZWxpbmVJbnN0YW5jZSgpO1xyXG59XHJcblxyXG5nbG9iYWwuUGlwZWxpbmVGYWN0b3J5ID0ge1xyXG4gICAgY3JlYXRlOiBjcmVhdGVcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9waXBlbGluZUZhY3RvcnkuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBDYWNoZU1hbmFnZXI7XHJcblxyXG5jb25zdCBDYWNoZUNvbnRleHRTeW1ib2wgPSBTeW1ib2woXCJjYWNoZU1hbmFnZXJDb250ZXh0XCIpO1xyXG5cclxuZnVuY3Rpb24gQ2FjaGVNYW5hZ2VyKClcclxue1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIGludGVybmFsQ2FjaGUgPSB7fTtcclxuXHJcbiAgICBzZWxmLmNsZWFyID0gY2xlYXI7XHJcbiAgICBzZWxmLmdldCA9IGdldENhY2hlO1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWxDYWNoZSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENvbnRleHQob2JqKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FjaGVDb250ZXh0IGNhbm5vdCBiZSBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYWNoZUNvbnRleHQgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZnVuY3Rpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdHggPSBvYmpbQ2FjaGVDb250ZXh0U3ltYm9sXTtcclxuICAgICAgICBpZiAoIWN0eClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN0eCA9IFwiXCIgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5OTk5OSk7XHJcbiAgICAgICAgICAgIG9ialtDYWNoZUNvbnRleHRTeW1ib2xdID0gY3R4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3R4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENhY2hlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcbiAgICAgICAgdmFyIGN0eCA9IGFyZ3MucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChyZXN1bHQgfCBcIlwiKSArIGdldENvbnRleHQob2JqKSArIFwifFwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBjYWNoZSA9IGludGVybmFsQ2FjaGVbY3R4XTtcclxuICAgICAgICBpZiAoIWNhY2hlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FjaGUgPSB7fTtcclxuICAgICAgICAgICAgaW50ZXJuYWxDYWNoZVtjdHhdID0gY2FjaGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYWNoZTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL2NhY2hlTWFuYWdlci5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAqIGFzIEpTT05fQ0QgZnJvbSAnLi9jaGFuZ2VEZXRlY3Rvcl9KU09OLmpzJztcclxuaW1wb3J0ICogYXMgSURfQ0QgZnJvbSAnLi9jaGFuZ2VEZXRlY3Rvcl9JZGVudGl0eS5qcyc7XHJcblxyXG5jb25zdCBDSEFOR0VfTU9ERV9TVUZGSVggPSBcIl9DaGFuZ2VNb2RlXCI7XHJcbmNvbnN0IE1PREVfSlNPTiA9IFwianNvblwiO1xyXG5jb25zdCBNT0RFX0lkZW50aXR5ID0gXCJpZGVudGl0eVwiO1xyXG5jb25zdCBERUZBVUxUX01PREUgPSBNT0RFX0pTT047XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0Q2hhbmdlcyh3YXRjaCwgY29udGV4dClcclxue1xyXG4gICAgcmV0dXJuIHdhdGNoLnJlZHVjZShmdW5jdGlvbihjaGFuZ2VzRGV0ZWN0ZWQsIGtleSlcclxuICAgIHtcclxuICAgICAgICB2YXIgdmFsdWVDaGFuZ2VkID0gY29udGV4dC5jaGFuZ2VkW2tleV0gfHwgZmFsc2U7XHJcbiAgICAgICAgaWYgKCF2YWx1ZUNoYW5nZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSBtb2RlU2VsZWN0KGtleSwgY29udGV4dCkuZGV0ZWN0Q2hhbmdlcyhrZXksIGNvbnRleHQpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWVDaGFuZ2VkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNoYW5nZWRba2V5XSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNoYW5nZXNEZXRlY3RlZCB8fCB2YWx1ZUNoYW5nZWQ7XHJcbiAgICB9LCBudWxsKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUhpc3RvcnkoY29udGV4dClcclxue1xyXG4gICAgdmFyIGtleXMgPSB7fTtcclxuICAgIGZvciAodmFyIGtleSBpbiBjb250ZXh0Lm1vZGVsKVxyXG4gICAge1xyXG4gICAgICAgIGtleXNba2V5XSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmb3IgKGtleSBpbiBjb250ZXh0LmNoYW5nZWQpXHJcbiAgICB7XHJcbiAgICAgICAga2V5c1trZXldID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZvciAoa2V5IGluIGtleXMpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGtleS5pbmRleE9mKENIQU5HRV9NT0RFX1NVRkZJWCkgIT09IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZGVTZWxlY3Qoa2V5LCBjb250ZXh0KS51cGRhdGVIaXN0b3J5KGtleSwgY29udGV4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZGVTZWxlY3Qoa2V5LCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgbW9kZSA9IGNvbnRleHQubW9kZWxba2V5ICsgQ0hBTkdFX01PREVfU1VGRklYXSB8fCBERUZBVUxUX01PREU7XHJcbiAgICBpZiAodHlwZW9mIG1vZGUgPT09IFwib2JqZWN0XCIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlLmRldGVjdENoYW5nZXMgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgbW9kZS51cGRhdGVIaXN0b3J5ID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV2hlbiBzcGVjaWZpeWluZyBhIGN1c3RvbSBtb2RlIHlvdSBtdXN0IHN1cHBseSBhIGRldGVjdENoYW5nZXMgZnVuY3Rpb24sIGFuZCBhbiB1cGRhdGVIaXN0b3J5IGZ1bmN0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2RlICE9PSBcInN0cmluZ1wiKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgU3RyaW5nIGFuZCBPYmplY3QgYXJlIGFsbG93ZWQgdmFsdWVzIGZvciBDaGFuZ2VNb2RlXCIpO1xyXG4gICAgfVxyXG4gICAgbW9kZSA9IG1vZGUudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmIChtb2RlID09PSBNT0RFX0pTT04pXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEpTT05fQ0Q7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChtb2RlID09PSBNT0RFX0lkZW50aXR5KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBJRF9DRDtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGFuZ2UgZGV0ZWN0aW9uIG1vZGUgbm90IHJlY29nbml6ZWRcIik7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBkZXRlY3RDaGFuZ2VzKHByb3BOYW1lLCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lm1vZGVsW3Byb3BOYW1lXTtcclxuICAgIHZhciBoaXN0b3J5ID0gY29udGV4dC5oaXN0b3J5W3Byb3BOYW1lXTtcclxuICAgIGlmICgoaGlzdG9yeSA9PT0gdW5kZWZpbmVkKSAhPT0gKHZhbHVlID09PSB1bmRlZmluZWQpKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNoZWNrZWQgPSB7fTtcclxuICAgICAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGtleTEgaW4gdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGtleTIgaW4gaGlzdG9yeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN1YmtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjaGVja2VkW3N1YmtleV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoZWNrZWRbc3Via2V5XSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZVtzdWJrZXldICE9PSBoaXN0b3J5W3N1YmtleV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gaGlzdG9yeSAhPT0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVIaXN0b3J5KHByb3BOYW1lLCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lm1vZGVsW3Byb3BOYW1lXTtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIGRlbGV0ZSBjb250ZXh0Lmhpc3RvcnlbcHJvcE5hbWVdO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuaGlzdG9yeVtwcm9wTmFtZV0gPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBzdWJrZXkgaW4gdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0Lmhpc3RvcnlbcHJvcE5hbWVdW3N1YmtleV0gPSB2YWx1ZVtzdWJrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0Lmhpc3RvcnlbcHJvcE5hbWVdID0gY29udGV4dC5tb2RlbFtwcm9wTmFtZV07XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvcl9JZGVudGl0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBkZXRlY3RDaGFuZ2VzKGtleSwgY29udGV4dClcclxue1xyXG4gICAgaWYgKChjb250ZXh0Lmhpc3Rvcnlba2V5XSA9PT0gdW5kZWZpbmVkKSAhPT0gKGNvbnRleHQubW9kZWxba2V5XSA9PT0gdW5kZWZpbmVkKSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNvbnRleHQubW9kZWxba2V5XSA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29udGV4dC5tb2RlbFtrZXldKSAhPT0gY29udGV4dC5oaXN0b3J5W2tleV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVIaXN0b3J5KGtleSwgY29udGV4dClcclxue1xyXG4gICAgaWYgKGNvbnRleHQubW9kZWxba2V5XSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgIHtcclxuICAgICAgICBkZWxldGUgY29udGV4dC5oaXN0b3J5W2tleV07XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5oaXN0b3J5W2tleV0gPSBKU09OLnN0cmluZ2lmeShjb250ZXh0Lm1vZGVsW2tleV0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvY2hhbmdlRGV0ZWN0b3JfSlNPTi5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERlZmVycmVkKClcclxue1xyXG4gICAgdmFyIHNlbGYgPSB7fTtcclxuICAgIHNlbGYucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdClcclxuICAgIHtcclxuICAgICAgICBzZWxmLnJlc29sdmUgPSByZXNvbHZlO1xyXG4gICAgICAgIHNlbGYucmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc2VsZjtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL2RlZmVycmVkLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gZ2V0R2xvYmFsKClcclxue1xyXG4gICAgdmFyIGdsb2JhbFJlZjtcclxuXHJcbiAgICAoZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGdsb2JhbFJlZiA9IHRoaXM7XHJcbiAgICB9KSgpO1xyXG4gICAgaWYgKCFnbG9iYWxSZWYpXHJcbiAgICB7XHJcbiAgICAgICAgdHJ5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnbG9iYWxSZWYgPSB3aW5kb3c7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChpZ25vcmVkKVxyXG4gICAgICAgIHt9XHJcbiAgICAgICAgdHJ5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnbG9iYWxSZWYgPSBnbG9iYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChpZ25vcmVkKVxyXG4gICAgICAgIHt9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2xvYmFsUmVmIHx8XHJcbiAgICB7fTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0R2xvYmFsKCk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvZ2xvYmFsLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IENhY2hlTWFuYWdlciBmcm9tICcuL2NhY2hlTWFuYWdlci5qcyc7XHJcbmltcG9ydCAqIGFzIGNoYW5nZURldGVjdG9yIGZyb20gJy4vY2hhbmdlRGV0ZWN0b3IuanMnO1xyXG5pbXBvcnQgRGVmZXJyZWQgZnJvbSAnLi9kZWZlcnJlZC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQaXBlbGluZTtcclxuXHJcbmNvbnN0IEZBSUxfQkVIQVZJT1VSX0hBTFQgPSBcImhhbHRcIjtcclxuY29uc3QgRkFJTF9CRUhBVklPVVJfV0FSTiA9IFwid2FyblwiO1xyXG5jb25zdCBERUZBVUxUX1BST0NFU1NPUiA9IFwic3RhcnRcIjtcclxuXHJcbmZ1bmN0aW9uIFBpcGVsaW5lKClcclxue1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIGZhaWxCZWhhdmlvdXIgPSBGQUlMX0JFSEFWSU9VUl9XQVJOO1xyXG4gICAgdmFyIHF1ZXVlID0gW107XHJcbiAgICB2YXIgY2FjaGUgPSBuZXcgQ2FjaGVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgaXNIYWx0ZWQgPSBmYWxzZTtcclxuICAgIHZhciBjdXJyZW50bHlQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICB2YXIgaGlzdG9yeSA9IHt9O1xyXG4gICAgXHJcbiAgICB2YXIgZGlkUnVuT25jZVN5bWJvbCA9IFN5bWJvbChcImRpZFJ1bk9uY2VcIik7XHJcblxyXG4gICAgc2VsZi5wcm9jZXNzb3JzID0ge307XHJcbiAgICBzZWxmLnByb2Nlc3MgPSBwcm9jZXNzO1xyXG4gICAgc2VsZi5oYWx0ID0gaGFsdDtcclxuICAgIHNlbGYucmVzdGFydCA9IHJlc3RhcnQ7XHJcbiAgICBzZWxmLm9uRmFpbCA9IG9uRmFpbDtcclxuICAgIHNlbGYuc3VwcHJlc3NDb25zb2xlID0gZmFsc2U7XHJcbiAgICBzZWxmLmRlYnVnID0gZmFsc2U7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBmdW5jdGlvbiBwcm9jZXNzKG1vZGVsLCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGlzSGFsdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLnN1cHByZXNzQ29uc29sZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbid0IGFjY2VwdCBuZXcgcHJvY2VzcyByZXF1ZXN0IGJlY2F1c2UgdGhlIHBpcGVsaW5lIGlzIGhhbHRlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJwaXBlbGluZSBpcyBoYWx0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGVmZXIgPSBEZWZlcnJlZCgpO1xyXG4gICAgICAgIHF1ZXVlLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXIsXHJcbiAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcclxuICAgICAgICAgICAgcHJvY2Vzc29yOiBwcm9jZXNzb3IgfHwgREVGQVVMVF9QUk9DRVNTT1JcclxuICAgICAgICB9KTtcclxuICAgICAgICBjaGVja1N0YXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFsdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaXNIYWx0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlzSGFsdGVkID0gZmFsc2U7XHJcbiAgICAgICAgcXVldWUgPSBbXTtcclxuICAgICAgICBxdWV1ZS5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6XHJcbiAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICBwcm9jZXNzb3I6IGNhY2hlLmNsZWFyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2hlY2tTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrU3RhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChpc0hhbHRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50bHlQcm9jZXNzaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJyZW50bHlQcm9jZXNzaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIG5leHQgPSBxdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHtcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBuZXh0Lm1vZGVsLFxyXG4gICAgICAgICAgICAgICAgaGlzdG9yeTogaGlzdG9yeSxcclxuICAgICAgICAgICAgICAgIGNoYW5nZWQ6XHJcbiAgICAgICAgICAgICAgICB7fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgY2xlYW51cCA9IGZ1bmN0aW9uKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudGx5UHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3IudXBkYXRlSGlzdG9yeShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRlYnVnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmYXN0ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsb3cgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29udGV4dC5wZXJmb3JtYW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNvbnRleHQucGVyZm9ybWFuY2Vba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID49IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3dba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFzdFtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2xvdywgZmFzdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3RhdGUsIDApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgd2hlbkRvbmUgPSBydW5Qcm9jZXNzb3IoY29udGV4dCwgbmV4dC5wcm9jZXNzb3IpO1xyXG4gICAgICAgICAgICB3aGVuRG9uZS5jYXRjaChoYW5kbGVFcnJvcihuZXh0LmRlZmVycmVkLnJlamVjdCkpO1xyXG4gICAgICAgICAgICB3aGVuRG9uZS50aGVuKGNsZWFudXAsIGNsZWFudXApO1xyXG4gICAgICAgICAgICB3aGVuRG9uZS50aGVuKG5leHQuZGVmZXJyZWQucmVzb2x2ZSwgbmV4dC5kZWZlcnJlZC5yZXNvbHZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IocmVqZWN0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlcnIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZmFpbEJlaGF2aW91ciA9PT0gRkFJTF9CRUhBVklPVVJfSEFMVClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5oYWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuc3VwcHJlc3NDb25zb2xlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZhaWxCZWhhdmlvdXIgPT09IEZBSUxfQkVIQVZJT1VSX1dBUk4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2VsZi5zdXBwcmVzc0NvbnNvbGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiV2FpdC4uLiB3aGF0P1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuUHJvY2Vzc29yKGNvbnRleHQsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICBpZiAoIXByb2Nlc3NvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlByb2Nlc3NvciB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0hhbHRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJ1bm5lcjtcclxuICAgICAgICBpZiAodHlwZW9mIHByb2Nlc3NvciA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcnVubmVyID0gcnVuUHJvY2Vzc29yX0Z1bmN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcHJvY2Vzc29yID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcnVubmVyID0gcnVuUHJvY2Vzc29yX1N0cmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwcm9jZXNzb3IpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcnVubmVyID0gcnVuUHJvY2Vzc29yX0FycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcHJvY2Vzc29yID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcnVubmVyID0gcnVuUHJvY2Vzc29yX09iamVjdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJ1bm5lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcnVubmVyKGNvbnRleHQsIHByb2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IHN1cmUgaG93IHRvIHJ1biBwcm9jZXNzb3JcIiwgcHJvY2Vzc29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuUHJvY2Vzc29yX0Z1bmN0aW9uKGNvbnRleHQsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHByb2Nlc3NvcihcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBjb250ZXh0Lm1vZGVsLFxyXG4gICAgICAgICAgICBjaGFuZ2VkOiBjb250ZXh0LmNoYW5nZWQsXHJcbiAgICAgICAgICAgIGNhY2hlOiBjYWNoZS5nZXQoc2VsZiwgcHJvY2Vzc29yKVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBydW5Qcm9jZXNzb3JfU3RyaW5nKGNvbnRleHQsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICB2YXIgcnVubmVyO1xyXG4gICAgICAgIHZhciBsbmFtZSA9IHByb2Nlc3Nvci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChjb250ZXh0Lm1vZGVsICYmIGNvbnRleHQubW9kZWwucHJvY2Vzc29ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IGNvbnRleHQubW9kZWwucHJvY2Vzc29yc1tsbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcnVubmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcnVubmVyID0gc2VsZi5wcm9jZXNzb3JzW2xuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFydW5uZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIHByb2Nlc3NvciBcIiArIGxuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBydW5Qcm9jZXNzb3IoY29udGV4dCwgcnVubmVyKTtcclxuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmluaXNoID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucGVyZm9ybWFuY2UgPSBjb250ZXh0LnBlcmZvcm1hbmNlIHx8XHJcbiAgICAgICAgICAgIHt9O1xyXG4gICAgICAgICAgICBjb250ZXh0LnBlcmZvcm1hbmNlW2xuYW1lXSA9IE1hdGguZmxvb3IoKGZpbmlzaCAtIHN0YXJ0KSAqIDEwMDAwKSAvIDEwMDAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuUHJvY2Vzc29yX09iamVjdChjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFwcm9jZXNzb3IucnVucyB8fCAhKHR5cGVvZiBwcm9jZXNzb3IucnVucyA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcHJvY2Vzc29yLnJ1bnMgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIHByb2Nlc3Nvci5ydW5zID09PSBcImZ1bmN0aW9uXCIpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IGJhc2VkIHByb2Nlc3NvciBtdXN0IGhhdmUgYSAncnVucycgcHJvcGVydHkgY29udGFpbmluZyBhIHByb2Nlc3NvciBkZWZpbnRpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBydW5UaGlzID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHlwZW9mIHByb2Nlc3Nvci53YXRjaGVzID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvY2Vzc29yLndhdGNoZXMgPSBbcHJvY2Vzc29yLndhdGNoZXNdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9jZXNzb3Iud2F0Y2hlcykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5UaGlzID0gY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcyhwcm9jZXNzb3Iud2F0Y2hlcywgY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcHJvY2Vzc29yW2RpZFJ1bk9uY2VTeW1ib2xdKSB7XHJcbiAgICAgICAgICAgIHJ1blRoaXMgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcm9jZXNzb3JbZGlkUnVuT25jZVN5bWJvbF0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocnVuVGhpcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBydW5Qcm9jZXNzb3IoY29udGV4dCwgcHJvY2Vzc29yLnJ1bnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1blByb2Nlc3Nvcl9BcnJheShjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gcHJvY2Vzc29yLnNsaWNlKCk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwcm9jZXNzTmV4dCgpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcnVuUHJvY2Vzc29yKGNvbnRleHQsIHRlbXAuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5jYXRjaChoYW5kbGVFcnJvcihyZWplY3QpKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LnRoZW4ocHJvY2Vzc05leHQsIHByb2Nlc3NOZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9jZXNzTmV4dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uRmFpbChiZWhhdmlvdXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGJlaGF2aW91ciAhPT0gRkFJTF9CRUhBVklPVVJfSEFMVCAmJiBiZWhhdmlvdXIgIT09IEZBSUxfQkVIQVZJT1VSX1dBUk4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbiBmYWlsIG9ubHkgYWNjZXB0cyBhIHNpbmdsZSBzdHJpbmcgdmFsdWUgd2hpY2ggbXVzdCBiZSBleGFjdGx5ICdcIiArIEZBSUxfQkVIQVZJT1VSX0hBTFQgKyBcIicgb3IgJ1wiICsgRkFJTF9CRUhBVklPVVJfV0FSTiArIFwiJ1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmFpbEJlaGF2aW91ciA9IGJlaGF2aW91cjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL3BpcGVsaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==