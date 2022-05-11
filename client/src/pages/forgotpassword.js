import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../actions/user";

const ForgotPassword = () => {
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

  const userVerify = useSelector((state) => state.userLogin);
  const { user } = userVerify;

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
    } else {
      dispatch(forgotPassword(email));
      localStorage.setItem("forgotPassEmail", JSON.stringify(email));
      navigate("/resetpassword");
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
                  Enter your Email to <br />
                  send password reset code
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
                    <button onClick={handleSubmit} class="submitBtn">
                      Submit{" "}
                    </button>
                  </div>
                </form>
                <br />
                <Link to="/forgotpassword" className="hov_green">
                  Forgot Password
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

export default ForgotPassword;
