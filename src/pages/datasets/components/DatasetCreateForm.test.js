import React from 'react';
import { useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { act } from '@testing-library/react';
import { Steps } from 'antd';

import '../../../matchMedia.mock';
import DatasetCreateForm from './DatasetCreateForm';
import DatasetForm from './DatasetForm';
import DatasetFormatForm from './DatasetFormatForm';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

const dataset = { id: 1, title: 'title' };
const datasetFormat = {
  id: 1,
  url: 'url',
  format: { name: 'format' },
  created_at: '2020-12-12',
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('DatasetCreateForm', () => {
  const props = {
    dataset: dataset,
    datasetFormats: [datasetFormat],
    onSubmitDataset: jest.fn(),
    onSubmitDatasetFormat: jest.fn(),
  };

  const store = mockStore({});
  store.dispatch = jest.fn();
  useDispatch.mockReturnValue(jest.fn());

  describe('snapshot testing', () => {
    let wrapper;
    afterEach(() => {
      act(() => {
        wrapper.unmount();
      });
    });
    it('should render the component', () => {
      act(() => {
        wrapper = shallow(<DatasetCreateForm />);
      });

      expect(wrapper).toMatchSnapshot();
    });
    it('should match component in all steps', () => {
      act(() => {
        wrapper = shallow(<DatasetCreateForm {...props} />);
      });

      expect(wrapper).toMatchSnapshot();
      act(() => {
        wrapper.find(DatasetForm).props().next();
      });
      expect(wrapper.find(Steps).props().current).toEqual(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      act(() => {
        wrapper = shallow(<DatasetCreateForm {...props} />);
      });
    });
    afterEach(() => {
      act(() => {
        wrapper.unmount();
      });
    });
    it('should render the component with proper props', () => {
      const datasetFormProps = wrapper.find(DatasetForm).props();
      expect(datasetFormProps.data).toEqual(dataset);
      act(() => {
        wrapper.find(DatasetForm).props().next();
      });
      wrapper.update();
      const datasetFormatFormProps = wrapper.find(DatasetFormatForm).props();
      expect(datasetFormatFormProps.datasetFormats).toEqual([datasetFormat]);
      expect(datasetFormatFormProps.datasetId).toEqual(1);
    });
    it('should call setDatasetId', () => {
      wrapper.find(DatasetForm).props().setDatasetId(2);
      act(() => {
        wrapper.find(DatasetForm).props().next();
      });
      wrapper.update();
      expect(wrapper.find(DatasetFormatForm).props().datasetId).toEqual(2);
    });
    it('should call onSubmitDataset', () => {
      wrapper.find(DatasetForm).props().onSubmit({ test: 'test' });
      expect(props.onSubmitDataset).toHaveBeenCalledWith({ test: 'test' });
    });
    it('should call onSubmitDatasetFormat', () => {
      act(() => {
        wrapper.find(DatasetForm).props().next();
      });
      wrapper.update();
      wrapper.find(DatasetFormatForm).props().onSubmit({ test: 'test' });
      expect(props.onSubmitDatasetFormat).toHaveBeenCalledWith(1, { test: 'test' });
    });
    it('should handle next and prev buttons', () => {
      act(() => {
        wrapper.find(DatasetForm).props().next();
      });
      wrapper.update();
      expect(wrapper.find(Steps).props().current).toEqual(1);

      act(() => {
        wrapper.find(DatasetFormatForm).props().prev();
      });
      wrapper.update();
      expect(wrapper.find(Steps).props().current).toEqual(0);
    });
  });
});
