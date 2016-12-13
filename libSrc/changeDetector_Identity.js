export function detectChanges(propName, context)
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

export function updateHistory(propName, context)
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
