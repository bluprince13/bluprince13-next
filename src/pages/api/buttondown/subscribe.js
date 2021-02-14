export default async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ error: 'Email is required' })
    }

    try {
        const API_KEY = process.env.BUTTONDOWN_API_KEY
        const response = await fetch(
            `https://api.buttondown.email/v1/subscribers`,
            {
                body: JSON.stringify({ email }),
                headers: {
                    Authorization: `Token ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        if (response.status >= 400) {
            const { title } = await response.json()

            if (title === 'Member Exists') {
                return res.status(400).json({
                    error: `You're already subscribed. 🙃`
                })
            }

            return res.status(400).json({
                error: `There was a glitch in the matrix. 😭 Just send me an email at vipinajayakumar@icloud.com and I'll add you.`
            })
        }

        return res.status(201).json({ error: '' })
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message || error.toString() })
    }
}
