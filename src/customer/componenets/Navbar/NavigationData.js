export const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/women/new-arrivals',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/women/basictees',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/women/clothing/tops' },
            { name: 'Dresses', href: '/women/clothing/dresses' },
            { name: 'Pants', href: '/women/clothing/pants' },
            { name: 'Denim', href: '/women/clothing/denim' },
            { name: 'Sweaters', href: '/women/clothing/sweaters' },
            { name: 'T-Shirts', href: '/women/clothing/tshirts' },
            { name: 'Jackets', href: '/women/clothing/jackets' },
            { name: 'Activewear', href: '/women/clothing/activewear' },
            { name: 'Browse All', href: '/women/clothing/Browse All' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/women/accessories/watches' },
            { name: 'Wallets', href: '/women/accessories/wallet' },
            { name: 'Bags', href: '/women/accessories/bags' },
            { name: 'Sunglasses', href: '/women/accessories/sunglasses' },
            { name: 'Hats', href: '/women/accessories/hats' },
            { name: 'Belts', href: '/women/accessories/belts' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '/women/brands/full-nelson' },
            { name: 'My Way', href: '/women/brands/my-way' },
            { name: 'Re-Arranged', href: '/women/brands/re-arranged' },
            { name: 'Counterfeit', href: '/women/brands/counterfeit' },
            { name: 'Significant Other', href: '/women/brands/significant-other' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '/men/featured/new-arrivals',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '/men/featured/artwork-tees',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/men/clothing/tops' },
            { name: 'Pants', href: '/men/clothing/pants' },
            { name: 'Sweaters', href: '/men/clothing/sweaters' },
            { name: 'T-Shirts', href: '/men/clothing/t-shirts' },
            { name: 'Jackets', href: '/men/clothing/jackets' },
            { name: 'Activewear', href: '/men/clothing/activewear' },
            { name: 'Browse All', href: '/men/clothing/browse-all' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/men/accessories/watches' },
            { name: 'Wallets', href: '/men/accessories/wallets' },
            { name: 'Bags', href: '/men/accessories/bags' },
            { name: 'Sunglasses', href: '/men/accessories/sunglasses' },
            { name: 'Hats', href: '/men/accessories/hats' },
            { name: 'Belts', href: '/men/accessories/belts' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '/men/brands/re-arranged' },
            { name: 'Counterfeit', href: '/men/brands/counterfeit' },
            { name: 'Full Nelson', href: '/men/brands/full-nelson' },
            { name: 'My Way', href: '/men/brands/my-way' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '/pages/company' },
    { name: 'Stores', href: '/pages/stores' },
  ],
};
