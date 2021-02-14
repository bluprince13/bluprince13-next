export default async (_, res) => {
    try {
        const LIST_ID = process.env.MAILCHIMP_LIST_ID
        const API_KEY = process.env.MAILCHIMP_API_KEY
        const DATACENTER = API_KEY.split('-')[1]

        const response = await fetch(
            `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}?fields=stats.member_count`,
            {
                headers: {
                    Authorization: `apikey ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        const data = await response.json()
        const count = data.stats.member_count

        return res.status(200).json({ count })
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message || error.toString() })
    }
}
