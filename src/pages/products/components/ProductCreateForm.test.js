import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';

import '../../../matchMedia.mock';
import ProductCreateForm from './ProductCreateForm';

const data = {
  title: 'title',
  slug: 'slug',
  price: 100,
  status: 'status',
  tag_ids: [1],
  currency_id: 1,
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

describe('Products Create Form component', () => {
  store = mockStore({
    currencies: {
      loading: false,
      ids: [],
      req: [],
      items: {},
      total: 0,
    },
    tags: {
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
            <ProductCreateForm />
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
            <ProductCreateForm data={data} />
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
            <ProductCreateForm onSubmit={onSubmit} data={data} />
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
            <ProductCreateForm {...props} />
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
            <ProductCreateForm onSubmit={props.onSubmit} />
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
          slug: 'slug',
          currency_id: 1,
          price: 100,
          tag_ids: [1],
          status: 'status',
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
          .simulate('change', { target: { value: 'new title' } });
        wrapper
          .find('FormItem')
          .at(1)
          .find('Input')
          .simulate('change', { target: { value: 'new slug' } });
        wrapper
          .find('FormItem')
          .at(2)
          .find('Select')
          .at(0)
          .props()
          .onChange({ target: { value: 1 } });
        wrapper
          .find('FormItem')
          .at(3)
          .find('Input')
          .at(0)
          .props()
          .onChange({ target: { value: 100 } });
        wrapper
          .find('FormItem')
          .at(4)
          .find('Select')
          .at(0)
          .props()
          .onChange({ target: { value: [1] } });
        wrapper
          .find('FormItem')
          .at(5)
          .find('Select')
          .at(0)
          .props()
          .onChange({ target: { value: 'Show' } });

        const submitButtom = wrapper.find('Button').at(0);
        submitButtom.simulate('submit');
      });

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          title: 'new title',
          slug: 'new slug',
          currency_id: 1,
          price: 100,
          tag_ids: [1],
          status: 'Show',
        });
        done();
      }, 0);
    });
  });
});
