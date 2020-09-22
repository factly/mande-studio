import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import CreatePlan from './create';
import * as actions from '../../actions/plans';
import PlanCreateForm from './components/PlanCreateForm';

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

jest.mock('../../actions/plans', () => ({
  createPlan: jest.fn(),
}));

describe('Plans create component', () => {
  let store;
  let mockedDispatch;

  store = mockStore({
    plans: {
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
      const component = shallow(<CreatePlan />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call createPlan', (done) => {
      actions.createPlan.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CreatePlan />
          </Provider>,
        );
      });
      wrapper.find(PlanCreateForm).props().onSubmit({ test: 'test' });
      setTimeout(() => {
        expect(actions.createPlan).toHaveBeenCalledWith({ test: 'test' });
        expect(push).toHaveBeenCalledWith('/plans');
        done();
      }, 0);
    });
  });
});
