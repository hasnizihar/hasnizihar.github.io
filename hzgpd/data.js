const PROJECTS = [
    {
        id: 1,
        title: 'Hzgpd — Logo Project',
        category: 'Logo & Branding',
        description: 'A comprehensive branding project focused on modern typography and minimalist design.',
        tags: ['Branding', 'Minimalism', 'Typography'],
        date: '2024-05-12',
        images: [
            { id: 101, src: 'images/Logo-&-Branding/hzgpd/1.jpg', alt: 'Hzgpd — Primary logo Black', caption: 'Primary logo in black' },
            { id: 102, src: 'images/Logo-&-Branding/hzgpd/2.jpg', alt: 'Hzgpd — Primary logo White', caption: 'Primary logo in white' }
        ]
    },
    {
        id: 2,
        title: 'Hacton — Branding Identity',
        category: 'Logo & Branding',
        description: 'Full apparel and accessory branding for Hacton, including mockups and patterns.',
        tags: ['Apparel', 'Mockup', 'Pattern'],
        date: '2023-11-20',
        images: [
            { id: 201, src: 'images/Logo-&-Branding/hacton/8.jpg', alt: 'Hacton — Primary Logo Gray' },
            { id: 202, src: 'images/Logo-&-Branding/hacton/1.jpg', alt: 'Hacton — T-Shirt Mockup Black' },
            { id: 203, src: 'images/Logo-&-Branding/hacton/2.jpg', alt: 'Hacton — T-Shirt Mockup White' },
            { id: 204, src: 'images/Logo-&-Branding/hacton/3.jpg', alt: 'Hacton — Cap Mockup White' },
            { id: 205, src: 'images/Logo-&-Branding/hacton/4.jpg', alt: 'Hacton — Cap Mockup Black' },
            { id: 206, src: 'images/Logo-&-Branding/hacton/5.jpg', alt: 'Hacton — Logo Pattern 1' },
            { id: 207, src: 'images/Logo-&-Branding/hacton/6.jpg', alt: 'Hacton — Logo Pattern 2' },
            { id: 208, src: 'images/Logo-&-Branding/hacton/7.jpg', alt: 'Hacton — Primary Logo White' },
            { id: 209, src: 'images/Logo-&-Branding/hacton/9.jpg', alt: 'Hacton — H Logo White' },
            { id: 210, src: 'images/Logo-&-Branding/hacton/10.jpg', alt: 'Hacton — H Logo Grey' }
        ]
    },
    {
        id: 3,
        title: 'StarLoc — Mobile App Logo',
        category: 'Logo & Branding',
        description: 'A futuristic logo design for a location-based mobile application.',
        tags: ['Mobile', 'App', 'Futuristic'],
        date: '2024-02-15',
        images: [
            { id: 301, src: 'images/Logo-&-Branding/starloc/1.jpg', alt: 'StarLoc — Primary Logo Icon' },
            { id: 302, src: 'images/Logo-&-Branding/starloc/2.jpg', alt: 'StarLoc — Logo With Pattern' },
            { id: 303, src: 'images/Logo-&-Branding/starloc/3.jpg', alt: 'StarLoc — Primary Logo Text' },
            { id: 304, src: 'images/Logo-&-Branding/starloc/4.jpg', alt: 'StarLoc — Text Logo With Pattern' },
            { id: 305, src: 'images/Logo-&-Branding/starloc/5.jpg', alt: 'StarLoc — Logo Pattern' },
            { id: 306, src: 'images/Logo-&-Branding/starloc/6.jpg', alt: 'StarLoc — iPhone Mockup' },
            { id: 307, src: 'images/Logo-&-Branding/starloc/7.png', alt: 'StarLoc — Bill Board Mockup' },
            { id: 308, src: 'images/Logo-&-Branding/starloc/8.jpg', alt: 'StarLoc — Sticker Mockup' }
        ]
    },
    {
        id: 4,
        title: 'Aizat — Logo Identity',
        category: 'Logo & Branding',
        description: 'Minimalist logo design for Aizat, featuring clean lines and modern aesthetics.',
        tags: ['Minimalist', 'Clean', 'Modern'],
        date: '2022-08-10',
        images: [
            { id: 401, src: 'images/Logo-&-Branding/aizat/1.jpg', alt: 'Aizat - Primary Logo' },
            { id: 402, src: 'images/Logo-&-Branding/aizat/2.jpg', alt: 'Aizat - iPhone Mockup' },
            { id: 403, src: 'images/Logo-&-Branding/aizat/3.jpg', alt: 'Aizat - Shopping Bag Mockup' }
        ]
    },
    {
        id: 5,
        title: 'Hasni Zihar — Text Art',
        category: 'Abstract',
        description: 'Experimental text-based abstract art exploring form and legibility.',
        tags: ['Text Art', 'Experimental', 'Abstract'],
        date: '2020-04-22',
        images: [
            { id: 501, src: 'images/Abstract/hz/1.jpg', alt: 'Hasni Zihar - Text Art 1' },
            { id: 502, src: 'images/Abstract/hz/2.jpg', alt: 'Hasni Zihar - Text Art 2' }
        ]
    },
    {
        id: 6,
        title: 'Bicycle - Abstract Art',
        category: 'Abstract',
        description: 'Dynamic abstract representation of motion and cycling.',
        tags: ['Bicycle', 'Motion', 'Abstract'],
        date: '2023-09-05',
        images: [
            { id: 601, src: 'images/Abstract/ab1.jpg', alt: 'Bicycle - Abstract Art' }
        ]
    },
    {
        id: 7,
        title: 'Hi - Abstract Art',
        category: 'Abstract',
        description: 'Vibrant abstract piece focused on welcoming colors and shapes.',
        tags: ['Welcome', 'Vibrant', 'Abstract'],
        date: '2023-10-12',
        images: [
            { id: 701, src: 'images/Abstract/ab2.jpg', alt: 'Hi - Abstract Art' }
        ]
    },
    {
        id: 8,
        title: 'Life of Livings - Photography',
        category: 'Photography',
        description: 'Tiny plant grown under a drainage.',
        tags: ['Nature', 'Landscape', 'Mist'],
        date: '2025-01-02',
        images: [{ id: 801, src: 'images/Photography/Life-of-livings.jpg', alt: 'Life of Livings' }]
    },
    {
        id: 9,
        title: 'Eid Mubarak - Poster & Flyer',
        category: 'Poster & Flyer',
        description: 'Eid Mubarak!" with wishes for joy, peace, and blessings',
        tags: ['Eid Mubarak', 'Poster & Flyer', 'Islamic'],
        date: '2025-01-05',
        images: [
            { id: 901, src: 'images/Poster-&-Flyers/Eid-Mubarak/1.jpg', alt: 'Eid Mubarak' },
            { id: 902, src: 'images/Poster-&-Flyers/Eid-Mubarak/2.jpg', alt: 'Eid Mubarak' },
            { id: 903, src: 'images/Poster-&-Flyers/Eid-Mubarak/3.jpg', alt: 'Eid Mubarak' },
            { id: 904, src: 'images/Poster-&-Flyers/Eid-Mubarak/4.jpg', alt: 'Eid Mubarak' },
            { id: 905, src: 'images/Poster-&-Flyers/Eid-Mubarak/5.jpg', alt: 'Eid Mubarak' },
            { id: 906, src: 'images/Poster-&-Flyers/Eid-Mubarak/6.jpg', alt: 'Eid Mubarak' },
        ]
    },
    {
        id: 10,
        title: 'HzEDZ - Logo Identity',
        category: 'Logo & Branding',
        description: 'A comprehensive branding project focused on modern typography and minimalist design.',
        tags: ['Typography', 'Minimalist', 'Modern'],
        date: '2025-01-05',
        images: [
            { id: 1001, src: 'images/Logo-&-Branding/hzgpd/1.jpg', alt: 'Hzgpd — Primary logo Black' },
            { id: 1002, src: 'images/Logo-&-Branding/hzgpd/2.jpg', alt: 'Hzgpd — Primary logo White' }
        ]
    },
    {
        id: 11,
        title: 'UMEK - Logo Identity',
        category: 'Logo & Branding',
        description: 'A comprehensive branding project focused on modern typography and minimalist design.',
        tags: ['Typography', 'Minimalist', 'Modern'],
        date: '2025-01-05',
        images: [
            { id: 1101, src: 'images/Logo-&-Branding/umek/Umek-black.png', alt: 'Umek — Primary logo Black' },
            { id: 1102, src: 'images/Logo-&-Branding/umek/Umek-White.png', alt: 'Umek — Primary logo White' }
        ]
    },
    {
        id: 12,
        title: 'Eagle - Abstract Art',
        category: 'Abstract',
        description: 'Eagle inspired abstract art.',
        tags: ['Typography', 'Minimalist', 'Modern'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Abstract/ab3.jpg', alt: 'Eagle — Abstract Art' },
        ]
    },
    {
        id: 13,
        title: 'kky - Manipulation Art',
        category: 'Manipulation Art',
        description: 'Manipulation Art in KKy text by using some identity structures.',
        tags: ['Typography', 'Minimalist', 'Modern'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Manipulation-Art/kky manuplation.jpg', alt: 'Kky — Manipulation Art' },
        ]
    },
    {
        id: 14,
        title: 'Hamzlab - Logo Identity',
        category: 'Logo & Branding',
        description: 'A comprehensive branding project focused on modern typography and minimalist design.',
        tags: ['Typography', 'Minimalist', 'Modern'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Logo-&-Branding/hamzlab/jpg1 logo.jpg', alt: 'Hamzlab — Primary logo Black' },
            { id: 1202, src: 'images/Logo-&-Branding/hamzlab/jpg2 logo.jpg', alt: 'Hamzlab — Primary logo White' },
            { id: 1203, src: 'images/Logo-&-Branding/hamzlab/jpg3 logo.jpg', alt: 'Hamzlab — Primary logo White' },
            { id: 1204, src: 'images/Logo-&-Branding/hamzlab/jpg4 logo.jpg', alt: 'Hamzlab — Primary logo White' },
        ]
    },
    {
        id: 15,
        title: 'The Kitten - Manipulation Art',
        category: 'Manipulation Art',
        description: 'A Kittenn and A butterfly nice manuplation art.',
        tags: ['Manipulation Art', 'Kitten', 'Butterfly'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Manipulation-Art/kitten.jpg', alt: 'The Kitten — Manipulation Art' },
        ]
    },
    {
        id: 16,
        title: 'Beautiful Blossom - Photography',
        category: 'Photography',
        description: 'Collection of Beautiful Flowers and a Butterfly.',
        tags: ['Photography', 'Flowers', 'Butterfly'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Photography/Beautiful Blossom/1.jpg', alt: 'Beautiful Blossom — Photography' },
            { id: 1202, src: 'images/Photography/Beautiful Blossom/2.jpg', alt: 'Beautiful Blossom — Photography' },
            { id: 1203, src: 'images/Photography/Beautiful Blossom/3.jpg', alt: 'Beautiful Blossom — Photography' },
            { id: 1204, src: 'images/Photography/Beautiful Blossom/4.jpg', alt: 'Beautiful Blossom — Photography' },
            { id: 1205, src: 'images/Photography/Beautiful Blossom/5.jpg', alt: 'Beautiful Blossom — Photography' },
            { id: 1206, src: 'images/Photography/Beautiful Blossom/6.jpg', alt: 'Beautiful Blossom — Photography' },
            { id: 1207, src: 'images/Photography/Beautiful Blossom/7.jpg', alt: 'Beautiful Blossom — Photography' },
            { id: 1208, src: 'images/Photography/Beautiful Blossom/8.jpg', alt: 'Beautiful Blossom — Photography' },
        ]
    },
    {
        id: 17,
        title: 'Landscape - Photography',
        category: 'Photography',
        description: 'Beauty of Mountains and waterfalls.',
        tags: ['Photography', 'Mountains', 'Waterfalls'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Photography/Landscape/1.jpg', alt: 'Landscape — Photography' },
            { id: 1202, src: 'images/Photography/Landscape/2.jpg', alt: 'Landscape — Photography' },
            { id: 1203, src: 'images/Photography/Landscape/3.jpg', alt: 'Landscape — Photography' },
            { id: 1204, src: 'images/Photography/Landscape/4.jpg', alt: 'Landscape — Photography' },
            { id: 1205, src: 'images/Photography/Landscape/5.jpg', alt: 'Landscape — Photography' },
            { id: 1206, src: 'images/Photography/Landscape/6.jpg', alt: 'Landscape — Photography' },
        ]
    },
    {
        id: 18,
        title: 'Sky - Photography',
        category: 'Photography',
        description: 'Beauty of Infinity sky.',
        tags: ['Infinity', 'Sky', 'Photography'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Photography/Sky/1.jpg', alt: 'Sky — Photography' },
            { id: 1202, src: 'images/Photography/Sky/2.jpg', alt: 'Sky — Photography' },
            { id: 1203, src: 'images/Photography/Sky/3.jpg', alt: 'Sky — Photography' },
        ]
    },
    {
        id: 19,
        title: 'Wangadigala Hiking Gallery - Photography',
        category: 'Photography',
        description: 'Beauty of Wangadigala Hiking.',
        tags: ['Wangadigala', 'Hiking', 'Photography'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Photography/Wangadigala/1.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1202, src: 'images/Photography/Wangadigala/2.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1203, src: 'images/Photography/Wangadigala/3.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1204, src: 'images/Photography/Wangadigala/4.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1205, src: 'images/Photography/Wangadigala/5.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1206, src: 'images/Photography/Wangadigala/6.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1207, src: 'images/Photography/Wangadigala/7.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1208, src: 'images/Photography/Wangadigala/8.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1209, src: 'images/Photography/Wangadigala/9.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1210, src: 'images/Photography/Wangadigala/10.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1211, src: 'images/Photography/Wangadigala/11.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1212, src: 'images/Photography/Wangadigala/12.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1213, src: 'images/Photography/Wangadigala/13.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1214, src: 'images/Photography/Wangadigala/14.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1215, src: 'images/Photography/Wangadigala/15.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1216, src: 'images/Photography/Wangadigala/16.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1217, src: 'images/Photography/Wangadigala/17.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1218, src: 'images/Photography/Wangadigala/18.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1219, src: 'images/Photography/Wangadigala/19.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
            { id: 1220, src: 'images/Photography/Wangadigala/20.jpg', alt: 'Wangadigala Hiking Gallery — Photography' },
        ]
    },
    {
        id: 20,
        title: 'Wangadigala POV - Photography',
        category: 'Photography',
        description: 'Beauty of Wangadigala POV.',
        tags: ['Wangadigala', 'POV', 'Photography'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Photography/Wangedigala.jpg', alt: 'Wangadigala POV — Photography' },
        ]
    },
    {
        id: 21,
        title: 'Social Intro - Poster & Flyer',
        category: 'Poster & Flyer',
        description: 'Introductory posters and flyers.',
        tags: ['Poster & Flyer', 'Social'],
        date: '2025-01-05',
        images: [
            { id: 1201, src: 'images/Poster-&-Flyers/Social-Media-Intro/4.jpg', alt: 'Social Intro — Poster & Flyer' },
            { id: 1202, src: 'images/Poster-&-Flyers/Social-Media-Intro/5.jpg', alt: 'Social Intro — Poster & Flyer' },
            { id: 1203, src: 'images/Poster-&-Flyers/Social-Media-Intro/6.jpg', alt: 'Social Intro — Poster & Flyer' },
            { id: 1204, src: 'images/Poster-&-Flyers/Social-Media-Intro/7.jpg', alt: 'Social Intro — Poster & Flyer' },
        ]
    }
]