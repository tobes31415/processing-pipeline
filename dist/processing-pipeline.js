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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipeline_js__ = __webpack_require__(5);
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
	/* unused harmony export hasChanged *//* unused harmony export updateHistory */


	const CHANGE_MODE_SUFFIX = "_ChangeMode";
	const MODE_JSON = "json";
	const MODE_Identity = "identity";
	const DEFAULT_MODE = MODE_JSON;

	function hasChanged(watch, context)
	{
	    return watch.reduce(function(changesDetected, key)
	    {
	        var valueChanged = context.changed[key] || false;
	        if (!valueChanged)
	        {
	            valueChanged = modeSelect(key, context).hasChanged(key, context);
	            if (valueChanged)
	            {
	                context.changed[key] = true;
	            }
	        }
	        return changesDetected || valueChanged;
	    });
	}

	function updateHistory(context)
	{
	    for(var key in context.changed)
	    {
	        modeSelect(key, context).updateHistory(key, context);
	    }
	}

	function modeSelect(key, context)
	{
	    var mode = context.model[key + CHANGE_MODE_SUFFIX] || DEFAULT_MODE;
	    mode = mode.toLowerCase();
	    if (mode === MODE_JSON)
	    {
	        return /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__changeDetector_JSON_js__["default"];
	    }
	    else if (mode === MODE_Identity)
	    {
	        return /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__changeDetector_Identity_js__["default"];
	    }
	    else
	    {
	        throw new Error("Change detection mode not recognized");
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* unused harmony export hasChanged *//* unused harmony export updateHistory */function hasChanged(key, context)
	{
	    var value = context.model[key];
	    if (value === undefined)
	    {
	        return context.history[key] !== undefined;
	    }
	    else if (typeof value === "object")
	    {
	        var checked = {};
	        var keys = [];
	        for(var key in value)
	        {
	            keys.push(value);
	        }
	        for(var key in context.history[key])
	        {
	            keys.push(value);
	        }
	        for(var i=0;i<keys.length;i++)
	        {
	            var subkey = keys[i];
	            if (checked[subkey])
	            {
	                continue;
	            }
	            checked[subkey] = true;
	            if(context.model[key][subkey] !== context.history[key][subkey])
	            {
	                return true;
	            }
	        }
	        return false;
	    }
	    else
	    {
	        return context.history[key] = context.model[key];
	    }
	}

	function updateHistory(key, context)
	{
	    var value = context.model[key];
	    if (value === undefined)
	    {
	        delete context.history[key];
	    }
	    else if (typeof value === "object")
	    {
	        context.history[key] = context.history[key] || {};
	        for (var subkey in value)
	        {
	            context.history[key][subkey] = value[subkey];
	        }
	    }
	    else
	    {
	        context.history[key] = context.model[key];
	    }
	    
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* unused harmony export hasChanged *//* unused harmony export updateHistory */function hasChanged(key, context)
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

	/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cacheManager_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__changeDetector_js__ = __webpack_require__(2);



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
	        queue.push(
	        {
	            model: model,
	            processor: processor || DEFAULT_PROCESSOR
	        });
	        checkState();
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
	            var cleanup = function()
	            {
	                currentlyProcessing = false;
	                setTimeout(checkState, 0);
	            };
	            var whenDone = runProcessor(next.processor,
	            {
	                model: next.model,
	                history: history,
	                changed:
	                {}
	            });
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

	    function runProcessor(processor, context)
	    {
	        if (!processor)
	        {
	            throw new Error("Processor undefined");
	        }
	        if (isHalted)
	        {
	            return Promise.resolve();
	        }
	        if (typeof processor === "function")
	        {
	            return Promise.resolve(processor(
	            {
	                model: context.model,
	                changed: context.changed,
	                cache: cache.get(self, processor)
	            }));
	        }
	        else if (typeof processor === "string")
	        {
	            return runProcessor(context.model.processors[processor.toLowerCase()]);
	        }
	        else if (Array.isArray(processor))
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
	                        var current = runProcessor(temp.shift(), context);
	                        current.catch(handleError);
	                        current.then(processNext, processNext);
	                    }
	                }
	            });
	        }
	        else if (typeof processor === "object")
	        {
	            if (!Array.isArray(process.runs))
	            {
	                throw new Error("Object based processor must have an array of sub processors called 'runs'");
	            }
	            var runThis = true;
	            if (Array.isArray(processor.watches))
	            {
	                runThis = /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__changeDetector_js__["default"](processor.watches, context);
	            }
	            if (runThis)
	            {
	                return runProcessor(processor.runs, context);
	            }
	            else
	            {
	                return Promise.resolve();
	            }
	        }
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(0);


/***/ }
/******/ ])
});
;