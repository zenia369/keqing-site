const Sib = require("sib-api-v3-sdk");

class Email {
  async send({ message, email }) {
    try {
      const client = Sib.ApiClient.instance;
      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.SENDBLUE_API_KEY;

      const tranEmailApi = new Sib.TransactionalEmailsApi();
      const sender = {
        email: process.env.SENDBLUE_EMAIL,
        name: "Keqing-site 😋",
      };
      const receivers = [
        {
          email: process.env.SENDBLUE_EMAIL,
        },
      ];

      await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "New message from keqing-site",
        textContent: `
            <h3>It's message from keqing-site!</h3>
            <p>Email sended from: {{params.uEmail}}</p>
            <p>Message context: {{params.uMessage}}</p>
          `,
        params: {
          uMessage: message,
          uEmail: email,
        },
      });

      return {
        st: 200,
        check: true,
      };
    } catch (error) {
      return {
        st: 500,
        check: false,
      };
    }
  }
}

const email = new Email();

module.exports = email;
