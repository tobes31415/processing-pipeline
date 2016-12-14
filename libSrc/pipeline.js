import CacheManager from './cacheManager.js';
import * as changeDetector from './changeDetector.js';
import Deferred from './deferred.js';

export default Pipeline;

const FAIL_BEHAVIOUR_HALT = "HALT";
const FAIL_BEHAVIOUR_WARN = "WARN";
const DEFAULT_PROCESSOR = "start";

function Pipeline()
{
    "use strict";

    var self = this;
    var failBehaviour = FAIL_BEHAVIOUR_HALT;
    var queue = [];
    var cache = new CacheManager();
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
