import type { Album, Blog, Photo, Service, Testimonial } from '@/types'

export const fallbackAlbums: Album[] = [
  {
    _id: 'album-1',
    title: 'Golden Vows',
    slug: 'golden-vows',
    category: 'Wedding',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
    description: 'A warm, intimate wedding story told through quiet details.',
    date: '2026-02-14',
    location: 'Udaipur, India',
    isPrivate: false,
  },
  {
    _id: 'album-2',
    title: 'Noir Portraits',
    slug: 'noir-portraits',
    category: 'Portrait',
    coverImage:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1400&q=80',
    description: 'Studio portraiture with dramatic light and elegant restraint.',
    date: '2026-03-04',
    location: 'Mumbai, India',
    isPrivate: false,
  },
  {
    _id: 'album-3',
    title: 'Runway After Dark',
    slug: 'runway-after-dark',
    category: 'Fashion',
    coverImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80',
    description: 'Editorial fashion frames with cinematic city energy.',
    date: '2026-04-18',
    location: 'Delhi, India',
    isPrivate: false,
  },
  {
    _id: 'album-4',
    title: 'Monsoon Editorial',
    slug: 'monsoon-editorial',
    category: 'Editorial',
    coverImage:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80',
    description: 'Moody fashion portraits shaped by rain, texture, and shine.',
    date: '2026-05-02',
    location: 'Kolkata, India',
    isPrivate: false,
  },
  {
    _id: 'album-5',
    title: 'Coastal Escape',
    slug: 'coastal-escape',
    category: 'Travel',
    coverImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    description: 'Sunlit travel frames from shorelines, villas, and quiet roads.',
    date: '2026-05-21',
    location: 'Goa, India',
    isPrivate: false,
  },
  {
    _id: 'album-6',
    title: 'Product in Bloom',
    slug: 'product-in-bloom',
    category: 'Product',
    coverImage:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1400&q=80',
    description: 'Clean product imagery styled with botanical softness.',
    date: '2026-06-05',
    location: 'Bengaluru, India',
    isPrivate: false,
  },
  {
    _id: 'album-7',
    title: 'Launch Night',
    slug: 'launch-night',
    category: 'Event',
    coverImage:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
    description: 'A premium brand launch photographed with documentary energy.',
    date: '2026-06-18',
    location: 'Pune, India',
    isPrivate: false,
  },
  {
    _id: 'album-8',
    title: 'Quiet Luxury',
    slug: 'quiet-luxury',
    category: 'Fashion',
    coverImage:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80',
    description: 'Minimal styling, sculpted daylight, and polished silhouettes.',
    date: '2026-07-03',
    location: 'Jaipur, India',
    isPrivate: false,
  },
  {
    _id: 'album-9',
    title: 'Family Heirloom',
    slug: 'family-heirloom',
    category: 'Portrait',
    coverImage:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=80',
    description: 'Soft family portraits built around closeness and legacy.',
    date: '2026-07-19',
    location: 'Chennai, India',
    isPrivate: false,
  },
  {
    _id: 'album-10',
    title: 'The Atelier',
    slug: 'the-atelier',
    category: 'Editorial',
    coverImage:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
    description: 'Behind-the-scenes fashion craft with refined editorial notes.',
    date: '2026-08-08',
    location: 'Hyderabad, India',
    isPrivate: false,
  },
  {
    _id: 'album-11',
    title: 'Heritage Frames',
    slug: 'heritage-frames',
    category: 'Wedding',
    coverImage:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=80',
    description: 'Ceremony portraits framed by architecture, fabric, and ritual.',
    date: '2026-08-21',
    location: 'Jodhpur, India',
    isPrivate: false,
  },
  {
    _id: 'album-12',
    title: 'Studio Botanica',
    slug: 'studio-botanica',
    category: 'Product',
    coverImage:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80',
    description: 'Skincare and fragrance products styled with living texture.',
    date: '2026-09-02',
    location: 'Ahmedabad, India',
    isPrivate: false,
  },
  {
    _id: 'album-13',
    title: 'Festival Lights',
    slug: 'festival-lights',
    category: 'Event',
    coverImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
    description: 'Night event coverage with movement, light, and celebration.',
    date: '2026-09-14',
    location: 'Kochi, India',
    isPrivate: false,
  },
  {
    _id: 'album-14',
    title: 'Mountain Retreat',
    slug: 'mountain-retreat',
    category: 'Travel',
    coverImage:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
    description: 'Slow travel photography for hillside stays and quiet escapes.',
    date: '2026-09-28',
    location: 'Manali, India',
    isPrivate: false,
  },
]

export const fallbackPhotos: Photo[] = [
  {
    _id: 'photo-1',
    title: 'First Light',
    imageUrl:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=80',
    category: 'Wedding',
    album: 'golden-vows',
    location: 'Udaipur',
    camera: 'Canon EOS R5',
    lens: 'RF 50mm f/1.2',
    description: 'A quiet getting-ready portrait in warm window light.',
    isFeatured: true,
  },
  {
    _id: 'photo-2',
    title: 'Marigold Exit',
    imageUrl:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    category: 'Wedding',
    album: 'golden-vows',
    location: 'Udaipur',
    camera: 'Canon EOS R5',
    lens: 'RF 85mm f/1.2',
    description: 'A celebratory ceremony exit under petals and afternoon sun.',
    isFeatured: false,
  },
  {
    _id: 'photo-3',
    title: 'Velvet Frame',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    category: 'Portrait',
    album: 'noir-portraits',
    location: 'Mumbai',
    camera: 'Sony A7R V',
    lens: '85mm f/1.4',
    description: 'A low-key studio portrait with soft directional light.',
    isFeatured: true,
  },
  {
    _id: 'photo-4',
    title: 'Silver Profile',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80',
    category: 'Portrait',
    album: 'noir-portraits',
    location: 'Mumbai',
    camera: 'Sony A7R V',
    lens: '50mm f/1.4',
    description: 'Clean portrait styling with a luminous grayscale mood.',
    isFeatured: false,
  },
  {
    _id: 'photo-5',
    title: 'Editorial Gold',
    imageUrl:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion',
    album: 'runway-after-dark',
    location: 'Delhi',
    camera: 'Nikon Z8',
    lens: '70-200mm f/2.8',
    description: 'A bold runway-inspired frame with metallic styling.',
    isFeatured: true,
  },
  {
    _id: 'photo-6',
    title: 'City Hemline',
    imageUrl:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion',
    album: 'runway-after-dark',
    location: 'Delhi',
    camera: 'Nikon Z8',
    lens: '35mm f/1.8',
    description: 'Street editorial energy with motion and evening color.',
    isFeatured: false,
  },
  {
    _id: 'photo-7',
    title: 'Rain Gloss',
    imageUrl:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
    category: 'Editorial',
    album: 'monsoon-editorial',
    location: 'Kolkata',
    camera: 'Canon EOS R6 Mark II',
    lens: '35mm f/1.4',
    description: 'Glossy rain textures for a monsoon fashion story.',
    isFeatured: true,
  },
  {
    _id: 'photo-8',
    title: 'Umbrella Gesture',
    imageUrl:
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80',
    category: 'Editorial',
    album: 'monsoon-editorial',
    location: 'Kolkata',
    camera: 'Canon EOS R6 Mark II',
    lens: '50mm f/1.2',
    description: 'A poised editorial moment between rain showers.',
    isFeatured: false,
  },
  {
    _id: 'photo-9',
    title: 'Quiet Coast',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    category: 'Travel',
    album: 'coastal-escape',
    location: 'Goa',
    camera: 'Fujifilm X-T5',
    lens: '23mm f/1.4',
    description: 'Sunlit villa details from a coastal travel assignment.',
    isFeatured: false,
  },
  {
    _id: 'photo-10',
    title: 'Palm Corridor',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    category: 'Travel',
    album: 'coastal-escape',
    location: 'Goa',
    camera: 'Fujifilm X-T5',
    lens: '16-55mm f/2.8',
    description: 'A breezy beach path composed for retreat storytelling.',
    isFeatured: true,
  },
  {
    _id: 'photo-11',
    title: 'Glass and Petals',
    imageUrl:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
    category: 'Product',
    album: 'product-in-bloom',
    location: 'Bengaluru',
    camera: 'Canon EOS R5',
    lens: 'RF 100mm macro',
    description: 'A botanical product flat lay with soft highlights.',
    isFeatured: true,
  },
  {
    _id: 'photo-12',
    title: 'Serum Study',
    imageUrl:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
    category: 'Product',
    album: 'product-in-bloom',
    location: 'Bengaluru',
    camera: 'Canon EOS R5',
    lens: 'RF 100mm macro',
    description: 'Minimal skincare styling with clean negative space.',
    isFeatured: false,
  },
  {
    _id: 'photo-13',
    title: 'Applause Room',
    imageUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    category: 'Event',
    album: 'launch-night',
    location: 'Pune',
    camera: 'Sony A9 III',
    lens: '24-70mm f/2.8',
    description: 'An audience reaction captured during a premium launch.',
    isFeatured: false,
  },
  {
    _id: 'photo-14',
    title: 'Champagne Detail',
    imageUrl:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
    category: 'Event',
    album: 'launch-night',
    location: 'Pune',
    camera: 'Sony A9 III',
    lens: '35mm f/1.4',
    description: 'Brand details and guest atmosphere in one frame.',
    isFeatured: true,
  },
  {
    _id: 'photo-15',
    title: 'Ivory Suit',
    imageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion',
    album: 'quiet-luxury',
    location: 'Jaipur',
    camera: 'Nikon Z8',
    lens: '85mm f/1.8',
    description: 'A tailored fashion portrait with restrained luxury.',
    isFeatured: true,
  },
  {
    _id: 'photo-16',
    title: 'Stone Courtyard',
    imageUrl:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion',
    album: 'quiet-luxury',
    location: 'Jaipur',
    camera: 'Nikon Z8',
    lens: '50mm f/1.8',
    description: 'Neutral tones and heritage stone for a quiet luxury edit.',
    isFeatured: false,
  },
  {
    _id: 'photo-17',
    title: 'Legacy Smile',
    imageUrl:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80',
    category: 'Portrait',
    album: 'family-heirloom',
    location: 'Chennai',
    camera: 'Canon EOS R6 Mark II',
    lens: 'RF 35mm f/1.8',
    description: 'A relaxed family portrait built around closeness.',
    isFeatured: false,
  },
  {
    _id: 'photo-18',
    title: 'Generations',
    imageUrl:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    category: 'Portrait',
    album: 'family-heirloom',
    location: 'Chennai',
    camera: 'Canon EOS R6 Mark II',
    lens: 'RF 24-70mm f/2.8',
    description: 'Family connection photographed with gentle direction.',
    isFeatured: true,
  },
  {
    _id: 'photo-19',
    title: 'Backstage Silk',
    imageUrl:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    category: 'Editorial',
    album: 'the-atelier',
    location: 'Hyderabad',
    camera: 'Sony A7R V',
    lens: '35mm f/1.4',
    description: 'Behind-the-scenes movement from an atelier production.',
    isFeatured: true,
  },
  {
    _id: 'photo-20',
    title: 'Pattern Table',
    imageUrl:
      'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=1000&q=80',
    category: 'Editorial',
    album: 'the-atelier',
    location: 'Hyderabad',
    camera: 'Sony A7R V',
    lens: '50mm f/1.4',
    description: 'Textiles, sketches, and process details from the studio.',
    isFeatured: false,
  },
  {
    _id: 'photo-21',
    title: 'Palace Procession',
    imageUrl:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1000&q=80',
    category: 'Wedding',
    album: 'heritage-frames',
    location: 'Jodhpur',
    camera: 'Canon EOS R5',
    lens: 'RF 70-200mm f/2.8',
    description: 'A grand wedding entry framed by historic architecture.',
    isFeatured: true,
  },
  {
    _id: 'photo-22',
    title: 'Henna Hands',
    imageUrl:
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80',
    category: 'Wedding',
    album: 'heritage-frames',
    location: 'Jodhpur',
    camera: 'Canon EOS R5',
    lens: 'RF 100mm macro',
    description: 'An intimate detail from a heritage wedding celebration.',
    isFeatured: false,
  },
  {
    _id: 'photo-23',
    title: 'Bloom Bottle',
    imageUrl:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80',
    category: 'Product',
    album: 'studio-botanica',
    location: 'Ahmedabad',
    camera: 'Fujifilm GFX 100S',
    lens: 'GF 80mm f/1.7',
    description: 'A fragrance hero frame surrounded by living greens.',
    isFeatured: true,
  },
  {
    _id: 'photo-24',
    title: 'Clay Jar',
    imageUrl:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=80',
    category: 'Product',
    album: 'studio-botanica',
    location: 'Ahmedabad',
    camera: 'Fujifilm GFX 100S',
    lens: 'GF 120mm macro',
    description: 'Earthy cosmetic styling with tactile props.',
    isFeatured: false,
  },
  {
    _id: 'photo-25',
    title: 'Stage Wash',
    imageUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    category: 'Event',
    album: 'festival-lights',
    location: 'Kochi',
    camera: 'Sony A9 III',
    lens: '70-200mm f/2.8',
    description: 'Concert lighting and crowd energy at peak color.',
    isFeatured: true,
  },
  {
    _id: 'photo-26',
    title: 'Lantern Crowd',
    imageUrl:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
    category: 'Event',
    album: 'festival-lights',
    location: 'Kochi',
    camera: 'Sony A9 III',
    lens: '24mm f/1.4',
    description: 'Festival atmosphere with glowing lanterns and movement.',
    isFeatured: false,
  },
  {
    _id: 'photo-27',
    title: 'Pine Balcony',
    imageUrl:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80',
    category: 'Travel',
    album: 'mountain-retreat',
    location: 'Manali',
    camera: 'Fujifilm X-T5',
    lens: '18mm f/1.4',
    description: 'A quiet balcony view from a mountain retreat story.',
    isFeatured: true,
  },
  {
    _id: 'photo-28',
    title: 'Trail Breakfast',
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    category: 'Travel',
    album: 'mountain-retreat',
    location: 'Manali',
    camera: 'Fujifilm X-T5',
    lens: '33mm f/1.4',
    description: 'Lifestyle travel imagery with alpine air and morning light.',
    isFeatured: false,
  },
]

export const fallbackServices: Service[] = [
  {
    _id: 'service-1',
    title: 'Wedding Photography',
    description: 'Full-day cinematic coverage for modern celebrations.',
    price: 'From $2,400',
    duration: '8-12 hours',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    features: ['Timeline planning', 'Edited gallery', 'Private album'],
  },
  {
    _id: 'service-2',
    title: 'Portrait Photography',
    description: 'Elegant studio and location portraits with editorial polish.',
    price: 'From $450',
    duration: '2 hours',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    features: ['Creative direction', 'Retouched selects', 'Usage guidance'],
  },
  {
    _id: 'service-3',
    title: 'Event Photography',
    description: 'Documentary coverage for launches, celebrations, and panels.',
    price: 'From $900',
    duration: '4 hours',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    features: ['Rapid previews', 'Brand-safe delivery', 'Online gallery'],
  },
  {
    _id: 'service-4',
    title: 'Fashion Editorial',
    description: 'Campaign-ready imagery for designers, stylists, and labels.',
    price: 'From $1,600',
    duration: 'Half day',
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    features: ['Moodboard support', 'Set direction', 'Retouched campaign set'],
  },
  {
    _id: 'service-5',
    title: 'Product Photography',
    description: 'Styled product frames for e-commerce, launches, and lookbooks.',
    price: 'From $700',
    duration: '3 hours',
    image:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
    features: ['Prop styling', 'Clean cutdowns', 'Usage-ready exports'],
  },
  {
    _id: 'service-6',
    title: 'Travel Storytelling',
    description: 'Location-led visuals for villas, retreats, and travel brands.',
    price: 'From $1,300',
    duration: '1 day',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    features: ['Shot list planning', 'Lifestyle coverage', 'Destination gallery'],
  },
  {
    _id: 'service-7',
    title: 'Brand Launch Coverage',
    description: 'Atmospheric event coverage with strong brand storytelling.',
    price: 'From $1,100',
    duration: '5 hours',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    features: ['Guest moments', 'Detail coverage', 'Next-day highlights'],
  },
  {
    _id: 'service-8',
    title: 'Family Portrait Session',
    description: 'Gentle portrait sessions for families, couples, and milestones.',
    price: 'From $520',
    duration: '2 hours',
    image:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    features: ['Guided posing', 'Outdoor locations', 'Private proofing gallery'],
  },
  {
    _id: 'service-9',
    title: 'Creative Direction Add-On',
    description: 'Pre-shoot concept development for campaigns and editorials.',
    price: 'From $350',
    duration: 'Planning session',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    features: ['Moodboard', 'Visual references', 'Production notes'],
  },
  {
    _id: 'service-10',
    title: 'Fine Art Prints',
    description: 'Museum-quality prints and framed keepsakes from your gallery.',
    price: 'From $180',
    duration: '2-3 weeks',
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80',
    features: ['Archival paper', 'Frame options', 'Color-managed proofing'],
  },
  {
    _id: 'service-11',
    title: 'Retreat Brand Library',
    description: 'Multi-day content libraries for boutique stays and retreats.',
    price: 'From $2,800',
    duration: '2 days',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    features: ['Lifestyle scenes', 'Room details', 'Seasonal content bank'],
  },
  {
    _id: 'service-12',
    title: 'Campaign Retouching',
    description: 'Advanced polish for selected campaign, portrait, and product frames.',
    price: 'From $90/image',
    duration: '3-7 days',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    features: ['Skin cleanup', 'Color consistency', 'Delivery-ready exports'],
  },
]

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: 'testimonial-1',
    clientName: 'Aarav and Meera',
    clientImage:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    review:
      'Fashion-Photos made our wedding look like memory and cinema at the same time.',
    rating: 5,
    projectType: 'Wedding',
  },
  {
    _id: 'testimonial-2',
    clientName: 'Nyla Studio',
    clientImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    review:
      'Every frame felt intentional. The gallery elevated our campaign instantly.',
    rating: 5,
    projectType: 'Fashion',
  },
  {
    _id: 'testimonial-3',
    clientName: 'Mira Home',
    clientImage:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    review:
      'The product images felt refined, warm, and ready for every platform we use.',
    rating: 5,
    projectType: 'Product',
  },
  {
    _id: 'testimonial-4',
    clientName: 'Kavya Retreats',
    clientImage:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
    review:
      'Our travel story finally had the atmosphere and polish we wanted guests to feel.',
    rating: 5,
    projectType: 'Travel',
  },
  {
    _id: 'testimonial-5',
    clientName: 'Rhea Kapoor',
    review:
      'The portrait session felt calm, precise, and beautifully directed from start to finish.',
    rating: 5,
    projectType: 'Portrait',
  },
  {
    _id: 'testimonial-6',
    clientName: 'Aranya Botanics',
    review:
      'Our skincare launch needed warmth and clarity. The final images gave us both.',
    rating: 5,
    projectType: 'Product',
  },
  {
    _id: 'testimonial-7',
    clientName: 'The Blue Hall',
    review:
      'The event photos captured guests, design, and tiny brand details without feeling staged.',
    rating: 5,
    projectType: 'Event',
  },
  {
    _id: 'testimonial-8',
    clientName: 'Ishaan and Tara',
    review:
      'They preserved the quiet moments of our ceremony as carefully as the grand ones.',
    rating: 5,
    projectType: 'Wedding',
  },
  {
    _id: 'testimonial-9',
    clientName: 'Mosaic Label',
    review:
      'The editorial direction made our collection feel cohesive, premium, and alive.',
    rating: 5,
    projectType: 'Fashion',
  },
  {
    _id: 'testimonial-10',
    clientName: 'Hillhouse Stays',
    review:
      'The retreat gallery made the property feel peaceful, textured, and genuinely inviting.',
    rating: 5,
    projectType: 'Travel',
  },
]

export const fallbackBlogs: Blog[] = [
  {
    _id: 'blog-1',
    title: 'How to Plan a Cinematic Wedding Timeline',
    slug: 'cinematic-wedding-timeline',
    thumbnail:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    content:
      'A strong wedding timeline gives every important scene room to breathe. Start with light, not logistics, and build from there.\n\nPlan portraits around softer light, keep detail styling close to the getting-ready space, and protect ten quiet minutes after the ceremony. The best galleries are made from structure that feels invisible on the day.',
    category: 'Wedding',
    author: 'Fashion-Photos',
    createdAt: '2026-05-03',
  },
  {
    _id: 'blog-2',
    title: 'The Portrait Session Prep Guide',
    slug: 'portrait-session-prep-guide',
    thumbnail:
      'https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&w=1200&q=80',
    content:
      'Portrait preparation is less about perfection and more about clarity. Wardrobe, mood, and location should all support one idea.\n\nBring two outfit directions, keep grooming simple, and choose textures that photograph well in movement. A little planning makes the session feel relaxed instead of staged.',
    category: 'Portrait',
    author: 'Fashion-Photos',
    createdAt: '2026-05-11',
  },
  {
    _id: 'blog-3',
    title: 'What Makes a Fashion Editorial Feel Premium',
    slug: 'premium-fashion-editorial',
    thumbnail:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    content:
      'Premium editorials are built from restraint. A limited palette, intentional styling, and confident light often do more than a crowded set.\n\nBefore the shoot, define the strongest silhouette and let every frame serve it. The final edit should feel like a clear visual argument, not a pile of good images.',
    category: 'Fashion',
    author: 'Fashion-Photos',
    createdAt: '2026-05-19',
  },
  {
    _id: 'blog-4',
    title: 'Building a Product Shot List That Sells',
    slug: 'product-shot-list-that-sells',
    thumbnail:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
    content:
      'Product photography needs rhythm: clean catalog frames, styled hero images, scale references, and small detail moments.\n\nA strong shot list prevents gaps. It also gives the brand enough variety for websites, ads, social posts, and launch emails without needing a second shoot.',
    category: 'Product',
    author: 'Fashion-Photos',
    createdAt: '2026-05-27',
  },
  {
    _id: 'blog-5',
    title: 'How to Photograph a Brand Launch',
    slug: 'photograph-brand-launch',
    thumbnail:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    content:
      'A launch gallery should show atmosphere, people, product, and proof of energy. The trick is moving between those layers without interrupting the event.\n\nStart with the room before guests arrive, then follow reactions, speeches, details, and moments that show the brand in use.',
    category: 'Event',
    author: 'Fashion-Photos',
    createdAt: '2026-06-02',
  },
  {
    _id: 'blog-6',
    title: 'Travel Photography for Retreat Brands',
    slug: 'travel-photography-retreat-brands',
    thumbnail:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    content:
      'Retreat imagery should feel like an invitation. Wide establishing frames matter, but so do towels, breakfast light, hands on railings, and the pace of the place.\n\nThe goal is not to show everything. The goal is to help someone imagine arriving.',
    category: 'Travel',
    author: 'Fashion-Photos',
    createdAt: '2026-06-10',
  },
  {
    _id: 'blog-7',
    title: 'Choosing Locations for Natural Light Portraits',
    slug: 'natural-light-portrait-locations',
    thumbnail:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    content:
      'The best natural light locations have shade, texture, and room to move. Pretty backgrounds matter less than predictable light.\n\nLook for walls, trees, corridors, and reflective surfaces. A simple location with good light will outperform a dramatic one with harsh contrast.',
    category: 'Portrait',
    author: 'Fashion-Photos',
    createdAt: '2026-06-18',
  },
  {
    _id: 'blog-8',
    title: 'Editing for Timeless Color',
    slug: 'editing-for-timeless-color',
    thumbnail:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    content:
      'Timeless color starts before editing. Exposure, white balance, wardrobe, and location all shape the final grade.\n\nIn post-production, the aim is consistency and feeling. Skin should stay honest, highlights should breathe, and trends should never overpower the story.',
    category: 'Editing',
    author: 'Fashion-Photos',
    createdAt: '2026-06-26',
  },
  {
    _id: 'blog-9',
    title: 'What Clients Should Bring to a Shoot',
    slug: 'what-clients-should-bring',
    thumbnail:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    content:
      'Bring wardrobe options, comfortable shoes, touch-up basics, and any meaningful objects that support the story.\n\nMost importantly, bring a little margin. Shoots become better when there is time to adjust, breathe, and follow unexpected light.',
    category: 'Planning',
    author: 'Fashion-Photos',
    createdAt: '2026-07-04',
  },
  {
    _id: 'blog-10',
    title: 'Inside an Editorial Day',
    slug: 'inside-an-editorial-day',
    thumbnail:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    content:
      'Editorial days move fast, but they should not feel chaotic. The strongest sets have a shared plan and enough flexibility to chase a better frame.\n\nA clear call sheet, calm direction, and decisive edits keep the production focused from first look to final export.',
    category: 'Editorial',
    author: 'Fashion-Photos',
    createdAt: '2026-07-12',
  },
  {
    _id: 'blog-11',
    title: 'A Practical Guide to Event Detail Coverage',
    slug: 'event-detail-coverage-guide',
    thumbnail:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    content:
      'Event details tell the client what they built, not only who attended. Photograph signage, table settings, product displays, lighting, and small guest interactions.\n\nThe best detail coverage is collected early, then refreshed once the room fills with energy. It gives the final gallery rhythm and commercial value.',
    category: 'Event',
    author: 'Fashion-Photos',
    createdAt: '2026-07-20',
  },
  {
    _id: 'blog-12',
    title: 'Creating a Brand Image Library',
    slug: 'creating-brand-image-library',
    thumbnail:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    content:
      'A brand image library should cover more than hero shots. Include product, lifestyle, details, founder portraits, space, process, and seasonal variations.\n\nWhen planned well, one shoot can support websites, launch emails, ads, press kits, and months of social content without feeling repetitive.',
    category: 'Branding',
    author: 'Fashion-Photos',
    createdAt: '2026-07-28',
  },
]
