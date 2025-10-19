import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: 'Comment System <onboarding@resend.dev>',
      to: 'anuga.senithu2013official@gmail.com',
      subject: '📩 New Comment Submitted',
      html: `
        <h2>New Comment Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Comment:</b></p>
        <blockquote>${comment}</blockquote>
      `,
    });

    // Log for debugging
    console.log('Resend API Response:', result);

    res.status(200).json({ message: '✅ Comment sent successfully!' });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ message: '❌ Failed to send comment.', error: error.message });
  }
}
