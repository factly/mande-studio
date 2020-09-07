import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { Table } from 'antd';

import '../../../matchMedia.mock';
import MembershipList from './MembershipsList';
import { loadMemberships } from '../../../actions/memberships';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../../../actions/memberships', () => ({
  loadMemberships: jest.fn(),
  deleteMembership: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('Memberships List component', () => {
  let store;
  let mockedDispatch;
  const membership = {
    id: 1,
    payment_id: 1,
    plan_id: 1,
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
      useSelector.mockImplementation((state) => ({}));
      const tree = renderer.create(<MembershipList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component when loading', () => {
      useSelector.mockImplementation((state) => ({
        data: [],
        total: 0,
        plans: {},
        users: {},
      }));
      const tree = renderer.create(<MembershipList />).toJSON();
      expect(tree).toMatchSnapshot();
      expect(useSelector).toHaveBeenCalled();
    });
    it('should match component with memberships', () => {
      loadMemberships.mockReset();
      useSelector.mockImplementation((state) => ({
        data: [membership],
        total: 1,
        plans: { 1: { id: 1, plan_name: 'Plan' } },
        users: { 1: { id: 1, email: 'em@il.co' } },
      }));

      let component;
      act(() => {
        component = renderer.create(
          <Router>
            <MembershipList />
          </Router>,
        );
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      expect(useSelector).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(useSelector).toHaveReturnedWith({
        data: [membership],
        total: 1,
        plans: { 1: { id: 1, plan_name: 'Plan' } },
        users: { 1: { id: 1, email: 'em@il.co' } },
      });
      expect(loadMemberships).toHaveBeenCalledWith(1, 5);
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

      const wrapper = shallow(<MembershipList />);
      const table = wrapper.find(Table);
      table.props().pagination.onChange(2);
      wrapper.update();
      const updatedTable = wrapper.find(Table);
      expect(updatedTable.props().pagination.current).toEqual(2);
    });
  });
});
