import chai from 'chai';
import Enzyme from 'enzyme';
import chaiJestSnapshot from 'chai-jest-snapshot';
import Adapter from 'enzyme-adapter-react-15';

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
        __dirname + "/../unit/components/snapshots.snap"
    );
    chaiJestSnapshot.setTestName(this.currentTest.fullTitle());
});