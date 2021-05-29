import React from 'react';
import { useHistory } from 'react-router-dom';
import renderer, { act as rendererAct } from 'react-test-renderer';
import { useDispatch, Provider, useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import EditTag from './edit';
import * as actions from '../../actions/tags';
import TagEditForm from './components/TagCreateForm';

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

jest.mock('../../actions/tags', () => ({
  getTag: jest.fn(),
  addTag: jest.fn(),
  updateTag: jest.fn(),
}));

describe('Tags List component', () => {
  let store = mockStore({
    tags: {
      req: [],
      items: {
        1: {
          id: 1,
          name: 'Tag-1',
          slug: 'tag-1',
          description: 'description',
        },
        2: {
          id: 2,
          name: 'Tag-2',
          slug: 'tag-2',
          description: 'description',
        },
      },
      loading: false,
    },
  });
  store.dispatch = jest.fn(() => ({}));

  const mockedDispatch = jest.fn();
  useDispatch.mockReturnValue(mockedDispatch);

  describe('snapshot testing', () => {
    it('should render the component', () => {
      let component;
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditTag />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with empty data', () => {
      store = mockStore({
        tags: {
          req: [],
          items: {},
          loading: false,
        },
      });
      let component;
      store.details = {};
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditTag />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match skeleton while loading', () => {
      store = mockStore({
        tags: {
          req: [],
          items: {},
          loading: true,
        },
      });
      let component;
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <EditTag />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      store = mockStore({
        tags: {
          req: [],
          items: {
            1: {
              id: 1,
              name: 'Tag-1',
              slug: 'tag-1',
              description: 'description',
            },
            2: {
              id: 2,
              name: 'Tag-2',
              slug: 'tag-2',
              description: 'description',
            },
          },
          loading: false,
        },
      });
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call get action', () => {
      actions.getTag.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditTag />
          </Provider>,
        );
      });
      expect(actions.getTag).toHaveBeenCalledWith('1');
    });
    it('should call updateTag', () => {
      actions.updateTag.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditTag />
          </Provider>,
        );
      });
      wrapper.find(TagEditForm).props().onSubmit({ test: 'test' });
      expect(actions.updateTag).toHaveBeenCalledWith('1', { test: 'test' });
      expect(push).toHaveBeenCalledWith('/tags');
    });
  });
});
