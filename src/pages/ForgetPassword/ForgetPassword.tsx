import { message } from "antd";

import styles from "./ForgetPassword.module.css";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetOtpMutation } from "../../services/Login";
import { useDispatch } from "react-redux";
import { setRegisteredEmail } from "../../app/slices/loginSlice";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ getOtp ] = useGetOtpMutation();

  const handleFormSubmit = (values:any) => {
    dispatch(setRegisteredEmail(values.email));

    getOtp({
      ...values,
      type: "ADMIN",
    }).then((res:any) => {
      if (res?.data.success) {
        message.success("OTP Sent Successfully");
        navigate("/forgot");
      } else {
        message.info("Please enter registered email address")
      }
    });
  };

  return (
    <div>
      <div className={styles.forgettitle}>Forgot Password ?</div>
      <div className={styles.details}>
        Please enter your registered email. We’ll email an OTP to reset your
        password.
     </div>

      <Form
        layout="vertical"
        className={styles.forgetform}
        name="normal_login"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          label="Email ID"
          name="email"
          rules={[
            {
              required: true,
              message: "Please Enter your Registered Email ID!",
            },
          ]}
        >
          <Input placeholder="Enter Registered Email ID" className={styles.input} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.send_button}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
