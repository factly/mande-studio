import React, { useState } from 'react';
import { Steps } from 'antd';

import DatasetForm from './DatasetForm';
import DatasetFormatForm from './DatasetFormatForm';

const { Step } = Steps;

const DatasetCreateForm = ({ dataset, datasetFormats, onSubmitDataset, onSubmitDatasetFormat }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [datasetId, setDatasetId] = useState(dataset?.id);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: 'Add Dataset Details',
      content: (
        <DatasetForm
          data={dataset}
          onSubmit={onSubmitDataset}
          setDatasetId={setDatasetId}
          next={next}
        />
      ),
    },
    {
      title: 'Add Datasets',
      content: (
        <DatasetFormatForm
          datasetFormats={datasetFormats}
          datasetId={datasetId}
          onSubmit={(data) => onSubmitDatasetFormat(datasetId, data)}
          prev={prev}
        />
      ),
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

export default DatasetCreateForm;
