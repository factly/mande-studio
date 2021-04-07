import React from 'react';
import { Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Popconfirm, Button, Table } from 'antd';

import '../../../matchMedia.mock';
import PlanList from './PlansList';
import { loadPlans, deletePlan } from '../../../actions/plans';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/plans', () => ({
  loadPlans: jest.fn(),
  deletePlan: jest.fn(),
}));

describe('Plans List component', () => {
  let store;
  let mockedDispatch;
  const plan = {
    id: 1,
    name: 'Plan-1',
    slug: 'plan-1',
    status: 'status',
    description: 'description',
    created_at: '2020-12-12',
  };

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({
        plans: {
          ids: [1, 2],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1, 2],
            },
          ],
          items: {
            1: {
              id: 1,
              name: 'Plan-1',
              slug: 'plan-1',
              description: 'description',
              created_at: '2020-12-12',
            },
            2: {
              id: 2,
              name: 'Plan-2',
              slug: 'plan-2',
              description: 'description',
              created_at: '2020-12-12',
            },
          },
          loading: false,
          total: 2,
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
      mockedDispatch = jest.fn();
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <PlanList />
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component when loading', () => {
      store = mockStore({
        plans: {
          ids: [1, 2],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1, 2],
            },
          ],
          items: {
            1: {
              id: 1,
              name: 'Plan-1',
              slug: 'plan-1',
              description: 'description',
              created_at: '2020-12-12',
            },
            2: {
              id: 2,
              name: 'Plan-2',
              slug: 'plan-2',
              description: 'description',
              created_at: '2020-12-12',
            },
          },
          loading: true,
          total: 2,
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
          <PlanList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component with plans', () => {
      let component;
      act(() => {
        component = renderer.create(
          <Provider store={store}>
            <PlanList />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(loadPlans).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        plans: {
          ids: [1, 2],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1, 2],
            },
          ],
          items: {
            1: {
              id: 1,
              name: 'Plan-1',
              slug: 'plan-1',
              description: 'description',
              created_at: '2020-12-12',
            },
            2: {
              id: 2,
              name: 'Plan-2',
              slug: 'plan-2',
              description: 'description',
              created_at: '2020-12-12',
            },
          },
          loading: false,
          total: 2,
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
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', () => {
      const wrapper = mount(
        <Provider store={store}>
          <PlanList />
        </Provider>,
      );
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
    it('should edit plan', () => {
      const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
      const wrapper = mount(
        <Provider store={store}>
          <Router history={historyMock}>
            <PlanList />
          </Router>
        </Provider>,
      );
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Edit');
      button.simulate('click');
      expect(historyMock.push).toHaveBeenCalledWith('/plans/1/edit');
    });
    it('should delete plan', () => {
      const wrapper = mount(
        <Provider store={store}>
          <PlanList />
        </Provider>,
      );
      const button = wrapper.find(Button).at(1);
      expect(button.text()).toEqual('Delete');

      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(deletePlan).toHaveBeenCalled();
      expect(deletePlan).toHaveBeenCalledWith(1);
      expect(loadPlans).toHaveBeenCalledWith(1, 5);
    });
    it('should have no delete and edit buttons', () => {
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
      const wrapper = mount(
        <Provider store={store}>
          <PlanList />
        </Provider>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
