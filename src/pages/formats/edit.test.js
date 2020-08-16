import React from 'react';
import { useHistory } from 'react-router-dom';
import renderer, { act as rendererAct } from 'react-test-renderer';
import { useDispatch, Provider, useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import EditFormat from './edit';
import * as actions from '../../actions/formats';
import FormatEditForm from './components/FormatCreateForm';

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

jest.mock('../../actions/formats', () => ({
  getFormat: jest.fn(),
  addFormat: jest.fn(),
  updateFormat: jest.fn(),
}));

describe('Formats List component', () => {
  const store = mockStore({
    formats: {
      req: [],
      details: {
        '1': {
          id: 1,
          name: 'Format-1',
          slug: 'format-1',
          description: 'description',
        },
        '2': {
          id: 2,
          name: 'Format-2',
          slug: 'format-2',
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
        format: {
          id: 1,
          name: 'format',
          slug: 'slug',
          description: 'description',
        },
        loading: false,
      });
      let component;
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditFormat />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with empty data', () => {
      useSelector.mockReturnValueOnce({
        format: {},
        loading: false,
      });
      let component;
      store.details = {};
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditFormat />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match skeleton while loading', () => {
      useSelector.mockReturnValueOnce({
        format: {},
        loading: true,
      });
      let component;
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditFormat />
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
      useSelector.mockReturnValueOnce({ format: null, loading: true });
      actions.getFormat.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditFormat />
          </Provider>,
        );
      });
      expect(actions.getFormat).toHaveBeenCalledWith('1');
    });
    it('should call updateFormat', () => {
      useSelector.mockReturnValueOnce({ format: {}, loading: false });
      actions.updateFormat.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditFormat />
          </Provider>,
        );
      });
      wrapper.find(FormatEditForm).props().onSubmit({ test: 'test' });
      expect(actions.updateFormat).toHaveBeenCalledWith('1', { test: 'test' });
      expect(push).toHaveBeenCalledWith('/formats');
    });
  });
});
