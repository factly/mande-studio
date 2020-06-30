import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

function Selector({ action, value = [], onChange, multiple = false, field = 'name' }) {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const entity = action.toLowerCase();
  const selectorType = require(`../actions/${entity}`);

  if (!multiple && value) {
    value = [value];
  }

  const { details, total, loading } = useSelector((state) => {
    let ids = [];

    for (var pageNumber = 1; pageNumber <= page; pageNumber++) {
      let pageIndex = state[entity].req.findIndex((request) => request.page === pageNumber);
      if (pageIndex !== -1) {
        ids = ids.concat(state[entity].req[pageIndex].ids);
      }
    }

    const selectedValues = value.map((id) => state[entity].items[id]);
    const unselectedValues = ids
      .filter((id) => state[entity].items[id] && !value.includes(id))
      .map((id) => state[entity].items[id]);

    const details = selectedValues.concat(unselectedValues);

    return { details, total: state[entity].total, loading: state[entity].loading };
  });

  React.useEffect(() => {
    fetchEntities();
  }, [page]);

  const fetchEntities = () => {
    dispatch(selectorType['load' + action](page, 5));
  };

  return (
    <Select
      bordered
      listHeight={128}
      loading={loading}
      mode={multiple && 'multiple'}
      defaultValue={value}
      placeholder={`Add ${entity}`}
      onChange={(values) => onChange(values)}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onPopupScroll={(e) => {
        if (e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight) {
          if (details.length < total) {
            setPage(page + 1);
          }
        }
      }}
    >
      {details.map((item) => (
        <Select.Option value={item.id} key={item.id}>
          {item[field]}
        </Select.Option>
      ))}
    </Select>
  );
}

export default Selector;
