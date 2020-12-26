const title = 'bluprince13';
const description = 'Full-stack web developer';

const SEO = {
  title,
  description,
  canonical: 'https://www.bluprince13.com',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.bluprince13.com',
    title,
    description,
    images: [
      {
        url: 'https://www.bluprince13.com/photo.jpg',
        alt: title
      }
    ]
  },
  twitter: {
    handle: '@vipinajayakumar',
    site: '@vipinajayakumar',
    cardType: 'summary_large_image'
  }
};

export default SEO;