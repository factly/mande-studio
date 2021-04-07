import React from 'react';
import { Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Popconfirm, Button, Table } from 'antd';

import '../../../matchMedia.mock';
import TagList from './TagsList';
import { loadTags, deleteTag, getTag } from '../../../actions/tags';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/tags', () => ({
  loadTags: jest.fn(),
  deleteTag: jest.fn(),
}));

describe('Tags List component', () => {
  let store;
  let mockedDispatch;
  const tag = {
    id: 1,
    title: 'title',
    slug: 'slug',
    created_at: '2020-12-12',
  };

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({
        tags: {
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          ids: [1],
          items: {
            1: {
              id: 1,
              title: 'title',
              slug: 'slug',
              created_at: '2020-12-12',
            },
          },
          loading: false,
          total: 1,
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn(() => Promise.resolve({}));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      const tree = mount(
        <Provider store={store}>
          <TagList />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component when loading', () => {
      store = mockStore({
        tags: {
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          ids: [1],
          items: {
            1: {
              id: 1,
              title: 'title',
              slug: 'slug',
              created_at: '2020-12-12',
            },
          },
          loading: true,
          total: 1,
        },
      });
      const tree = renderer
        .create(
          <Provider store={store}>
            <TagList />
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with tags', () => {
      let component;
      act(() => {
        component = renderer.create(
          <Provider store={store}>
            <TagList />
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(loadTags).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        tags: {
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          ids: [1],
          items: {
            1: {
              id: 1,
              title: 'title',
              slug: 'slug',
              created_at: '2020-12-12',
            },
          },
          loading: false,
          total: 1,
        },
      });
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', () => {
      const wrapper = mount(
        <Provider store={store}>
          <TagList />
        </Provider>,
      );
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
    it('should edit tag', () => {
      const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
      const wrapper = mount(
        <Provider store={store}>
          <Router history={historyMock}>
            <TagList />
          </Router>
        </Provider>,
      );
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Edit');
      button.simulate('click');
      expect(historyMock.push).toHaveBeenCalledWith('/tags/1/edit');
    });
    it('should delete tag', () => {
      const wrapper = mount(
        <Provider store={store}>
          <TagList />
        </Provider>,
      );
      const button = wrapper.find(Button).at(1);
      expect(button.text()).toEqual('Delete');

      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(deleteTag).toHaveBeenCalled();
      expect(deleteTag).toHaveBeenCalledWith(1);
      expect(loadTags).toHaveBeenCalledWith(1, 5);
    });
    it('should have no delete and edit buttons', () => {
      store = mockStore({
        tags: {
          req: [
            {
              page: 1,
              limit: 5,
              ids: [],
            },
          ],
          ids: [],
          items: {},
          loading: false,
          total: 0,
        },
      });
      const wrapper = mount(
        <Provider store={store}>
          <TagList />
        </Provider>,
      );
      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
