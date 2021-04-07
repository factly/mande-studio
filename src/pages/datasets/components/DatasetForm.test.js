import React from 'react';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import { mount, shallow } from 'enzyme';

import '../../../matchMedia.mock';
import DatasetForm from './DatasetForm';

const data = {
  id: 1,
  title: 'title',
  contact_email: 'contact_email',
  contact_name: 'contact_name',
  data_standard: 'data_standard',
  price: 1000,
  description: 'description',
  frequency: { count: 1, units: 'units' },
  currency_id: 'INR',
  granularity: 'granularity',
  license: 'license',
  related_articles: 'related_articles',
  source: 'source',
  temporal_coverage: 'temporal_coverage',
  time_saved: 2,
  feature_media: { id: 10, media: 'media' },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let onSubmit, store;

describe('DatasetForm component', () => {
  store = mockStore({
    datasets: {
      loading: false,
      ids: [1],
      req: [
        {
          page: 1,
          limit: 5,
          ids: [1],
        },
      ],
      items: {
        1: {
          id: 1,
          title: 'title',
          contact_email: 'contact_email',
          contact_name: 'contact_name',
          data_standard: 'data_standard',
          description: 'description',
          frequency: 'frequency',
          granularity: 'granularity',
          license: 'license',
          related_articles: 'related_articles',
          source: 'source',
          temporal_coverage: 'temporal_coverage',
          time_saved: 'time_saved',
          created_at: '2020-12-12',
        },
      },
      total: 1,
    },
  });
  useDispatch.mockReturnValue(jest.fn());

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
        tree = shallow(<DatasetForm />);
      });
      expect(tree).toMatchSnapshot();
      tree.unmount();
    });
    it('should match component in all steps', () => {
      let tree;
      act(() => {
        tree = shallow(<DatasetForm data={data} />);
      });
      expect(tree).toMatchSnapshot();
      tree.unmount();
    });
    it('should match component with data', () => {
      let tree;
      act(() => {
        tree = shallow(<DatasetForm onSubmit={onSubmit} data={data} />);
      });
      expect(tree).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper, props;
    beforeEach(() => {
      store = mockStore({
        datasets: {
          loading: false,
          ids: [1],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          items: {
            1: {
              id: 1,
              title: 'title',
              contact_email: 'contact_email',
              contact_name: 'contact_name',
              data_standard: 'data_standard',
              description: 'description',
              frequency: { count: 1, units: 'units' },
              granularity: 'granularity',
              license: 'license',
              related_articles: 'related_articles',
              source: 'source',
              temporal_coverage: 'temporal_coverage',
              time_saved: 2,
              feature_media: { id: 10, media: 'media' },
            },
          },
          total: 1,
        },
        media: {
          loading: true,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
        currencies: {
          loading: false,
          ids: [1],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          items: {
            1: {
              id: 1,
              name: 'Indian Rupee',
              iso_code: 'INR',
            },
          },
        },
      });
      const onSubmit = jest.fn();
      onSubmit.mockResolvedValueOnce({});

      props = {
        onSubmit: onSubmit,
        setDatasetId: jest.fn(),
        next: jest.fn(),
        data: data,
      };
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <DatasetForm {...props} />
          </Provider>,
        );
      });
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should not submit form with empty data', (done) => {
      store = mockStore({
        datasets: {
          loading: false,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
        media: {
          loading: true,
          ids: [],
          req: [],
          items: {},
          total: 0,
        },
        currencies: {
          loading: false,
          ids: [1],
          req: [
            {
              page: 1,
              limit: 5,
              ids: [1],
            },
          ],
          items: {
            1: {
              id: 1,
              name: 'Indian Rupee',
              iso_code: 'INR',
            },
          },
        },
      });
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <DatasetForm onSubmit={props.onSubmit} />
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
        const submitButtom = wrapper.find('Button').at(1);
        expect(submitButtom.text()).toBe('Submit');
        submitButtom.simulate('submit');
      });
      wrapper.update();

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          title: 'title',
          contact_email: 'contact_email',
          contact_name: 'contact_name',
          price: 1000,
          data_standard: 'data_standard',
          description: 'description',
          frequency: '1 units',
          currency_id: 'INR',
          granularity: 'granularity',
          license: 'license',
          related_articles: 'related_articles',
          source: 'source',
          temporal_coverage: 'temporal_coverage',
          time_saved: 2,
          featured_media_id: 10,
        });
        done();
      }, 0);
    });
    it('should submit form with given data without media', (done) => {
      act(() => {
        wrapper = mount(
          <Provider store={store}>
            <DatasetForm
              onSubmit={props.onSubmit}
              data={{
                id: 1,
                title: 'title',
                contact_email: 'contact_email',
                contact_name: 'contact_name',
                price: 1000,
                data_standard: 'data_standard',
                description: 'description',
                frequency: { count: 1, units: 'units' },
                currency_id: 'INR',
                granularity: 'granularity',
                license: 'license',
                related_articles: 'related_articles',
                source: 'source',
                temporal_coverage: 'temporal_coverage',
                time_saved: 2,
              }}
            />
          </Provider>,
        );
      });

      act(() => {
        const submitButtom = wrapper.find('Button').at(1);
        submitButtom.simulate('submit');
      });
      wrapper.update();

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          title: 'title',
          contact_email: 'contact_email',
          contact_name: 'contact_name',
          price: 1000,
          data_standard: 'data_standard',
          description: 'description',
          frequency: '1 units',
          currency_id: 'INR',
          granularity: 'granularity',
          license: 'license',
          related_articles: 'related_articles',
          source: 'source',
          temporal_coverage: 'temporal_coverage',
          time_saved: 2,
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
          .simulate('change', { target: { value: 'new contact_email' } });
        wrapper
          .find('FormItem')
          .at(2)
          .find('Input')
          .simulate('change', { target: { value: 'new contact_name' } });
        wrapper
          .find('FormItem')
          .at(3)
          .find('Input')
          .simulate('change', { target: { value: 'new description' } });
        wrapper
          .find('FormItem')
          .at(4)
          .find('Input')
          .simulate('change', { target: { value: 'new data_standard' } });
        wrapper
          .find('FormItem')
          .at(8)
          .find('InputNumber')
          .at(0)
          .props()
          .onChange({ target: { value: 2 } });
        wrapper
          .find('FormItem')
          .at(9)
          .find('Select')
          .at(0)
          .props()
          .onChange({ target: { value: 'months' } });
        wrapper
          .find('FormItem')
          .at(8 + 2)
          .find('Input')
          .simulate('change', { target: { value: 'new granularity' } });
        wrapper
          .find('FormItem')
          .at(9 + 2)
          .find('Input')
          .simulate('change', { target: { value: 'new license' } });
        wrapper
          .find('FormItem')
          .at(10 + 2)
          .find('Input')
          .simulate('change', { target: { value: 'new related_articles' } });
        wrapper
          .find('FormItem')
          .at(11 + 2)
          .find('Input')
          .simulate('change', { target: { value: 'new source' } });
        wrapper
          .find('FormItem')
          .at(12 + 2)
          .find('Input')
          .simulate('change', { target: { value: 'new temporal_coverage' } });
        wrapper
          .find('FormItem')
          .at(13 + 2)
          .find('InputNumber')
          .at(0)
          .props()
          .onChange({ target: { value: 4 } });
        wrapper
          .find('FormItem')
          .at(15 + 2)
          .find('Uploader')
          .props()
          .onUploadSuccess({ id: 10, media: 'media' });

        const submitButtom = wrapper.find('Button').at(1);
        submitButtom.simulate('submit');
        wrapper.update();
      });

      setTimeout(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          title: 'new title',
          contact_email: 'new contact_email',
          contact_name: 'new contact_name',
          price: 1000,
          data_standard: 'new data_standard',
          description: 'new description',
          frequency: '2 months',
          granularity: 'new granularity',
          currency_id: 'INR',
          license: 'new license',
          related_articles: 'new related_articles',
          source: 'new source',
          temporal_coverage: 'new temporal_coverage',
          time_saved: 4,
          featured_media_id: 10,
        });
        done();
      }, 0);
    });
  });
});
