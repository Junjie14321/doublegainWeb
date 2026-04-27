export type ProductCategory = 'sauces' | 'noodles' | 'ingredients'

export type ProductTag = 'best-seller' | 'premium'

export interface Product {
  id: string
  slug: string
  category: ProductCategory
  name: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
  image: string
  tags?: ProductTag[]
  whatsappMessage?: {
    en: string
    zh: string
  }
}

export const products: Product[] = [
  // Sauces
  {
    id: 'light-soy-sauce-standard',
    slug: 'light-soy-sauce-standard',
    category: 'sauces',
    name: {
      en: 'Light Soya Sauce',
      zh: '生抽',
    },
    description: {
      en: 'Our standard light soya sauce delivers consistent saltiness and color for everyday cooking. Perfect for stir-fries, marinades, and dipping sauces.',
      zh: '我们的标准生抽提供一致的咸度和色泽，适合日常烹饪。非常适合炒菜、腌制和蘸酱。',
    },
    image: '/images/products/light-soy-sauce.jpg',
    tags: ['best-seller'],
  },
  {
    id: 'light-soy-sauce-premium',
    slug: 'light-soy-sauce-premium',
    category: 'sauces',
    name: {
      en: 'Light Soya Sauce Premium',
      zh: '顶级生抽',
    },
    description: {
      en: 'Premium aged light soya sauce with enhanced umami depth. Naturally brewed for superior flavor in high-end dishes.',
      zh: '顶级陈酿生抽，鲜味更加醇厚。天然酿造，为高端菜肴提供卓越风味。',
    },
    image: '/images/products/light-soy-sauce-premium.jpg',
    tags: ['premium'],
  },
  {
    id: 'dark-soy-sauce',
    slug: 'dark-soy-sauce',
    category: 'sauces',
    name: {
      en: 'Dark Soya Sauce',
      zh: '老抽',
    },
    description: {
      en: 'Rich, thick dark soya sauce for color and depth. Essential for braised dishes, red cooking, and adding color to fried rice.',
      zh: '浓郁醇厚的老抽，增色增香。红烧菜肴、红烧和炒饭上色的必备调料。',
    },
    image: '/images/products/dark-soy-sauce.jpg',
  },
  {
    id: 'oyster-sauce-standard',
    slug: 'oyster-sauce-standard',
    category: 'sauces',
    name: {
      en: 'Oyster Sauce',
      zh: '蚝油',
    },
    description: {
      en: 'Classic oyster sauce with balanced sweetness and savory notes. Ideal for vegetable stir-fries and meat glazes.',
      zh: '经典蚝油，甜咸均衡。非常适合炒蔬菜和肉类上光。',
    },
    image: '/images/products/oyster-sauce.jpg',
    tags: ['best-seller'],
  },
  {
    id: 'oyster-sauce-premium',
    slug: 'oyster-sauce-premium',
    category: 'sauces',
    name: {
      en: 'Oyster Sauce Premium',
      zh: '顶级蚝油',
    },
    description: {
      en: 'Premium oyster sauce made with real oyster extract. Delivers authentic umami for restaurant-quality dishes.',
      zh: '采用真正蚝汁制作的顶级蚝油。为餐厅级菜肴提供正宗鲜味。',
    },
    image: '/images/products/oyster-sauce-premium.jpg',
    tags: ['premium'],
  },
  {
    id: 'tomato-paste',
    slug: 'tomato-paste',
    category: 'sauces',
    name: {
      en: 'Tomato Paste',
      zh: '番茄酱',
    },
    description: {
      en: 'Concentrated tomato paste for sweet and sour dishes, sauces, and marinades. Consistent quality in every can.',
      zh: '浓缩番茄酱，适用于糖醋菜、酱料和腌制。每罐品质始终如一。',
    },
    image: '/images/products/tomato-paste.jpg',
  },
  {
    id: 'plum-sauce',
    slug: 'plum-sauce',
    category: 'sauces',
    name: {
      en: 'Plum Sauce',
      zh: '梅子酱',
    },
    description: {
      en: 'Sweet and tangy plum sauce perfect for roast duck, spring rolls, and as a dipping sauce.',
      zh: '酸甜梅子酱，非常适合搭配烤鸭、春卷和作为蘸酱。',
    },
    image: '/images/products/plum-sauce.jpg',
  },
  {
    id: 'lemon-paste',
    slug: 'lemon-paste',
    category: 'sauces',
    name: {
      en: 'Lemon Paste',
      zh: '柠檬酱',
    },
    description: {
      en: 'Zesty lemon paste for lemon chicken and other citrus-based dishes. Bright, consistent citrus flavor.',
      zh: '清新柠檬酱，适用于柠檬鸡和其他柑橘类菜肴。明亮一致的柑橘风味。',
    },
    image: '/images/products/lemon-paste.jpg',
  },
  {
    id: 'xo-sauce',
    slug: 'xo-sauce',
    category: 'sauces',
    name: {
      en: 'XO Sauce',
      zh: 'XO酱',
    },
    description: {
      en: 'Premium XO sauce with dried shrimp and scallops. Adds luxurious depth to stir-fries and noodle dishes.',
      zh: '采用虾米和干贝制作的顶级XO酱。为炒菜和面条增添奢华风味。',
    },
    image: '/images/products/xo-sauce.jpg',
    tags: ['premium'],
  },
  {
    id: 'sesame-oil-standard',
    slug: 'sesame-oil-standard',
    category: 'sauces',
    name: {
      en: 'Sesame Oil',
      zh: '麻油',
    },
    description: {
      en: 'Pure sesame oil for finishing dishes and dressings. Rich, nutty aroma that enhances any Asian dish.',
      zh: '纯麻油，用于菜肴点缀和调味。浓郁的坚果香气提升任何亚洲菜肴的风味。',
    },
    image: '/images/products/sesame-oil.jpg',
  },
  {
    id: 'sesame-oil-premium',
    slug: 'sesame-oil-premium',
    category: 'sauces',
    name: {
      en: 'Sesame Oil Premium',
      zh: '顶级麻油',
    },
    description: {
      en: 'Cold-pressed premium sesame oil with intense aroma. For discerning chefs who demand the finest.',
      zh: '冷榨顶级麻油，香气浓郁。专为要求最高品质的厨师打造。',
    },
    image: '/images/products/sesame-oil-premium.jpg',
    tags: ['premium'],
  },
  {
    id: 'vinegar',
    slug: 'vinegar',
    category: 'sauces',
    name: {
      en: 'Chinese Vinegar',
      zh: '香醋',
    },
    description: {
      en: 'Traditional Chinese black vinegar for dumplings, noodles, and braised dishes. Authentic aged flavor.',
      zh: '传统香醋，适用于饺子、面条和红烧菜。正宗陈酿风味。',
    },
    image: '/images/products/vinegar.jpg',
  },
  // Noodles
  {
    id: 'yee-fu-noodles',
    slug: 'yee-fu-noodles',
    category: 'noodles',
    name: {
      en: 'Yee Fu Noodles',
      zh: '伊府面',
    },
    description: {
      en: 'Pre-fried egg noodles with distinctive chewy texture. Perfect for braised noodle dishes and banquet-style presentations.',
      zh: '预炸蛋面，口感独特有嚼劲。非常适合红烧面和宴会风格呈现。',
    },
    image: '/images/products/yee-fu-noodles.jpg',
    tags: ['best-seller'],
  },
  {
    id: 'tai-lok-mee',
    slug: 'tai-lok-mee',
    category: 'noodles',
    name: {
      en: 'Tai Lok Mee',
      zh: '大碌面',
    },
    description: {
      en: 'Thick wheat noodles with satisfying bite. Ideal for soup noodles and hearty stir-fried preparations.',
      zh: '粗小麦面，口感饱满。非常适合汤面和丰盛的炒面。',
    },
    image: '/images/products/tai-lok-mee.jpg',
  },
  // Pre-made Ingredients
  {
    id: 'yam-ring',
    slug: 'yam-ring',
    category: 'ingredients',
    name: {
      en: 'Yam Ring',
      zh: '芋头圈',
    },
    description: {
      en: 'Pre-made crispy yam ring for elegant presentation. Simply reheat and fill with your signature stir-fry.',
      zh: '预制脆皮芋头圈，呈现优雅。只需加热并填入您的招牌小炒。',
    },
    image: '/images/products/yam-ring.jpg',
    tags: ['best-seller'],
  },
  {
    id: 'pork-lard',
    slug: 'pork-lard',
    category: 'ingredients',
    name: {
      en: 'Pork Lard',
      zh: '猪油',
    },
    description: {
      en: 'Premium rendered pork lard for authentic wok cooking. Delivers the traditional flavor home kitchens cannot replicate.',
      zh: '优质熬制猪油，适用于正宗镬气烹饪。提供家庭厨房无法复制的传统风味。',
    },
    image: '/images/products/pork-lard.jpg',
  },
  {
    id: 'prawn-roll',
    slug: 'prawn-roll',
    category: 'ingredients',
    name: {
      en: 'Prawn Roll',
      zh: '虾卷',
    },
    description: {
      en: 'Ready-to-fry prawn rolls with crispy skin and succulent filling. Consistent quality for dim sum service.',
      zh: '即炸虾卷，外皮酥脆，内馅鲜美。为点心服务提供始终如一的品质。',
    },
    image: '/images/products/prawn-roll.jpg',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(limit = 6): Product[] {
  // Return products with tags first, then fill with others
  const tagged = products.filter((p) => p.tags && p.tags.length > 0)
  const untagged = products.filter((p) => !p.tags || p.tags.length === 0)
  return [...tagged, ...untagged].slice(0, limit)
}

export function getAllCategories(): ProductCategory[] {
  return ['sauces', 'noodles', 'ingredients']
}
