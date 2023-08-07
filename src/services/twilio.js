import twilio from 'twilio';

const accountSid = 'AC3b9a32e49b8cfb4e34366d5437cac3ee';
const authToken = 'a12b10aedd46a986066493548e731520';
const client = twilio(accountSid, authToken);

export const sendMessage = async number => {
  try {
    const message = await client.messages.create({
      body: `Hola anashe: https://www.sony.com/electronics/support/res/manuals/4124/41241131M.pdf`,
      from: 'whatsapp:+12192718104',
      to: `whatsapp:+${number}`
    });
    console.log('Mensaje enviado:', message.sid);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
};


// sendMessage('5491167967990')