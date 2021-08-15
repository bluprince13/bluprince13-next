// https://vercel.com/support/articles/how-to-enable-cors

import fetch from 'isomorphic-unfetch'

const allowCors = (fn) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    // eslint-disable-next-line consistent-return, no-return-await
    return await fn(req, res)
}

const handler = async (req, res) => {
    const { url } = req.query

    try {
        const response = await fetch(url).then((x) => x.json())
        return res
            .status(200)
            .json(response)
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message || error.toString() })
    }
}

module.exports = allowCors(handler)
