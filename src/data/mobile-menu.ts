import { MobileMenuItem } from '../app/shared/interfaces/mobile-menu-item';

export const mobileMenu: MobileMenuItem[] = [
    {type: 'link', label: 'Home', url: '/'},

    {type: 'link', label: 'Categories', url: '/shop/catalog' , code:'catalog'},

    {type: 'link', label: 'Shop', url: '/shop/catalog', code:'shop', children: [
        {type: 'link', label: 'Shop List',          url: '/shop/category-list'},
        {type: 'link', label: 'Cart',        url: '/shop/cart'},
        {type: 'link', label: 'Track Order', url: '/shop/track-order'}
    ]},

    {type: 'link', label: 'Account', url: '/account', children: [
        {type: 'link', label: 'Login',           url: '/account/login'},
        {type: 'link', label: 'Dashboard',       url: '/account/dashboard'},
        {type: 'link', label: 'Edit Profile',    url: '/account/profile'},
        {type: 'link', label: 'Order History',   url: '/account/orders'},
        {type: 'link', label: 'Address Book',    url: '/account/addresses'},
        {type: 'link', label: 'Change Password', url: '/account/password'}
    ]},
    {type: 'link', label: 'Pages', url: '/site', children: [
        {type: 'link', label: 'About Us',             url: '/site/about-us'},
        {type: 'link', label: 'Contact Us',           url: '/site/contact-us'},
        {type: 'link', label: 'Terms And Conditions', url: '/site/terms'},
        {type: 'link', label: 'FAQ',                  url: '/site/faq'}
    ]},

    {type: 'button', label: 'Currency', children: [
        {type: 'button', label: '€ Euro',           data: {currency: 'EUR'}}
    ]},

    {type: 'button', label: 'Language', children: [
        {type: 'button', label: 'English', data: {language: 'en'}},
        {type: 'button', label: 'French',  data: {language: 'fr'}},
        {type: 'button', label: 'Chinois',  data: {language: 'cn'}}
    ]}
];
