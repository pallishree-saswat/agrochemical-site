import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/user";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const fullWidth = true;
  const maxWidth = "md";

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const [email, setEmail] = useState("pallishreeb@thecloudriders.com");
  const [password, setPassword] = useState("123456");
  // const [loading, setLoading] = useState(false);

  const userVerify = useSelector((state) => state.userLogin);
  const { user } = userVerify;

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password is required");
    } else {
      dispatch(
        login(email, password, () => {
          let path = JSON.parse(localStorage.getItem("pathname"));

          if (path) {
            navigate(path);
            localStorage.removeItem("pathname");
          } else {
            navigate("/");
          }
        })
      );
    }
  };

  return (
    <>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open}>
        <DialogContent>
          <Box
            noValidate
            component="form"
            md={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <div class="modal-body veri_fication">
              <div class="phon_verifi1">
                <h2>
                  Enter your details to <br />
                  Register
                </h2>
                <form>
                  <div class="pl4s">
                    <p>Enter Your Email</p>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                  <br />
                  <div class="pl4s">
                    <p>Enter Your Password</p>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-key"></i>
                    </span>
                  </div>
                  <br />
                  <div class="pl4s">
                    <button onClick={handleSubmit} class="submitBtn">
                      Login{" "}
                    </button>
                  </div>
                </form>
                <br />
                <Link to="/forgotpassword" className="hov_green">
                  Forgot Password.
                </Link>{" "}
                <br />
                <Link to="/signup" className="hov_green">
                  Dont have an account? Register here
                </Link>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
