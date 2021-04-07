import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import CreateProduct from './create';
import * as actions from '../../actions/products';
import ProductCreateForm from './components/ProductCreateForm';

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

jest.mock('../../actions/products', () => ({
  createProduct: jest.fn(),
}));

describe('Products create component', () => {
  let store;
  let mockedDispatch;

  store = mockStore({
    products: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
    currencies: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
    tags: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
    datasets: {
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
      const component = shallow(<CreateProduct />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call createProduct', (done) => {
      actions.createProduct.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CreateProduct />
          </Provider>,
        );
      });
      wrapper.find(ProductCreateForm).props().onSubmit({ test: 'test' });
      setTimeout(() => {
        expect(actions.createProduct).toHaveBeenCalledWith({ test: 'test' });
        done();
      }, 0);
    });
  });
});
