export interface AppData {
    title: string
    href: string
    image: string
    blurb: string
    created: string
    source?: string
}

const data: AppData[] = [
    {
        title: 'Renting vs. buying a house',
        href: '/apps/renting-vs-buying',
        image: '/apps/renting-vs-buying.png',
        blurb:
            'I had a major argument with one of my friends. He believed that it was stupid of me not to buy a house and waste my money renting. I built renting vs. buying a house to both put that hypothesis to test and to learn more about React. It was my first significant web app and took several weekends of effort, on and off.',
        created: '2018-10-12',
        source: 'https://github.com/bluprince13/renting_vs_buying'
    },
    {
        title: 'ssh-key-manager',
        href: 'https://github.com/bluprince13/ssh-key-manager',
        image:
            'https://github.com/bluprince13/ssh-key-manager/raw/assets/demo.gif',
        blurb:
            'I wanted to make a desktop app using Electron and React and see how difficult it would be. I made a ssh key manager, which to be fair, doesn\'t have much practical use. However, I found this very easy to make.',
        created: '2019-05-04',
        source: 'https://github.com/bluprince13/ssh-key-manager'
    },
    {
        title: 'Is it worth it?',
        href: '/apps/is-it-worth-it',
        image: '/apps/is-it-worth-it.png',
        blurb:
            'See what a purchase — one-off or recurring — costs you, measured in time, wealth and retirement.',
        created: '2026-09-29',
        source: 'https://github.com/bluprince13/is-it-worth-it'
    }
]

export default data
