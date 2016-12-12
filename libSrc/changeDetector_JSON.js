export function hasChanged(key, context)
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

export function updateHistory(key, context)
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