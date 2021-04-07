import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import EditPlan from './edit';
import * as actions from '../../actions/plans';
import PlanEditForm from './components/PlanCreateForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

jest.mock('../../actions/plans', () => ({
  getPlan: jest.fn(),
  addPlan: jest.fn(),
  updatePlan: jest.fn(),
}));

describe('Plans List component', () => {
  let store = mockStore({
    plans: {
      ids: [1],
      req: [],
      items: {
        1: {
          id: 1,
          name: 'Plan-1',
          slug: 'plan-1',
          description: 'description',
        },
        2: {
          id: 2,
          name: 'Plan-2',
          slug: 'plan-2',
          description: 'description',
        },
      },
      loading: false,
      total: 1,
    },
    currencies: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
    catalogs: {
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
      const tree = mount(
        <Provider store={store}>
          <EditPlan />
        </Provider>,
      );

      expect(tree).toMatchSnapshot();
    });
    it('should match component with empty data', () => {
      store = mockStore({
        plans: {
          ids: [],
          req: [],
          items: {},
          loading: false,
          total: 0,
        },
        currencies: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
        catalogs: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });

      const tree = mount(
        <Provider store={store}>
          <EditPlan />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match skeleton while loading', () => {
      store = mockStore({
        plans: {
          ids: [],
          req: [],
          items: {},
          loading: true,
          total: 0,
        },
        currencies: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
        catalogs: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
      const tree = mount(
        <Provider store={store}>
          <EditPlan />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      store = mockStore({
        plans: {
          ids: [1],
          req: [],
          items: {
            1: {
              id: 1,
              name: 'Plan-1',
              slug: 'plan-1',
              description: 'description',
            },
            2: {
              id: 2,
              name: 'Plan-2',
              slug: 'plan-2',
              description: 'description',
            },
          },
          loading: false,
          total: 1,
        },
        currencies: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
        catalogs: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call get action', () => {
      actions.getPlan.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditPlan />
          </Provider>,
        );
      });
      expect(actions.getPlan).toHaveBeenCalledWith('1');
    });
    it('should call updatePlan', (done) => {
      actions.updatePlan.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditPlan />
          </Provider>,
        );
      });
      wrapper.find(PlanEditForm).props().onSubmit({ test: 'test' });
      setTimeout(() => {
        expect(actions.updatePlan).toHaveBeenCalledWith('1', { test: 'test' });
        expect(push).toHaveBeenCalledWith('/plans');
        done();
      }, 0);
    });
  });
});
