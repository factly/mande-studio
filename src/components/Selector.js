import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

function Selector({ action, value = [], onChange, multiple = false, field = 'name' }) {
  const dispatch = useDispatch();

  const [query, setQuery] = React.useState({
    page: 1,
    limit: 5,
  });

  const entity = action.toLowerCase();
  const selectorType = require(`../actions/${entity}`);

  if (!multiple && value) {
    value = [value];
  }

  const onSearch = (value) => {
    if (value) {
      setQuery({ ...query, q: value });
    } else {
      setQuery({ page: query.page });
    }
  };

  const { details, total, loading } = useSelector((state) => {
    let ids = [];

    for (var pageNumber = 1; pageNumber <= query.page; pageNumber++) {
      let pageIndex = state[entity].req.findIndex((request) => request.page === pageNumber);
      if (pageIndex !== -1) {
        ids = ids.concat(state[entity].req[pageIndex].ids);
      }
    }

    const selectedValues = value
      .filter((id) => state[entity].items[id])
      .map((id) => state[entity].items[id]);
    const unselectedValues = ids
      .filter((id) => state[entity].items[id] && !value.includes(id))
      .map((id) => state[entity].items[id]);

    const details = selectedValues.concat(unselectedValues);

    return { details, total: state[entity].total, loading: state[entity].loading };
  });

  React.useEffect(() => {
    fetchEntities();
  }, [query]);

  const fetchEntities = () => {
    dispatch(selectorType['load' + action](query));
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
      onSearch={(value) => onSearch(value)}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onPopupScroll={(e) => {
        if (e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight) {
          if (details.length < total) {
            setQuery({ ...query, page: query.page + 1 });
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
