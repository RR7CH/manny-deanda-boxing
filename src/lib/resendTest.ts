import { Resend } from 'resend';

// Replace 're_xxxxxxxxx' with your real Resend API key
const resend = new Resend('re_QeKc4sNg_JgZHDgomgohVbbazXAUnvoeb');

export async function sendTestEmail() {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'jekenrichgoree@gmail.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
  });

  if (error) {
    console.error('Resend error:', error);
    return { success: false, error };
  }

  console.log('Email sent:', data);
  return { success: true, data };
}
