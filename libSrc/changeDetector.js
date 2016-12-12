import JSON_CD from './changeDetector_JSON.js';
import ID_CD from './changeDetector_Identity.js';

const CHANGE_MODE_SUFFIX = "_ChangeMode";
const MODE_JSON = "json";
const MODE_Identity = "identity";
const DEFAULT_MODE = MODE_JSON;

export function hasChanged(watch, context)
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

export function updateHistory(context)
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