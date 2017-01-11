import PipelineInstance from './pipeline.js';
import global from './global.js';

export function create()
{
    "use strict";
    return new PipelineInstance();
}

global.PipelineFactory = {
    create: create
};
