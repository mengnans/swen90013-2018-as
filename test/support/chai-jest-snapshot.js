import chai from 'chai';
import Enzyme from 'enzyme';
import chaiJestSnapshot from 'chai-jest-snapshot';
import Adapter from 'enzyme-adapter-react-15';

const snapshotsFile = '/../unit/components/snapshots.snap';
const resetFlag = '--reset-snapshots';

if (process.argv.includes(resetFlag)) {
    process.env.CHAI_JEST_SNAPSHOT_UPDATE_ALL = "true";
}

chai.use(chaiJestSnapshot);

Enzyme.configure({ adapter: new Adapter() });

before(function() {
    chaiJestSnapshot.resetSnapshotRegistry();
});

/**
 * Set the snapshot location before each test.
 */
beforeEach(function() {
    chaiJestSnapshot.setFilename(
        __dirname + snapshotsFile
    );
    chaiJestSnapshot.setTestName(this.currentTest.fullTitle());
});