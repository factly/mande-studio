import React from 'react';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { act } from 'react-dom/test-utils';

import '../../matchMedia.mock';
import Selector from './Selector';
import { mount } from 'enzyme';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const entity = 'Tags';
const mode = 'multiple';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

jest.mock('../actions/tags', () => ({
  loadTags: jest.fn(),
}));

let state = {
  tags: {
    req: [
      {
        query: { page: 1 },
      },
    ],
    ids: [1],
    total: 1,
    items: {
      1: {
        id: 1,
        created_at: '2020-07-17T10:14:44.251814Z',
        updated_at: '2020-07-17T10:14:44.251814Z',
        deleted_at: null,
        name: 'category-1',
        slug: 'category-1',
        description: '',
        parent_id: 0,
        medium_id: 0,
        space_id: 1,
      },
    },
    loading: false,
  },
};

describe('Tags List component', () => {
  let store = mockStore({});
  let mockedDispatch;

  describe('Snapshot testing', () => {
    beforeEach(() => {
      store.dispatch = jest.fn();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      let component;
      store = mockStore(state);
      act(() => {
        component = mount(
          <Provider store={store}>
            <Selector action={entity} mode={mode} />
          </Provider>,
        );
      });
      expect(component).toMatchSnapshot();
    });
    it('should render the component with data', () => {
      let component;
      act(() => {
        component = mount(
          <Provider store={store}>
            <Selector action={entity} mode={mode} />
          </Provider>,
        );
      });
      expect(component).toMatchSnapshot();
    });
  });
  describe('Tags List component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
  });
});
