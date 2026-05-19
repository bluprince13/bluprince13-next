import fs from 'fs'
import { Feed } from 'feed'

const { SITE_ROOT } = process.env
const AUTHOR = 'Vipin Ajayakumar'
const EMAIL = 'vipinajayakumar@icloud.com'

interface Article {
    title: string
    href: string
    description: string
    date: string
    banner: string
}

const getFeed = ({ articles }: { articles: Article[] }) => {
    const feed = new Feed({
        title: 'bluprince13',
        description: 'This is my personal feed!',
        id: SITE_ROOT!,
        link: SITE_ROOT,
        language: 'en',
        image: '',
        favicon: `${SITE_ROOT}/favicon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}, ${AUTHOR}`,
        feedLinks: {
            json: `${SITE_ROOT}/feed.json`,
            rss: `${SITE_ROOT}/feed.xml`,
            atom: `${SITE_ROOT}/atom.xml`
        },
        author: {
            name: AUTHOR,
            email: EMAIL,
            link: SITE_ROOT
        }
    })

    articles.forEach((article) => {
        feed.addItem({
            title: article.title,
            id: article.href,
            link: article.href,
            description: article.description,
            author: [
                {
                    name: AUTHOR,
                    email: EMAIL,
                    link: SITE_ROOT
                }
            ],
            date: new Date(article.date),
            image: SITE_ROOT + article.banner
        })
    })

    return feed
}

const fn = () => async ({ articles }: { articles: Article[] }) => {
    const feed = getFeed({ articles })
    const rss = feed.rss2()
    const atom = feed.atom1()
    const json = feed.json1()

    fs.writeFileSync('public/feed.xml', rss, 'utf8')
    fs.writeFileSync('public/atom.xml', atom, 'utf8')
    fs.writeFileSync('public/feed.json', json, 'utf8')
}

export default fn
