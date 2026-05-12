import { createClient } from '@sanity/client';

type SanityImage = {
  alt?: string;
  url?: string;
};

type AboutContent = {
  title: string;
  intro: string;
  body: string[];
  images: SanityImage[];
};

type StatBar = {
  platform: 'linkedin' | 'tiktok' | 'instagram' | 'youtube' | 'x';
  value: string;
  height: number;
};

type ConnectCard = {
  kind: 'collab' | 'advertise' | 'community';
  title: string;
  description: string;
  buttonLabel: string;
  image: SanityImage;
  url?: string;
};

type ConnectContent = {
  stats: {
    title: string;
    subtitle: string;
    bars: StatBar[];
  };
  cards: ConnectCard[];
  primaryCta: string;
  modals: {
    advertiseHeading: string;
    collabHeading: string;
  };
};

export type SiteContent = {
  about: AboutContent;
  connect: ConnectContent;
};

export const defaultSiteContent: SiteContent = {
  about: {
    title: 'About Producer Ujay',
    intro:
      "Producer UJAY is a British entrepreneur, investor, media personality, and digital educator focused on inspiring a new generation through exposure, ambition, and entrepreneurship. Built around the belief that those who say it cannot be done should get out of the way of those who are doing it, UJAY has become known for documenting success, luxury, and business in a way that motivates others to think beyond their limitations. His message is simple: don't hate, take notes.",
    body: [
      "UJAY believes exposure is one of the most valuable assets a person can receive. As he often says, there is a reason why on an Emirates flight you walk through First Class before reaching Economy. Exposure changes perspective. When people see greatness, wealth, and success up close, they begin to believe it is possible for them too. Through his content, interviews, and businesses, UJAY's mission is to expose people to worlds they once believed were unreachable and show how self-made entrepreneurs turned vision into reality.",
      'From launching his first business at 11 years old to building a growing portfolio across media, technology, real estate, and hospitality, UJAY has developed a modern entrepreneurial ecosystem designed to inspire and educate.',
      'He is the founder of Pink Marble Studios, a media production company specialising in cinematography, photography, and digital advertising, and the creator of Monopoly Millionaire, a business-focused platform where he interviews entrepreneurs and successful business figures.',
      'He also founded Digital Martyr, an advanced online business education platform and private community focused on wealth creation and digital entrepreneurship, alongside PlutoCat, his technology brand specialising in premium audio products and earphones.',
      "Beyond media and technology, UJAY manages a property portfolio of over 100 properties, serves on the board of Beethoven Hotel, Zimbabwe's first transit hotel, and is a director of the premium water brand Black Gold H2O.",
      'Through his businesses and platforms, Producer UJAY continues to inspire ambitious young people globally to think bigger, move differently, and realise that exposure can change the trajectory of an entire life.',
    ],
    images: [
      {
        alt: 'Producer Ujay',
        url: 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/6a026498a2398e6af2e9e107.jpg',
      },
      {
        alt: 'Producer Ujay portrait',
        url: 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/6a02649860a7a52fdc116001.jpg',
      },
    ],
  },
  connect: {
    stats: {
      title: '80M+ Views Gained Organically',
      subtitle:
        'Built across interviews, luxury storytelling, and business content that keeps audiences watching. Producer Ujay turns attention into credibility, reach, and momentum for brands.',
      bars: [
        { platform: 'linkedin', value: '2M+', height: 30 },
        { platform: 'tiktok', value: '10M+', height: 75 },
        { platform: 'instagram', value: '50M+', height: 60 },
        { platform: 'youtube', value: '10M+', height: 90 },
        { platform: 'x', value: '8M+', height: 45 },
      ],
    },
    cards: [
      {
        kind: 'collab',
        title: 'Collab With Producer Ujay',
        description:
          'Put your brand beside content built for reach, credibility, and high-intent attention. Collaborate on campaigns that turn views into recognition, trust, and measurable demand.',
        buttonLabel: 'Collab',
        image: {
          alt: 'Collab with Producer Ujay',
          url: 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/6a026b0bbc1f77cc35b3a800.webp',
        },
      },
      {
        kind: 'advertise',
        title: 'Advertise with Producer Ujay',
        description: 'From Cape Town to London - designed for experience, information, and connections.',
        buttonLabel: 'Advertise',
        image: {
          alt: 'Advertise with Producer Ujay',
          url: 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/6a026a15d11dcc8705377d68.jpg',
        },
      },
      {
        kind: 'community',
        title: 'Connect on the Community',
        description: 'Join our exclusive network - designed for experience, information, and connections.',
        buttonLabel: 'Join Now',
        url: 'https://uuweua6rp4gx1nei2kim.app.clientclub.net/',
        image: {
          alt: 'Community',
          url: 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fe8df66ca44fd334adbd41.png',
        },
      },
    ],
    primaryCta: 'Collab With Producer Ujay',
    modals: {
      advertiseHeading: 'Advertise with Producer Ujay',
      collabHeading: 'Collab With Producer Ujay',
    },
  },
};

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01';
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== 'false';

const sanityClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn,
        perspective: 'published',
      })
    : null;

const siteContentQuery = `*[_type == "siteSettings"][0]{
  about{
    title,
    intro,
    body,
    images[]{
      alt,
      "url": coalesce(url, image.asset->url)
    }
  },
  connect{
    stats{
      title,
      subtitle,
      bars[]{platform, value, height}
    },
    cards[]{
      kind,
      title,
      description,
      buttonLabel,
      url,
      image{
        alt,
        "url": coalesce(url, image.asset->url)
      }
    },
    primaryCta,
    modals{
      advertiseHeading,
      collabHeading
    }
  }
}`;

function mergeSiteContent(content?: Partial<SiteContent> | null): SiteContent {
  return {
    about: {
      ...defaultSiteContent.about,
      ...content?.about,
      images: content?.about?.images?.length ? content.about.images : defaultSiteContent.about.images,
      body: content?.about?.body?.length ? content.about.body : defaultSiteContent.about.body,
    },
    connect: {
      ...defaultSiteContent.connect,
      ...content?.connect,
      stats: {
        ...defaultSiteContent.connect.stats,
        ...content?.connect?.stats,
        bars: content?.connect?.stats?.bars?.length
          ? content.connect.stats.bars
          : defaultSiteContent.connect.stats.bars,
      },
      cards: content?.connect?.cards?.length ? content.connect.cards : defaultSiteContent.connect.cards,
      modals: {
        ...defaultSiteContent.connect.modals,
        ...content?.connect?.modals,
      },
    },
  };
}

export async function fetchSiteContent(): Promise<SiteContent> {
  if (!sanityClient) return defaultSiteContent;

  try {
    const content = await sanityClient.fetch<Partial<SiteContent> | null>(siteContentQuery);
    return mergeSiteContent(content);
  } catch (error) {
    console.warn('Unable to load Sanity content. Falling back to local defaults.', error);
    return defaultSiteContent;
  }
}
