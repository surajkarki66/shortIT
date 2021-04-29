import { Button, Drawer } from "antd";
import moment from "moment";
import React from "react";

import { UserType } from "../pages/Home";
import ProfileForm from "../components/Forms/ProfileForm";

type Props = {
  user: UserType;
  status: string;
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
    editError,
    onChange,
    onFinish,
    showDrawer,
    visible,
    onClose,
    status,
  } = props;
  const { firstName, lastName, email } = user;

  return (
    <div>
      <div className="card">
        <img
          src={`http://gravatar.com/avatar/${moment().unix()}?d=identicon`}
          style={{ width: "100%" }}
          alt={firstName + " " + lastName}
        />
        <h1>{firstName + " " + lastName}</h1>
        <p className="title">{email}</p>

        <p>
          <Button
            disabled={status === "active" ? false : true}
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
        bodyStyle={{ paddingBottom: 80 }}
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
        />
      </Drawer>
    </div>
  );
};

export default ProfileCard;
