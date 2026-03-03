export async function sendEmail(
  to: string,
  subject: string,
  text: string
) {

  console.log("Sending email:");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Message:", text);

  // For now this is just a mock.
  // Later we will connect real email (Resend / SendGrid / SMTP)

  return true;

}