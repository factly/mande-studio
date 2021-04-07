import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';

import '../../../matchMedia.mock';
import MediaUpload from './MediaUpload';
import * as actions from '../../../actions/media';
import Uploader from '../../../components/Uploader';

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
jest.mock('../../../actions/media', () => ({
  createMedium: jest.fn(),
}));

describe('Media upload component', () => {
  let store;
  let mockedDispatch;
  store = mockStore({});
  store.dispatch = jest.fn(() => ({}));
  mockedDispatch = jest.fn(() => Promise.resolve({}));
  useDispatch.mockReturnValue(mockedDispatch);

  describe('snapshot testing', () => {
    it('should render the component', () => {
      const component = shallow(<MediaUpload />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    afterEach(() => {
      wrapper.unmount();
    });
    it('should call createMedium', (done) => {
      actions.createMedium.mockReset();
      const push = jest.fn();
      useHistory.mockReturnValueOnce({ push });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <MediaUpload />
          </Provider>,
        );
      });
      wrapper.find('Button').simulate('click');
      wrapper
        .find('Uploader')
        .props()
        .onUploadSuccess([
          {
            meta: {
              caption: 'caption',
              description: 'description',
              name: 'name',
              type: 'jpeg',
            },
            uploadURL: 'url',
            size: 100,
          },
        ]);
      setTimeout(() => {
        expect(actions.createMedium).toHaveBeenCalledWith({
          caption: 'caption',
          description: 'description',
          name: 'name',
          type: 'jpeg',
          slug: 'caption',
          title: 'caption',
          alt_text: 'caption',
          url: 'url',
          dimensions: '100x100',
          file_size: 100,
        });
        done();
      }, 0);
    });
  });
});
