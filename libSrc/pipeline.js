import CacheManager from './cacheManager.js';
import * as changeDetector from './changeDetector.js';
import Deferred from './deferred.js';

export default Pipeline;

const FAIL_BEHAVIOUR_HALT = "halt";
const FAIL_BEHAVIOUR_WARN = "warn";
const DEFAULT_PROCESSOR = "start";

function Pipeline()
{
    "use strict";

    var self = this;
    var failBehaviour = FAIL_BEHAVIOUR_WARN;
    var queue = [];
    var cache = new CacheManager();
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
                console.error("Can't accept new process request because the pipeline is halted")
            }
            return Promise.reject("pipeline is halted");
        }
        
        var defer = Deferred();
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
                changeDetector.updateHistory(context);
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
            runThis = changeDetector.detectChanges(processor.watches, context);
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
