import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Popconfirm, Button, Table } from 'antd';

import '../../../matchMedia.mock';
import CurrencyList from './CurrenciesList';
import { loadCurrencies, deleteCurrency } from '../../../actions/currencies';

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
jest.mock('../../../actions/currencies', () => ({
  loadCurrencies: jest.fn(),
  deleteCurrency: jest.fn(),
}));

describe('Currencies List component', () => {
  let store;
  let mockedDispatch;
  const currency = {
    id: 1,
    name: 'name',
    iso_code: 'iso_code',
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
      const tree = renderer.create(<CurrencyList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component when loading', () => {
      useSelector.mockImplementation((state) => ({
        data: [],
        total: 0,
      }));
      const tree = renderer.create(<CurrencyList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component with currencies', () => {
      useSelector.mockImplementation((state) => ({
        data: [currency],
        total: 1,
      }));

      let component;
      act(() => {
        component = renderer.create(
          <Router>
            <CurrencyList />
          </Router>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      expect(useSelector).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(useSelector).toHaveReturnedWith({
        data: [currency],
        total: 1,
      });
      expect(loadCurrencies).toHaveBeenCalledWith(1, 5);
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

      const wrapper = shallow(<CurrencyList />);
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
    it('should edit currency', () => {
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });

      useSelector.mockImplementation((state) => ({
        data: [currency],
        total: 1,
      }));

      const wrapper = mount(
        <Router>
          <CurrencyList />
        </Router>,
      );
      const button = wrapper.find(Button).at(0);
      expect(button.text()).toEqual('Edit');
      button.simulate('click');
      expect(push).toHaveBeenCalledWith('/currencies/1/edit');
    });
    it('should delete currency', () => {
      useSelector.mockImplementation((state) => ({
        data: [currency],
        total: 1,
      }));

      const wrapper = mount(
        <Router>
          <CurrencyList />
        </Router>,
      );
      const button = wrapper.find(Button).at(1);
      expect(button.text()).toEqual('Delete');

      button.simulate('click');
      const popconfirm = wrapper.find(Popconfirm);
      popconfirm
        .findWhere((item) => item.type() === 'button' && item.text() === 'OK')
        .simulate('click');
      expect(deleteCurrency).toHaveBeenCalled();
      expect(deleteCurrency).toHaveBeenCalledWith(1);
      expect(loadCurrencies).toHaveBeenCalledWith(1, 5);
    });
    it('should have no delete and edit buttons', () => {
      useSelector.mockImplementation((state) => ({}));

      const wrapper = mount(
        <Router>
          <CurrencyList />
        </Router>,
      );

      const button = wrapper.find(Button);
      expect(button.length).toEqual(0);
    });
  });
});
