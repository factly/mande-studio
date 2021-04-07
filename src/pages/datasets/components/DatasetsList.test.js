import React from 'react';
import { BrowserRouter, Router, useHistory } from 'react-router-dom';
import renderer, { act as rendererAct } from 'react-test-renderer';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Popconfirm, Button, List, Card } from 'antd';
import { act } from '@testing-library/react';

import '../../../matchMedia.mock';
import DatasetList from './DatasetsList';
import { loadDatasets, deleteDataset } from '../../../actions/datasets';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../../actions/datasets', () => ({
  loadDatasets: jest.fn(),
  deleteDataset: jest.fn(),
}));

describe('DatasetsList component', () => {
  let store;
  let mockedDispatch;
  const dataset = {
    id: 1,
    title: 'title',
    featured_media: { id: 1, alt_text: 'alt_text', url: 'url' },
    contact_email: 'contact_email',
    contact_name: 'contact_name',
    license: 'license',
    source: 'source',
  };

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({
        datasets: {
          loading: false,
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
              title: 'title',
              contact_email: 'contact_email',
              contact_name: 'contact_name',
              data_standard: 'data_standard',
              description: 'description',
              frequency: 'frequency',
              granularity: 'granularity',
              license: 'license',
              related_articles: 'related_articles',
              source: 'source',
              temporal_coverage: 'temporal_coverage',
              time_saved: 'time_saved',
              created_at: '2020-12-12',
            },
            2: {
              id: 2,
              title: 'title',
              contact_email: 'contact_email',
              contact_name: 'contact_name',
              data_standard: 'data_standard',
              description: 'description',
              frequency: 'frequency',
              granularity: 'granularity',
              license: 'license',
              related_articles: 'related_articles',
              source: 'source',
              temporal_coverage: 'temporal_coverage',
              time_saved: 'time_saved',
              created_at: '2020-12-12',
            },
          },
          total: 2,
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn(() => Promise.resolve({}));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <BrowserRouter>
              <DatasetList />
            </BrowserRouter>
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with no data', () => {
      store = mockStore({
        datasets: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
      const tree = renderer
        .create(
          <Provider store={store}>
            <DatasetList />
          </Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with datasets', () => {
      let component;
      rendererAct(() => {
        component = renderer.create(
          <Provider store={store}>
            <BrowserRouter>
              <DatasetList />
            </BrowserRouter>
          </Provider>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(loadDatasets).toHaveBeenCalledWith(1, 10);
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        datasets: {
          loading: false,
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
              title: 'title',
              contact_email: 'contact_email',
              contact_name: 'contact_name',
              data_standard: 'data_standard',
              description: 'description',
              frequency: 'frequency',
              granularity: 'granularity',
              license: 'license',
              related_articles: 'related_articles',
              source: 'source',
              temporal_coverage: 'temporal_coverage',
              time_saved: 'time_saved',
              created_at: '2020-12-12',
            },
            2: {
              id: 2,
              title: 'title',
              contact_email: 'contact_email',
              contact_name: 'contact_name',
              data_standard: 'data_standard',
              description: 'description',
              frequency: 'frequency',
              granularity: 'granularity',
              license: 'license',
              related_articles: 'related_articles',
              source: 'source',
              temporal_coverage: 'temporal_coverage',
              time_saved: 'time_saved',
              created_at: '2020-12-12',
            },
          },
          total: 2,
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn(() => Promise.resolve({}));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have empty', () => {
      store = mockStore({
        datasets: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
      });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <BrowserRouter>
              <DatasetList />
            </BrowserRouter>
          </Provider>,
        );
      });
      const list = wrapper.find(List.Item);
      expect(list.length).toEqual(0);
    });
    it('should change the page', () => {
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <BrowserRouter>
              <DatasetList />
            </BrowserRouter>
          </Provider>,
        );
      });
      const list = wrapper.find(List);
      list.props().pagination.onChange(2);
      wrapper.update();
      const updatedList = wrapper.find(List);
      expect(updatedList.props().pagination.current).toEqual(2);
    });
    it('should edit dataset', () => {
      const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
      };
      wrapper = mount(
        <Provider store={store}>
          <Router history={historyMock}>
            <DatasetList />
          </Router>
          ,
        </Provider>,
      );

      const card = wrapper.find(Card).at(0);
      const button = card.find('li').at(0).find('span').at(1);
      button.simulate('click');
      expect(historyMock.push).toHaveBeenCalledWith('/datasets/1/edit');
    });
    it('should delete dataset', () => {
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <BrowserRouter>
              <DatasetList />
            </BrowserRouter>
          </Provider>,
        );
      });
      const card = wrapper.find(Card).at(0);
      const button = card.find('li').at(1).find('span').at(1);
      button.simulate('click');

      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(deleteDataset).toHaveBeenCalled();
      expect(deleteDataset).toHaveBeenCalledWith(1);
      expect(loadDatasets).toHaveBeenCalledWith(1, 10);
    });
    it('should have no delete and edit buttons', () => {
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <BrowserRouter>
              <DatasetList />
            </BrowserRouter>
          </Provider>,
        );
      });

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
