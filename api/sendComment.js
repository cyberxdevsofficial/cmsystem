import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, comment } = req.body;

  if (!name || !comment) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Comment System <onboarding@resend.dev>',
      to: 'anuga.senithu2013official@gmail.com',
      subject: '📩 New Comment Submitted',
      html: `
        <h2 style="color:#00ffff;">New Comment Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Comment:</b></p>
        <blockquote style="border-left:3px solid #ff0080;padding-left:10px;">${comment}</blockquote>
        <hr/>
        <p style="font-size:12px;color:gray;">Sent automatically from your Vercel comment system.</p>
      `,
    });

    res.status(200).json({ message: '✅ Comment sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Failed to send comment.' });
  }
}
