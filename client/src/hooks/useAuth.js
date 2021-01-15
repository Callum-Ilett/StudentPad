import { useHistory } from "react-router-dom";
import { useStateValue } from "../redux/state-provider";
import AuthAPI from "../services/Auth";

export default function useAuth() {
  const [, dispatch] = useStateValue();
  const history = useHistory();

  const CheckAuthenticated = async () => {
    const response = await AuthAPI.CheckAuthenticated();

    if (response.status === 200) {
      dispatch({ type: "SET_IS_AUTHENTICATED", status: true });
      dispatch({ type: "SET_USER", userInfo: response.data.user });
    }
  };

  const RegisterWithEmailAndPassword = async (data) => {
    const { name, email, password } = data;
    const response = await AuthAPI.RegisterUser({
      fullName: name,
      email,
      password,
    });
    response.status === 201 && LoginWithEmailAndPassword(email, password);
  };

  const LoginWithEmailAndPassword = async (email, password) => {
    const response = await AuthAPI.Login(email, password);

    if (response.status === 200) {
      dispatch({ type: "SET_IS_AUTHENTICATED", status: true });
      dispatch({ type: "SET_USER", userInfo: response.data.user });
      history.push("/dashboard");
    }
  };

  return {
    CheckAuthenticated,
    RegisterWithEmailAndPassword,
    LoginWithEmailAndPassword,
  };
}
