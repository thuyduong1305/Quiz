import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/userServices";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { authen } from "../../actions/authen";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const response = await getUser(email, password);
    if(response.length > 0) {
      const time = 1;
      setCookie("id", response[0].id, time);
      setCookie("fullName", response[0].fullName, time);
      setCookie("email", response[0].email, time);
      setCookie("token", response[0].token, time);
      dispatch(authen(true));
      navigate("/");
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
  }

  return (
    <>
      <div className="form">
        <h3 className="inner-title">Login Quiz</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button className="button button-main">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login;