import { Row, Col } from "antd";
import React, { useContext, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import UrlCard from "../../components/UI/Card/Url";
import { UrlType } from "../../types/Url";
import { AuthContext } from "../../context/AuthContext";
import usePagination from "../../components/Pagination/Pagination";
import AppPagination from "../../components/Pagination/AppPagination";

interface PropsType extends RouteComponentProps {
  urls: UrlType[];
  deleteConfirm: (_id: string) => void;
}

const Url: React.FC<PropsType> = (props) => {
  const { fullName } = useContext(AuthContext);
  const { urls, deleteConfirm } = props;
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const _DATA = usePagination(urls, itemsPerPage);
  const count = Math.ceil(urls.length / itemsPerPage);

  const handleChange = (page: number, pageSize: number | undefined) => {
    setPage(page);
    _DATA.jump(page);
  };

  return (
    <div>
      {urls.length !== 0 ? (
        _DATA.currentData().map((url: UrlType) => (
          <Row key={url._id}>
            <Col key={url._id} span={24}>
              <UrlCard
                key={url._id}
                url={url}
                fullName={fullName}
                deleteConfirm={deleteConfirm}
              />
            </Col>
          </Row>
        ))
      ) : (
        <p style={{ textAlign: "center", fontSize: "20px", marginTop: 200 }}>
          No Links
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        {urls.length !== 0 && (
          <AppPagination
            handleChange={handleChange}
            page={page}
            noOfPages={count}
            itemsPerPage={itemsPerPage}
            totalItems={urls.length}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(Url);
