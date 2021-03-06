import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';

import '../../../matchMedia.mock';
import PlanCreateForm from './PlanCreateForm';

const data = {
  name: 'plan_name',
  status: 'status',
  currency_id: 'INR',
  users: 5,
  price: 1000,
  duration: 12,
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

describe('Plans Create Form component', () => {
  store = mockStore({
    plans: {
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
            <PlanCreateForm />
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
            <PlanCreateForm data={data} />
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
            <PlanCreateForm onSubmit={onSubmit} data={data} />
          </Provider>,
        );
      });
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper, props;
    beforeEach(() => {
      onSubmit = jest.fn();
      onSubmit.mockResolvedValueOnce({});

      props = {
        onSubmit: onSubmit,
        data: data,
      };
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <PlanCreateForm {...props} />
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
            <PlanCreateForm onSubmit={props.onSubmit} />
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
          name: 'plan_name',
          status: 'status',
          currency_id: 'INR',
          users: 5,
          price: 1000,
          duration: 12,
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
          .simulate('change', { target: { value: 'new plan_name' } });
        wrapper
          .find('FormItem')
          .at(6)
          .find('Input')
          .simulate('change', { target: { value: 'new status' } });

        const submitButtom = wrapper.find('Button').at(0);
        submitButtom.simulate('submit');
        wrapper.update();
      });

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          name: 'new plan_name',
          status: 'new status',
          currency_id: 'INR',
          users: 5,
          price: 1000,
          duration: 12,
        });
        done();
      }, 0);
    });
    it('should add all products on selection', (done) => {
      act(() => {
        wrapper.find('FormItem').at(7).find('Switch').at(0).props().onChange(true);
        const submitButtom = wrapper.find('Button').at(0);
        submitButtom.simulate('submit');
        wrapper.update();
      });

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          name: 'plan_name',
          all_products: true,
          catalogs: [],
          status: 'status',
          currency_id: 'INR',
          users: 5,
          price: 1000,
          duration: 12,
        });
        done();
      }, 0);
    });
  });
});
