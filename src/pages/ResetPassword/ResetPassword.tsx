import { useEffect } from "react";
import styles from "./ResetPassword.module.css";
import { Button, Form, Input, message } from "antd";

import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/Login";
import { useSelector, useDispatch } from "react-redux";
import { setVerifyUser } from "../../app/slices/loginSlice";
import { RootState } from "../../app/store";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resetPassword] = useResetPasswordMutation();

  const { verifyUser } = useSelector((state:RootState) => state.userReducer);

  const handleFormSubmit = (values:any) => {
    resetPassword({
      ...values,
      userId: verifyUser.userId,
    }).then(res => {
      message.success("Password Updated Successfully");
      form.resetFields();
      dispatch(setVerifyUser({verifyUser : null}));
    });
  };

  useEffect(() => {
    if (verifyUser.userId == undefined) {
      navigate("/login");
    }
  }, [verifyUser]);
  return (
    <div className={styles.resetContainer}>
      <div className={styles.reset_form_title}>Create New Password</div>

      <Form
        layout="vertical"
        className={styles.resetform}
        name="reset_password"
        onFinish={handleFormSubmit}
        form={form}
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please Enter your Password!",
            },
          ]}
        >
          <Input.Password
            className="passwordinput"
            placeholder="New Password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please Enter your Confirm Password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Please, make sure your passwords match."
                );
              },
            }),
          ]}
          dependencies={["password"]}
        >
          <Input.Password
            className="passwordinput"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={`${styles.change_button} bg-color-green`}
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ResetPassword;
