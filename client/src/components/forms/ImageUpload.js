import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

let url = "http://localhost:8000/api";


const FileUpload = ({ values, setValues, setLoading }) => {
  const userVerify = useSelector((state) => state.userLogin);
  const { token } = userVerify;

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${url}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    Authorization: token ? token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues(res.data);
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    axios
      .post(
        `${url}/removeimage`,
        { public_id },
        {
          headers: {
            Authorization: token ? token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const  images  = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues(filteredImages);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {/* <div className="row">
        {values &&
          values.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div> */}
      <div className="row">
        <label className="btn btn-primary">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;