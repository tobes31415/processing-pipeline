require(['ko', 'processing-pipeline'], function(ko, PipelineFactory)
{
    window.PipelineFactory = PipelineFactory;
    
    ko.applyBindings(
    {
        abc: PipelineFactory.foo
    });
});
