require(['ko', 'processing-pipeline'], function(ko, PipelineFactory)
{
    ko.applyBindings(
    {
        abc: PipelineFactory.foo
    });
});
