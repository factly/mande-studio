import React from 'react';
import { useHistory } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';

import '../../../matchMedia.mock';
import CurrencyCreateForm from './CurrencyCreateForm';

const data = {
  name: 'name',
  iso_code: 'iso_code',
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

describe('Currencies Create Form component', () => {
  store = mockStore({
    currencies: {
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
            <CurrencyCreateForm />
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
            <CurrencyCreateForm data={data} />
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
            <CurrencyCreateForm onSubmit={onSubmit} data={data} />
          </Provider>,
        );
      });
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper, props;
    beforeEach(() => {
      const onSubmit = jest.fn();
      onSubmit.mockResolvedValueOnce({});

      props = {
        onSubmit: onSubmit,
        data: data,
      };
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CurrencyCreateForm {...props} />
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
            <CurrencyCreateForm onSubmit={props.onSubmit} />
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
          name: 'name',
          iso_code: 'iso_code',
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
          name: 'new name',
          iso_code: 'iso_code',
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
          .find('Input')
          .simulate('change', { target: { value: 'new iso_code' } });

        const submitButtom = wrapper.find('Button').at(0);
        submitButtom.simulate('submit');
        wrapper.update();
      });

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          name: 'new name',
          iso_code: 'new iso_code',
        });
        done();
      }, 0);
    });
  });
});
