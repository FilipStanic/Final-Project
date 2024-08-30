# Photography E-Commerce Platform

Welcome to my final project! This is a full-stack e-commerce platform built with Laravel on the backend and React on the frontend. The project showcases a seamless shopping experience, including product browsing, cart management, and a secure checkout process with email confirmations.

## Features

- **Product Browsing**: Users can browse through a variety of products.
- **Cart Management**: Add, update, or remove products from the cart.
- **Secure Checkout**: Complete the purchase with a confirmation email.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

### 1. Clone the Repository
Start by cloning the repository to your local machine:

```bash
git clone https://github.com/FilipStanic/Final-Project
cd Final-Project
```

# Backend Setup (Laravel)
Install Composer
Make sure you have Composer installed. Composer is a dependency manager for PHP.

```bash
composer install
```

# Generate Application Key
Laravel requires an application key to be set, which is used for encryption. You can generate this key by running:

```bash
php artisan key:generate
```

# Setup the Database
Create a new database in your preferred database management system (e.g., MySQL). Then, copy the .env.example file to a new .env file:

```bash
cp .env.example .env
```

Update the .env file with your database credentials:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

After setting up the .env file, run the following commands to migrate the database and seed it with initial data:

```bash
php artisan migrate --seed
```

Serve the Backend
To start the Laravel backend server, use:

```bash
php artisan serve
```
This will serve your backend on http://127.0.0.1:8000.

# Frontend Setup (React)
Install Node.js and npm
Ensure you have Node.js installed, which comes with npm (Node Package Manager).

Install Dependencies
Navigate to the final_frontend directory and install the required packages:

```bash
cd final_frontend
npm install
```

Start the Frontend Development Server
To start the frontend development server, run:

```bash
npm run dev
```

The frontend will be available on http://localhost:5173.

# Environment Setup
API Connection
The frontend and backend communicate via API. Ensure the API endpoint in your React application is correctly set to point to the Laravel backend.

You might need to adjust the API URLs in the .env file or directly within your frontend code, depending on your setup.

# Email Configuration
The project includes email functionalities (e.g., for purchase confirmations). You can configure the email settings in the .env file:

```
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"
```

Running the Application
Once everything is set up:

Start the Laravel backend using php artisan serve.
Start the React frontend using npm run dev.
Open http://localhost:5173 in your browser to view the application.

# Features
Product Browsing: Users can browse through a variety of products.
Cart Management: Add, update, or remove products from the cart.
Secure Checkout: Complete the purchase with a confirmation email.
Responsive Design: Optimized for both desktop and mobile devices.

# Additional Information
To access the admin panel and explore the management features of this e-commerce platform, you can log in with the following credentials:

```
admin@admin.com
admin
```

### ⚠️ Keep in mind that there is a problem when loging in to an account, the user has to refresh the page to add anything to cart, or the error will persist.
