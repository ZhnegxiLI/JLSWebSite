import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {label: 'Home', url: '/'},
    {label: 'Shop', url: '/shop/catalog/power-tools', menu: {
        type: 'menu',
        items: [
            {label: 'Shop Grid', url: '/shop/catalog/power-tools', items: [
                {label: '3 Columns Sidebar', url: '/shop/catalog/power-tools'},
                {label: '4 Columns Full',    url: '/shop/category-grid-4-columns-full'},
                {label: '5 Columns Full',    url: '/shop/category-grid-5-columns-full'}
            ]},
            {label: 'Shop List', url: '/shop/category-list'},
            {label: 'Shop Right Sidebar', url: '/shop/category-right-sidebar'},
            {label: 'Product', url: '/shop/product-standard', items: [
                {label: 'Product', url: '/shop/product-standard'},
                {label: 'Product Alt', url: '/shop/product-columnar'},
                {label: 'Product Sidebar', url: '/shop/product-sidebar'}
            ]},
            {label: 'Cart', url: '/shop/cart'},
            {label: 'Checkout', url: '/shop/cart/checkout'},
            {label: 'Order Success', url: '/shop/cart/checkout/success'},
            {label: 'Wishlist', url: '/shop/wishlist'},
            {label: 'Compare', url: '/shop/compare'},
            {label: 'Track Order', url: '/shop/track-order'},
        ]
    }},
    {label: 'Account', url: '/account', menu: {
        type: 'menu',
        items: [
            {label: 'Login',           url: '/account/login'},
            {label: 'Dashboard',       url: '/account/dashboard'},
            {label: 'Edit Profile',    url: '/account/profile'},
            {label: 'Order History',   url: '/account/orders'},
            {label: 'Order Details',   url: '/account/orders/5'},
            {label: 'Address Book',    url: '/account/addresses'},
            {label: 'Edit Address',    url: '/account/addresses/5'},
            {label: 'Change Password', url: '/account/password'}
        ]
    }},
    {label: 'Pages', url: '/site', menu: {
        type: 'menu',
        items: [
            {label: 'About Us',             url: '/site/about-us'},
            {label: 'Contact Us',           url: '/site/contact-us'},
            {label: 'Contact Us Alt',       url: '/site/contact-us-alt'},
            {label: '404',                  url: '/site/not-found'},
            {label: 'Terms And Conditions', url: '/site/terms'},
            {label: 'FAQ',                  url: '/site/faq'},
            {label: 'Components',           url: '/site/components'},
            {label: 'Typography',           url: '/site/typography'}
        ]
    }}
];
