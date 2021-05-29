import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import '../../../matchMedia.mock';
import MediaList from './MediaList';
import * as actions from '../../../actions/media';
import { mount } from 'enzyme';
import { Button, List, Popconfirm } from 'antd';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/media', () => ({
  loadMedia: jest.fn(),
  deleteMedium: jest.fn(),
}));

let mockedDispatch, store;
let state = {
  media: {
    req: [
      {
        ids: [1, 2],
        page: 1,
        limit: 4,
      },
    ],
    ids: [1, 2],
    total: 2,
    items: {
      1: {
        id: 1,
        created_at: '2020-09-23T09:21:29.245873Z',
        updated_at: '2020-09-23T09:21:29.245873Z',
        deleted_at: null,
        name: 'uppy/english/2020/8/1600852886756_pnggrad16rgb.png',
        slug: 'uppy-english-2020-8-1600852886756-pnggrad16rgb-png',
        type: 'image/png',
        title: 'png',
        description: 'png',
        caption: 'png',
        alt_text: 'png',
        file_size: 3974,
        href: 'http://storage.googleapis.com/sample.png',
        url: 'http://storage.googleapis.com/sample.png',
        dimensions: '100x100',
        space_id: 1,
      },
      2: {
        id: 2,
        created_at: '2020-09-23T09:21:29.245873Z',
        updated_at: '2020-09-23T09:21:29.245873Z',
        deleted_at: null,
        name: 'uppy/english/2020/8/1600852886756_pnggrad16rgb.png',
        slug: 'uppy-english-2020-8-1600852886756-pnggrad16rgb-png',
        type: 'image/png',
        title: 'png',
        description: 'png',
        caption: 'png',
        alt_text: 'png',
        file_size: 3974,
        href: 'http://storage.googleapis.com/sample.png',
        url: { proxy: 'http://storage.googleapis.com/sample.png' },
        dimensions: '100x100',
        space_id: 1,
      },
    },
    loading: false,
  },
};

describe('Media List component', () => {
  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({});
      store.dispatch = jest.fn();
      mockedDispatch = jest.fn();
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      store = mockStore(state);
      const tree = mount(
        <Provider store={store}>
          <Router>
            <MediaList />
          </Router>
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component when loading', () => {
      state.media.loading = true;
      store = mockStore(state);
      const tree = mount(
        <Provider store={store}>
          <Router>
            <MediaList />
          </Router>
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match component with media', () => {
      state.media.loading = false;
      store = mockStore(state);
      const tree = mount(
        <Provider store={store}>
          <Router>
            <MediaList />
          </Router>
        </Provider>,
      );
      expect(tree).toMatchSnapshot();

      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(actions.loadMedia).toHaveBeenCalledWith(1, 4);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', () => {
      store = mockStore(state);
      let wrapper;
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <Router>
              <MediaList />
            </Router>
          </Provider>,
        );
      });
      const list = wrapper.find(List);
      list.props().pagination.onChange(3);
      wrapper.update();
      const updatedList = wrapper.find(List);
      expect(updatedList.props().pagination.current).toEqual(3);
    });
    it('should delete medium', () => {
      store = mockStore(state);
      let wrapper;
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <Router>
              <MediaList />
            </Router>
          </Provider>,
        );
      });
      wrapper.find(DeleteOutlined).at(0).simulate('click');

      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(actions.deleteMedium).toHaveBeenCalled();
      expect(actions.deleteMedium).toHaveBeenCalledWith(1);
    });
    it('should edit medium', () => {
      store = mockStore(state);
      let wrapper;
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <Router>
              <MediaList />
            </Router>
          </Provider>,
        );
      });
      const button = wrapper.find(EditOutlined).at(0);
      button.simulate('click');
    });
    it('should have no delete and edit buttons', () => {
      store = mockStore({
        media: {
          req: [],
          ids: [],
        },
      });
      let wrapper;
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <Router>
              <MediaList />
            </Router>
          </Provider>,
        );
      });

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
