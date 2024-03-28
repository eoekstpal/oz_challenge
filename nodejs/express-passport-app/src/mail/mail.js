const mailer = require('nodemailer');
const goodbye = require('./goodbye_template');
const welcome = require('./welcome_template');

const getEmailData = (to, name, template) => {
  let data = null;

  switch (template) {
    case "welcome":
      data = {
        from: '',
        to,
        subject: `hello ${name}`,
        html: welcome()
      }
      break;

      case "goodbye":
        data = {
          from: '',
          to,
          subject: `bye ${name}`,
          html: goodbye()
        }
        break;

      default:
        data;
  }
  return data;
}

const sendMail = (to, name, type) => {
  const transporter = mailer.createTransporter({
    service: 'Gamail',
    auth: {
      user: 'eoekstpal@naver.com',
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mail = getEmailData(to, name, type);

  transporter.sendEmail(mail, (error, response) => {
    if (error) {
  console.log(error);
    } else {
      console.log('email sent successfully');
    }
    transporter.close();
  })
}

module.exports = sendMail;