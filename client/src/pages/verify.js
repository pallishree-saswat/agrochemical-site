import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { verify } from "../actions/user";

function VerifyOtp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const fullWidth = true;
  const maxWidth = "md";

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const email = JSON.parse(localStorage.getItem("email"));
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      toast.error("Please Enter your OTP");
    } else {
      dispatch(
        verify(email, verificationCode, (success) => {
          if (success) {
            navigate("/login");
            localStorage.removeItem("email");
          } else {
            navigate("/verifyEmail");
          }
        })
      );
    }
  };

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
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
              <div class="phon_verifi">
                <h1>phone number verification</h1>
              </div>
              <div class="phon_verifi1">
                <h2>
                  Enter 6 digit code sent to your phone <br />
                  +91-123456789
                </h2>
                <form>
                  <div class="pl4s">
                    <div
                      class="digit-group tgd52d"
                      data-group-name="digits"
                      data-autosubmit="false"
                      autocomplete="off"
                    >
                      <input
                        type="text"
                        id="digit-1"
                        name="digit-1"
                        data-next="digit-2"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                    </div>
                    <div class="pl4s">
                      <button class="submitBtn" onClick={handleSubmit}>
                        {" "}
                        Submit{" "}
                      </button>
                    </div>
                  </div>
                </form>
                <p>Resend Code (in 20 sec)</p>
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
}

export default VerifyOtp;
