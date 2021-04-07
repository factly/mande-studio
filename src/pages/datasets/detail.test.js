import React from 'react';
import { useParams } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux';
import { mount } from 'enzyme';

import DatasetDetails from './detail';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import '../../matchMedia.mock';
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

describe('Datasets detail component', () => {
  let store;
  let mockedDispatch;
  store = mockStore({
    datasets: {
      loading: false,
      ids: [1],
      req: [
        {
          page: 1,
          limit: 5,
          ids: [1],
        },
      ],
      items: {
        1: {
          id: 1,
        },
      },
      total: 1,
    },
    currencies: {
      loading: false,
      ids: [1],
      req: [
        {
          page: 1,
          limit: 5,
          ids: [1],
        },
      ],
      items: {
        1: {
          id: 1,
          name: 'Indian Rupee',
          iso_code: 'INR',
        },
      },
    },
  });
  store.dispatch = jest.fn(() => ({}));
  mockedDispatch = jest.fn(() => Promise.resolve({}));
  useDispatch.mockReturnValue(mockedDispatch);
  beforeEach(() => {
    useParams.mockReturnValueOnce({ id: 1 });
  });
  it('should render the component', () => {
    const component = mount(
      <Provider store={store}>
        <DatasetDetails />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
  it('should match when loading', () => {
    store = mockStore({
      datasets: {
        loading: true,
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
      },
    });
    const component = mount(
      <Provider store={store}>
        <DatasetDetails />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
  it('should render the component without dataset', () => {
    store = mockStore({
      datasets: {
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
      },
    });
    const component = mount(
      <Provider store={store}>
        <DatasetDetails />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
  it('should render with dataset with sample', () => {
    store = mockStore({
      datasets: {
        loading: false,
        ids: [1],
        req: [
          {
            page: 1,
            limit: 5,
            ids: [1],
          },
        ],
        items: {
          1: {
            id: 1,
            url: 'url',
            sample_url: 'sample_url',
            formats: [{ id: 1, url: 'sample_url', format: { id: 1, name: 'pdf' } }],
          },
        },
        total: 1,
      },
      currencies: {
        loading: false,
        ids: [1],
        req: [
          {
            page: 1,
            limit: 5,
            ids: [1],
          },
        ],
        items: {
          1: {
            id: 1,
            name: 'Indian Rupee',
            iso_code: 'INR',
          },
        },
      },
    });
    const component = mount(
      <Provider store={store}>
        <Router>
          <DatasetDetails />
        </Router>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
