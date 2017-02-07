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
	        return runProcessor(context, runner);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2ZTUyYjI3YjFiNzBlOTFhY2YzYiIsIndlYnBhY2s6Ly8vLi9saWJTcmMvcGlwZWxpbmVGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jYWNoZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL2NoYW5nZURldGVjdG9yLmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvcl9JZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvY2hhbmdlRGV0ZWN0b3JfSlNPTi5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvZGVmZXJyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvcGlwZWxpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7aURDdENBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs2SEN0REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs2SEM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OzZIQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs4Q0MxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwcm9jZXNzaW5nLXBpcGVsaW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmU1MmIyN2IxYjcwZTkxYWNmM2JcbiAqKi8iLCJpbXBvcnQgUGlwZWxpbmVJbnN0YW5jZSBmcm9tICcuL3BpcGVsaW5lLmpzJztcclxuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbC5qcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKClcclxue1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gbmV3IFBpcGVsaW5lSW5zdGFuY2UoKTtcclxufVxyXG5cclxuZ2xvYmFsLlBpcGVsaW5lRmFjdG9yeSA9IHtcclxuICAgIGNyZWF0ZTogY3JlYXRlXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvcGlwZWxpbmVGYWN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgQ2FjaGVNYW5hZ2VyO1xyXG5cclxuY29uc3QgQ2FjaGVDb250ZXh0U3ltYm9sID0gU3ltYm9sKFwiY2FjaGVNYW5hZ2VyQ29udGV4dFwiKTtcclxuXHJcbmZ1bmN0aW9uIENhY2hlTWFuYWdlcigpXHJcbntcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHZhciBpbnRlcm5hbENhY2hlID0ge307XHJcblxyXG4gICAgc2VsZi5jbGVhciA9IGNsZWFyO1xyXG4gICAgc2VsZi5nZXQgPSBnZXRDYWNoZTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXIoKVxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsQ2FjaGUgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRDb250ZXh0KG9iailcclxuICAgIHtcclxuICAgICAgICBpZiAoIW9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhY2hlQ29udGV4dCBjYW5ub3QgYmUgbnVsbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FjaGVDb250ZXh0IG11c3QgYmUgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3R4ID0gb2JqW0NhY2hlQ29udGV4dFN5bWJvbF07XHJcbiAgICAgICAgaWYgKCFjdHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdHggPSBcIlwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTk5OTkpO1xyXG4gICAgICAgICAgICBvYmpbQ2FjaGVDb250ZXh0U3ltYm9sXSA9IGN0eDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN0eDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRDYWNoZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gICAgICAgIHZhciBjdHggPSBhcmdzLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAocmVzdWx0IHwgXCJcIikgKyBnZXRDb250ZXh0KG9iaikgKyBcInxcIjtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgY2FjaGUgPSBpbnRlcm5hbENhY2hlW2N0eF07XHJcbiAgICAgICAgaWYgKCFjYWNoZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhY2hlID0ge307XHJcbiAgICAgICAgICAgIGludGVybmFsQ2FjaGVbY3R4XSA9IGNhY2hlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FjaGU7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9jYWNoZU1hbmFnZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgKiBhcyBKU09OX0NEIGZyb20gJy4vY2hhbmdlRGV0ZWN0b3JfSlNPTi5qcyc7XHJcbmltcG9ydCAqIGFzIElEX0NEIGZyb20gJy4vY2hhbmdlRGV0ZWN0b3JfSWRlbnRpdHkuanMnO1xyXG5cclxuY29uc3QgQ0hBTkdFX01PREVfU1VGRklYID0gXCJfQ2hhbmdlTW9kZVwiO1xyXG5jb25zdCBNT0RFX0pTT04gPSBcImpzb25cIjtcclxuY29uc3QgTU9ERV9JZGVudGl0eSA9IFwiaWRlbnRpdHlcIjtcclxuY29uc3QgREVGQVVMVF9NT0RFID0gTU9ERV9KU09OO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdENoYW5nZXMod2F0Y2gsIGNvbnRleHQpXHJcbntcclxuICAgIHJldHVybiB3YXRjaC5yZWR1Y2UoZnVuY3Rpb24oY2hhbmdlc0RldGVjdGVkLCBrZXkpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHZhbHVlQ2hhbmdlZCA9IGNvbnRleHQuY2hhbmdlZFtrZXldIHx8IGZhbHNlO1xyXG4gICAgICAgIGlmICghdmFsdWVDaGFuZ2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkID0gbW9kZVNlbGVjdChrZXksIGNvbnRleHQpLmRldGVjdENoYW5nZXMoa2V5LCBjb250ZXh0KTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlQ2hhbmdlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5jaGFuZ2VkW2tleV0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGFuZ2VzRGV0ZWN0ZWQgfHwgdmFsdWVDaGFuZ2VkO1xyXG4gICAgfSwgbnVsbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVIaXN0b3J5KGNvbnRleHQpXHJcbntcclxuICAgIHZhciBrZXlzID0ge307XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gY29udGV4dC5tb2RlbClcclxuICAgIHtcclxuICAgICAgICBrZXlzW2tleV0gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZm9yIChrZXkgaW4gY29udGV4dC5jaGFuZ2VkKVxyXG4gICAge1xyXG4gICAgICAgIGtleXNba2V5XSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmb3IgKGtleSBpbiBrZXlzKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChrZXkuaW5kZXhPZihDSEFOR0VfTU9ERV9TVUZGSVgpICE9PSAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtb2RlU2VsZWN0KGtleSwgY29udGV4dCkudXBkYXRlSGlzdG9yeShrZXksIGNvbnRleHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb2RlU2VsZWN0KGtleSwgY29udGV4dClcclxue1xyXG4gICAgdmFyIG1vZGUgPSBjb250ZXh0Lm1vZGVsW2tleSArIENIQU5HRV9NT0RFX1NVRkZJWF0gfHwgREVGQVVMVF9NT0RFO1xyXG4gICAgaWYgKHR5cGVvZiBtb2RlID09PSBcIm9iamVjdFwiKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbW9kZS5kZXRlY3RDaGFuZ2VzID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIG1vZGUudXBkYXRlSGlzdG9yeSA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldoZW4gc3BlY2lmaXlpbmcgYSBjdXN0b20gbW9kZSB5b3UgbXVzdCBzdXBwbHkgYSBkZXRlY3RDaGFuZ2VzIGZ1bmN0aW9uLCBhbmQgYW4gdXBkYXRlSGlzdG9yeSBmdW5jdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgbW9kZSAhPT0gXCJzdHJpbmdcIilcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IFN0cmluZyBhbmQgT2JqZWN0IGFyZSBhbGxvd2VkIHZhbHVlcyBmb3IgQ2hhbmdlTW9kZVwiKTtcclxuICAgIH1cclxuICAgIG1vZGUgPSBtb2RlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAobW9kZSA9PT0gTU9ERV9KU09OKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBKU09OX0NEO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobW9kZSA9PT0gTU9ERV9JZGVudGl0eSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSURfQ0Q7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2hhbmdlIGRldGVjdGlvbiBtb2RlIG5vdCByZWNvZ25pemVkXCIpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvY2hhbmdlRGV0ZWN0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gZGV0ZWN0Q2hhbmdlcyhwcm9wTmFtZSwgY29udGV4dClcclxue1xyXG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5tb2RlbFtwcm9wTmFtZV07XHJcbiAgICB2YXIgaGlzdG9yeSA9IGNvbnRleHQuaGlzdG9yeVtwcm9wTmFtZV07XHJcbiAgICBpZiAoKGhpc3RvcnkgPT09IHVuZGVmaW5lZCkgIT09ICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjaGVja2VkID0ge307XHJcbiAgICAgICAgdmFyIGtleXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrZXkxIGluIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5cy5wdXNoKGtleTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBrZXkyIGluIGhpc3RvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5Mik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdWJrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tlZFtzdWJrZXldKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjaGVja2VkW3N1YmtleV0gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodmFsdWVbc3Via2V5XSAhPT0gaGlzdG9yeVtzdWJrZXldKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGhpc3RvcnkgIT09IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSGlzdG9yeShwcm9wTmFtZSwgY29udGV4dClcclxue1xyXG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5tb2RlbFtwcm9wTmFtZV07XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBkZWxldGUgY29udGV4dC5oaXN0b3J5W3Byb3BOYW1lXTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0Lmhpc3RvcnlbcHJvcE5hbWVdID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgc3Via2V5IGluIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGV4dC5oaXN0b3J5W3Byb3BOYW1lXVtzdWJrZXldID0gdmFsdWVbc3Via2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5oaXN0b3J5W3Byb3BOYW1lXSA9IGNvbnRleHQubW9kZWxbcHJvcE5hbWVdO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvY2hhbmdlRGV0ZWN0b3JfSWRlbnRpdHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gZGV0ZWN0Q2hhbmdlcyhrZXksIGNvbnRleHQpXHJcbntcclxuICAgIGlmICgoY29udGV4dC5oaXN0b3J5W2tleV0gPT09IHVuZGVmaW5lZCkgIT09IChjb250ZXh0Lm1vZGVsW2tleV0gPT09IHVuZGVmaW5lZCkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb250ZXh0Lm1vZGVsW2tleV0gPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvbnRleHQubW9kZWxba2V5XSkgIT09IGNvbnRleHQuaGlzdG9yeVtrZXldO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSGlzdG9yeShrZXksIGNvbnRleHQpXHJcbntcclxuICAgIGlmIChjb250ZXh0Lm1vZGVsW2tleV0gPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICB7XHJcbiAgICAgICAgZGVsZXRlIGNvbnRleHQuaGlzdG9yeVtrZXldO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuaGlzdG9yeVtrZXldID0gSlNPTi5zdHJpbmdpZnkoY29udGV4dC5tb2RlbFtrZXldKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL2NoYW5nZURldGVjdG9yX0pTT04uanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZWZlcnJlZCgpXHJcbntcclxuICAgIHZhciBzZWxmID0gdGhpcyB8fFxyXG4gICAge307XHJcbiAgICBzZWxmLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpXHJcbiAgICB7XHJcbiAgICAgICAgc2VsZi5yZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgICBzZWxmLnJlamVjdCA9IHJlamVjdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNlbGY7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9kZWZlcnJlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIGdldEdsb2JhbCgpXHJcbntcclxuICAgIHZhciBnbG9iYWxSZWY7XHJcblxyXG4gICAgKGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBnbG9iYWxSZWYgPSB0aGlzO1xyXG4gICAgfSkoKTtcclxuICAgIGlmICghZ2xvYmFsUmVmKVxyXG4gICAge1xyXG4gICAgICAgIHRyeVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2xvYmFsUmVmID0gd2luZG93O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoaWdub3JlZClcclxuICAgICAgICB7fVxyXG4gICAgICAgIHRyeVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2xvYmFsUmVmID0gZ2xvYmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoaWdub3JlZClcclxuICAgICAgICB7fVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdsb2JhbFJlZiB8fFxyXG4gICAge307XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldEdsb2JhbCgpO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBDYWNoZU1hbmFnZXIgZnJvbSAnLi9jYWNoZU1hbmFnZXIuanMnO1xyXG5pbXBvcnQgKiBhcyBjaGFuZ2VEZXRlY3RvciBmcm9tICcuL2NoYW5nZURldGVjdG9yLmpzJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJy4vZGVmZXJyZWQuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGlwZWxpbmU7XHJcblxyXG5jb25zdCBGQUlMX0JFSEFWSU9VUl9IQUxUID0gXCJoYWx0XCI7XHJcbmNvbnN0IEZBSUxfQkVIQVZJT1VSX1dBUk4gPSBcIndhcm5cIjtcclxuY29uc3QgREVGQVVMVF9QUk9DRVNTT1IgPSBcInN0YXJ0XCI7XHJcblxyXG5mdW5jdGlvbiBQaXBlbGluZSgpXHJcbntcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHZhciBmYWlsQmVoYXZpb3VyID0gRkFJTF9CRUhBVklPVVJfV0FSTjtcclxuICAgIHZhciBxdWV1ZSA9IFtdO1xyXG4gICAgdmFyIGNhY2hlID0gbmV3IENhY2hlTWFuYWdlcigpO1xyXG4gICAgdmFyIGlzSGFsdGVkID0gZmFsc2U7XHJcbiAgICB2YXIgY3VycmVudGx5UHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgdmFyIGhpc3RvcnkgPSB7fTtcclxuXHJcbiAgICBzZWxmLnByb2Nlc3NvcnMgPSB7fTtcclxuICAgIHNlbGYucHJvY2VzcyA9IHByb2Nlc3M7XHJcbiAgICBzZWxmLmhhbHQgPSBoYWx0O1xyXG4gICAgc2VsZi5yZXN0YXJ0ID0gcmVzdGFydDtcclxuICAgIHNlbGYub25GYWlsID0gb25GYWlsO1xyXG4gICAgc2VsZi5zdXBwcmVzc0NvbnNvbGUgPSBmYWxzZTtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGZ1bmN0aW9uIHByb2Nlc3MobW9kZWwsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICBpZiAoaXNIYWx0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuc3VwcHJlc3NDb25zb2xlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2FuJ3QgYWNjZXB0IG5ldyBwcm9jZXNzIHJlcXVlc3QgYmVjYXVzZSB0aGUgcGlwZWxpbmUgaXMgaGFsdGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcInBpcGVsaW5lIGlzIGhhbHRlZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkZWZlciA9IERlZmVycmVkKCk7XHJcbiAgICAgICAgcXVldWUucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkOiBkZWZlcixcclxuICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxyXG4gICAgICAgICAgICBwcm9jZXNzb3I6IHByb2Nlc3NvciB8fCBERUZBVUxUX1BST0NFU1NPUlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNoZWNrU3RhdGUoKTtcclxuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYWx0KClcclxuICAgIHtcclxuICAgICAgICBpc0hhbHRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgaXNIYWx0ZWQgPSBmYWxzZTtcclxuICAgICAgICBxdWV1ZSA9IFtdO1xyXG4gICAgICAgIHF1ZXVlLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDpcclxuICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgIHByb2Nlc3NvcjogY2FjaGUuY2xlYXJcclxuICAgICAgICB9KTtcclxuICAgICAgICBjaGVja1N0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tTdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGlzSGFsdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRseVByb2Nlc3NpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRseVByb2Nlc3NpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0ge1xyXG4gICAgICAgICAgICAgICAgbW9kZWw6IG5leHQubW9kZWwsXHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5OiBoaXN0b3J5LFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlZDpcclxuICAgICAgICAgICAgICAgIHt9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3Rvci51cGRhdGVIaXN0b3J5KGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja1N0YXRlLCAwKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHdoZW5Eb25lID0gcnVuUHJvY2Vzc29yKGNvbnRleHQsIG5leHQucHJvY2Vzc29yKTtcclxuICAgICAgICAgICAgd2hlbkRvbmUuY2F0Y2goaGFuZGxlRXJyb3IobmV4dC5kZWZlcnJlZC5yZWplY3QpKTtcclxuICAgICAgICAgICAgd2hlbkRvbmUudGhlbihjbGVhbnVwLCBjbGVhbnVwKTtcclxuICAgICAgICAgICAgd2hlbkRvbmUudGhlbihuZXh0LmRlZmVycmVkLnJlc29sdmUsIG5leHQuZGVmZXJyZWQucmVzb2x2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKHJlamVjdClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXJyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGZhaWxCZWhhdmlvdXIgPT09IEZBSUxfQkVIQVZJT1VSX0hBTFQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuaGFsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLnN1cHByZXNzQ29uc29sZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmYWlsQmVoYXZpb3VyID09PSBGQUlMX0JFSEFWSU9VUl9XQVJOKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuc3VwcHJlc3NDb25zb2xlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIldhaXQuLi4gd2hhdD9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1blByb2Nlc3Nvcihjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFwcm9jZXNzb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQcm9jZXNzb3IgdW5kZWZpbmVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNIYWx0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBydW5uZXI7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzb3IgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHJ1blByb2Nlc3Nvcl9GdW5jdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHByb2Nlc3NvciA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHJ1blByb2Nlc3Nvcl9TdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocHJvY2Vzc29yKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHJ1blByb2Nlc3Nvcl9BcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHByb2Nlc3NvciA9PT0gXCJvYmplY3RcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHJ1blByb2Nlc3Nvcl9PYmplY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChydW5uZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ1bm5lcihjb250ZXh0LCBwcm9jZXNzb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXJlIGhvdyB0byBydW4gcHJvY2Vzc29yXCIsIHByb2Nlc3Nvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1blByb2Nlc3Nvcl9GdW5jdGlvbihjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9jZXNzb3IoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogY29udGV4dC5tb2RlbCxcclxuICAgICAgICAgICAgY2hhbmdlZDogY29udGV4dC5jaGFuZ2VkLFxyXG4gICAgICAgICAgICBjYWNoZTogY2FjaGUuZ2V0KHNlbGYsIHByb2Nlc3NvcilcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuUHJvY2Vzc29yX1N0cmluZyhjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJ1bm5lcjtcclxuICAgICAgICB2YXIgbG5hbWUgPSBwcm9jZXNzb3IudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoY29udGV4dC5tb2RlbCAmJiBjb250ZXh0Lm1vZGVsLnByb2Nlc3NvcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBjb250ZXh0Lm1vZGVsLnByb2Nlc3NvcnNbbG5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJ1bm5lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1bm5lciA9IHNlbGYucHJvY2Vzc29yc1tsbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcnVubmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBwcm9jZXNzb3IgXCIgKyBsbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBydW5Qcm9jZXNzb3IoY29udGV4dCwgcnVubmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBydW5Qcm9jZXNzb3JfT2JqZWN0KGNvbnRleHQsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICBpZiAoIXByb2Nlc3Nvci5ydW5zIHx8ICEodHlwZW9mIHByb2Nlc3Nvci5ydW5zID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBwcm9jZXNzb3IucnVucyA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgcHJvY2Vzc29yLnJ1bnMgPT09IFwiZnVuY3Rpb25cIikpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgYmFzZWQgcHJvY2Vzc29yIG11c3QgaGF2ZSBhICdydW5zJyBwcm9wZXJ0eSBjb250YWluaW5nIGEgcHJvY2Vzc29yIGRlZmludGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJ1blRoaXMgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvY2Vzc29yLndhdGNoZXMgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm9jZXNzb3Iud2F0Y2hlcyA9IFtwcm9jZXNzb3Iud2F0Y2hlc107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb2Nlc3Nvci53YXRjaGVzKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJ1blRoaXMgPSBjaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKHByb2Nlc3Nvci53YXRjaGVzLCBjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJ1blRoaXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gcnVuUHJvY2Vzc29yKGNvbnRleHQsIHByb2Nlc3Nvci5ydW5zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBydW5Qcm9jZXNzb3JfQXJyYXkoY29udGV4dCwgcHJvY2Vzc29yKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IHByb2Nlc3Nvci5zbGljZSgpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcHJvY2Vzc05leHQoKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXAubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHJ1blByb2Nlc3Nvcihjb250ZXh0LCB0ZW1wLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY2F0Y2goaGFuZGxlRXJyb3IocmVqZWN0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC50aGVuKHByb2Nlc3NOZXh0LCBwcm9jZXNzTmV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvY2Vzc05leHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbkZhaWwoYmVoYXZpb3VyKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChiZWhhdmlvdXIgIT09IEZBSUxfQkVIQVZJT1VSX0hBTFQgJiYgYmVoYXZpb3VyICE9PSBGQUlMX0JFSEFWSU9VUl9XQVJOKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT24gZmFpbCBvbmx5IGFjY2VwdHMgYSBzaW5nbGUgc3RyaW5nIHZhbHVlIHdoaWNoIG11c3QgYmUgZXhhY3RseSAnXCIgKyBGQUlMX0JFSEFWSU9VUl9IQUxUICsgXCInIG9yICdcIiArIEZBSUxfQkVIQVZJT1VSX1dBUk4gKyBcIidcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZhaWxCZWhhdmlvdXIgPSBiZWhhdmlvdXI7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9waXBlbGluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=