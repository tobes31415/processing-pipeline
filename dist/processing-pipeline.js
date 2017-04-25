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
	    var self = this ||
	    {};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiYzYxY2U2NTgyMzM0ZWQxZjE0OCIsIndlYnBhY2s6Ly8vLi9saWJTcmMvcGlwZWxpbmVGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jYWNoZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL2NoYW5nZURldGVjdG9yLmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvcl9JZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvY2hhbmdlRGV0ZWN0b3JfSlNPTi5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvZGVmZXJyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvcGlwZWxpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7aURDdENBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs2SEN0REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs2SEM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OzZIQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs4Q0MxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicHJvY2Vzc2luZy1waXBlbGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGJjNjFjZTY1ODIzMzRlZDFmMTQ4XG4gKiovIiwiaW1wb3J0IFBpcGVsaW5lSW5zdGFuY2UgZnJvbSAnLi9waXBlbGluZS5qcyc7XHJcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwuanMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpXHJcbntcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIG5ldyBQaXBlbGluZUluc3RhbmNlKCk7XHJcbn1cclxuXHJcbmdsb2JhbC5QaXBlbGluZUZhY3RvcnkgPSB7XHJcbiAgICBjcmVhdGU6IGNyZWF0ZVxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL3BpcGVsaW5lRmFjdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IENhY2hlTWFuYWdlcjtcclxuXHJcbmNvbnN0IENhY2hlQ29udGV4dFN5bWJvbCA9IFN5bWJvbChcImNhY2hlTWFuYWdlckNvbnRleHRcIik7XHJcblxyXG5mdW5jdGlvbiBDYWNoZU1hbmFnZXIoKVxyXG57XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgaW50ZXJuYWxDYWNoZSA9IHt9O1xyXG5cclxuICAgIHNlbGYuY2xlYXIgPSBjbGVhcjtcclxuICAgIHNlbGYuZ2V0ID0gZ2V0Q2FjaGU7XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyKClcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbENhY2hlID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q29udGV4dChvYmopXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYWNoZUNvbnRleHQgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhY2hlQ29udGV4dCBtdXN0IGJlIGFuIG9iamVjdCBvciBmdW5jdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN0eCA9IG9ialtDYWNoZUNvbnRleHRTeW1ib2xdO1xyXG4gICAgICAgIGlmICghY3R4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3R4ID0gXCJcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDk5OTk5KTtcclxuICAgICAgICAgICAgb2JqW0NhY2hlQ29udGV4dFN5bWJvbF0gPSBjdHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdHg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2FjaGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgICAgICB2YXIgY3R4ID0gYXJncy5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHJlc3VsdCB8IFwiXCIpICsgZ2V0Q29udGV4dChvYmopICsgXCJ8XCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGNhY2hlID0gaW50ZXJuYWxDYWNoZVtjdHhdO1xyXG4gICAgICAgIGlmICghY2FjaGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYWNoZSA9IHt9O1xyXG4gICAgICAgICAgICBpbnRlcm5hbENhY2hlW2N0eF0gPSBjYWNoZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvY2FjaGVNYW5hZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0ICogYXMgSlNPTl9DRCBmcm9tICcuL2NoYW5nZURldGVjdG9yX0pTT04uanMnO1xyXG5pbXBvcnQgKiBhcyBJRF9DRCBmcm9tICcuL2NoYW5nZURldGVjdG9yX0lkZW50aXR5LmpzJztcclxuXHJcbmNvbnN0IENIQU5HRV9NT0RFX1NVRkZJWCA9IFwiX0NoYW5nZU1vZGVcIjtcclxuY29uc3QgTU9ERV9KU09OID0gXCJqc29uXCI7XHJcbmNvbnN0IE1PREVfSWRlbnRpdHkgPSBcImlkZW50aXR5XCI7XHJcbmNvbnN0IERFRkFVTFRfTU9ERSA9IE1PREVfSlNPTjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RDaGFuZ2VzKHdhdGNoLCBjb250ZXh0KVxyXG57XHJcbiAgICByZXR1cm4gd2F0Y2gucmVkdWNlKGZ1bmN0aW9uKGNoYW5nZXNEZXRlY3RlZCwga2V5KVxyXG4gICAge1xyXG4gICAgICAgIHZhciB2YWx1ZUNoYW5nZWQgPSBjb250ZXh0LmNoYW5nZWRba2V5XSB8fCBmYWxzZTtcclxuICAgICAgICBpZiAoIXZhbHVlQ2hhbmdlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IG1vZGVTZWxlY3Qoa2V5LCBjb250ZXh0KS5kZXRlY3RDaGFuZ2VzKGtleSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZUNoYW5nZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2hhbmdlZFtrZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hhbmdlc0RldGVjdGVkIHx8IHZhbHVlQ2hhbmdlZDtcclxuICAgIH0sIG51bGwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSGlzdG9yeShjb250ZXh0KVxyXG57XHJcbiAgICB2YXIga2V5cyA9IHt9O1xyXG4gICAgZm9yICh2YXIga2V5IGluIGNvbnRleHQubW9kZWwpXHJcbiAgICB7XHJcbiAgICAgICAga2V5c1trZXldID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZvciAoa2V5IGluIGNvbnRleHQuY2hhbmdlZClcclxuICAgIHtcclxuICAgICAgICBrZXlzW2tleV0gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZm9yIChrZXkgaW4ga2V5cylcclxuICAgIHtcclxuICAgICAgICBpZiAoa2V5LmluZGV4T2YoQ0hBTkdFX01PREVfU1VGRklYKSAhPT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbW9kZVNlbGVjdChrZXksIGNvbnRleHQpLnVwZGF0ZUhpc3Rvcnkoa2V5LCBjb250ZXh0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbW9kZVNlbGVjdChrZXksIGNvbnRleHQpXHJcbntcclxuICAgIHZhciBtb2RlID0gY29udGV4dC5tb2RlbFtrZXkgKyBDSEFOR0VfTU9ERV9TVUZGSVhdIHx8IERFRkFVTFRfTU9ERTtcclxuICAgIGlmICh0eXBlb2YgbW9kZSA9PT0gXCJvYmplY3RcIilcclxuICAgIHtcclxuICAgICAgICBpZiAodHlwZW9mIG1vZGUuZGV0ZWN0Q2hhbmdlcyA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBtb2RlLnVwZGF0ZUhpc3RvcnkgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXaGVuIHNwZWNpZml5aW5nIGEgY3VzdG9tIG1vZGUgeW91IG11c3Qgc3VwcGx5IGEgZGV0ZWN0Q2hhbmdlcyBmdW5jdGlvbiwgYW5kIGFuIHVwZGF0ZUhpc3RvcnkgZnVuY3Rpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIG1vZGUgIT09IFwic3RyaW5nXCIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBTdHJpbmcgYW5kIE9iamVjdCBhcmUgYWxsb3dlZCB2YWx1ZXMgZm9yIENoYW5nZU1vZGVcIik7XHJcbiAgICB9XHJcbiAgICBtb2RlID0gbW9kZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKG1vZGUgPT09IE1PREVfSlNPTilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSlNPTl9DRDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG1vZGUgPT09IE1PREVfSWRlbnRpdHkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIElEX0NEO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoYW5nZSBkZXRlY3Rpb24gbW9kZSBub3QgcmVjb2duaXplZFwiKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL2NoYW5nZURldGVjdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGRldGVjdENoYW5nZXMocHJvcE5hbWUsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubW9kZWxbcHJvcE5hbWVdO1xyXG4gICAgdmFyIGhpc3RvcnkgPSBjb250ZXh0Lmhpc3RvcnlbcHJvcE5hbWVdO1xyXG4gICAgaWYgKChoaXN0b3J5ID09PSB1bmRlZmluZWQpICE9PSAodmFsdWUgPT09IHVuZGVmaW5lZCkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgIHtcclxuICAgICAgICB2YXIgY2hlY2tlZCA9IHt9O1xyXG4gICAgICAgIHZhciBrZXlzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIga2V5MSBpbiB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIga2V5MiBpbiBoaXN0b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5cy5wdXNoKGtleTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3Via2V5ID0ga2V5c1tpXTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrZWRbc3Via2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hlY2tlZFtzdWJrZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlW3N1YmtleV0gIT09IGhpc3Rvcnlbc3Via2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBoaXN0b3J5ICE9PSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUhpc3RvcnkocHJvcE5hbWUsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubW9kZWxbcHJvcE5hbWVdO1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZGVsZXRlIGNvbnRleHQuaGlzdG9yeVtwcm9wTmFtZV07XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5oaXN0b3J5W3Byb3BOYW1lXSA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHN1YmtleSBpbiB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuaGlzdG9yeVtwcm9wTmFtZV1bc3Via2V5XSA9IHZhbHVlW3N1YmtleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuaGlzdG9yeVtwcm9wTmFtZV0gPSBjb250ZXh0Lm1vZGVsW3Byb3BOYW1lXTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL2NoYW5nZURldGVjdG9yX0lkZW50aXR5LmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGRldGVjdENoYW5nZXMoa2V5LCBjb250ZXh0KVxyXG57XHJcbiAgICBpZiAoKGNvbnRleHQuaGlzdG9yeVtrZXldID09PSB1bmRlZmluZWQpICE9PSAoY29udGV4dC5tb2RlbFtrZXldID09PSB1bmRlZmluZWQpKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY29udGV4dC5tb2RlbFtrZXldID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShjb250ZXh0Lm1vZGVsW2tleV0pICE9PSBjb250ZXh0Lmhpc3Rvcnlba2V5XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUhpc3Rvcnkoa2V5LCBjb250ZXh0KVxyXG57XHJcbiAgICBpZiAoY29udGV4dC5tb2RlbFtrZXldID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAge1xyXG4gICAgICAgIGRlbGV0ZSBjb250ZXh0Lmhpc3Rvcnlba2V5XTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0Lmhpc3Rvcnlba2V5XSA9IEpTT04uc3RyaW5naWZ5KGNvbnRleHQubW9kZWxba2V5XSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvcl9KU09OLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGVmZXJyZWQoKVxyXG57XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMgfHxcclxuICAgIHt9O1xyXG4gICAgc2VsZi5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KVxyXG4gICAge1xyXG4gICAgICAgIHNlbGYucmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgICAgc2VsZi5yZWplY3QgPSByZWplY3Q7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzZWxmO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvZGVmZXJyZWQuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiBnZXRHbG9iYWwoKVxyXG57XHJcbiAgICB2YXIgZ2xvYmFsUmVmO1xyXG5cclxuICAgIChmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgZ2xvYmFsUmVmID0gdGhpcztcclxuICAgIH0pKCk7XHJcbiAgICBpZiAoIWdsb2JhbFJlZilcclxuICAgIHtcclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdsb2JhbFJlZiA9IHdpbmRvdztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGlnbm9yZWQpXHJcbiAgICAgICAge31cclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdsb2JhbFJlZiA9IGdsb2JhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGlnbm9yZWQpXHJcbiAgICAgICAge31cclxuICAgIH1cclxuICAgIHJldHVybiBnbG9iYWxSZWYgfHxcclxuICAgIHt9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRHbG9iYWwoKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9nbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgQ2FjaGVNYW5hZ2VyIGZyb20gJy4vY2FjaGVNYW5hZ2VyLmpzJztcclxuaW1wb3J0ICogYXMgY2hhbmdlRGV0ZWN0b3IgZnJvbSAnLi9jaGFuZ2VEZXRlY3Rvci5qcyc7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICcuL2RlZmVycmVkLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBpcGVsaW5lO1xyXG5cclxuY29uc3QgRkFJTF9CRUhBVklPVVJfSEFMVCA9IFwiaGFsdFwiO1xyXG5jb25zdCBGQUlMX0JFSEFWSU9VUl9XQVJOID0gXCJ3YXJuXCI7XHJcbmNvbnN0IERFRkFVTFRfUFJPQ0VTU09SID0gXCJzdGFydFwiO1xyXG5cclxuZnVuY3Rpb24gUGlwZWxpbmUoKVxyXG57XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgZmFpbEJlaGF2aW91ciA9IEZBSUxfQkVIQVZJT1VSX1dBUk47XHJcbiAgICB2YXIgcXVldWUgPSBbXTtcclxuICAgIHZhciBjYWNoZSA9IG5ldyBDYWNoZU1hbmFnZXIoKTtcclxuICAgIHZhciBpc0hhbHRlZCA9IGZhbHNlO1xyXG4gICAgdmFyIGN1cnJlbnRseVByb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgIHZhciBoaXN0b3J5ID0ge307XHJcbiAgICBcclxuICAgIHZhciBkaWRSdW5PbmNlU3ltYm9sID0gU3ltYm9sKFwiZGlkUnVuT25jZVwiKTtcclxuXHJcbiAgICBzZWxmLnByb2Nlc3NvcnMgPSB7fTtcclxuICAgIHNlbGYucHJvY2VzcyA9IHByb2Nlc3M7XHJcbiAgICBzZWxmLmhhbHQgPSBoYWx0O1xyXG4gICAgc2VsZi5yZXN0YXJ0ID0gcmVzdGFydDtcclxuICAgIHNlbGYub25GYWlsID0gb25GYWlsO1xyXG4gICAgc2VsZi5zdXBwcmVzc0NvbnNvbGUgPSBmYWxzZTtcclxuICAgIHNlbGYuZGVidWcgPSBmYWxzZTtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGZ1bmN0aW9uIHByb2Nlc3MobW9kZWwsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICBpZiAoaXNIYWx0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuc3VwcHJlc3NDb25zb2xlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2FuJ3QgYWNjZXB0IG5ldyBwcm9jZXNzIHJlcXVlc3QgYmVjYXVzZSB0aGUgcGlwZWxpbmUgaXMgaGFsdGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcInBpcGVsaW5lIGlzIGhhbHRlZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkZWZlciA9IERlZmVycmVkKCk7XHJcbiAgICAgICAgcXVldWUucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkOiBkZWZlcixcclxuICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxyXG4gICAgICAgICAgICBwcm9jZXNzb3I6IHByb2Nlc3NvciB8fCBERUZBVUxUX1BST0NFU1NPUlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNoZWNrU3RhdGUoKTtcclxuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYWx0KClcclxuICAgIHtcclxuICAgICAgICBpc0hhbHRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgaXNIYWx0ZWQgPSBmYWxzZTtcclxuICAgICAgICBxdWV1ZSA9IFtdO1xyXG4gICAgICAgIHF1ZXVlLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDpcclxuICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgIHByb2Nlc3NvcjogY2FjaGUuY2xlYXJcclxuICAgICAgICB9KTtcclxuICAgICAgICBjaGVja1N0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tTdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGlzSGFsdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRseVByb2Nlc3NpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRseVByb2Nlc3NpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0ge1xyXG4gICAgICAgICAgICAgICAgbW9kZWw6IG5leHQubW9kZWwsXHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5OiBoaXN0b3J5LFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlZDpcclxuICAgICAgICAgICAgICAgIHt9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3Rvci51cGRhdGVIaXN0b3J5KGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZGVidWcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZhc3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xvdyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb250ZXh0LnBlcmZvcm1hbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY29udGV4dC5wZXJmb3JtYW5jZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPj0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvd1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXN0W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzbG93LCBmYXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tTdGF0ZSwgMCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciB3aGVuRG9uZSA9IHJ1blByb2Nlc3Nvcihjb250ZXh0LCBuZXh0LnByb2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIHdoZW5Eb25lLmNhdGNoKGhhbmRsZUVycm9yKG5leHQuZGVmZXJyZWQucmVqZWN0KSk7XHJcbiAgICAgICAgICAgIHdoZW5Eb25lLnRoZW4oY2xlYW51cCwgY2xlYW51cCk7XHJcbiAgICAgICAgICAgIHdoZW5Eb25lLnRoZW4obmV4dC5kZWZlcnJlZC5yZXNvbHZlLCBuZXh0LmRlZmVycmVkLnJlc29sdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVFcnJvcihyZWplY3QpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGVycilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmYWlsQmVoYXZpb3VyID09PSBGQUlMX0JFSEFWSU9VUl9IQUxUKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmhhbHQoKTtcclxuICAgICAgICAgICAgICAgIGlmICghc2VsZi5zdXBwcmVzc0NvbnNvbGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZmFpbEJlaGF2aW91ciA9PT0gRkFJTF9CRUhBVklPVVJfV0FSTilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLnN1cHByZXNzQ29uc29sZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJXYWl0Li4uIHdoYXQ/XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBydW5Qcm9jZXNzb3IoY29udGV4dCwgcHJvY2Vzc29yKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghcHJvY2Vzc29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvY2Vzc29yIHVuZGVmaW5lZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzSGFsdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcnVubmVyO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvY2Vzc29yID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBydW5Qcm9jZXNzb3JfRnVuY3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzb3IgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBydW5Qcm9jZXNzb3JfU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHByb2Nlc3NvcikpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBydW5Qcm9jZXNzb3JfQXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzb3IgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBydW5Qcm9jZXNzb3JfT2JqZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocnVubmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBydW5uZXIoY29udGV4dCwgcHJvY2Vzc29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3Qgc3VyZSBob3cgdG8gcnVuIHByb2Nlc3NvclwiLCBwcm9jZXNzb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBydW5Qcm9jZXNzb3JfRnVuY3Rpb24oY29udGV4dCwgcHJvY2Vzc29yKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJvY2Vzc29yKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGNvbnRleHQubW9kZWwsXHJcbiAgICAgICAgICAgIGNoYW5nZWQ6IGNvbnRleHQuY2hhbmdlZCxcclxuICAgICAgICAgICAgY2FjaGU6IGNhY2hlLmdldChzZWxmLCBwcm9jZXNzb3IpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1blByb2Nlc3Nvcl9TdHJpbmcoY29udGV4dCwgcHJvY2Vzc29yKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBydW5uZXI7XHJcbiAgICAgICAgdmFyIGxuYW1lID0gcHJvY2Vzc29yLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKGNvbnRleHQubW9kZWwgJiYgY29udGV4dC5tb2RlbC5wcm9jZXNzb3JzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcnVubmVyID0gY29udGV4dC5tb2RlbC5wcm9jZXNzb3JzW2xuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFydW5uZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBzZWxmLnByb2Nlc3NvcnNbbG5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJ1bm5lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgcHJvY2Vzc29yIFwiICsgbG5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJ1blByb2Nlc3Nvcihjb250ZXh0LCBydW5uZXIpO1xyXG4gICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmaW5pc2ggPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICAgICAgY29udGV4dC5wZXJmb3JtYW5jZSA9IGNvbnRleHQucGVyZm9ybWFuY2UgfHxcclxuICAgICAgICAgICAge307XHJcbiAgICAgICAgICAgIGNvbnRleHQucGVyZm9ybWFuY2VbbG5hbWVdID0gTWF0aC5mbG9vcigoZmluaXNoIC0gc3RhcnQpICogMTAwMDApIC8gMTAwMDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBydW5Qcm9jZXNzb3JfT2JqZWN0KGNvbnRleHQsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICBpZiAoIXByb2Nlc3Nvci5ydW5zIHx8ICEodHlwZW9mIHByb2Nlc3Nvci5ydW5zID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBwcm9jZXNzb3IucnVucyA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgcHJvY2Vzc29yLnJ1bnMgPT09IFwiZnVuY3Rpb25cIikpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgYmFzZWQgcHJvY2Vzc29yIG11c3QgaGF2ZSBhICdydW5zJyBwcm9wZXJ0eSBjb250YWluaW5nIGEgcHJvY2Vzc29yIGRlZmludGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJ1blRoaXMgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvY2Vzc29yLndhdGNoZXMgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm9jZXNzb3Iud2F0Y2hlcyA9IFtwcm9jZXNzb3Iud2F0Y2hlc107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb2Nlc3Nvci53YXRjaGVzKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1blRoaXMgPSBjaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKHByb2Nlc3Nvci53YXRjaGVzLCBjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwcm9jZXNzb3JbZGlkUnVuT25jZVN5bWJvbF0pIHtcclxuICAgICAgICAgICAgcnVuVGhpcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHByb2Nlc3NvcltkaWRSdW5PbmNlU3ltYm9sXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChydW5UaGlzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJ1blByb2Nlc3Nvcihjb250ZXh0LCBwcm9jZXNzb3IucnVucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuUHJvY2Vzc29yX0FycmF5KGNvbnRleHQsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBwcm9jZXNzb3Iuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NOZXh0KClcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBydW5Qcm9jZXNzb3IoY29udGV4dCwgdGVtcC5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmNhdGNoKGhhbmRsZUVycm9yKHJlamVjdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQudGhlbihwcm9jZXNzTmV4dCwgcHJvY2Vzc05leHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb2Nlc3NOZXh0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25GYWlsKGJlaGF2aW91cilcclxuICAgIHtcclxuICAgICAgICBpZiAoYmVoYXZpb3VyICE9PSBGQUlMX0JFSEFWSU9VUl9IQUxUICYmIGJlaGF2aW91ciAhPT0gRkFJTF9CRUhBVklPVVJfV0FSTilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9uIGZhaWwgb25seSBhY2NlcHRzIGEgc2luZ2xlIHN0cmluZyB2YWx1ZSB3aGljaCBtdXN0IGJlIGV4YWN0bHkgJ1wiICsgRkFJTF9CRUhBVklPVVJfSEFMVCArIFwiJyBvciAnXCIgKyBGQUlMX0JFSEFWSU9VUl9XQVJOICsgXCInXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmYWlsQmVoYXZpb3VyID0gYmVoYXZpb3VyO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvcGlwZWxpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9