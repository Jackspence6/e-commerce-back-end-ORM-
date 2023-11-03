# E-Commerce Back End

## Description

This repository is home to the back end of an e-commerce site. Built using Express.js and Sequelize, this application creates a platform for internet retail companies to manage their products, categories, and tags through a MySQL database.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To get started with this application, clone the repository to your local machine.

```
 git clone git@github.com:Jackspence6/e-commerce-back-end-ORM-.git
```

Once cloned, navigate to the directory of the application and install the necessary dependencies.

```
npm install
```

## Configuration

Before running the application, you'll need to set up your environment variables. Create a `.env` file in the root directory of the project with the following contents:

DB_NAME="ecommerce_db"  
DB_USER="your_mysql_username"  
DB_PW="your_mysql_password"

Replace `'your_mysql_username'` and `'your_mysql_password'` with your MySQL username and password, respectively.

## Database Setup

To create your database with the necessary tables, run the schema file from the MySQL shell:

```
source db/schema.sql
```

After creating the database, seed it with test data using the following command:

```
npm run seed
```

## Usage

To start the server and sync the Sequelize models to the MySQL database, run:

```
npm start
```

The application will be running on `localhost:3001`.

## API Routes

The following API routes are available:

- `GET /api/categories` - Retrieves all categories
- `GET /api/categories/:id` - Retrieves a single category by ID
- `GET /api/products` - Retrieves all products
- `GET /api/products/:id` - Retrieves a single product by ID
- `GET /api/tags` - Retrieves all tags
- `GET /api/tags/:id` - Retrieves a single tag by ID
- `POST /api/categories` - Creates a new category
- `POST /api/products` - Creates a new product
- `POST /api/tags` - Creates a new tag
- `PUT /api/categories/:id` - Updates a category by ID
- `PUT /api/products/:id` - Updates a product by ID
- `PUT /api/tags/:id` - Updates a tag by ID
- `DELETE /api/categories/:id` - Deletes a category by ID
- `DELETE /api/products/:id` - Deletes a product by ID
- `DELETE /api/tags/:id` - Deletes a tag by ID

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Contact

- GitHub: [Jackspence6](https://github.com/Jackspence6)
- Email: jackspence123456@gmail.com
