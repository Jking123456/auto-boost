import { createClient } from '@supabase/supabase-js';

// Environment variables must be set in Vercel settings
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    const text = message?.text || "New interaction!";

    // 📢 Push notification to the website via Realtime Broadcast
    await supabase.channel('telegram-notifications').send({
      type: 'broadcast',
      event: 'new-notif',
      payload: { 
        message: text, 
        sender: message?.from?.first_name || "User" // Changed 'from' to 'sender'
      },
    });

    return res.status(200).json({ ok: true });
  }
  res.status(405).send('Method Not Allowed');
}
