import { useState } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../actions/user";

const NewPassword = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const fullWidth = true;
  const maxWidth = "md";

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const email = JSON.parse(localStorage.getItem("forgotPassEmail"));
  const code = JSON.parse(localStorage.getItem("code"));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      dispatch(resetPassword(email, code, newPassword));
      localStorage.removeItem("forgotPassEmail");
      localStorage.removeItem("code");
      navigate("/login");
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
                  Reset Your New password <br />
                </h2>
                <form>
                  <div class="pl4s">
                    <p>Enter Your new Password</p>
                    <input
                      type="password"
                      name="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>

                  <div class="pl4s">
                    <p>Confirm Your new Password</p>
                    <input
                      type="password"
                      name="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-key"></i>
                    </span>
                  </div>

                  <div class="pl4s">
                    <button onClick={handleSubmit} class="submitBtn">
                      Reset Password{" "}
                    </button>
                  </div>
                </form>
                <Link to="/forgotpassword">Forgot Password</Link>
                <Link to="/signup">Dont have an account? Register here</Link>
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

export default NewPassword;
