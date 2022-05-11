const sendmail = async (to, body) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "pallishree.testdev@gmail.com",
      pass: "p_cloudhub",
    },
  });

  var mailOption = {
    from: "pallishree.testdev@gmail.com",
    to: to,
    subject: "Verify Email",
    html: body,
  };

  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent to" + info.response);
    }
  });
};

module.exports = sendmail;
