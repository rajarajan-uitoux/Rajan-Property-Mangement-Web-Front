import { Button, Checkbox, Input, Form, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useLoginMutation } from "../../services/Login";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/slices/loginSlice";

const Login = () => {
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (value:any) => {
    // console.log("login crendentials", value);
    await loginMutation(value).then(({data}:any) => {      
      localStorage.setItem(
        "token",
        JSON.stringify({
          access: {
            token: data?.access.token,
            expiresIn: data?.access.expiresIn,
          },
          refresh: {
            token: data?.refresh.token,
            expiresIn: data?.refresh.expiresIn,
          },
        })
      );
      message.success({
        content: `Welcome ${data?.firstName}!`,
      });
      dispatch(setCredentials({
       token: data?.access?.token,
       user: {
        firstName: data?.firstName,
          roleName: data?.roleName,
          image: data?.image,
          phoneNumber: data?.phoneNumber,
          emailID: data?.emailID,
       }
      }));
      navigate("/");
    });
  };
  return (
    <div className={styles.logincontainer}>
      <div className={styles.welcome}>Welcome Back</div>
      <div className={styles.continuetext}>Continue where you left off</div>
      <div className={styles.logintitle}>Login</div>
      <Form
        layout="vertical"
        className={styles.loginform}
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={handleFormSubmit}
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please Enter your Username!",
            },
          ]}
        >
          <Input placeholder="username" className={styles.input} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Oops! Password is incorrect",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="password"
            className="passwordinput"
          />
        </Form.Item>
        <Form.Item>
          <div className={styles.form_remember_text}>
            <Form.Item
              valuePropName="checked"
              noStyle
            >
              <Checkbox className="login_remember_checkbox">
                Remember me
              </Checkbox>
            </Form.Item>

            <NavLink to={"/forgot-password"} className="color-green">Forgot password </NavLink>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={`${styles.login_form_button} bg-color-green`}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
