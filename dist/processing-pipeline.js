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
	                    console.log(context.performance);
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
	            context.performance[lname] = finish - start;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiNjVmZWM1ZWJjMDUwYzY5YTdkYSIsIndlYnBhY2s6Ly8vLi9saWJTcmMvcGlwZWxpbmVGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jYWNoZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL2NoYW5nZURldGVjdG9yLmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvcl9JZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvY2hhbmdlRGV0ZWN0b3JfSlNPTi5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvZGVmZXJyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvcGlwZWxpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7aURDdENBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs2SEN0REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs2SEM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OzZIQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs4Q0MxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicHJvY2Vzc2luZy1waXBlbGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGI2NWZlYzVlYmMwNTBjNjlhN2RhXG4gKiovIiwiaW1wb3J0IFBpcGVsaW5lSW5zdGFuY2UgZnJvbSAnLi9waXBlbGluZS5qcyc7XHJcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwuanMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpXHJcbntcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIG5ldyBQaXBlbGluZUluc3RhbmNlKCk7XHJcbn1cclxuXHJcbmdsb2JhbC5QaXBlbGluZUZhY3RvcnkgPSB7XHJcbiAgICBjcmVhdGU6IGNyZWF0ZVxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL3BpcGVsaW5lRmFjdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IENhY2hlTWFuYWdlcjtcclxuXHJcbmNvbnN0IENhY2hlQ29udGV4dFN5bWJvbCA9IFN5bWJvbChcImNhY2hlTWFuYWdlckNvbnRleHRcIik7XHJcblxyXG5mdW5jdGlvbiBDYWNoZU1hbmFnZXIoKVxyXG57XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgaW50ZXJuYWxDYWNoZSA9IHt9O1xyXG5cclxuICAgIHNlbGYuY2xlYXIgPSBjbGVhcjtcclxuICAgIHNlbGYuZ2V0ID0gZ2V0Q2FjaGU7XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyKClcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbENhY2hlID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q29udGV4dChvYmopXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYWNoZUNvbnRleHQgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhY2hlQ29udGV4dCBtdXN0IGJlIGFuIG9iamVjdCBvciBmdW5jdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN0eCA9IG9ialtDYWNoZUNvbnRleHRTeW1ib2xdO1xyXG4gICAgICAgIGlmICghY3R4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3R4ID0gXCJcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDk5OTk5KTtcclxuICAgICAgICAgICAgb2JqW0NhY2hlQ29udGV4dFN5bWJvbF0gPSBjdHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdHg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2FjaGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgICAgICB2YXIgY3R4ID0gYXJncy5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHJlc3VsdCB8IFwiXCIpICsgZ2V0Q29udGV4dChvYmopICsgXCJ8XCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGNhY2hlID0gaW50ZXJuYWxDYWNoZVtjdHhdO1xyXG4gICAgICAgIGlmICghY2FjaGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYWNoZSA9IHt9O1xyXG4gICAgICAgICAgICBpbnRlcm5hbENhY2hlW2N0eF0gPSBjYWNoZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvY2FjaGVNYW5hZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0ICogYXMgSlNPTl9DRCBmcm9tICcuL2NoYW5nZURldGVjdG9yX0pTT04uanMnO1xyXG5pbXBvcnQgKiBhcyBJRF9DRCBmcm9tICcuL2NoYW5nZURldGVjdG9yX0lkZW50aXR5LmpzJztcclxuXHJcbmNvbnN0IENIQU5HRV9NT0RFX1NVRkZJWCA9IFwiX0NoYW5nZU1vZGVcIjtcclxuY29uc3QgTU9ERV9KU09OID0gXCJqc29uXCI7XHJcbmNvbnN0IE1PREVfSWRlbnRpdHkgPSBcImlkZW50aXR5XCI7XHJcbmNvbnN0IERFRkFVTFRfTU9ERSA9IE1PREVfSlNPTjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RDaGFuZ2VzKHdhdGNoLCBjb250ZXh0KVxyXG57XHJcbiAgICByZXR1cm4gd2F0Y2gucmVkdWNlKGZ1bmN0aW9uKGNoYW5nZXNEZXRlY3RlZCwga2V5KVxyXG4gICAge1xyXG4gICAgICAgIHZhciB2YWx1ZUNoYW5nZWQgPSBjb250ZXh0LmNoYW5nZWRba2V5XSB8fCBmYWxzZTtcclxuICAgICAgICBpZiAoIXZhbHVlQ2hhbmdlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IG1vZGVTZWxlY3Qoa2V5LCBjb250ZXh0KS5kZXRlY3RDaGFuZ2VzKGtleSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZUNoYW5nZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2hhbmdlZFtrZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hhbmdlc0RldGVjdGVkIHx8IHZhbHVlQ2hhbmdlZDtcclxuICAgIH0sIG51bGwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSGlzdG9yeShjb250ZXh0KVxyXG57XHJcbiAgICB2YXIga2V5cyA9IHt9O1xyXG4gICAgZm9yICh2YXIga2V5IGluIGNvbnRleHQubW9kZWwpXHJcbiAgICB7XHJcbiAgICAgICAga2V5c1trZXldID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZvciAoa2V5IGluIGNvbnRleHQuY2hhbmdlZClcclxuICAgIHtcclxuICAgICAgICBrZXlzW2tleV0gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZm9yIChrZXkgaW4ga2V5cylcclxuICAgIHtcclxuICAgICAgICBpZiAoa2V5LmluZGV4T2YoQ0hBTkdFX01PREVfU1VGRklYKSAhPT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbW9kZVNlbGVjdChrZXksIGNvbnRleHQpLnVwZGF0ZUhpc3Rvcnkoa2V5LCBjb250ZXh0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbW9kZVNlbGVjdChrZXksIGNvbnRleHQpXHJcbntcclxuICAgIHZhciBtb2RlID0gY29udGV4dC5tb2RlbFtrZXkgKyBDSEFOR0VfTU9ERV9TVUZGSVhdIHx8IERFRkFVTFRfTU9ERTtcclxuICAgIGlmICh0eXBlb2YgbW9kZSA9PT0gXCJvYmplY3RcIilcclxuICAgIHtcclxuICAgICAgICBpZiAodHlwZW9mIG1vZGUuZGV0ZWN0Q2hhbmdlcyA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBtb2RlLnVwZGF0ZUhpc3RvcnkgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXaGVuIHNwZWNpZml5aW5nIGEgY3VzdG9tIG1vZGUgeW91IG11c3Qgc3VwcGx5IGEgZGV0ZWN0Q2hhbmdlcyBmdW5jdGlvbiwgYW5kIGFuIHVwZGF0ZUhpc3RvcnkgZnVuY3Rpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIG1vZGUgIT09IFwic3RyaW5nXCIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBTdHJpbmcgYW5kIE9iamVjdCBhcmUgYWxsb3dlZCB2YWx1ZXMgZm9yIENoYW5nZU1vZGVcIik7XHJcbiAgICB9XHJcbiAgICBtb2RlID0gbW9kZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKG1vZGUgPT09IE1PREVfSlNPTilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSlNPTl9DRDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG1vZGUgPT09IE1PREVfSWRlbnRpdHkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIElEX0NEO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoYW5nZSBkZXRlY3Rpb24gbW9kZSBub3QgcmVjb2duaXplZFwiKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL2NoYW5nZURldGVjdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGRldGVjdENoYW5nZXMocHJvcE5hbWUsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubW9kZWxbcHJvcE5hbWVdO1xyXG4gICAgdmFyIGhpc3RvcnkgPSBjb250ZXh0Lmhpc3RvcnlbcHJvcE5hbWVdO1xyXG4gICAgaWYgKChoaXN0b3J5ID09PSB1bmRlZmluZWQpICE9PSAodmFsdWUgPT09IHVuZGVmaW5lZCkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgIHtcclxuICAgICAgICB2YXIgY2hlY2tlZCA9IHt9O1xyXG4gICAgICAgIHZhciBrZXlzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIga2V5MSBpbiB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIga2V5MiBpbiBoaXN0b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5cy5wdXNoKGtleTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3Via2V5ID0ga2V5c1tpXTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrZWRbc3Via2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hlY2tlZFtzdWJrZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlW3N1YmtleV0gIT09IGhpc3Rvcnlbc3Via2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBoaXN0b3J5ICE9PSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUhpc3RvcnkocHJvcE5hbWUsIGNvbnRleHQpXHJcbntcclxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubW9kZWxbcHJvcE5hbWVdO1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZGVsZXRlIGNvbnRleHQuaGlzdG9yeVtwcm9wTmFtZV07XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5oaXN0b3J5W3Byb3BOYW1lXSA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHN1YmtleSBpbiB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuaGlzdG9yeVtwcm9wTmFtZV1bc3Via2V5XSA9IHZhbHVlW3N1YmtleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuaGlzdG9yeVtwcm9wTmFtZV0gPSBjb250ZXh0Lm1vZGVsW3Byb3BOYW1lXTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL2NoYW5nZURldGVjdG9yX0lkZW50aXR5LmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGRldGVjdENoYW5nZXMoa2V5LCBjb250ZXh0KVxyXG57XHJcbiAgICBpZiAoKGNvbnRleHQuaGlzdG9yeVtrZXldID09PSB1bmRlZmluZWQpICE9PSAoY29udGV4dC5tb2RlbFtrZXldID09PSB1bmRlZmluZWQpKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY29udGV4dC5tb2RlbFtrZXldID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShjb250ZXh0Lm1vZGVsW2tleV0pICE9PSBjb250ZXh0Lmhpc3Rvcnlba2V5XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUhpc3Rvcnkoa2V5LCBjb250ZXh0KVxyXG57XHJcbiAgICBpZiAoY29udGV4dC5tb2RlbFtrZXldID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAge1xyXG4gICAgICAgIGRlbGV0ZSBjb250ZXh0Lmhpc3Rvcnlba2V5XTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0Lmhpc3Rvcnlba2V5XSA9IEpTT04uc3RyaW5naWZ5KGNvbnRleHQubW9kZWxba2V5XSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvcl9KU09OLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGVmZXJyZWQoKVxyXG57XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMgfHxcclxuICAgIHt9O1xyXG4gICAgc2VsZi5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KVxyXG4gICAge1xyXG4gICAgICAgIHNlbGYucmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgICAgc2VsZi5yZWplY3QgPSByZWplY3Q7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzZWxmO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvZGVmZXJyZWQuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiBnZXRHbG9iYWwoKVxyXG57XHJcbiAgICB2YXIgZ2xvYmFsUmVmO1xyXG5cclxuICAgIChmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgZ2xvYmFsUmVmID0gdGhpcztcclxuICAgIH0pKCk7XHJcbiAgICBpZiAoIWdsb2JhbFJlZilcclxuICAgIHtcclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdsb2JhbFJlZiA9IHdpbmRvdztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGlnbm9yZWQpXHJcbiAgICAgICAge31cclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdsb2JhbFJlZiA9IGdsb2JhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGlnbm9yZWQpXHJcbiAgICAgICAge31cclxuICAgIH1cclxuICAgIHJldHVybiBnbG9iYWxSZWYgfHxcclxuICAgIHt9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRHbG9iYWwoKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9nbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgQ2FjaGVNYW5hZ2VyIGZyb20gJy4vY2FjaGVNYW5hZ2VyLmpzJztcclxuaW1wb3J0ICogYXMgY2hhbmdlRGV0ZWN0b3IgZnJvbSAnLi9jaGFuZ2VEZXRlY3Rvci5qcyc7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICcuL2RlZmVycmVkLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBpcGVsaW5lO1xyXG5cclxuY29uc3QgRkFJTF9CRUhBVklPVVJfSEFMVCA9IFwiaGFsdFwiO1xyXG5jb25zdCBGQUlMX0JFSEFWSU9VUl9XQVJOID0gXCJ3YXJuXCI7XHJcbmNvbnN0IERFRkFVTFRfUFJPQ0VTU09SID0gXCJzdGFydFwiO1xyXG5cclxuZnVuY3Rpb24gUGlwZWxpbmUoKVxyXG57XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgZmFpbEJlaGF2aW91ciA9IEZBSUxfQkVIQVZJT1VSX1dBUk47XHJcbiAgICB2YXIgcXVldWUgPSBbXTtcclxuICAgIHZhciBjYWNoZSA9IG5ldyBDYWNoZU1hbmFnZXIoKTtcclxuICAgIHZhciBpc0hhbHRlZCA9IGZhbHNlO1xyXG4gICAgdmFyIGN1cnJlbnRseVByb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgIHZhciBoaXN0b3J5ID0ge307XHJcblxyXG4gICAgc2VsZi5wcm9jZXNzb3JzID0ge307XHJcbiAgICBzZWxmLnByb2Nlc3MgPSBwcm9jZXNzO1xyXG4gICAgc2VsZi5oYWx0ID0gaGFsdDtcclxuICAgIHNlbGYucmVzdGFydCA9IHJlc3RhcnQ7XHJcbiAgICBzZWxmLm9uRmFpbCA9IG9uRmFpbDtcclxuICAgIHNlbGYuc3VwcHJlc3NDb25zb2xlID0gZmFsc2U7XHJcbiAgICBzZWxmLmRlYnVnID0gZmFsc2U7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBmdW5jdGlvbiBwcm9jZXNzKG1vZGVsLCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGlzSGFsdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLnN1cHByZXNzQ29uc29sZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbid0IGFjY2VwdCBuZXcgcHJvY2VzcyByZXF1ZXN0IGJlY2F1c2UgdGhlIHBpcGVsaW5lIGlzIGhhbHRlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJwaXBlbGluZSBpcyBoYWx0ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGVmZXIgPSBEZWZlcnJlZCgpO1xyXG4gICAgICAgIHF1ZXVlLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXIsXHJcbiAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcclxuICAgICAgICAgICAgcHJvY2Vzc29yOiBwcm9jZXNzb3IgfHwgREVGQVVMVF9QUk9DRVNTT1JcclxuICAgICAgICB9KTtcclxuICAgICAgICBjaGVja1N0YXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFsdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaXNIYWx0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlzSGFsdGVkID0gZmFsc2U7XHJcbiAgICAgICAgcXVldWUgPSBbXTtcclxuICAgICAgICBxdWV1ZS5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6XHJcbiAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICBwcm9jZXNzb3I6IGNhY2hlLmNsZWFyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2hlY2tTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrU3RhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChpc0hhbHRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50bHlQcm9jZXNzaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXJyZW50bHlQcm9jZXNzaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIG5leHQgPSBxdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHtcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBuZXh0Lm1vZGVsLFxyXG4gICAgICAgICAgICAgICAgaGlzdG9yeTogaGlzdG9yeSxcclxuICAgICAgICAgICAgICAgIGNoYW5nZWQ6XHJcbiAgICAgICAgICAgICAgICB7fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgY2xlYW51cCA9IGZ1bmN0aW9uKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudGx5UHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3IudXBkYXRlSGlzdG9yeShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRlYnVnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRleHQucGVyZm9ybWFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja1N0YXRlLCAwKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHdoZW5Eb25lID0gcnVuUHJvY2Vzc29yKGNvbnRleHQsIG5leHQucHJvY2Vzc29yKTtcclxuICAgICAgICAgICAgd2hlbkRvbmUuY2F0Y2goaGFuZGxlRXJyb3IobmV4dC5kZWZlcnJlZC5yZWplY3QpKTtcclxuICAgICAgICAgICAgd2hlbkRvbmUudGhlbihjbGVhbnVwLCBjbGVhbnVwKTtcclxuICAgICAgICAgICAgd2hlbkRvbmUudGhlbihuZXh0LmRlZmVycmVkLnJlc29sdmUsIG5leHQuZGVmZXJyZWQucmVzb2x2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKHJlamVjdClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXJyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGZhaWxCZWhhdmlvdXIgPT09IEZBSUxfQkVIQVZJT1VSX0hBTFQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuaGFsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLnN1cHByZXNzQ29uc29sZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmYWlsQmVoYXZpb3VyID09PSBGQUlMX0JFSEFWSU9VUl9XQVJOKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuc3VwcHJlc3NDb25zb2xlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIldhaXQuLi4gd2hhdD9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1blByb2Nlc3Nvcihjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFwcm9jZXNzb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQcm9jZXNzb3IgdW5kZWZpbmVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNIYWx0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBydW5uZXI7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzb3IgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHJ1blByb2Nlc3Nvcl9GdW5jdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHByb2Nlc3NvciA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHJ1blByb2Nlc3Nvcl9TdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocHJvY2Vzc29yKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHJ1blByb2Nlc3Nvcl9BcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHByb2Nlc3NvciA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHJ1blByb2Nlc3Nvcl9PYmplY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChydW5uZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ1bm5lcihjb250ZXh0LCBwcm9jZXNzb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXJlIGhvdyB0byBydW4gcHJvY2Vzc29yXCIsIHByb2Nlc3Nvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1blByb2Nlc3Nvcl9GdW5jdGlvbihjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9jZXNzb3IoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogY29udGV4dC5tb2RlbCxcclxuICAgICAgICAgICAgY2hhbmdlZDogY29udGV4dC5jaGFuZ2VkLFxyXG4gICAgICAgICAgICBjYWNoZTogY2FjaGUuZ2V0KHNlbGYsIHByb2Nlc3NvcilcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuUHJvY2Vzc29yX1N0cmluZyhjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJ1bm5lcjtcclxuICAgICAgICB2YXIgbG5hbWUgPSBwcm9jZXNzb3IudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoY29udGV4dC5tb2RlbCAmJiBjb250ZXh0Lm1vZGVsLnByb2Nlc3NvcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBjb250ZXh0Lm1vZGVsLnByb2Nlc3NvcnNbbG5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJ1bm5lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHNlbGYucHJvY2Vzc29yc1tsbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcnVubmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBwcm9jZXNzb3IgXCIgKyBsbmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gcnVuUHJvY2Vzc29yKGNvbnRleHQsIHJ1bm5lcik7XHJcbiAgICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZpbmlzaCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnBlcmZvcm1hbmNlID0gY29udGV4dC5wZXJmb3JtYW5jZSB8fFxyXG4gICAgICAgICAgICB7fTtcclxuICAgICAgICAgICAgY29udGV4dC5wZXJmb3JtYW5jZVtsbmFtZV0gPSBmaW5pc2ggLSBzdGFydDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1blByb2Nlc3Nvcl9PYmplY3QoY29udGV4dCwgcHJvY2Vzc29yKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghcHJvY2Vzc29yLnJ1bnMgfHwgISh0eXBlb2YgcHJvY2Vzc29yLnJ1bnMgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHByb2Nlc3Nvci5ydW5zID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBwcm9jZXNzb3IucnVucyA9PT0gXCJmdW5jdGlvblwiKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9iamVjdCBiYXNlZCBwcm9jZXNzb3IgbXVzdCBoYXZlIGEgJ3J1bnMnIHByb3BlcnR5IGNvbnRhaW5pbmcgYSBwcm9jZXNzb3IgZGVmaW50aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcnVuVGhpcyA9IHRydWU7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzb3Iud2F0Y2hlcyA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb2Nlc3Nvci53YXRjaGVzID0gW3Byb2Nlc3Nvci53YXRjaGVzXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvY2Vzc29yLndhdGNoZXMpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcnVuVGhpcyA9IGNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMocHJvY2Vzc29yLndhdGNoZXMsIGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocnVuVGhpcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBydW5Qcm9jZXNzb3IoY29udGV4dCwgcHJvY2Vzc29yLnJ1bnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1blByb2Nlc3Nvcl9BcnJheShjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gcHJvY2Vzc29yLnNsaWNlKCk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwcm9jZXNzTmV4dCgpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcnVuUHJvY2Vzc29yKGNvbnRleHQsIHRlbXAuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5jYXRjaChoYW5kbGVFcnJvcihyZWplY3QpKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LnRoZW4ocHJvY2Vzc05leHQsIHByb2Nlc3NOZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9jZXNzTmV4dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uRmFpbChiZWhhdmlvdXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGJlaGF2aW91ciAhPT0gRkFJTF9CRUhBVklPVVJfSEFMVCAmJiBiZWhhdmlvdXIgIT09IEZBSUxfQkVIQVZJT1VSX1dBUk4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbiBmYWlsIG9ubHkgYWNjZXB0cyBhIHNpbmdsZSBzdHJpbmcgdmFsdWUgd2hpY2ggbXVzdCBiZSBleGFjdGx5ICdcIiArIEZBSUxfQkVIQVZJT1VSX0hBTFQgKyBcIicgb3IgJ1wiICsgRkFJTF9CRUhBVklPVVJfV0FSTiArIFwiJ1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmFpbEJlaGF2aW91ciA9IGJlaGF2aW91cjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL3BpcGVsaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==