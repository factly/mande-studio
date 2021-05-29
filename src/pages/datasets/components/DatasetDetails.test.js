import React from 'react';
import { shallow } from 'enzyme';

import DatasetDetails from './DatasetDetails';

describe('DatasetDetails component', () => {
  const dataset = {
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
  };
  const dataset2 = {
    id: 2,
    title: 'title 2',
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
    is_public: 'yes',
    created_at: '2020-12-12',
  };

  it('should render the component', () => {
    const component = shallow(<DatasetDetails dataset={dataset} />);
    expect(component).toMatchSnapshot();
  });
  it('should render the component with public dataset', () => {
    const component = shallow(<DatasetDetails dataset={dataset2} />);
    expect(component).toMatchSnapshot();
  });
});
