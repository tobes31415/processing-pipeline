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

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipeline_js__ = __webpack_require__(6);
	/* harmony export */ exports["create"] = create;
	
	function create()
	{
	    "use strict";
	    return new /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__pipeline_js__["a"]();
	}


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
	    for (var key in context.changed)
	    {
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
	        context.history[propName] = context.history[propName] ||
	        {};
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

	/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cacheManager_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__changeDetector_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__deferred_js__ = __webpack_require__(5);
	
	
	
	
	/* harmony default export */ exports["a"] = Pipeline
	
	const FAIL_BEHAVIOUR_HALT = "HALT";
	const FAIL_BEHAVIOUR_WARN = "WARN";
	const DEFAULT_PROCESSOR = "start";
	
	function Pipeline()
	{
	    "use strict";
	
	    var self = this;
	    var failBehaviour = FAIL_BEHAVIOUR_HALT;
	    var queue = [];
	    var cache = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__cacheManager_js__["a"]();
	    var isHalted = false;
	    var currentlyProcessing = false;
	    var history = {};
	
	    self.process = process;
	    self.halt = halt;
	    self.restart = restart;
	    self.onFail = onFail;
	
	    ////////////////////
	
	    function process(model, processor)
	    {
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
	                next.deferred.resolve();
	                setTimeout(checkState, 0);
	            };
	            var whenDone = runProcessor(context, next.processor);
	            whenDone.catch(handleError);
	            whenDone.then(cleanup, cleanup);
	        }
	    }
	
	    function handleError(err)
	    {
	        if (failBehaviour === FAIL_BEHAVIOUR_HALT)
	        {
	            self.halt();
	            console.error(err);
	        }
	        else
	        {
	            console.warn(err);
	        }
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
	            return runner(context, processor);
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
	        return runProcessor(context, context.model.processors[processor.toLowerCase()]);
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
	                    current.catch(handleError);
	                    current.then(processNext, processNext);
	                }
	            }
	            processNext();
	        });
	    }
	
	    function onFail(behaviour)
	    {
	        if (behaviour !== "halt" && behaviour !== "warn")
	        {
	            throw new Error("On fail only accepts a single string value which must be exactly '" + FAIL_BEHAVIOUR_HALT + "' or '" + FAIL_BEHAVIOUR_WARN + "'");
	        }
	        failBehaviour = behaviour;
	    }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(0);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4MmVhOGZlYTViZDQ4ZGM4NmJkOSIsIndlYnBhY2s6Ly8vLi9saWJTcmMvcGlwZWxpbmVGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jYWNoZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL2NoYW5nZURldGVjdG9yLmpzIiwid2VicGFjazovLy8uL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvcl9JZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvY2hhbmdlRGV0ZWN0b3JfSlNPTi5qcyIsIndlYnBhY2s6Ly8vLi9saWJTcmMvZGVmZXJyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbGliU3JjL3BpcGVsaW5lLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7aURDdENBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs2SEN0REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7NkhDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OzZIQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs4Q0MxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdk5BO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVUiLCJmaWxlIjoicHJvY2Vzc2luZy1waXBlbGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDgyZWE4ZmVhNWJkNDhkYzg2YmQ5XG4gKiovIiwiaW1wb3J0IFBpcGVsaW5lSW5zdGFuY2UgZnJvbSAnLi9waXBlbGluZS5qcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKClcclxue1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gbmV3IFBpcGVsaW5lSW5zdGFuY2UoKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL3BpcGVsaW5lRmFjdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IENhY2hlTWFuYWdlcjtcclxuXHJcbmNvbnN0IENhY2hlQ29udGV4dFN5bWJvbCA9IFN5bWJvbChcImNhY2hlTWFuYWdlckNvbnRleHRcIik7XHJcblxyXG5mdW5jdGlvbiBDYWNoZU1hbmFnZXIoKVxyXG57XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgaW50ZXJuYWxDYWNoZSA9IHt9O1xyXG5cclxuICAgIHNlbGYuY2xlYXIgPSBjbGVhcjtcclxuICAgIHNlbGYuZ2V0ID0gZ2V0Q2FjaGU7XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyKClcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbENhY2hlID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q29udGV4dChvYmopXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYWNoZUNvbnRleHQgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhY2hlQ29udGV4dCBtdXN0IGJlIGFuIG9iamVjdCBvciBmdW5jdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN0eCA9IG9ialtDYWNoZUNvbnRleHRTeW1ib2xdO1xyXG4gICAgICAgIGlmICghY3R4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3R4ID0gXCJcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDk5OTk5KTtcclxuICAgICAgICAgICAgb2JqW0NhY2hlQ29udGV4dFN5bWJvbF0gPSBjdHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdHg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2FjaGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgICAgICB2YXIgY3R4ID0gYXJncy5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHJlc3VsdCB8IFwiXCIpICsgZ2V0Q29udGV4dChvYmopICsgXCJ8XCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGNhY2hlID0gaW50ZXJuYWxDYWNoZVtjdHhdO1xyXG4gICAgICAgIGlmICghY2FjaGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYWNoZSA9IHt9O1xyXG4gICAgICAgICAgICBpbnRlcm5hbENhY2hlW2N0eF0gPSBjYWNoZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvY2FjaGVNYW5hZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0ICogYXMgSlNPTl9DRCBmcm9tICcuL2NoYW5nZURldGVjdG9yX0pTT04uanMnO1xyXG5pbXBvcnQgKiBhcyBJRF9DRCBmcm9tICcuL2NoYW5nZURldGVjdG9yX0lkZW50aXR5LmpzJztcclxuXHJcbmNvbnN0IENIQU5HRV9NT0RFX1NVRkZJWCA9IFwiX0NoYW5nZU1vZGVcIjtcclxuY29uc3QgTU9ERV9KU09OID0gXCJqc29uXCI7XHJcbmNvbnN0IE1PREVfSWRlbnRpdHkgPSBcImlkZW50aXR5XCI7XHJcbmNvbnN0IERFRkFVTFRfTU9ERSA9IE1PREVfSlNPTjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RDaGFuZ2VzKHdhdGNoLCBjb250ZXh0KVxyXG57XHJcbiAgICByZXR1cm4gd2F0Y2gucmVkdWNlKGZ1bmN0aW9uKGNoYW5nZXNEZXRlY3RlZCwga2V5KVxyXG4gICAge1xyXG4gICAgICAgIHZhciB2YWx1ZUNoYW5nZWQgPSBjb250ZXh0LmNoYW5nZWRba2V5XSB8fCBmYWxzZTtcclxuICAgICAgICBpZiAoIXZhbHVlQ2hhbmdlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IG1vZGVTZWxlY3Qoa2V5LCBjb250ZXh0KS5kZXRlY3RDaGFuZ2VzKGtleSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZUNoYW5nZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2hhbmdlZFtrZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hhbmdlc0RldGVjdGVkIHx8IHZhbHVlQ2hhbmdlZDtcclxuICAgIH0sIG51bGwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSGlzdG9yeShjb250ZXh0KVxyXG57XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gY29udGV4dC5jaGFuZ2VkKVxyXG4gICAge1xyXG4gICAgICAgIG1vZGVTZWxlY3Qoa2V5LCBjb250ZXh0KS51cGRhdGVIaXN0b3J5KGtleSwgY29udGV4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZGVTZWxlY3Qoa2V5LCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgbW9kZSA9IGNvbnRleHQubW9kZWxba2V5ICsgQ0hBTkdFX01PREVfU1VGRklYXSB8fCBERUZBVUxUX01PREU7XHJcbiAgICBpZiAodHlwZW9mIG1vZGUgPT09IFwib2JqZWN0XCIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlLmRldGVjdENoYW5nZXMgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgbW9kZS51cGRhdGVIaXN0b3J5ID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV2hlbiBzcGVjaWZpeWluZyBhIGN1c3RvbSBtb2RlIHlvdSBtdXN0IHN1cHBseSBhIGRldGVjdENoYW5nZXMgZnVuY3Rpb24sIGFuZCBhbiB1cGRhdGVIaXN0b3J5IGZ1bmN0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2RlICE9PSBcInN0cmluZ1wiKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgU3RyaW5nIGFuZCBPYmplY3QgYXJlIGFsbG93ZWQgdmFsdWVzIGZvciBDaGFuZ2VNb2RlXCIpO1xyXG4gICAgfVxyXG4gICAgbW9kZSA9IG1vZGUudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmIChtb2RlID09PSBNT0RFX0pTT04pXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEpTT05fQ0Q7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChtb2RlID09PSBNT0RFX0lkZW50aXR5KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBJRF9DRDtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGFuZ2UgZGV0ZWN0aW9uIG1vZGUgbm90IHJlY29nbml6ZWRcIik7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9jaGFuZ2VEZXRlY3Rvci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBkZXRlY3RDaGFuZ2VzKHByb3BOYW1lLCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lm1vZGVsW3Byb3BOYW1lXTtcclxuICAgIHZhciBoaXN0b3J5ID0gY29udGV4dC5oaXN0b3J5W3Byb3BOYW1lXTtcclxuICAgIGlmICgoaGlzdG9yeSA9PT0gdW5kZWZpbmVkKSAhPT0gKHZhbHVlID09PSB1bmRlZmluZWQpKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNoZWNrZWQgPSB7fTtcclxuICAgICAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGtleTEgaW4gdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5MSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGtleTIgaW4gaGlzdG9yeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN1YmtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjaGVja2VkW3N1YmtleV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoZWNrZWRbc3Via2V5XSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZVtzdWJrZXldICE9PSBoaXN0b3J5W3N1YmtleV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gaGlzdG9yeSAhPT0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVIaXN0b3J5KHByb3BOYW1lLCBjb250ZXh0KVxyXG57XHJcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lm1vZGVsW3Byb3BOYW1lXTtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIGRlbGV0ZSBjb250ZXh0Lmhpc3RvcnlbcHJvcE5hbWVdO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuaGlzdG9yeVtwcm9wTmFtZV0gPSBjb250ZXh0Lmhpc3RvcnlbcHJvcE5hbWVdIHx8XHJcbiAgICAgICAge307XHJcbiAgICAgICAgZm9yICh2YXIgc3Via2V5IGluIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGV4dC5oaXN0b3J5W3Byb3BOYW1lXVtzdWJrZXldID0gdmFsdWVbc3Via2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5oaXN0b3J5W3Byb3BOYW1lXSA9IGNvbnRleHQubW9kZWxbcHJvcE5hbWVdO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9saWJTcmMvY2hhbmdlRGV0ZWN0b3JfSWRlbnRpdHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gZGV0ZWN0Q2hhbmdlcyhrZXksIGNvbnRleHQpXHJcbntcclxuICAgIGlmICgoY29udGV4dC5oaXN0b3J5W2tleV0gPT09IHVuZGVmaW5lZCkgIT09IChjb250ZXh0Lm1vZGVsW2tleV0gPT09IHVuZGVmaW5lZCkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb250ZXh0Lm1vZGVsW2tleV0gPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvbnRleHQubW9kZWxba2V5XSkgIT09IGNvbnRleHQuaGlzdG9yeVtrZXldO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSGlzdG9yeShrZXksIGNvbnRleHQpXHJcbntcclxuICAgIGlmIChjb250ZXh0Lm1vZGVsW2tleV0gPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICB7XHJcbiAgICAgICAgZGVsZXRlIGNvbnRleHQuaGlzdG9yeVtrZXldO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuaGlzdG9yeVtrZXldID0gSlNPTi5zdHJpbmdpZnkoY29udGV4dC5tb2RlbFtrZXldKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliU3JjL2NoYW5nZURldGVjdG9yX0pTT04uanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZWZlcnJlZCgpXHJcbntcclxuICAgIHZhciBzZWxmID0gdGhpcyB8fFxyXG4gICAge307XHJcbiAgICBzZWxmLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpXHJcbiAgICB7XHJcbiAgICAgICAgc2VsZi5yZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgICBzZWxmLnJlamVjdCA9IHJlamVjdDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNlbGY7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9kZWZlcnJlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBDYWNoZU1hbmFnZXIgZnJvbSAnLi9jYWNoZU1hbmFnZXIuanMnO1xyXG5pbXBvcnQgKiBhcyBjaGFuZ2VEZXRlY3RvciBmcm9tICcuL2NoYW5nZURldGVjdG9yLmpzJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJy4vZGVmZXJyZWQuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGlwZWxpbmU7XHJcblxyXG5jb25zdCBGQUlMX0JFSEFWSU9VUl9IQUxUID0gXCJIQUxUXCI7XHJcbmNvbnN0IEZBSUxfQkVIQVZJT1VSX1dBUk4gPSBcIldBUk5cIjtcclxuY29uc3QgREVGQVVMVF9QUk9DRVNTT1IgPSBcInN0YXJ0XCI7XHJcblxyXG5mdW5jdGlvbiBQaXBlbGluZSgpXHJcbntcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHZhciBmYWlsQmVoYXZpb3VyID0gRkFJTF9CRUhBVklPVVJfSEFMVDtcclxuICAgIHZhciBxdWV1ZSA9IFtdO1xyXG4gICAgdmFyIGNhY2hlID0gbmV3IENhY2hlTWFuYWdlcigpO1xyXG4gICAgdmFyIGlzSGFsdGVkID0gZmFsc2U7XHJcbiAgICB2YXIgY3VycmVudGx5UHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgdmFyIGhpc3RvcnkgPSB7fTtcclxuXHJcbiAgICBzZWxmLnByb2Nlc3MgPSBwcm9jZXNzO1xyXG4gICAgc2VsZi5oYWx0ID0gaGFsdDtcclxuICAgIHNlbGYucmVzdGFydCA9IHJlc3RhcnQ7XHJcbiAgICBzZWxmLm9uRmFpbCA9IG9uRmFpbDtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGZ1bmN0aW9uIHByb2Nlc3MobW9kZWwsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICB2YXIgZGVmZXIgPSBEZWZlcnJlZCgpO1xyXG4gICAgICAgIHF1ZXVlLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXIsXHJcbiAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcclxuICAgICAgICAgICAgcHJvY2Vzc29yOiBwcm9jZXNzb3IgfHwgREVGQVVMVF9QUk9DRVNTT1JcclxuICAgICAgICB9KTtcclxuICAgICAgICBjaGVja1N0YXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFsdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaXNIYWx0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlzSGFsdGVkID0gZmFsc2U7XHJcbiAgICAgICAgcXVldWUgPSBbXTtcclxuICAgICAgICBxdWV1ZS5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6XHJcbiAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICBwcm9jZXNzb3I6IGNhY2hlLmNsZWFyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2hlY2tTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrU3RhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChpc0hhbHRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50bHlQcm9jZXNzaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0ge1xyXG4gICAgICAgICAgICAgICAgbW9kZWw6IG5leHQubW9kZWwsXHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5OiBoaXN0b3J5LFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlZDpcclxuICAgICAgICAgICAgICAgIHt9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3Rvci51cGRhdGVIaXN0b3J5KGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgbmV4dC5kZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3RhdGUsIDApO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgd2hlbkRvbmUgPSBydW5Qcm9jZXNzb3IoY29udGV4dCwgbmV4dC5wcm9jZXNzb3IpO1xyXG4gICAgICAgICAgICB3aGVuRG9uZS5jYXRjaChoYW5kbGVFcnJvcik7XHJcbiAgICAgICAgICAgIHdoZW5Eb25lLnRoZW4oY2xlYW51cCwgY2xlYW51cCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycilcclxuICAgIHtcclxuICAgICAgICBpZiAoZmFpbEJlaGF2aW91ciA9PT0gRkFJTF9CRUhBVklPVVJfSEFMVClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYuaGFsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBydW5Qcm9jZXNzb3IoY29udGV4dCwgcHJvY2Vzc29yKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghcHJvY2Vzc29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvY2Vzc29yIHVuZGVmaW5lZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzSGFsdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcnVubmVyO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvY2Vzc29yID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBydW5Qcm9jZXNzb3JfRnVuY3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzb3IgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBydW5Qcm9jZXNzb3JfU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHByb2Nlc3NvcikpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBydW5Qcm9jZXNzb3JfQXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzb3IgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5uZXIgPSBydW5Qcm9jZXNzb3JfT2JqZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocnVubmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5lcihjb250ZXh0LCBwcm9jZXNzb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3Qgc3VyZSBob3cgdG8gcnVuIHByb2Nlc3NvclwiLCBwcm9jZXNzb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBydW5Qcm9jZXNzb3JfRnVuY3Rpb24oY29udGV4dCwgcHJvY2Vzc29yKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJvY2Vzc29yKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGNvbnRleHQubW9kZWwsXHJcbiAgICAgICAgICAgIGNoYW5nZWQ6IGNvbnRleHQuY2hhbmdlZCxcclxuICAgICAgICAgICAgY2FjaGU6IGNhY2hlLmdldChzZWxmLCBwcm9jZXNzb3IpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1blByb2Nlc3Nvcl9TdHJpbmcoY29udGV4dCwgcHJvY2Vzc29yKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBydW5Qcm9jZXNzb3IoY29udGV4dCwgY29udGV4dC5tb2RlbC5wcm9jZXNzb3JzW3Byb2Nlc3Nvci50b0xvd2VyQ2FzZSgpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuUHJvY2Vzc29yX09iamVjdChjb250ZXh0LCBwcm9jZXNzb3IpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFwcm9jZXNzb3IucnVucyB8fCAhKHR5cGVvZiBwcm9jZXNzb3IucnVucyA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcHJvY2Vzc29yLnJ1bnMgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIHByb2Nlc3Nvci5ydW5zID09PSBcImZ1bmN0aW9uXCIpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IGJhc2VkIHByb2Nlc3NvciBtdXN0IGhhdmUgYSAncnVucycgcHJvcGVydHkgY29udGFpbmluZyBhIHByb2Nlc3NvciBkZWZpbnRpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBydW5UaGlzID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHlwZW9mIHByb2Nlc3Nvci53YXRjaGVzID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvY2Vzc29yLndhdGNoZXMgPSBbcHJvY2Vzc29yLndhdGNoZXNdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9jZXNzb3Iud2F0Y2hlcykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBydW5UaGlzID0gY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcyhwcm9jZXNzb3Iud2F0Y2hlcywgY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChydW5UaGlzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJ1blByb2Nlc3Nvcihjb250ZXh0LCBwcm9jZXNzb3IucnVucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuUHJvY2Vzc29yX0FycmF5KGNvbnRleHQsIHByb2Nlc3NvcilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBwcm9jZXNzb3Iuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NOZXh0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXAubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHJ1blByb2Nlc3Nvcihjb250ZXh0LCB0ZW1wLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY2F0Y2goaGFuZGxlRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQudGhlbihwcm9jZXNzTmV4dCwgcHJvY2Vzc05leHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb2Nlc3NOZXh0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25GYWlsKGJlaGF2aW91cilcclxuICAgIHtcclxuICAgICAgICBpZiAoYmVoYXZpb3VyICE9PSBcImhhbHRcIiAmJiBiZWhhdmlvdXIgIT09IFwid2FyblwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT24gZmFpbCBvbmx5IGFjY2VwdHMgYSBzaW5nbGUgc3RyaW5nIHZhbHVlIHdoaWNoIG11c3QgYmUgZXhhY3RseSAnXCIgKyBGQUlMX0JFSEFWSU9VUl9IQUxUICsgXCInIG9yICdcIiArIEZBSUxfQkVIQVZJT1VSX1dBUk4gKyBcIidcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZhaWxCZWhhdmlvdXIgPSBiZWhhdmlvdXI7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYlNyYy9waXBlbGluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9