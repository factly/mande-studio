import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { DatePicker } from 'antd';
import moment from 'moment';

import '../../../matchMedia.mock';
import CatalogCreateForm from './CatalogCreateForm';

const data = {
  title: 'title',
  description: 'description',
  products: [1],
  product_ids: [1],
  published_date: moment(new Date('2020-12-12')),
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let onSubmit, store;

describe('Catalogs Create Form component', () => {
  store = mockStore({
    catalogs: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
    products: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
  });
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockImplementation((state) => ({ details: [], total: 0, loading: false }));

  describe('snapshot testing', () => {
    beforeEach(() => {
      onSubmit = jest.fn();
      onSubmit.mockImplementationOnce(
        (values) => new Promise((resolve, reject) => resolve(values)),
      );
    });
    it('should render the component', () => {
      let tree;
      act(() => {
        tree = mount(
          <Provider store={store}>
            <CatalogCreateForm />
          </Provider>,
        );
      });
      expect(tree).toMatchSnapshot();
      tree.unmount();
    });
    it('should match component in all steps', () => {
      let tree;
      act(() => {
        tree = mount(
          <Provider store={store}>
            <CatalogCreateForm data={data} />
          </Provider>,
        );
      });
      expect(tree).toMatchSnapshot();
      tree.unmount();
    });
    it('should match component with data', () => {
      let tree;
      act(() => {
        tree = mount(
          <Provider store={store}>
            <CatalogCreateForm onSubmit={onSubmit} data={data} />
          </Provider>,
        );
      });
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper, props;
    beforeEach(() => {
      props = {
        onSubmit: jest.fn(),
        data: data,
      };
      props.onSubmit.mockResolvedValueOnce({});
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CatalogCreateForm {...props} />
          </Provider>,
        );
      });
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should not submit form with empty data', (done) => {
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CatalogCreateForm onSubmit={props.onSubmit} />
          </Provider>,
        );
      });

      act(() => {
        const submitButtom = wrapper.find('Button').at(0);
        submitButtom.simulate('submit');
      });
      wrapper.update();

      setTimeout(() => {
        expect(props.onSubmit).not.toHaveBeenCalled();
        done();
      }, 0);
    });
    it('should submit form with given data', (done) => {
      act(() => {
        const submitButtom = wrapper.find('Button').at(0);
        submitButtom.simulate('submit');
        wrapper.update();
      });

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          title: 'title',
          description: 'description',
          product_ids: [1],
          published_date: moment(new Date('2020-12-12')).format('YYYY-MM-DDTHH:mm:ssZ'),
        });
        done();
      }, 0);
    });
    it('should submit form with new name', (done) => {
      act(() => {
        const input = wrapper.find('FormItem').at(0).find('Input');
        input.simulate('change', { target: { value: 'new name' } });

        const submitButtom = wrapper.find('Button').at(0);
        submitButtom.simulate('submit');
      });

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          title: 'new name',
          description: 'description',
          product_ids: [1],
          published_date: moment(new Date('2020-12-12')).format('YYYY-MM-DDTHH:mm:ssZ'),
        });
        done();
      }, 0);
    });
    it('should submit form with updated data', (done) => {
      act(() => {
        wrapper
          .find('FormItem')
          .at(0)
          .find('Input')
          .simulate('change', { target: { value: 'new name' } });
        wrapper
          .find('FormItem')
          .at(1)
          .find('TextArea')
          .at(0)
          .simulate('change', { target: { value: 'new description' } });
        wrapper
          .find('FormItem')
          .at(2)
          .find('Select')
          .at(0)
          .props()
          .onChange({ target: { value: [2] } });
        wrapper
          .find('FormItem')
          .at(3)
          .find(DatePicker)
          .at(0)
          .props()
          .onChange({ target: { value: moment.utc(new Date('2020-01-01')) } });

        const submitButtom = wrapper.find('Button').at(0);
        submitButtom.simulate('submit');
      });

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          title: 'new name',
          description: 'new description',
          product_ids: [2],
          published_date: moment.utc(new Date('2020-01-01')).format('YYYY-MM-DDTHH:mm:ssZ'),
        });
        done();
      }, 0);
    });
  });
});
