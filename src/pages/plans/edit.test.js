import React from 'react';
import { useHistory } from 'react-router-dom';
import renderer, { act as rendererAct } from 'react-test-renderer';
import { useDispatch, Provider, useSelector } from 'react-redux';
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
  useSelector: jest.fn(),
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
  const store = mockStore({
    plans: {
      req: [],
      details: {
        '1': {
          id: 1,
          name: 'Plan-1',
          slug: 'plan-1',
          description: 'description',
        },
        '2': {
          id: 2,
          name: 'Plan-2',
          slug: 'plan-2',
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
        plan: {
          id: 1,
          name: 'plan',
          slug: 'slug',
          description: 'description',
        },
        loading: false,
      });
      let component;
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditPlan />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with empty data', () => {
      useSelector.mockReturnValueOnce({
        plan: {},
        loading: false,
      });
      let component;
      store.details = {};
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditPlan />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match skeleton while loading', () => {
      useSelector.mockReturnValueOnce({
        plan: {},
        loading: true,
      });
      let component;
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditPlan />
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
      useSelector.mockReset();
      useSelector.mockReturnValueOnce({ plan: null, loading: true });
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
      useSelector.mockReset();
      useSelector.mockReturnValueOnce({ plan: {}, loading: false });
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
