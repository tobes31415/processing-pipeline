export function hasChanged(key, context)
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

export function updateHistory(key, context)
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