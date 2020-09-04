import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider, useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import EditCatalog from './edit';
import * as actions from '../../actions/catalogs';
import CatalogEditForm from './components/CatalogCreateForm';

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

jest.mock('../../actions/catalogs', () => ({
  getCatalog: jest.fn(),
  updateCatalog: jest.fn(),
}));

describe('Catalogs List component', () => {
  const store = mockStore({
    catalogs: {
      loading: false,
      ids: [],
      req: [],
      items: {
        1: {
          id: 1,
          title: 'Catalog-1',
          description: 'description',
          price: 100,
          published_date: null,
        },
        2: {
          id: 2,
          title: 'Catalog-2',
          description: 'description',
          price: 100,
          published_date: null,
        },
      },
      total: 0,
    },
    products: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
  });
  store.dispatch = jest.fn(() => ({}));

  const mockedDispatch = jest.fn();
  useDispatch.mockReturnValue(mockedDispatch);

  describe('snapshot testing', () => {
    it('should render the component', () => {
      useSelector
        .mockReturnValueOnce({
          catalog: {
            id: 1,
            title: 'Catalog-1',
            description: 'description',
            price: 100,
            published_date: null,
          },
          loading: false,
        })
        .mockReturnValueOnce({ details: [], total: 0, loading: false });

      let component;
      act(() => {
        component = shallow(
          <Provider store={store}>
            <EditCatalog />
          </Provider>,
        );
      });
      // const tree = component.toJSON();
      expect(component).toMatchSnapshot();
    });
    it('should match component with empty data', () => {
      useSelector
        .mockReturnValueOnce({
          catalog: {},
          loading: false,
        })
        .mockReturnValueOnce({ details: [], total: 0, loading: false });
      let component;
      store.details = {};
      act(() => {
        component = shallow(
          <Provider store={store}>
            <EditCatalog />
          </Provider>,
        );
      });
      // const tree = component.toJSON();
      expect(component).toMatchSnapshot();
    });
    it('should match skeleton while loading', () => {
      useSelector
        .mockReturnValueOnce({
          catalog: {},
          loading: true,
        })
        .mockReturnValueOnce({ details: [], total: 0, loading: false });
      let component;
      act(() => {
        component = shallow(
          <Provider store={store}>
            <EditCatalog />
          </Provider>,
        );
      });
      // const tree = component.toJSON();
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call get action', () => {
      useSelector.mockReset();
      useSelector
        .mockReturnValueOnce({ catalog: null, loading: true })
        .mockReturnValueOnce({ details: [], total: 0, loading: false });
      actions.getCatalog.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditCatalog />
          </Provider>,
        );
      });
      expect(actions.getCatalog).toHaveBeenCalledWith('1');
    });
    it('should call updateCatalog', (done) => {
      useSelector.mockReset();
      useSelector
        .mockReturnValueOnce({ catalog: {}, loading: false })
        .mockReturnValueOnce({ details: [], total: 0, loading: false });
      actions.updateCatalog.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditCatalog />
          </Provider>,
        );
      });
      wrapper.find(CatalogEditForm).props().onSubmit({ test: 'test' });
      setTimeout(() => {
        expect(actions.updateCatalog).toHaveBeenCalledWith('1', { test: 'test' });
        expect(push).toHaveBeenCalledWith('/catalogs');
        done();
      }, 0);
    });
  });
});
