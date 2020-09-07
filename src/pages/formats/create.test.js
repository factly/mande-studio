import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import CreateFormat from './create';
import * as actions from '../../actions/formats';
import FormatCreateForm from './components/FormatCreateForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

jest.mock('../../actions/formats', () => ({
  createFormat: jest.fn(),
}));

describe('Formats create component', () => {
  let store;
  let mockedDispatch;

  store = mockStore({
    formats: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
  });
  store.dispatch = jest.fn(() => ({}));
  mockedDispatch = jest.fn(() => Promise.resolve({}));
  useDispatch.mockReturnValue(mockedDispatch);
  describe('snapshot testing', () => {
    it('should render the component', () => {
      const component = shallow(<CreateFormat />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call createFormat', (done) => {
      actions.createFormat.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CreateFormat />
          </Provider>,
        );
      });
      wrapper.find(FormatCreateForm).props().onSubmit({ test: 'test' });
      setTimeout(() => {
        expect(actions.createFormat).toHaveBeenCalledWith({ test: 'test' });
        expect(push).toHaveBeenCalledWith('/formats');
        done();
      }, 0);
    });
  });
});
