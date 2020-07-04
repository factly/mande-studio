import produce from 'immer';
import {
  ADD_DATASET,
  ADD_DATASET_FORMAT,
  REMOVE_DATASET_FORMAT,
  ADD_DATASETS,
  SET_DATASET_LOADING,
  SET_DATASET_REQUEST,
  SET_DATASET_IDS,
  RESET_DATASET,
} from '../constants/datasets';

const initialState = {
  loading: false,
  ids: [],
  req: [],
  items: {},
  total: 0,
};

const datasetsReducer = produce((draft, action = {}) => {
  switch (action.type) {
    case SET_DATASET_LOADING:
      draft.loading = action.payload.loading;
      return;
    case ADD_DATASET: {
      const { dataset } = action.payload;
      draft.items[dataset.id] = dataset;
      return;
    }
    case ADD_DATASETS: {
      const { datasets } = action.payload;
      Object.assign(draft.items, datasets);
      return;
    }
    case ADD_DATASET_FORMAT: {
      const { datasetId, datasetFormat } = action.payload;
      draft.items[datasetId].formats
        ? draft.items[datasetId].formats.push(datasetFormat)
        : (draft.items[datasetId].formats = [datasetFormat]);
      return;
    }
    case REMOVE_DATASET_FORMAT: {
      const { datasetId, datasetFormatId } = action.payload;
      const index = draft.items[datasetId].formats.findIndex(
        (format) => format.id === datasetFormatId,
      );
      draft.items[datasetId].formats.splice(index, 1);
      return;
    }
    case SET_DATASET_IDS:
      draft.ids = action.payload.ids;
      return;
    case SET_DATASET_REQUEST: {
      const { req, total } = action.payload;
      draft.req.push(req);
      draft.total = total;
      return;
    }
    case RESET_DATASET:
      return initialState;
  }
}, initialState);

export default datasetsReducer;
