import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import renderer, { act as rendererAct } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Button, Table } from 'antd';
import { act } from '@testing-library/react';

import '../../../matchMedia.mock';
import CartList from './CartsList';
import { loadCarts } from '../../../actions/carts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/carts', () => ({
  loadCarts: jest.fn(),
  deleteCart: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('Carts List component', () => {
  let store;
  let mockedDispatch;
  const cart = {
    id: 1,
    user_id: 1,
    status: 'status',
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
      useSelector.mockImplementationOnce((state) => ({}));
      const tree = renderer.create(<CartList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component when loading', () => {
      useSelector.mockImplementationOnce((state) => ({
        data: [],
        total: 0,
      }));
      const tree = renderer.create(<CartList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component with carts', () => {
      loadCarts.mockReset();
      useSelector.mockReset();
      useSelector.mockImplementationOnce((state) => ({
        data: [cart],
        total: 1,
      }));

      let component;
      rendererAct(() => {
        component = renderer.create(
          <Router>
            <CartList />
          </Router>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      expect(useSelector).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(useSelector).toHaveReturnedWith({
        data: [cart],
        total: 1,
      });
      expect(loadCarts).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('component testing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedDispatch = jest.fn(() => new Promise((resolve) => resolve(true)));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should change the page', () => {
      useSelector.mockReset();
      useSelector.mockImplementation(() => ({ data: [cart], total: 10 }));

      let wrapper;
      act(() => {
        wrapper = mount(
          <Router>
            <CartList />
          </Router>,
        );
      });
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2, 5);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
      wrapper.unmount();
    });
    it('should go to cart details page', () => {
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      useSelector.mockImplementationOnce((state) => ({
        data: [cart],
        total: 1,
      }));

      const wrapper = mount(
        <Router>
          <CartList />
        </Router>,
      );
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Details');
      button.simulate('click');

      expect(push).toHaveBeenCalledWith('/carts/1');
    });
    it('should not have details buttons', () => {
      useSelector.mockImplementationOnce((state) => ({ data: [], total: 0 }));

      const wrapper = mount(
        <Router>
          <CartList />
        </Router>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
