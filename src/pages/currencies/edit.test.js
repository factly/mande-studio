import React from 'react';
import { useHistory } from 'react-router-dom';
import renderer, { act as rendererAct } from 'react-test-renderer';
import { useDispatch, Provider, useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import EditCurrency from './edit';
import * as actions from '../../actions/currencies';
import CurrencyEditForm from './components/CurrencyCreateForm';

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

jest.mock('../../actions/currencies', () => ({
  getCurrency: jest.fn(),
  addCurrency: jest.fn(),
  updateCurrency: jest.fn(),
}));

describe('Currencies List component', () => {
  const store = mockStore({
    currencies: {
      req: [],
      details: {
        1: {
          id: 1,
          name: 'Currency-1',
          slug: 'currency-1',
          description: 'description',
        },
        2: {
          id: 2,
          name: 'Currency-2',
          slug: 'currency-2',
          description: 'description',
        },
      },
      loading: true,
    },
  });
  store.dispatch = jest.fn(() => ({}));

  const mockedDispatch = jest.fn();
  useDispatch.mockReturnValue(mockedDispatch);

  describe('snapshot testing', () => {
    it('should render the component', () => {
      useSelector.mockReturnValueOnce({
        currency: {
          id: 1,
          name: 'currency',
          slug: 'slug',
          description: 'description',
        },
        loading: false,
      });
      let component;
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditCurrency />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with empty data', () => {
      useSelector.mockReturnValueOnce({
        currency: {},
        loading: false,
      });
      let component;
      store.details = {};
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditCurrency />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match skeleton while loading', () => {
      useSelector.mockReturnValueOnce({
        currency: {},
        loading: true,
      });
      let component;
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditCurrency />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call get action', () => {
      useSelector.mockReturnValueOnce({ currency: null, loading: true });
      actions.getCurrency.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditCurrency />
          </Provider>,
        );
      });
      expect(actions.getCurrency).toHaveBeenCalledWith('1');
    });
    it('should call updateCurrency', () => {
      useSelector.mockReturnValueOnce({ currency: {}, loading: false });
      actions.updateCurrency.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditCurrency />
          </Provider>,
        );
      });
      wrapper.find(CurrencyEditForm).props().onSubmit({ test: 'test' });
      expect(actions.updateCurrency).toHaveBeenCalledWith('1', { test: 'test' });
      expect(push).toHaveBeenCalledWith('/currencies');
    });
  });
});
