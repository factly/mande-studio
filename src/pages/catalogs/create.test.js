import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';

import '../../matchMedia.mock';
import CreateCatalog from './create';
import * as actions from '../../actions/catalogs';
import CatalogCreateForm from './components/CatalogCreateForm';

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

jest.mock('../../actions/catalogs', () => ({
  createCatalog: jest.fn(),
}));

describe('Catalogs create component', () => {
  let store;
  let mockedDispatch;

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
  store.dispatch = jest.fn(() => ({}));
  mockedDispatch = jest.fn(() => Promise.resolve({}));
  useDispatch.mockReturnValue(mockedDispatch);
  describe('snapshot testing', () => {
    it('should render the component', () => {
      const component = shallow(<CreateCatalog />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call createCatalog', (done) => {
      actions.createCatalog.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <CreateCatalog />
          </Provider>,
        );
      });
      wrapper.find(CatalogCreateForm).props().onSubmit({ test: 'test' });
      setTimeout(() => {
        expect(actions.createCatalog).toHaveBeenCalledWith({ test: 'test' });
        expect(push).toHaveBeenCalledWith('/catalogs');
        done();
      }, 0);
    });
  });
});
