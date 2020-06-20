import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

import { createDataset, createDatasetFormat } from '../../actions/datasets';
import { loadFormats } from '../../actions/formats';

import DatasetForm from './components/DatasetForm';
import DatasetFormatForm from './components/DatasetFormatForm';

const { Step } = Steps;

const DatasetCreate = (props) => {
  const { formats, loadFormats, createDataset, createDatasetFormat } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [datasetId, setDatasetId] = useState(null);

  React.useEffect(() => {
    loadFormats();
  }, []);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onCreateDatasetFormat = (url) => {
    const data = { url };

    const fileFormat = url.split('.').pop();
    const index = formats
      .map((format) => format.name.toLowerCase())
      .indexOf(fileFormat.toLowerCase());

    data.format_id = formats[index].id;
    console.log(data);
    return createDatasetFormat(datasetId, data);
  };

  const steps = [
    {
      title: 'Create Dataset',
      content: <DatasetForm onSubmit={createDataset} setDatasetId={setDatasetId} next={next} />,
    },
    {
      title: 'Add Formats',
      content: <DatasetFormatForm onSubmit={onCreateDatasetFormat} prev={prev} />,
    },
  ];

  return (
    <>
      <Steps current={currentStep} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <br />
      {steps[currentStep].content}
    </>
  );
};

DatasetCreate.propTypes = {
  createDataset: PropTypes.func.isRequired,
};

const mapStateToProps = ({ formats }) => ({
  formats: Object.values(formats.items),
});

const mapDispatchToProps = (dispatch) => ({
  createDataset: (values) => dispatch(createDataset(values)),
  createDatasetFormat: (datasetId, values) => dispatch(createDatasetFormat(datasetId, values)),
  loadFormats: () => dispatch(loadFormats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetCreate);
