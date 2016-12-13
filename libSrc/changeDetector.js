import JSON_CD from './changeDetector_JSON.js';
import ID_CD from './changeDetector_Identity.js';

const CHANGE_MODE_SUFFIX = "_ChangeMode";
const MODE_JSON = "json";
const MODE_Identity = "identity";
const DEFAULT_MODE = MODE_JSON;

export function detectChanges(watch, context)
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

export function updateHistory(context)
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
        return JSON_CD;
    }
    else if (mode === MODE_Identity)
    {
        return ID_CD;
    }
    else
    {
        throw new Error("Change detection mode not recognized");
    }
}
