export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, company, email, phone, address, request } = req.body;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer re_6fr9iGua_ALuYdpMcYZu54mPF1aJ8YKUV` // ТВОЙ КЛЮЧ ТУТ
            },
            body: JSON.stringify({
                from: 'Kuat Solutions <onboarding@resend.dev>', 
                to: 'tw3azz@gmail.com',
                subject: `New Quote Request: ${firstName} ${lastName}`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.5;">
                        <h2>New Quote Request Details</h2>
                        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                        <p><strong>Company:</strong> ${company}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Address:</strong> ${address}</p>
                        <hr>
                        <p><strong>Request:</strong></p>
                        <p>${request}</p>
                    </div>
                `
            })
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            const err = await response.json();
            return res.status(500).json({ error: err.message });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}