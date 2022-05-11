import { useState } from "react";

import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../actions/user";

const Signup = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const fullWidth = true;
  const maxWidth = "md";

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const [name, setName] = useState("pallishree");
  const [email, setEmail] = useState("pallishreeb@thecloudriders.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [phoneNumber, setPhoneNumber] = useState("8144128737");
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name || !phoneNumber || !password) {
      toast.error("Please fill the required fields");
    } else if (password !== confirmPassword) {
      toast.error("Password does not match.");
    } else {
      dispatch(
        register(name, email, phoneNumber, password, () => {
          let useremail = JSON.parse(localStorage.getItem("email"));

          if (useremail) {
            navigate("/verifyEmail");
            // localStorage.removeItem("pathname");
          } else {
            navigate("/signup");
          }
        })
      );
    }
  };

  return (
    <>
      {/* <Button onClick={handleClickOpen}>Signup</Button> */}
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open}>
        {/* <DialogTitle>Optional sizes</DialogTitle> */}
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
                    <p>Enter Your Name</p>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                  <br />
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
                    <p>Enter Your Phone number</p>
                    <input
                      type="tel"
                      name="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-phone"></i>+91-
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
                    <p>Confirm Password</p>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span>
                      <i class="fa fa-key"></i>
                    </span>
                  </div>
                  <br />
                  <div class="pl4s">
                    <button onClick={handleSubmit} class="submitBtn">
                      {" "}
                      Register{" "}
                    </button>
                  </div>
                </form>
                <br />
                <Link to="/login" className="hov_green">
                  {" "}
                  Already have an account? Login
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

export default Signup;
