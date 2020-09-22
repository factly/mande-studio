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
import ProductDetail from './detail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
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
      ids: [1],
      req: [],
      items: {
        1: {
          id: 1,
          title: 'title',
          slug: 'slug',
          price: 100,
          status: 'status',
          tags: [1],
          currency_id: 1,
          created_at: '2020-12-12',
        },
      },
      total: 1,
    },
    currencies: {
      loading: false,
      ids: [1],
      req: [],
      items: {
        1: { id: 1, iso_code: 'INR' },
      },
      total: 1,
    },
    tags: {
      loading: false,
      ids: [1],
      req: [],
      items: {
        1: { id: 1, title: 'tag1' },
      },
      total: 1,
    },
  });
  store.dispatch = jest.fn(() => ({}));
  mockedDispatch = jest.fn(() => Promise.resolve({}));
  useDispatch.mockReturnValue(mockedDispatch);
  describe('snapshot testing', () => {
    it('should render the component', () => {
      const component = shallow(
        <Provider store={store}>
          <ProductDetail />
        </Provider>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
