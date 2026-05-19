export interface AppData {
    id: number
    title: string
    href: string
    image: string
    blurb: string
}

const data: AppData[] = [
    {
        id: 1,
        title: 'Renting vs. buying a house',
        href: '/apps/renting-vs-buying',
        image: '/apps/renting-vs-buying.png',
        blurb:
            'I had a major argument with one of my friends. He believed that it was stupid of me not to buy a house and waste my money renting. I build renting vs. buying a house to both put that hypothesis to test and to learn more about React. It was my first significant web app and took several weekends of effort, on and off.'
    },
    {
        id: 2,
        title: 'ssh-key-manager',
        href: 'https://github.com/bluprince13/ssh-key-manager',
        image:
            'https://github.com/bluprince13/ssh-key-manager/raw/assets/demo.gif',
        blurb:
            'I wanted to make a desktop app using Electron and React and see how difficult it would be. I made a ssh key manager, which to be fair, doesn\'t have much practical use. However, I found this very easy to make.'
    },
    {
        id: 4,
        title: 'Coding interview prep',
        href: '/apps/coding-interview-prep',
        image: '/apps//coding-interview-prep.jpg',
        blurb:
            'This is a collection of coding challenges that I have solved, in preparation for coding interviews.'
    }
]

export default data
