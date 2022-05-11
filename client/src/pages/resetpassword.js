import { useState } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  let navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const fullWidth = true;
  const maxWidth = "md";

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      toast.error("Please Enter your Otp");
    } else {
      localStorage.setItem("code", JSON.stringify(code));
      navigate("/newpassword");
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
                  Enter OTP sent to <br />
                  Your email
                </h2>
                <form>
                  <div class="pl4s">
                    <p>Enter Your OTP</p>
                    <input
                      type="text"
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                  <br />
                  <div class="pl4s">
                    <button onClick={handleSubmit} class="submitBtn">
                      Next{" "}
                    </button>
                  </div>
                </form>
                <br />
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

export default ResetPassword;
