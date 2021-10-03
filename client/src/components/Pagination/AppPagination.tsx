import React from "react";
import { Pagination } from "antd";

type PropsType = {
  noOfPages: number;
  page: number;
  totalItems: number;
  itemsPerPage: number;
  handleChange: (page: number, pageSize?: number | undefined) => void;
};
const AppPagination: React.FC<PropsType> = (props) => {
  const { handleChange, page, totalItems, itemsPerPage } = props;
  return (
    <div>
      <Pagination
        current={page}
        pageSize={itemsPerPage}
        defaultCurrent={1}
        total={totalItems}
        onChange={handleChange}
        responsive
      />
    </div>
  );
};

export default AppPagination;
