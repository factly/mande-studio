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
      ids: [1],
      req: [],
      items: {
        1: {
          id: 1,
          url: 'url',
          format: { id: 1, name: 'format' },
        },
      },
      total: 0,
    },
    formats: {
      loading: false,
      ids: [1],
      req: [],
      items: {
        1: {
          id: 1,
          name: 'format',
        },
      },
      total: 0,
    },
  });
  store.dispatch = jest.fn(() => ({}));
  mockedDispatch = jest.fn(() => Promise.resolve({}));
  useDispatch.mockReturnValue(mockedDispatch);
  describe('snapshot testing', () => {
    it('should render the component', () => {
      const component = shallow(
        <Provider store={store}>
          <DatasetFormatForm />
        </Provider>,
      );
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
    beforeEach(() => {
      store = mockStore({
        datasets: {
          loading: false,
          ids: [1],
          req: [],
          items: {
            1: {
              id: 1,
              url: 'url',
              format: { id: 1, name: 'pdf' },
            },
          },
          total: 0,
        },
        formats: {
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
              name: 'pdf',
            },
            2: {
              id: 2,
              name: 'format',
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
    it('should render the component successfully', () => {
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
      store = mockStore({
        datasets: {
          loading: false,
          ids: [1],
          req: [],
          items: {
            1: {
              id: 1,
              url: 'url',
              format: { id: 1, name: 'pdf' },
            },
          },
          total: 0,
        },
        formats: {
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
              name: 'pdf',
            },
            2: {
              id: 2,
              name: 'format',
            },
          },
          total: 2,
        },
      });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <DatasetFormatForm {...props} />
          </Provider>,
        );
      });
      wrapper
        .find(DatasetFormatForm)
        .find(Uploader)
        .props()
        .onUploadSuccess([{ uploadURL: 'uploadURL', extension: 'pdf' }]);
      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledWith({ url: 'uploadURL', format_id: 1 });
        done();
      }, 0);
    });
    it('should call onFinish without format', (done) => {
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <DatasetFormatForm {...props} />
          </Provider>,
        );
      });
      wrapper
        .find(DatasetFormatForm)
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
        wrapper = mount(
          <Provider store={store}>
            <DatasetFormatForm {...props} />
          </Provider>,
        );
      });
      const button = wrapper.find(DatasetFormatForm).find(Button).at(1);
      expect(button.text()).toBe('Done');

      button.props().onClick();
      setTimeout(() => {
        expect(push).toHaveBeenCalledWith('/datasets');
        done();
      }, 0);
    });
    it('should handle with sample url', () => {
      store = mockStore({
        datasets: {
          loading: false,
          ids: [1],
          req: [],
          items: {
            1: {
              id: 1,
              url: 'url',
              sample_url: 'sample_url',
              format: { id: 1, name: 'pdf' },
            },
          },
          total: 0,
        },
        formats: {
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
              name: 'pdf',
            },
            2: {
              id: 2,
              name: 'format',
            },
          },
          total: 2,
        },
      });
      const datasetFormat = {
        id: 1,
        url: 'sample_url',
        format: { name: 'format' },
        created_at: '2020-12-12',
      };
      const props = {
        datasetFormats: [datasetFormat],
        datasetId: 1,
        onSubmit: jest.fn(),
      };
      props.onSubmit.mockReturnValue(Promise.resolve());
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <DatasetFormatForm {...props} />
          </Provider>,
        );
      });
      expect(loadFormats).toHaveBeenCalledWith();
    });
  });
});
