require(['ko', 'processing-pipeline'], function(ko, PipelineFactory)
{
    window.PipelineFactory = PipelineFactory;

    window.pipeline = PipelineFactory.create();


    window.pipeline.processors.start = ["a", "b", "c"];
    window.pipeline.processors.a = ["d", "e"];
    window.pipeline.processors.b = justLog("b");
    window.pipeline.processors.c = justLog("c");
    window.pipeline.processors.d = justLog("d");
    window.pipeline.processors.e = justLog("e");

    function justLog(text)
    {
        return function()
        {
            console.log(text);
        };
    }

    ko.applyBindings(
    {
        abc: PipelineFactory.foo
    });
});
