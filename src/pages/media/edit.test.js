import React from 'react';
import { Router, useHistory } from 'react-router-dom';
import { useDispatch, Provider, useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import { Form } from 'antd';

import '../../matchMedia.mock';
import EditMedia from './edit';
import * as actions from '../../actions/media';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

jest.mock('../../actions/media', () => ({
  getMedium: jest.fn(),
  updateMedium: jest.fn(),
}));

describe('Media Edit component', () => {
  let store;
  let mockedDispatch;

  describe('snapshot testing', () => {
    beforeEach(() => {
      store = mockStore({
        media: {
          ids: [1],
          req: [
            {
              ids: [1],
              page: 1,
              limit: 5,
            },
          ],
          items: {
            1: {
              id: 1,
              name: 'name',
              url: 'some-url',
              file_size: 'file_size',
              caption: 'caption',
              description: 'description',
            },
          },
          loading: false,
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn();
      useDispatch.mockReturnValue(mockedDispatch);
    });
    it('should render the component', () => {
      const tree = mount(
        <Provider store={store}>
          <EditMedia />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
    it('should match when loading', () => {
      store = mockStore({
        media: {
          req: [],
          items: {},
          ids: [],
          loading: true,
        },
      });
      const tree = mount(
        <Provider store={store}>
          <EditMedia />
        </Provider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      store = mockStore({
        media: {
          ids: [1],
          req: [
            {
              ids: [1],
              page: 1,
              limit: 5,
            },
          ],
          items: {
            1: {
              id: 1,
              name: 'name',
              url: 'some-url',
              file_size: 'file_size',
              caption: 'caption',
              description: 'description',
            },
          },
          loading: false,
        },
      });
      store.dispatch = jest.fn(() => ({}));
      mockedDispatch = jest.fn(() => Promise.resolve({}));
      useDispatch.mockReturnValue(mockedDispatch);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call get action', () => {
      actions.getMedium.mockReset();
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <EditMedia />
          </Provider>,
        );
      });
      expect(actions.getMedium).toHaveBeenCalledWith('1');
    });
    it('should call updateMedia', (done) => {
      actions.updateMedium.mockReset();
      const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <Router history={historyMock}>
              <EditMedia />
            </Router>
          </Provider>,
        );
      });
      act(() => {
        wrapper
          .find('FormItem')
          .at(4)
          .find('Input')
          .simulate('change', { target: { value: 'caption ' } });
        const submitButton = wrapper.find('Button').at(0);
        expect(submitButton.text()).toBe('Submit');
        submitButton.simulate('submit');
      });
      wrapper.update();
      wrapper.find(Form).props().onFinish({ test: 'test' });
      setTimeout(() => {
        expect(actions.updateMedium).toHaveBeenCalledWith('1', {
          id: 1,
          name: 'name',
          url: 'some-url',
          file_size: 'file_size',
          caption: 'caption',
          description: 'description',
          test: 'test',
        });
        expect(historyMock.push).toHaveBeenCalledWith('/media');
        done();
      }, 0);
    });
  });
});
