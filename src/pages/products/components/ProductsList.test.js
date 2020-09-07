import React from 'react';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Popconfirm, Button, List, Card } from 'antd';

import '../../../matchMedia.mock';
import ProductList from './ProductsList';
import { loadProducts, deleteProduct } from '../../../actions/products';

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
jest.mock('../../../actions/products', () => ({
  loadProducts: jest.fn(),
  deleteProduct: jest.fn(),
}));

describe('Products List component', () => {
  let store;
  let mockedDispatch;
  const product = {
    id: 1,
    title: 'title',
    slug: 'slug',
    price: 100,
    status: 'status',
    tags: [1],
    currency_id: 1,
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
      const tree = renderer.create(<ProductList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component when loading', () => {
      useSelector.mockImplementation((state) => ({
        data: [],
        currencies: {},
        tags: {},
        total: 0,
      }));
      const tree = renderer.create(<ProductList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component with products', () => {
      useSelector.mockImplementation((state) => ({
        data: [product],
        total: 1,
        currencies: { 1: { id: 1, iso_code: 'INR' } },
        tags: { 1: { id: 1, title: 'tag1' } },
      }));

      let component;
      act(() => {
        component = renderer.create(
          <Router>
            <ProductList />
          </Router>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      expect(useSelector).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(useSelector).toHaveReturnedWith({
        data: [product],
        total: 1,
        currencies: { 1: { id: 1, iso_code: 'INR' } },
        tags: { 1: { id: 1, title: 'tag1' } },
      });
      expect(loadProducts).toHaveBeenCalledWith(1, 5);
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

      const wrapper = shallow(<ProductList />);
      const list = wrapper.find(List);
      list.props().pagination.onChange(2);
      wrapper.update();
      const updatedList = wrapper.find(List);
      expect(updatedList.props().pagination.current).toEqual(2);
    });
    it('should edit product', () => {
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });

      useSelector.mockImplementation((state) => ({
        data: [product],
        total: 1,
        currencies: { 1: { id: 1, iso_code: 'INR' } },
        tags: { 1: { id: 1, title: 'tag1' } },
      }));

      const wrapper = mount(
        <Router>
          <ProductList />
        </Router>,
      );
      const card = wrapper.find(Card).at(0);
      const button = card.find('li').at(0).find('span').at(1);
      button.simulate('click');
      expect(push).toHaveBeenCalledWith('/products/1/edit');
    });
    it('should delete product', () => {
      useSelector.mockImplementation((state) => ({
        data: [product],
        total: 1,
        currencies: { 1: { id: 1, iso_code: 'INR' } },
        tags: { 1: { id: 1, title: 'tag1' } },
      }));

      const wrapper = mount(
        <Router>
          <ProductList />
        </Router>,
      );
      const card = wrapper.find(Card).at(0);
      const button = card.find('li').at(1).find('span').at(1);

      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(deleteProduct).toHaveBeenCalled();
      expect(deleteProduct).toHaveBeenCalledWith(1);
      expect(loadProducts).toHaveBeenCalledWith(1, 5);
    });
    it('should have no delete and edit buttons', () => {
      useSelector.mockImplementation((state) => ({}));

      const wrapper = mount(
        <Router>
          <ProductList />
        </Router>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
