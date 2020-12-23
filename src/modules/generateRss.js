import fs from 'fs'
import { Feed } from 'feed'
import mkdirp from 'mkdirp'

const SITE_ROOT = 'https://www.bluprince13.com'
const AUTHOR = 'Vipin Ajayakumar'
const EMAIL = 'vipinajayakumar@icloud.com'

const getFeed = ({ articles }) => {
    const feed = new Feed({
        title: 'bluprince13',
        description: 'This is my personal feed!',
        id: SITE_ROOT,
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

const handleError = (err) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.error('Problem generating RSS')
        throw err
    }
}

export default async ({ articles }) => {
    const feed = getFeed({ articles })
    const rss = feed.rss2()
    const atom = feed.atom1()
    const json = feed.json1()

    await mkdirp('dist')

    fs.writeFileSync('public/feed.xml', rss, 'utf8', handleError)
    fs.writeFileSync('dist/feed.xml', rss, 'utf8', handleError)

    fs.writeFileSync('public/atom.xml', atom, 'utf8', handleError)
    fs.writeFileSync('dist/atom.xml', rss, 'utf8', handleError)

    fs.writeFileSync('public/feed.json', json, 'utf8', handleError)
    fs.writeFileSync('dist/feed.json', json, 'utf8', handleError)
}
