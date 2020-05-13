import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {label: 'Header.links.Home', url: '/'},
    {label: 'Header.links.Shop', url: '/shop/catalog/power-tools', menu: {
        type: 'menu',
        items: [
            {label: 'Header.links.ShopGrid', url: '/shop/catalog/power-tools', items: [
                {label: 'Header.links.3ColumnsSidebar', url: '/shop/catalog/power-tools'},
                {label: '4 Columns Full',    url: '/shop/category-grid-4-columns-full'},
                {label: '5 Columns Full',    url: '/shop/category-grid-5-columns-full'}
            ]},
            {label: 'Header.links.ShopList', url: '/shop/category-list'},
            {label: 'ShopRightSidebar', url: '/shop/category-right-sidebar'},
            {label: 'Header.links.Product', url: '/shop/product-standard', items: [
                {label: 'Product', url: '/shop/product-standard'},
                {label: 'Product Alt', url: '/shop/product-columnar'},
                {label: 'Product Sidebar', url: '/shop/product-sidebar'}
            ]},
            {label: 'Header.links.Cart', url: '/shop/cart'},
            {label: 'Header.links.Checkout', url: '/shop/cart/checkout'},
            {label: 'Header.links.OrderSuccess', url: '/shop/cart/checkout/success'},
            {label: 'Header.links.Wishlist', url: '/shop/wishlist'},
            {label: 'Header.links.TrackOrder', url: '/shop/track-order'},
        ]
    }},
    {label: 'Header.links.Account', url: '/account', menu: {
        type: 'menu',
        items: [
            {label: 'Header.links.Login',           url: '/account/login'},
            {label: 'Header.links.Dashboard',       url: '/account/dashboard'},
            {label: 'Header.links.EditProfile',    url: '/account/profile'},
            {label: 'Header.links.OrderHistory',   url: '/account/orders'},
            {label: 'Header.links.AddressBook',    url: '/account/addresses'},
            {label: 'Header.links.EditAddress', url: '/account/address', params:{Type:'facturationAdress'}},
            {label: 'Header.links.ChangePassword', url: '/account/password'}
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
