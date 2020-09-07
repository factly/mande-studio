import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import CreateCurrency from './create';
import * as actions from '../../actions/currencies';
import CurrencyCreateForm from './components/CurrencyCreateForm';

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

jest.mock('../../actions/currencies', () => ({
  createCurrency: jest.fn(),
}));

describe('Currencies create component', () => {
  let store;
  let mockedDispatch;

  store = mockStore({
    currencies: {
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
      const component = shallow(<CreateCurrency />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call createCurrency', (done) => {
      actions.createCurrency.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CreateCurrency />
          </Provider>,
        );
      });
      wrapper.find(CurrencyCreateForm).props().onSubmit({ test: 'test' });
      setTimeout(() => {
        expect(actions.createCurrency).toHaveBeenCalledWith({ test: 'test' });
        expect(push).toHaveBeenCalledWith('/currencies');
        done();
      }, 0);
    });
  });
});
