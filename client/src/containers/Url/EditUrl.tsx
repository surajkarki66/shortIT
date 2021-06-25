import { Form } from "antd";
import React, { useContext, useState } from "react";
import { Redirect, useParams } from "react-router";

import Axios from "../../axios-url";
import { AuthContext } from "../../context/AuthContext";
import EditUrlForm from "../../components/Forms/EditUrlForm";

const EditUrl = () => {
  const params = useParams<{ urlId: string }>();
  const { urlId } = params;
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  const [form] = Form.useForm();
  const { token, csrfToken } = useContext(AuthContext);

  const onClickSubmitBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editUrl(title, urlId, token);
  };
  const editUrl = (title: string, urlId: string, token: string) => {
    setLoading(true);

    Axios.defaults.headers.patch["X-CSRF-Token"] = csrfToken;
    Axios.patch(
      `/api/url/updateUrl/${urlId}`,
      { title },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        setLoading(false);
        setEditError("");
        setEditSuccess(true);
      })
      .catch((err) => {
        const { data } = err.response;
        setLoading(false);
        setEditError(data.data.error);
        setEditSuccess(false);
      });
  };
  if (editSuccess) {
    return <Redirect to="/" />;
  }
  return (
    <div className="editUrl">
      <h1>Edit Url</h1>
      <EditUrlForm
        loading={loading}
        editError={editError}
        title={title}
        setTitle={setTitle}
        form={form}
        onClickSubmitBtn={onClickSubmitBtn}
      />
    </div>
  );
};

export default EditUrl;
