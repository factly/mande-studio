import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Popconfirm, Button, Table } from 'antd';

import '../../../matchMedia.mock';
import DatasetFormatList from './DatasetFormatsList';
import { deleteDatasetFormat } from '../../../actions/datasets';

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
  deleteDatasetFormat: jest.fn(),
}));

describe('DatasetFormatsList component', () => {
  let store;
  let mockedDispatch;
  const datasetFormat = {
    id: 1,
    url: 'url',
    format: { name: 'format' },
    created_at: '2020-12-12',
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
      const tree = renderer.create(<DatasetFormatList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component when loading', () => {
      useSelector.mockImplementation((state) => ({
        datasetFormats: [],
        loading: true,
      }));
      const tree = renderer.create(<DatasetFormatList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component with datasetFormats', () => {
      useSelector.mockImplementation((state) => ({
        datasetFormats: [datasetFormat],
        loading: false,
      }));

      let component;
      act(() => {
        component = renderer.create(
          <Router>
            <DatasetFormatList />
          </Router>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match component with showOperations = flase', () => {
      useSelector.mockImplementation((state) => ({
        datasetFormats: [datasetFormat],
        loading: false,
      }));

      let component;
      act(() => {
        component = renderer.create(
          <Router>
            <DatasetFormatList showOperations={false} />
          </Router>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', () => {
      useSelector.mockImplementation((state) => ({}));

      const wrapper = shallow(<DatasetFormatList datasetId={1} />);
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
    it('should delete datasetFormat', () => {
      useSelector.mockImplementation((state) => ({
        datasetFormats: [datasetFormat],
        loading: false,
      }));

      const wrapper = mount(
        <Router>
          <DatasetFormatList datasetId={1} />
        </Router>,
      );
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Delete');

      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(deleteDatasetFormat).toHaveBeenCalled();
      expect(deleteDatasetFormat).toHaveBeenCalledWith(1, 1);
    });
    it('should handle delete failure', () => {
      deleteDatasetFormat.mockReset();
      deleteDatasetFormat.mockImplementationOnce(() =>
        Promise.resolve(new Error('Delete Failure')),
      );
      const wrapper = mount(
        <Router>
          <DatasetFormatList datasetId={1} />
        </Router>,
      );
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Delete');
      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');

      expect(deleteDatasetFormat).toHaveBeenCalled();
      expect(deleteDatasetFormat).toHaveBeenCalledWith(1, 1);
    });
    it('should have no delete buttons', () => {
      useSelector.mockImplementation((state) => ({}));

      const wrapper = mount(
        <Router>
          <DatasetFormatList datasetId={1} />
        </Router>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
    it('should have no operations', () => {
      useSelector.mockImplementation((state) => ({
        datasetFormats: [datasetFormat],
        loading: false,
      }));
      const wrapper = mount(
        <Router>
          <DatasetFormatList datasetId={1} showOperations={false} />
        </Router>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
    it('should handle with switch for set datasetSampleId', () => {
      useSelector.mockImplementation((state) => ({
        datasetFormats: [datasetFormat],
        loading: false,
      }));
      const wrapper = mount(
        <Router>
          <DatasetFormatList
            datasetId={1}
            showOperations={true}
            datasetSampleId={1}
            setDatasetSampleId={jest.fn()}
          />
        </Router>,
      );
      const sampleSwitch = wrapper.find('Switch').at(0);
      sampleSwitch.props().onChange(true);
      wrapper.update();
      expect(sampleSwitch.props().checked).toBe(true);
    });
  });
});
