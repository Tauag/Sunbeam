import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from './__mocks__/axios';

global.axios = axios;
Enzyme.configure({ adapter: new Adapter() });
