import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout } from "../actions/user";

function Header() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userVerify = useSelector((state) => state.userLogin);
  const { user } = userVerify;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <section class="top-section">
        <div class="row">
          <div class="col-sm-3">
            <div class="logo-wp">
              <div class="lo_go mt-2">{/* Agrochemicals */}</div>
              <div class="sec_loc">
                <a href="/" className="loca  ml-2">
                  Agrochemicals
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="ser_prod">
              <form class="example" action="">
                <input
                  type="text"
                  placeholder="Search for products"
                  name="search"
                />
                <button type="submit">
                  <img src="img/searchicon.png" alt="" />
                </button>
              </form>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="right_top">
              <div class="login"></div>
              <div class="my-account">
                {user ? (
                  <div class="dropdown">
                    <button
                      type="button"
                      class="dropdown-toggle"
                      aria-controls="fade-menu"
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      My Account
                    </button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      style={{ marginTop: "40px" }}
                    >
                      <div class="dropdown-item yhh">
                        <img src="img/icon1.png" alt="" />
                        <Link to="/myprofile"> {user && `${user.name}`.toUpperCase()} </Link>
                      </div>
                
                      <MenuItem onClick={handleClose}>
                        <a class="dropdown-item" href="/order">
                          <img src="img/icon2.png" alt="" /> My Order
                        </a>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <a class="dropdown-item" href="/myaddress">
                          <img src="img/icon3.png" alt="" /> My Address
                        </a>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <a class="dropdown-item" href="/mywallet">
                          <img src="img/icon4.png" alt="" /> My Wishlist
                        </a>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <a
                          class="dropdown-item"
                          onClick={logoutHandler}
                          href="/"
                        >
                          <img src="img/icon6.png" alt="" /> Logout
                        </a>
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <div class="log_in">
                    <Link to="/login" className="log">
                      {" "}
                      LogIn / SignUp{" "}
                    </Link>
                  </div>
                )}
                <div class="my_crt">
                  <p>
                    <img src="../img/icon7.png" alt="" />{" "}
                    <span>
                      {" "}
                      <Link to="/cart" className="cart">
                        My Cart
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
