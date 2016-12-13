import * as CD_ID from '../libSrc/changeDetector_Identity.js';
import assert from 'assert';

describe('ChangeDetector-Identity', function()
{
    //these represent the same value but they have different object identities
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
        assert(typeof CD_ID.detectChanges === "function");
        assert(typeof CD_ID.updateHistory === "function");
    });
    it('detects change when history undefined and model defined', function()
    {
        assert(CD_ID.detectChanges("foo",
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
        assert(CD_ID.detectChanges("foo",
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
        assert(!CD_ID.detectChanges("foo",
        {
            model:
            {},
            history:
            {}
        }));
    });
    it('detects change when both history and model defined but different', function()
    {
        assert(CD_ID.detectChanges("foo",
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
        assert(!CD_ID.detectChanges("foo",
        {
            model:
            {
                foo: objA
            },
            history:
            {
                foo: objA
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
        CD_ID.updateHistory("foo", state);
        assert(state.history.foo.abc === objA.abc);
    });
});
