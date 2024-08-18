# shopKaro

`shopKaro` is an e-commerce shopping cart application built with Next.js and styled using plain CSS. The application features a comprehensive set of functionalities, including responsive design, search and sort capabilities, and a fully interactive shopping cart. It uses the [FakestoreAPI](https://fakestoreapi.com) to render product data and provides a seamless shopping experience with local storage support.
See application [LIVE](https://shop-karo-sable.vercel.app)

## Features

- **Responsive Design**: Fully responsive UI that adapts to various screen sizes.
- **Product Search and Sorting**: Search bar and sort dropdown for sorting products alphabetically (A-Z, Z-A) and by price (low-to-high, high-to-low).
- **Filter Panel**: Filter products by category, star ratings, and price range using a slider.
- **Shopping Cart**: Add products to the cart, view them on a dedicated cart page, adjust quantities, remove items, and see real-time price updates.
- **Discount Feature**: Displays a discount when the subtotal of all products exceeds a specified amount.
- **Checkout Process**: A checkout button that redirects to a confirmation payment page.
- **Local Storage**: Added products are saved in local storage to persist through page reloads.
- **Notifications**: React Hot Toast is used for in-app notifications.
- **API Integration**: Axios is used for fetching product data from FakestoreAPI.

## Tech Stack

- **Next.js**: For server-side rendering and React-based application framework.
- **CSS**: For styling the application.
- **LocalStorage**: For persisting cart data across page reloads.
- **React Hot Toast**: For displaying notifications.
- **Axios**: For making API requests to FakestoreAPI.

## Installation

1. Clone the repository and install dependencies and start server:

   ```bash
   git clone https://github.com/praveen-rikhari/shopkaro.git
   cd shopkaro
   npm install
   npm run dev

2. The application will be running on http://localhost:3000.

## Usage
- **Home Page**: View all products, search, and apply filters.
- **Product Page**: Add products to the cart and view details.
- **Cart Page**: Manage items in your cart, adjust quantities, and proceed to checkout.
- **Checkout Page**: Confirm your purchase and process payments.