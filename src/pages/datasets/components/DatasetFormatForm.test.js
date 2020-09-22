import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { Button } from 'antd';
import { act } from '@testing-library/react';

import '../../../matchMedia.mock';
import DatasetFormatForm from './DatasetFormatForm';
import { loadFormats } from '../../../actions/formats';
import Uploader from '../../../components/Uploader';

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
}));

jest.mock('../../../actions/formats', () => ({
  loadFormats: jest.fn(),
}));

describe('DatasetFormatForm component', () => {
  let store;
  let mockedDispatch;

  store = mockStore({
    datasets: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
    formats: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
  });
  store.dispatch = jest.fn(() => ({}));
  mockedDispatch = jest.fn(() => Promise.resolve({}));
  useDispatch.mockReturnValue(mockedDispatch);
  describe('snapshot testing', () => {
    it('should render the component', () => {
      const component = shallow(<DatasetFormatForm />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    const datasetFormat = {
      id: 1,
      url: 'url',
      format: { name: 'format' },
      created_at: '2020-12-12',
    };
    const props = {
      datasetFormats: [datasetFormat],
      datasetId: 1,
      onSubmit: jest.fn(),
    };
    props.onSubmit.mockReturnValue(Promise.resolve());
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should render the component successfully', () => {
      useSelector.mockReturnValue({});
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <DatasetFormatForm {...props} />
          </Provider>,
        );
      });
      expect(loadFormats).toHaveBeenCalledWith();
    });
    it('should call onFinish with format', (done) => {
      useSelector.mockReturnValue([{ id: 1, name: 'pdf' }]);
      act(() => {
        wrapper = shallow(
          <Provider store={store}>
            <DatasetFormatForm {...props} />
          </Provider>,
        );
      });
      wrapper
        .find(DatasetFormatForm)
        .dive()
        .find(Uploader)
        .props()
        .onUploadSuccess([{ uploadURL: 'uploadURL', extension: 'pdf' }]);
      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledWith({ url: 'uploadURL', format_id: 1 });
        done();
      }, 0);
    });
    it('should call onFinish without format', (done) => {
      useSelector.mockReturnValue([{ id: 1, name: 'pdf' }]);
      act(() => {
        wrapper = shallow(
          <Provider store={store}>
            <DatasetFormatForm {...props} />
          </Provider>,
        );
      });
      wrapper
        .find(DatasetFormatForm)
        .dive()
        .find(Uploader)
        .props()
        .onUploadSuccess({ 0: { uploadURL: 'uploadURL', extension: 'csv' } });
      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledWith({ url: 'uploadURL' });
        done();
      }, 0);
    });
    it('should call change url', (done) => {
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = shallow(
          <Provider store={store}>
            <DatasetFormatForm {...props} />
          </Provider>,
        );
      });
      const button = wrapper.find(DatasetFormatForm).dive().find(Button);
      button.props().onClick();
      setTimeout(() => {
        expect(push).toHaveBeenCalledWith('/datasets');
        done();
      }, 0);
    });
  });
});
