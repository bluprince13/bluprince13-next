export const MAC = 'Mac'
export const IPHONE = 'iPhone'
export const IPAD = 'iPad'
export const CHROME_EXTENSION = 'Chrome Extension'
export const WEB = 'Web app'

export const PLATFORMS = [MAC, IPHONE, IPAD, CHROME_EXTENSION, WEB]

export default [
    {
        appName: '1Password',
        use: 'Password manager',
        href: 'https://1password.com/',
        image: 'uses/1password.png',
        description: `
If you only try one of the apps I recommend, I hope that it is this one. The idea is simple: you only have to remember one master password which in turn gives you access to all of your passwords, credit card info, secure notes etc. The beauty of 1Password is how well it integrates with all your devices and browsers. Filling in passwords is such a breeze.

Highlights:
- Autofill passwords with just Face or Touch ID.
- Autofill [2FA OTPs](https://support.1password.com/one-time-passwords/) after you enter your password.
- [Generate passwords](https://support.1password.com/generate-website-password/) to keep your data secure.
- Very secure and [impossible to hack](https://blog.1password.com/what-if-1password-gets-hacked/). To hack my account, you'd need to know my password, my secret key and my [2FA OTP](https://support.1password.com/two-factor-authentication/).
        `,
        platforms: [MAC, IPHONE, IPAD, CHROME_EXTENSION],
        recommended: true
    },
    {
        appName: 'Authy',
        use: '2FA',
        href: 'https://authy.com/',
        image: 'uses/authy.png',
        description: `I use Authy to store the 2FA for 1Password and a few other apps that integrate with the Authy API.`,
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Alfred',
        use: 'Launcher',
        href: 'https://www.alfredapp.com/',
        image: 'uses/alfred.png',
        description: `
I don't think I'd enjoy using my Mac half as much without Alfred. It's a more powerful replacement for [Spotlight]().

Highlights:
- Launch applications and find files on your Mac.
- [Clipboard history](https://www.alfredapp.com/help/features/clipboard/).
- [Snippets](https://www.alfredapp.com/help/features/snippets/) - I don't use this feature as I use [TextExpander](https://textexpander.com/) instead.
- Go to [browser bookmarks](https://www.alfredapp.com/help/features/bookmarks/).
- Look up [contacts](https://www.alfredapp.com/help/features/contacts/).
        `,
        platforms: [MAC],
        recommended: true
    },
    {
        appName: 'FireShot',
        use: 'Screenshot',
        href: 'https://chrome.google.com/webstore/detail/take-webpage-screenshots/mcbpblocgmgfnpjjppndjkmgjaogfceg?hl=en',
        image: 'uses/fireshot.png',
        description: `
This is a fantastic Chrome extension for taking full page screenshots. I use it almost daily at work.
        `,
        platforms: [WEB],
        recommended: true
    },
    {
        appName: 'CleanShot',
        use: 'Screenshot',
        href: 'https://cleanshot.com/',
        image: 'uses/cleanshot.jpeg',
        description: `
A powerful screenshot tool for Mac. When you take screenshots, it floats on your screen and allows you take further actions like copying, saving, and annotating.

Highlights:
- [Annotate](https://cleanshot.com/features#annotate) screenshots.
- [Screen recording](https://cleanshot.com/features#recording)
        `,
        platforms: [MAC]
    },
    {
        appName: 'Bartender',
        use: 'Menu bar organiser',
        href: 'https://www.macbartender.com/',
        image: 'uses/bartender.png',
        description: `Lets you control the Mac menu bar. I like to have less than five apps visible on my menu bar.`,
        platforms: [MAC],
        recommended: true
    },
    {
        appName: 'Grammarly',
        use: 'Grammar checker',
        href: 'https://app.grammarly.com/',
        image: 'uses/grammarly.png',
        description: `I run all my blog articles, CV and other documents through this.`,
        platforms: [MAC, IPHONE, IPAD, CHROME_EXTENSION, WEB]
    },
    {
        appName: 'Fantastical',
        use: 'Calendar',
        href: 'https://flexibits.com/fantastical',
        image: 'uses/fantastical.png',
        description: `I mostly use Fantastical for the really nice UI rather than any specific feature.`,
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Todoist',
        use: 'Manage todos',
        href: 'https://todoist.com/r/vipin_ajayakumar_esxzap',
        image: 'uses/todoist.png',
        description: `
It's not perfect, but it's the best tool I've come across so far for managing todos. I used to use [Things](https://culturedcode.com/), but prefer Todoist for the key features listed below.

Highlights:
- [Set priority levels](https://todoist.com/help/articles/introduction-to-priorities) for your tasks - p1 to p4.
- [Shared projects](https://todoist.com/help/articles/sharing-projects-and-collaborating) - My partner and I find this useful to keep track of shared projects and assign tasks to each other.
- [Filters](https://todoist.com/help/articles/introduction-to-filters) - I use filters to quickly see tasks that need triaging, and important tasks that I should focus on this week.
        `,
        platforms: [MAC, IPHONE, IPAD],
        recommended: true
    },
    {
        appName: 'Magnet',
        use: 'Window manager',
        href: 'https://magnet.crowdcafe.com/',
        image: 'uses/magnet.jpeg',
        description: `Snap windows into organised tiles. Fairly basic feature. I don't understand why Apple didn't implement it themselves.`,
        platforms: [MAC],
        recommended: true
    },
    {
        appName: 'Notion',
        use: 'Collaboration',
        href: 'https://www.notion.so/',
        image: 'uses/notion.png',
        description: `
My go-to tool for collaborating with family or friends on documents.

Highlights:
- [Databases](https://www.notion.so/help/intro-to-databases) are the best part of Notion.
`,
        platforms: [MAC, IPHONE, IPAD, WEB],
        recommended: true
    },
    {
        appName: 'Obsidian',
        use: 'Note taker',
        href: 'https://obsidian.md/',
        image: 'uses/obsidian.png',
        description: `
I use this for personal note taking as I prefer to write using [Markdown](https://www.wikiwand.com/en/Markdown).
`,
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Reeder',
        use: 'RSS reader',
        href: 'https://reederapp.com/',
        image: 'uses/reeder.png',
        description: `See my article: [Why and how to use RSS for consuming knowledge](https://bluprince13.com/blog/why-and-how-to-use-rss-for-consuming-knowledge)`,
        platforms: [MAC]
    },
    {
        appName: 'Unread',
        use: 'RSS reader',
        href: 'https://www.goldenhillsoftware.com/unread/',
        image: 'uses/unread.jpeg',
        description: `See my article: [Why and how to use RSS for consuming knowledge](https://bluprince13.com/blog/why-and-how-to-use-rss-for-consuming-knowledge)`,
        platforms: [IPHONE, IPAD],
        recommended: true
    },
    {
        appName: 'Inoreader',
        use: 'RSS subscriptions manager',
        href: 'https://www.inoreader.com/',
        image: 'uses/inoreader.png',
        description: `See my article: [Why and how to use RSS for consuming knowledge](https://bluprince13.com/blog/why-and-how-to-use-rss-for-consuming-knowledge)`,
        platforms: [CHROME_EXTENSION, WEB]
    },
    {
        appName: 'Raindrop.io',
        use: 'Bookmarks',
        href: 'https://raindrop.io/',
        image: 'uses/raindrop.png',
        platforms: [IPHONE, IPAD, CHROME_EXTENSION]
    },
    {
        appName: 'Letterboxd',
        use: 'Movie ratings',
        href: 'https://letterboxd.com/',
        image: 'uses/letterboxd.png',
        description: `See [my profile](https://letterboxd.com/vipinajayakumar/).`,
        platforms: [IPHONE, IPAD, WEB]
    },
    {
        appName: 'Goodreads',
        use: 'Book ratings',
        href: 'https://www.goodreads.com/',
        image: 'uses/goodreads.png',
        description: `See [my profile](https://www.goodreads.com/user/show/18863116-vipin-ajayakumar).`,
        platforms: [IPHONE, IPAD, WEB]
    },
    {
        appName: 'Kindle',
        use: 'Online courses',
        href: 'https://www.amazon.com/b?ie=UTF8&node=16571048011',
        image: 'uses/kindle.jpeg',
        platforms: [IPHONE, IPAD]
    },
    {
        appName: 'Spark',
        use: 'Mail',
        href: 'https://sparkmailapp.com/',
        image: 'uses/spark.png',
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Whatsapp',
        use: 'Chat',
        href: 'https://www.whatsapp.com/',
        image: 'uses/whatsapp.png',
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Zoom',
        use: 'Video conferencing',
        href: 'https://zoom.us/',
        image: 'uses/zoom.png',
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Brave',
        use: 'Browser',
        href: 'https://brave.com/',
        image: 'uses/brave.jpeg',
        description: `A great browser for blocking ads and trackers. Since Brave uses the Chrome engine, you can still use all the Chrome extensions.`,
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Google Photos',
        use: 'Photos',
        href: 'https://www.google.com/photos/about/',
        image: 'uses/googlephotos.png',
        description: `The iCloud photo library is great in everything except sharing. I, manually 😭, put copies of my albums that I want to share on Google Photos.`,
        platforms: [IPHONE, IPAD, WEB]
    },
    {
        appName: 'YouTube music',
        use: 'Music',
        href: 'https://music.youtube.com/',
        image: 'uses/youtubemusic.png',
        description: `I listen to English, Hindi and Malayalam songs and this is the only platform that has good coverage across all three languages.`,
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Shazam',
        use: 'Music discovery',
        href: 'https://www.shazam.com/',
        image: 'uses/shazam.png',
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Google workspace',
        use: 'Docs, Sheets',
        href: 'https://workspace.google.com/',
        image: 'uses/googleworkspace.png',
        description: `I absolutely hate using Office style apps but when I have to, I use Google docs or sheets.`,
        platforms: [WEB]
    },
    {
        appName: 'reveal.js',
        use: 'Slides',
        href: 'https://revealjs.com/',
        image: 'uses/revealjs.svg',
        description: `My slides are available in [bluprince13/slides](https://github.com/bluprince13/slides).`,
        platforms: [WEB]
    },
    {
        appName: 'yEd',
        use: 'Diagramming',
        href: 'https://www.yworks.com/products/yed',
        image: 'uses/yed.png',
        description: `An underappreciated tool as the UI takes getting used to. A former colleague who was really into it showed me how to set it up and how powerful it could be.`,
        platforms: [MAC, WEB]
    },
    {
        appName: 'Time machine',
        use: 'Backups',
        href: 'https://support.apple.com/en-us/HT201250',
        image: 'uses/timemachine.jpeg',
        description: `I backup my Mac once a month.`,
        platforms: [MAC]
    },
    {
        appName: 'Numi',
        use: 'Calculator',
        href: 'https://numi.app/',
        image: 'uses/numi.png',
        platforms: [MAC]
    },
    {
        appName: 'textexpander',
        use: 'Snippets',
        href: 'https://textexpander.com/',
        image: 'uses/textexpander.png',
        description: `I use this for snippets shared across my devices. I don't like the UI on the iPhone or iPad but there isn't a better option out there yet.`,
        platforms: [MAC, IPHONE, IPAD]
    },
    {
        appName: 'Yoink',
        use: 'Drag and drop',
        href: 'https://eternalstorms.at/yoink/mac/index.html',
        image: 'uses/yoinkmac.png',
        platforms: [MAC]
    },
    {
        appName: 'Ancestry',
        use: 'Family tree',
        href: 'https://www.ancestry.com/',
        image: 'uses/ancestry.png',
        description: `Not perfect, but I haven't found a better way of constructing and maintaining my family tree.`,
        platforms: [IPHONE, IPAD, WEB]
    },
    {
        appName: 'Udemy',
        use: 'Online courses',
        href: 'https://www.udemy.com/',
        image: 'uses/udemy.png',
        platforms: [WEB]
    },
    {
        appName: 'Warp',
        use: 'Terminal',
        href: 'https://www.warp.dev/',
        image: 'uses/warp.png',
        platforms: [MAC]
    },
    {
        appName: 'VSCode',
        use: 'Code editor',
        href: 'https://code.visualstudio.com/',
        image: 'uses/vscode.png',
        platforms: [MAC]
    },
    {
        appName: 'Docker',
        use: 'Containerisation',
        href: 'https://www.docker.com/',
        image: 'uses/docker.png',
        platforms: [MAC]
    },
    {
        appName: 'Github',
        use: 'Code hosting',
        href: 'https://github.com/',
        image: 'uses/github.png',
        platforms: [WEB]
    },
    {
        appName: 'Observable',
        use: 'JavaScript notebook',
        href: 'https://observablehq.com/',
        image: 'uses/observable.png',
        description: `Familiar with Python [Jupyter](https://jupyter.org/) notebooks? Well this is the same thing, but for JavaScript.`,
        platforms: [WEB]
    }
]
