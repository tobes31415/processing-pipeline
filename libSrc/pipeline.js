import CacheManager from './cacheManager.js';
import detectChanges from './changeDetector.js';
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
            var cleanup = function()
            {
                currentlyProcessing = false;
                next.deferred.resolve();
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
                runThis = detectChanges(processor.watches, context);
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
