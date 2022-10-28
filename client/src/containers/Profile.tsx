import { Button, Drawer, FormInstance } from "antd";
import React from "react";

import ProfileForm from "../components/Forms/ProfileForm";

type Props = {
  user: { fullName: string; email: string };
  form: FormInstance<any>;
  loading: boolean;
  editError: string;
  visible: boolean;
  showDrawer: () => void;
  onClose: () => void;
  onFinish: (values: any) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfileCard: React.FC<Props> = (props) => {
  const {
    loading,
    user,
    form,
    editError,
    onChange,
    onFinish,
    showDrawer,
    visible,
    onClose,
  } = props;
  const { fullName, email } = user;

  return (
    <div style={{ marginTop: 100 }}>
      <div className="card">
        <h1>{fullName}</h1>
        <p className="title">{email}</p>

        <p>
          <Button
            size="small"
            style={{ marginBottom: "5px" }}
            type="primary"
            onClick={showDrawer}
          >
            Edit
          </Button>
        </p>
      </div>
      <Drawer
        title="Edit Profile"
        width={250}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80, overflowX: "hidden" }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onFinish} type="primary" loading={loading}>
              {loading ? "" : "Submit"}
            </Button>
          </div>
        }
      >
        <ProfileForm
          editError={editError}
          onChangeHandler={onChange}
          onFinish={onFinish}
          form={form}
        />
      </Drawer>
    </div>
  );
};

export default ProfileCard;
