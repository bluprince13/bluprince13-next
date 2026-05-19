import { Feed } from 'feed'

const AUTHOR = 'Vipin Ajayakumar'
const EMAIL = 'vipinajayakumar@icloud.com'

interface Article {
    title: string
    href: string
    description: string
    dateFormatted: string
    banner: string
}

const getFeed = ({ articles }: { articles: Article[] }) => {
    const siteRoot = process.env.SITE_ROOT!
    const feed = new Feed({
        title: 'bluprince13',
        description: 'This is my personal feed!',
        id: siteRoot,
        link: siteRoot,
        language: 'en',
        image: '',
        favicon: `${siteRoot}/favicon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}, ${AUTHOR}`,
        feedLinks: {
            json: `${siteRoot}/feed.json`,
            rss: `${siteRoot}/feed.xml`,
            atom: `${siteRoot}/atom.xml`
        },
        author: {
            name: AUTHOR,
            email: EMAIL,
            link: siteRoot
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
                    link: siteRoot
                }
            ],
            date: new Date(article.dateFormatted),
            image: siteRoot + article.banner
        })
    })

    return feed
}

export const getRssFeed = ({ articles }: { articles: Article[] }) =>
    getFeed({ articles }).rss2()

export const getAtomFeed = ({ articles }: { articles: Article[] }) =>
    getFeed({ articles }).atom1()

export const getJsonFeed = ({ articles }: { articles: Article[] }) =>
    getFeed({ articles }).json1()
