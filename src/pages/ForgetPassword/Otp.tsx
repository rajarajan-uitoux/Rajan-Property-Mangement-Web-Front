import styles from "./ForgetPassword.module.css";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { useVerifyOtpMutation } from "../../services/Login";
import { setVerifyUser } from "../../app/slices/loginSlice";

const Otp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mutation] = useVerifyOtpMutation();

  const { registeredEmail } = useSelector((state:RootState) => state.userReducer);

  const handleSubmit = (values:any) => {
    mutation({
      email: registeredEmail,
      type: "ADMIN",
      otp: values.otp,
    }).then((res:any) => {
      if (res?.data?.success) {
        dispatch(setVerifyUser(res?.data));
        navigate("/resetPassword");
      }
    });
  };

  useEffect(() => {
    if (!registeredEmail || registeredEmail === "") {
      navigate("/forgot-password");
    }
  });

  return (
    <div >
      <div className={styles.forgettitle}>Forgot Password ?</div>
      <div className={styles.otpdetails}>
        We have sent an OTP to your registered email ID{" "}
        <div className={styles.registeredEmail}>{registeredEmail}</div>
      </div>
      <Form
        layout="vertical"
        className={styles.forgetform}
        name="normal_login"
        onFinish={handleSubmit}
      >
        <Form.Item 
          label="OTP" 
          name="otp"
          rules={[
            {
              required: true,
              message: "Please Enter OTP!",
            },
          ]}
        >
          <Input
            placeholder="Enter OTP"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={`${styles.send_button} bg-color-green`}
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Otp;
