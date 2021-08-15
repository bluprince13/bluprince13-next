import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
    const { url } = req.query

    try {
        const response = await fetch(url).then(x => x.json())
        return res.status(200).json(response)
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message || error.toString() })
    }
}
