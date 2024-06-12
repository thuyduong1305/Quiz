import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { authen } from "../../actions/authen";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    deleteAllCookies();
    dispatch(authen(false));
    navigate("/login");
  }

  return (
    <>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )
}

export default Logout;