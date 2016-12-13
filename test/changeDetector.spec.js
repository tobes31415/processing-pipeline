import * as changeDetector from '../libSrc/changeDetector.js';
import assert from 'assert';
import sinon from 'sinon';

describe('ChangeDetector', function()
{
    var mock;
    beforeEach(function()
    {
        mock = {
            detectChanges: sinon.stub(),
            updateHistory: sinon.stub()
        };
    });
    it('invokves detect changes when no changes have been detected yet', function()
    {
        changeDetector.detectChanges(["foo"],
        {
            model:
            {
                foo_ChangeMode: mock
            },
            changed:
            {}
        });
        assert(mock.detectChanges.calledOnce);
    });
    it('does not invoke detect changes when changes have already been detected', function()
    {
        changeDetector.detectChanges(["foo"],
        {
            model:
            {
                foo_ChangeMode: mock
            },
            changed:
            {
                foo: true
            }
        });
        assert(!mock.detectChanges.called);
    });
    it('if changes were detected it sets the changed flag', function()
    {
        mock.detectChanges.returns(true);
        var state = {
            model:
            {
                foo_ChangeMode: mock
            },
            changed:
            {}
        };
        changeDetector.detectChanges(["foo"], state);
        assert(state.changed.foo);
    });
    it('invokves update history', function()
    {
        changeDetector.updateHistory(
        {
            changed:
            {
                foo: true
            },
            model:
            {
                foo_ChangeMode: mock
            }
        });
        assert(mock.updateHistory.calledOnce);
    });
});
