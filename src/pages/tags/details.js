import React from "react";
import {
  useParams
} from "react-router-dom";

const TagDetail = () => {
  const { id } = useParams()
  return <h1>Tag Details {id}</h1>;
};

export default TagDetail;
