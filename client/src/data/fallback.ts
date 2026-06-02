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
    isFeatured: true,
  },
  {
    _id: 'photo-2',
    title: 'Velvet Frame',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    category: 'Portrait',
    album: 'noir-portraits',
    location: 'Mumbai',
    isFeatured: true,
  },
  {
    _id: 'photo-3',
    title: 'Editorial Gold',
    imageUrl:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion',
    album: 'runway-after-dark',
    location: 'Delhi',
    isFeatured: true,
  },
  {
    _id: 'photo-4',
    title: 'Rain Gloss',
    imageUrl:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
    category: 'Editorial',
    album: 'monsoon-editorial',
    location: 'Kolkata',
    isFeatured: true,
  },
  {
    _id: 'photo-5',
    title: 'Quiet Coast',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    category: 'Travel',
    album: 'coastal-escape',
    location: 'Goa',
    isFeatured: false,
  },
  {
    _id: 'photo-6',
    title: 'Glass and Petals',
    imageUrl:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
    category: 'Product',
    album: 'product-in-bloom',
    location: 'Bengaluru',
    isFeatured: true,
  },
  {
    _id: 'photo-7',
    title: 'Applause Room',
    imageUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    category: 'Event',
    album: 'launch-night',
    location: 'Pune',
    isFeatured: false,
  },
  {
    _id: 'photo-8',
    title: 'Ivory Suit',
    imageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion',
    album: 'quiet-luxury',
    location: 'Jaipur',
    isFeatured: true,
  },
  {
    _id: 'photo-9',
    title: 'Legacy Smile',
    imageUrl:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80',
    category: 'Portrait',
    album: 'family-heirloom',
    location: 'Chennai',
    isFeatured: false,
  },
  {
    _id: 'photo-10',
    title: 'Backstage Silk',
    imageUrl:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    category: 'Editorial',
    album: 'the-atelier',
    location: 'Hyderabad',
    isFeatured: true,
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
]

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: 'testimonial-1',
    clientName: 'Aarav and Meera',
    review:
      'Fashion-Photos made our wedding look like memory and cinema at the same time.',
    rating: 5,
    projectType: 'Wedding',
  },
  {
    _id: 'testimonial-2',
    clientName: 'Nyla Studio',
    review:
      'Every frame felt intentional. The gallery elevated our campaign instantly.',
    rating: 5,
    projectType: 'Fashion',
  },
  {
    _id: 'testimonial-3',
    clientName: 'Mira Home',
    review:
      'The product images felt refined, warm, and ready for every platform we use.',
    rating: 5,
    projectType: 'Product',
  },
  {
    _id: 'testimonial-4',
    clientName: 'Kavya Retreats',
    review:
      'Our travel story finally had the atmosphere and polish we wanted guests to feel.',
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
]
