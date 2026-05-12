export type Grade = 'standard' | 'semi-premium' | 'premium'

export type ProductTag = 'best-seller' | 'specialty' | 'new'

export type MainCategory = 'sauces' | 'noodles' | 'pre-made' | 'others'

export type ProductCategory = 'sauces' | 'noodles' | 'ingredients'

export type SubCategory =
  | 'soya-sauce'
  | 'sesame-oil'
  | 'vinegar'
  | 'paste'
  | 'authentic-sauce'
  | 'e-fu-noodle'
  | 'tai-lok-mee'
  | 'yam-ring'
  | 'prawn-roll'
  | 'pork-lard'
  | 'canned-food'
  | 'herbs-spices'
  | 'sugar'
  | 'drink'

export interface LocalizedString {
  en: string
  zh: string
}

export interface ProductCategoryRef {
  slug: string
  name: LocalizedString
}

export interface SavedProduct {
  id: string
  name: LocalizedString
  image: string
  grade?: Grade
}

export interface Product {
  id: string
  slug: string
  sku?: string

  name: LocalizedString
  variantName?: LocalizedString
  description?: LocalizedString
  shortDescription?: LocalizedString

  // Category
  category?: string            // first category slug (compat with Sanity)
  subCategory?: SubCategory
  categories?: ProductCategoryRef[]
  subcategories?: ProductCategoryRef[]

  grade?: Grade

  // Badges
  tags?: ProductTag[]
  specialty?: boolean
  bestSeller?: boolean
  isNew?: boolean

  // Details
  packaging?: LocalizedString
  packagingSize?: string       // mapped from packaging.en
  unitSize?: string
  caseQuantity?: string
  shelfLife?: string
  storageInstructions?: LocalizedString
  ingredients?: LocalizedString
  suggestedUses?: LocalizedString

  image?: string

  // Commerce
  allowQuote?: boolean
  allowSample?: boolean
  whatsappMessage?: LocalizedString
}

export const products: Product[] = [
  {
    id: 'lss-std',
    slug: 'light-soya-sauce-standard',
    sku: 'LSS-STD-001',
    name: { en: 'Light Soya Sauce', zh: '生抽（标准）' },
    shortDescription: { en: 'Classic light soya for everyday cooking', zh: '日常烹饪的经典生抽' },
    description: {
      en: 'Our Standard Light Soya Sauce is brewed from the finest soybeans, delivering a balanced umami flavour ideal for stir-fries, marinades, and dipping sauces.',
      zh: '我们的标准生抽由优质大豆酿造，鲜味均衡，适合炒菜、腌制及蘸料。',
    },
    category: 'sauces',
    subCategory: 'soya-sauce',
    grade: 'standard',
    tags: ['best-seller'],
    image: '/images/products/light-soya-sauce-standard.png',
    unitSize: '1 Litre',
    caseQuantity: '12 bottles/case',
    shelfLife: '24 months',
    ingredients: { en: 'Water, soybeans, wheat, salt, sugar, caramel colour', zh: '水、大豆、小麦、盐、糖、焦糖色素' },
    suggestedUses: { en: 'Stir-fries, marinades, dipping sauce, fried rice, noodles', zh: '炒菜、腌制、蘸料、炒饭、面条' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'lss-sp',
    slug: 'light-soya-sauce-semi-premium',
    sku: 'LSS-SP-001',
    name: { en: 'Light Soya Sauce (Semi Premium)', zh: '生抽（半特级）' },
    shortDescription: { en: 'Elevated umami for refined dishes', zh: '提升鲜味，适合精致菜肴' },
    description: {
      en: 'Our Semi Premium Light Soya Sauce offers a richer, more complex flavour profile. Slower brewing process extracts deeper soy character.',
      zh: '我们的半特级生抽风味更为醇厚复杂，通过更长时间酿造，提取更深层次的豆香。',
    },
    category: 'sauces',
    subCategory: 'soya-sauce',
    grade: 'semi-premium',
    tags: ['specialty'],
    image: '/images/products/light-soya-sauce-semi-premium.png',
    unitSize: '1 Litre',
    caseQuantity: '12 bottles/case',
    shelfLife: '24 months',
    ingredients: { en: 'Water, soybeans, wheat, salt, sugar', zh: '水、大豆、小麦、盐、糖' },
    suggestedUses: { en: 'Claypot dishes, steamed fish, premium dipping sauces', zh: '砂锅菜、清蒸鱼、高档蘸料' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'lss-pre',
    slug: 'light-soya-sauce-premium',
    sku: 'LSS-PRE-001',
    name: { en: 'Light Soya Sauce (Premium)', zh: '生抽（特级）' },
    shortDescription: { en: 'Premium grade for signature dishes', zh: '特级品质，专为招牌菜而生' },
    description: {
      en: 'Our Premium Light Soya Sauce represents the pinnacle of our soya range. Extended natural fermentation creates an exceptionally smooth, layered flavour.',
      zh: '我们的特级生抽代表我们酱油系列的顶峰。延长天然发酵时间，造就异常顺滑、层次丰富的风味。',
    },
    category: 'sauces',
    subCategory: 'soya-sauce',
    grade: 'premium',
    tags: ['specialty', 'best-seller'],
    image: '/images/products/light-soya-sauce-premium.png',
    unitSize: '750ml',
    caseQuantity: '12 bottles/case',
    shelfLife: '24 months',
    ingredients: { en: 'Water, soybeans, wheat, salt', zh: '水、大豆、小麦、盐' },
    suggestedUses: { en: 'Dim sum, cold dishes, premium marinades, finishing sauce', zh: '点心、凉菜、高档腌制、收尾酱' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'dss-std',
    slug: 'dark-soya-sauce-standard',
    sku: 'DSS-STD-001',
    name: { en: 'Dark Soya Sauce', zh: '老抽（标准）' },
    shortDescription: { en: 'Deep colour and rich caramel notes', zh: '色泽深沉，焦糖风味浓郁' },
    description: {
      en: 'Our Standard Dark Soya Sauce delivers rich colour and robust caramel flavour essential for braised dishes, char siu, and stews.',
      zh: '我们的标准老抽色泽深沉，焦糖风味浓郁，是红烧菜、叉烧及炖品不可或缺的调味料。',
    },
    category: 'sauces',
    subCategory: 'soya-sauce',
    grade: 'standard',
    tags: ['best-seller'],
    image: '/images/products/dark-soya-sauce-standard.png',
    unitSize: '1 Litre',
    caseQuantity: '12 bottles/case',
    shelfLife: '24 months',
    ingredients: { en: 'Water, soybeans, wheat, salt, sugar, caramel colour', zh: '水、大豆、小麦、盐、糖、焦糖色素' },
    suggestedUses: { en: 'Braised pork, char siu, fried noodles, claypot rice', zh: '红烧肉、叉烧、炒面、煲仔饭' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'os-std',
    slug: 'oyster-sauce-standard',
    sku: 'OS-STD-001',
    name: { en: 'Oyster Sauce', zh: '蚝油（标准）' },
    shortDescription: { en: 'Savoury oyster depth for everyday wok cooking', zh: '浓郁鲜蚝味，日常镬气烹饪' },
    description: {
      en: 'Our Standard Oyster Sauce delivers the authentic briny, savoury taste of real oysters in every spoonful.',
      zh: '我们的标准蚝油每一勺都带来真实蚝味，咸鲜浓郁。',
    },
    category: 'sauces',
    subCategory: 'authentic-sauce',
    grade: 'standard',
    tags: ['best-seller'],
    image: '/images/products/oyster-sauce-standard.png',
    unitSize: '1 Litre',
    caseQuantity: '12 bottles/case',
    shelfLife: '24 months',
    ingredients: { en: 'Water, oyster extract, sugar, salt, modified starch, caramel colour', zh: '水、蚝汁、糖、盐、改性淀粉、焦糖色素' },
    suggestedUses: { en: 'Kai lan, beef stir-fry, braised tofu, noodles', zh: '芥兰、牛肉炒、卤豆腐、面条' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'os-pre',
    slug: 'oyster-sauce-premium',
    sku: 'OS-PRE-001',
    name: { en: 'Oyster Sauce (Premium)', zh: '蚝油（特级）' },
    shortDescription: { en: 'High oyster extract for fine dining kitchens', zh: '高蚝汁含量，专为精致餐厅' },
    description: {
      en: 'Our Premium Oyster Sauce contains a significantly higher concentration of oyster extract, resulting in an intensely flavourful, glossy sauce.',
      zh: '我们的特级蚝油含有更高浓度的蚝汁，风味浓郁，光泽感强。',
    },
    category: 'sauces',
    subCategory: 'authentic-sauce',
    grade: 'premium',
    tags: ['specialty', 'best-seller'],
    image: '/images/products/oyster-sauce-premium.png',
    unitSize: '1 Litre',
    caseQuantity: '12 bottles/case',
    shelfLife: '24 months',
    ingredients: { en: 'Water, oyster extract (25%), sugar, salt, modified starch', zh: '水、蚝汁（25%）、糖、盐、改性淀粉' },
    suggestedUses: { en: 'Premium vegetables, seafood, delicate stir-fries, dipping', zh: '高档蔬菜、海鲜、精细炒菜、蘸料' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'seo-std',
    slug: 'sesame-oil-standard',
    sku: 'SEO-STD-001',
    name: { en: 'Sesame Oil', zh: '麻油（标准）' },
    shortDescription: { en: 'Nutty finishing oil for aromatic dishes', zh: '香气浓郁，用于提香收尾' },
    description: {
      en: 'Our Standard Sesame Oil is cold-pressed from roasted sesame seeds, delivering a warm, nutty aroma and flavour.',
      zh: '我们的标准麻油由烘烤芝麻冷榨而成，带来温暖坚果香气与风味。',
    },
    category: 'sauces',
    subCategory: 'sesame-oil',
    grade: 'standard',
    tags: ['best-seller'],
    image: '/images/products/sesame-oil-standard.png',
    unitSize: '750ml',
    caseQuantity: '12 bottles/case',
    shelfLife: '18 months',
    ingredients: { en: 'Sesame oil (100%)', zh: '芝麻油（100%）' },
    suggestedUses: { en: 'Wonton soup, cold noodles, marinades', zh: '云吞汤、凉面、腌制' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'seo-pre',
    slug: 'sesame-oil-premium',
    sku: 'SEO-PRE-001',
    name: { en: 'Sesame Oil (Premium)', zh: '麻油（特级）' },
    shortDescription: { en: 'Pure, intense aroma for fine dishes', zh: '纯正浓郁香气，专为精致菜肴' },
    description: {
      en: 'Our Premium Sesame Oil is made from carefully selected sesame seeds with a specialized roasting process.',
      zh: '我们的特级麻油采用精选芝麻，经过专业烘焙工艺制成。',
    },
    category: 'sauces',
    subCategory: 'sesame-oil',
    grade: 'premium',
    tags: ['specialty'],
    image: '/images/products/sesame-oil-premium.png',
    unitSize: '750ml',
    caseQuantity: '12 bottles/case',
    shelfLife: '18 months',
    ingredients: { en: 'Premium sesame oil (100%)', zh: '优质芝麻油（100%）' },
    suggestedUses: { en: 'Banquet soups, dim sum finishing, upscale cold dishes', zh: '宴会汤品、点心收尾、高档凉菜' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'lemon-std',
    slug: 'lemon-paste-standard',
    sku: 'LEMON-STD-001',
    name: { en: 'Lemon Paste', zh: '柠檬酱（标准）' },
    shortDescription: { en: 'Tangy citrus paste for steaming and dipping', zh: '酸爽柑橘酱，用于蒸制及蘸料' },
    description: {
      en: 'Our Lemon Paste combines the bright acidity of lemons with a smooth, spreadable texture.',
      zh: '我们的柠檬酱将柠檬的清新酸味与顺滑质地完美融合。',
    },
    category: 'sauces',
    subCategory: 'paste',
    grade: 'standard',
    tags: ['specialty'],
    image: '/images/products/lemon-paste-standard.png',
    unitSize: '500g',
    caseQuantity: '24 jars/case',
    shelfLife: '18 months',
    ingredients: { en: 'Lemon juice, salt, chilli, sugar, water', zh: '柠檬汁、盐、辣椒、糖、水' },
    suggestedUses: { en: 'Steamed fish, seafood dipping, dim sum accompaniment', zh: '清蒸鱼、海鲜蘸料、点心配料' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'plum-std',
    slug: 'plum-paste-standard',
    sku: 'PLUM-STD-001',
    name: { en: 'Plum Paste', zh: '梅子酱（标准）' },
    shortDescription: { en: 'Sweet-sour plum sauce for roasted meats', zh: '酸甜梅子酱，搭配烧肉绝佳' },
    description: {
      en: 'Our Plum Paste delivers an authentic sweet-sour complexity from real plum fruit.',
      zh: '我们的梅子酱由真实梅子制成，带来正宗的酸甜复杂风味。',
    },
    category: 'sauces',
    subCategory: 'paste',
    grade: 'standard',
    tags: ['specialty'],
    image: '/images/products/plum-paste-standard.png',
    unitSize: '500g',
    caseQuantity: '24 jars/case',
    shelfLife: '18 months',
    ingredients: { en: 'Plum, sugar, salt, vinegar, water', zh: '梅子、糖、盐、醋、水' },
    suggestedUses: { en: 'Peking duck, spring rolls, roasted meats, dim sum', zh: '北京烤鸭、春卷、烧肉、点心' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'hbp-std',
    slug: 'hot-bean-paste-standard',
    sku: 'HBP-STD-001',
    name: { en: 'Hot Bean Paste', zh: '豆瓣酱（标准）' },
    shortDescription: { en: 'Spicy fermented bean paste for bold Sichuan cooking', zh: '辛辣发酵豆瓣，专为浓郁川菜' },
    description: {
      en: 'Our Hot Bean Paste is fermented from broad beans and chillies, delivering the signature heat and depth of Sichuan cuisine.',
      zh: '我们的豆瓣酱由蚕豆与辣椒发酵而成，带来川菜标志性的辣度与层次感。',
    },
    category: 'sauces',
    subCategory: 'paste',
    grade: 'standard',
    tags: ['specialty'],
    image: '/images/products/hot-bean-paste-standard.png',
    unitSize: '500g',
    caseQuantity: '24 jars/case',
    shelfLife: '18 months',
    ingredients: { en: 'Broad beans, chilli, soybeans, salt, wheat flour', zh: '蚕豆、辣椒、大豆、盐、小麦粉' },
    suggestedUses: { en: 'Mapo tofu, water-boiled fish, Sichuan braised meats', zh: '麻婆豆腐、水煮鱼、川式红烧肉' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'hoisin-std',
    slug: 'hoisin-sauce-standard',
    sku: 'HOISIN-STD-001',
    name: { en: 'Hoisin Sauce', zh: '海鲜酱（标准）' },
    shortDescription: { en: 'Sweet, aromatic sauce for Peking duck and BBQ', zh: '香甜酱料，搭配北京烤鸭及烧烤' },
    description: {
      en: 'Our Hoisin Sauce combines sweet, salty, and slightly spicy notes into a rich, aromatic paste.',
      zh: '我们的海鲜酱将甜、咸、微辣融为一体，成就浓郁芳香的酱料。',
    },
    category: 'sauces',
    subCategory: 'paste',
    grade: 'standard',
    tags: ['best-seller'],
    image: '/images/products/hoisin-sauce-standard.png',
    unitSize: '500g',
    caseQuantity: '24 jars/case',
    shelfLife: '18 months',
    ingredients: { en: 'Soybeans, sugar, water, vinegar, garlic, chilli, sesame oil', zh: '大豆、糖、水、醋、蒜、辣椒、麻油' },
    suggestedUses: { en: 'Peking duck, Vietnamese pho, BBQ glazing, stir-fry base', zh: '北京烤鸭、越南河粉、烧烤涂抹、炒菜底料' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'cfhp-std',
    slug: 'curry-fish-head-paste-standard',
    sku: 'CFHP-STD-001',
    name: { en: 'Curry Fish Head Paste', zh: '咖喱鱼头酱（标准）' },
    shortDescription: { en: 'Ready-to-use curry paste for iconic fish head curry', zh: '即用咖喱酱，轻松烹制招牌咖喱鱼头' },
    description: {
      en: 'Our Curry Fish Head Paste is a pre-blended spice paste delivering the authentic flavour profile of Singapore-style curry fish head.',
      zh: '我们的咖喱鱼头酱是预调香料酱，带来新加坡风格咖喱鱼头的正宗风味。',
    },
    category: 'sauces',
    subCategory: 'paste',
    grade: 'standard',
    tags: ['specialty', 'best-seller'],
    image: '/images/products/curry-fish-head-paste-standard.png',
    unitSize: '500g',
    caseQuantity: '24 jars/case',
    shelfLife: '18 months',
    ingredients: { en: 'Chilli, lemongrass, galangal, curry leaves, spices, oil, salt', zh: '辣椒、香茅、南姜、咖喱叶、香料、油、盐' },
    suggestedUses: { en: 'Curry fish head, seafood curry, prawn curry', zh: '咖喱鱼头、海鲜咖喱、咖喱虾' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'sbp-std',
    slug: 'seafood-belacan-paste-standard',
    sku: 'SBP-STD-001',
    name: { en: 'Seafood Belacan Paste', zh: '海鲜峇拉煎酱（标准）' },
    shortDescription: { en: 'Authentic shrimp paste base for Malay & Nyonya cooking', zh: '正宗虾膏底料，用于马来及娘惹烹饪' },
    description: {
      en: 'Our Seafood Belacan Paste uses fermented shrimp paste blended with aromatic herbs, creating the authentic umami foundation for sambal and laksa.',
      zh: '我们的海鲜峇拉煎酱以发酵虾膏配以芳香草药调制，为叁巴及叻沙提供正宗鲜味基础。',
    },
    category: 'sauces',
    subCategory: 'paste',
    grade: 'standard',
    tags: ['specialty'],
    image: '/images/products/seafood-belacan-paste-standard.png',
    unitSize: '500g',
    caseQuantity: '24 jars/case',
    shelfLife: '18 months',
    ingredients: { en: 'Shrimp paste, chilli, lemongrass, shallots, garlic, oil, salt', zh: '虾膏、辣椒、香茅、小葱、蒜、油、盐' },
    suggestedUses: { en: 'Sambal belacan, laksa, nyonya dishes', zh: '叁巴峇拉煎、叻沙、娘惹菜' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'sxo-std',
    slug: 'seafood-xo-paste-standard',
    sku: 'SXO-STD-001',
    name: { en: 'Seafood XO Paste', zh: '海鲜XO酱（标准）' },
    shortDescription: { en: 'Luxurious dried seafood sauce for premium dishes', zh: '豪华干海鲜酱，专为高档菜肴' },
    description: {
      en: 'Our Seafood XO Paste is crafted from premium dried scallops, dried shrimp, and Jinhua ham, producing a deeply complex umami-rich condiment.',
      zh: '我们的海鲜XO酱由优质干贝、虾米及金华火腿精制而成，创造出层次丰富的鲜味调料。',
    },
    category: 'sauces',
    subCategory: 'paste',
    grade: 'standard',
    tags: ['specialty', 'new'],
    image: '/images/products/seafood-xo-paste-standard.png',
    unitSize: '220g',
    caseQuantity: '24 jars/case',
    shelfLife: '12 months',
    ingredients: { en: 'Dried scallops, dried shrimp, Jinhua ham, chilli, oil, garlic', zh: '干贝、虾米、金华火腿、辣椒、油、蒜' },
    suggestedUses: { en: 'Noodles, fried rice, seafood, steamed tofu, dim sum', zh: '面条、炒饭、海鲜、清蒸豆腐、点心' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'efu-std',
    slug: 'e-fu-noodle-standard',
    sku: 'EFU-STD-001',
    name: { en: 'E-Fu Noodle', zh: '伊府面（标准）' },
    shortDescription: { en: 'Pre-fried noodles for longevity dishes and banquets', zh: '预炸面条，专为长寿宴席菜肴' },
    description: {
      en: 'Our E-Fu Noodles are classic pre-fried wheat noodles that absorb sauces beautifully while maintaining a pleasantly chewy texture.',
      zh: '我们的伊府面是经典预炸小麦面，充分吸收酱汁同时保持弹牙口感。',
    },
    category: 'noodles',
    subCategory: 'e-fu-noodle',
    grade: 'standard',
    tags: ['specialty', 'best-seller'],
    image: '/images/products/e-fu-noodle-standard.png',
    unitSize: '200g/bundle',
    caseQuantity: '20 bundles/case',
    shelfLife: '12 months',
    ingredients: { en: 'Wheat flour, eggs, water, salt, sodium carbonate', zh: '小麦粉、鸡蛋、水、盐、碳酸钠' },
    suggestedUses: { en: 'Braised E-Fu noodles, lobster noodles, longevity noodle soup', zh: '焖伊府面、龙虾伊面、长寿面汤' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'tlm-std',
    slug: 'tai-lok-mee-standard',
    sku: 'TLM-STD-001',
    name: { en: 'Tai Lok Mee', zh: '大碌面（标准）' },
    shortDescription: { en: 'Thick wheat noodles with firm, satisfying bite', zh: '粗壮小麦面，口感扎实' },
    description: {
      en: 'Our Tai Lok Mee are thick, round wheat noodles with a firm and satisfying bite. Ideal for dry-tossed noodle dishes and heavy sauce applications.',
      zh: '我们的大碌面是粗圆小麦面，口感扎实有嚼劲，适合干拌面及各类浓汁菜肴。',
    },
    category: 'noodles',
    subCategory: 'tai-lok-mee',
    grade: 'standard',
    tags: ['best-seller'],
    image: '/images/products/tai-lok-mee-standard.png',
    unitSize: '400g/bundle',
    caseQuantity: '20 bundles/case',
    shelfLife: '12 months',
    ingredients: { en: 'Wheat flour, water, salt, sodium carbonate', zh: '小麦粉、水、盐、碳酸钠' },
    suggestedUses: { en: 'Dry Tai Lok Mee, braised noodles, noodle soups', zh: '干捞大碌面、焖面、面汤' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'yr-std',
    slug: 'yam-ring-standard',
    sku: 'YR-STD-001',
    name: { en: 'Yam Ring', zh: '芋头圈（标准）' },
    shortDescription: { en: 'Pre-formed yam rings for banquet presentations', zh: '预制芋头圈，适合宴席摆盘' },
    description: {
      en: 'Our pre-formed Yam Ring eliminates hours of kitchen prep, delivering consistent, perfectly shaped baskets for high-end Cantonese presentations.',
      zh: '我们的预制芋头圈省去数小时厨房备料，为高档广式摆盘提供一致、形状完美的芋头篮。',
    },
    category: 'pre-made',
    subCategory: 'yam-ring',
    grade: 'standard',
    tags: ['specialty', 'best-seller'],
    image: '/images/products/yam-ring-standard.png',
    unitSize: '4 rings/pack',
    caseQuantity: '10 packs/case',
    shelfLife: '12 months (frozen)',
    ingredients: { en: 'Yam, tapioca starch, salt, sugar, sesame oil', zh: '芋头、木薯淀粉、盐、糖、麻油' },
    suggestedUses: { en: 'Cantonese banquet yam ring with filling, starter presentation', zh: '广式宴席芋头圈配馅、前菜摆盘' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'pl-std',
    slug: 'pork-lard-standard',
    sku: 'PL-STD-001',
    name: { en: 'Pork Lard', zh: '猪油渣（标准）' },
    shortDescription: { en: 'Crispy rendered lard for authentic flavour depth', zh: '酥脆猪油渣，增添正宗风味层次' },
    description: {
      en: 'Our pre-rendered Pork Lard are crispy and ready to use, adding an irreplaceable depth of flavour to fried noodles, congee, and Hokkien-style dishes.',
      zh: '我们的预制猪油渣酥脆即用，为炒面、白粥及福建式菜肴增添无可替代的浓郁风味。',
    },
    category: 'pre-made',
    subCategory: 'pork-lard',
    grade: 'standard',
    tags: ['specialty'],
    image: '/images/products/pork-lard-standard.png',
    unitSize: '500g/pack',
    caseQuantity: '20 packs/case',
    shelfLife: '6 months (frozen)',
    ingredients: { en: 'Pork fat, salt', zh: '猪脂肪、盐' },
    suggestedUses: { en: 'Hokkien mee, congee, oyster omelette, fried kway teow', zh: '福建面、白粥、蚵仔煎、炒粿条' },
    allowQuote: true,
    allowSample: true,
  },
  {
    id: 'pr-std',
    slug: 'prawn-roll-standard',
    sku: 'PR-STD-001',
    name: { en: 'Prawn Roll', zh: '虾卷（标准）' },
    shortDescription: { en: 'Pre-made prawn rolls for fast consistent service', zh: '预制虾卷，快速出品保持一致品质' },
    description: {
      en: 'Our pre-made Prawn Rolls are stuffed with real shrimp and wrapped in a crispy beancurd skin. Ready to deep-fry in minutes.',
      zh: '我们的预制虾卷以真实虾肉填充，用酥脆豆腐皮包裹，几分钟即可油炸。',
    },
    category: 'pre-made',
    subCategory: 'prawn-roll',
    grade: 'standard',
    tags: ['specialty', 'best-seller'],
    image: '/images/products/prawn-roll-standard.png',
    unitSize: '10 rolls/pack',
    caseQuantity: '10 packs/case',
    shelfLife: '12 months (frozen)',
    ingredients: { en: 'Shrimp, beancurd skin, water chestnut, tapioca starch, salt, white pepper', zh: '虾、豆腐皮、马蹄、木薯淀粉、盐、白胡椒' },
    suggestedUses: { en: 'Appetizer, banquet starter, dim sum, fried platter', zh: '前菜、宴席头盘、点心、炸拼盘' },
    allowQuote: true,
    allowSample: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category || p.subCategory === category)
}

export function getFeaturedProducts(limit = 6): Product[] {
  const tagged = products.filter((p) => p.tags && p.tags.length > 0)
  const untagged = products.filter((p) => !p.tags || p.tags.length === 0)
  return [...tagged, ...untagged].slice(0, limit)
}

export function getAllCategories(): MainCategory[] {
  return ['sauces', 'noodles', 'pre-made', 'others']
}
