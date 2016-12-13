export default function Deferred()
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
