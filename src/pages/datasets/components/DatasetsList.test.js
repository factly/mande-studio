import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import renderer, { act as rendererAct } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
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
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
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
      store = mockStore({});
      store.dispatch = jest.fn();
      mockedDispatch = jest.fn();
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      useSelector.mockImplementation((state) => ({}));
      const tree = renderer.create(<DatasetList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component with no data', () => {
      useSelector.mockImplementation((state) => ({}));
      const tree = renderer.create(<DatasetList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component with datasets', () => {
      useSelector.mockImplementation((state) => ({
        data: [dataset],
        total: 1,
      }));

      let component;
      rendererAct(() => {
        component = renderer.create(
          <Router>
            <DatasetList />
          </Router>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      expect(useSelector).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(useSelector).toHaveReturnedWith({
        data: [dataset],
        total: 1,
      });
      expect(loadDatasets).toHaveBeenCalledWith(1, 4);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should have empty', () => {
      useSelector.mockImplementation((state) => ({}));
      let wrapper;
      act(() => {
        wrapper = mount(
          <Router>
            <DatasetList />
          </Router>,
        );
      });
      const list = wrapper.find(List);
      expect(list.length).toEqual(0);
    });
    it('should change the page', () => {
      useSelector.mockImplementation((state) => ({
        data: [dataset],
        total: 1,
      }));

      let wrapper;
      act(() => {
        wrapper = mount(
          <Router>
            <DatasetList />
          </Router>,
        );
      });
      const list = wrapper.find(List);
      list.props().pagination.onChange(2);
      wrapper.update();
      const updatedList = wrapper.find(List);
      expect(updatedList.props().pagination.current).toEqual(2);
    });
    it('should edit dataset', () => {
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });

      useSelector.mockImplementation((state) => ({
        data: [dataset],
        total: 1,
      }));

      let wrapper;
      act(() => {
        wrapper = mount(
          <Router>
            <DatasetList />
          </Router>,
        );
      });
      const card = wrapper.find(Card).at(0);
      const button = card.find('li').at(0).find('span').at(1);
      button.simulate('click');
      expect(push).toHaveBeenCalledWith('/datasets/1/edit');
    });
    it('should delete dataset', () => {
      useSelector.mockImplementation((state) => ({
        data: [dataset],
        total: 1,
      }));

      let wrapper;
      act(() => {
        wrapper = mount(
          <Router>
            <DatasetList />
          </Router>,
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
      expect(loadDatasets).toHaveBeenCalledWith(1, 4);
    });
    it('should have no delete and edit buttons', () => {
      useSelector.mockImplementation((state) => ({}));

      let wrapper;
      act(() => {
        wrapper = mount(
          <Router>
            <DatasetList />
          </Router>,
        );
      });

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
