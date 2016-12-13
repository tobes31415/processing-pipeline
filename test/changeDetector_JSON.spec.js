import * as CD_JSON from '../libSrc/changeDetector_JSON.js';
import assert from 'assert';

describe('ChangeDetector-JSON', function()
{
    var subA = {};
    var subB = {};
    var objA = {
        abc: subA
    };
    var objB = {
        abc: subB
    };

    it('it has a detect changes fuction and an update history function', function()
    {
        assert(typeof CD_JSON.detectChanges === "function");
        assert(typeof CD_JSON.updateHistory === "function");
    });
    it('detects change when history undefined and model defined', function()
    {
        assert(CD_JSON.detectChanges("foo",
        {
            model:
            {
                foo: objA
            },
            history:
            {}
        }));
    });
    it('detects change when model undefined and model defined', function()
    {
        assert(CD_JSON.detectChanges("foo",
        {
            model:
            {},
            history:
            {
                foo: objA
            }
        }));
    });
    it('detects no change when both history and model undefined', function()
    {
        assert(!CD_JSON.detectChanges("foo",
        {
            model:
            {},
            history:
            {}
        }));
    });
    it('detects change when both history and model defined but different', function()
    {
        assert(CD_JSON.detectChanges("foo",
        {
            model:
            {
                foo: objA
            },
            history:
            {
                foo: objB
            }
        }));
    });
    it('detects no change when both history and model defined and same', function()
    {
        assert(!CD_JSON.detectChanges("foo",
        {
            model:
            {
                foo: objA
            },
            history:
            {
                foo: JSON.stringify(objA)
            }
        }));
    });
    it('update history updates the history', function()
    {
        var state = {
            model:
            {
                foo: objA
            },
            history:
            {}
        };
        CD_JSON.updateHistory("foo", state);
        assert(state.history.foo === JSON.stringify(objA));
    });
});
