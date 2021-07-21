# Coffee Shop API 
## API responsible to coffee shop operations

- List products: List all products in a paginated way
- Create product: Add a new product in our catalog
- Update product: Change product information
- Get product by id: Get a specific product data
- Delete product: Delete a product
- Create Combo: Create a new combo, where we are going to put all discounts
- Update Combo: Update combo info
- List combos: List all combos
- Delete combo: Delete a combo by id
- Simulate Order: This api is responsible to simulate a order. It is responsible to calculate how much our user has to pay.
- Create Order: This api must be call after simulation, that is our "payment" api that will create the order, and store it on redis with a ttl. After that we are going to read it as a queue when the time arrives and notify our user.
- We have a page where users are going to be alerted when their order is ready

## Technologies

- MongoDB
- Redis
- NestJS
- Docker
- Docker-compose
-

## Installation

This API requires docker and docker-compose.

```sh
cd coffee-shop-api
docker-compose build && docker-compose up -d
```

## Documentation

We are using swagger in this project, in order to access our documentation go to the following url:
```sh
http://localhost:3000/api-docs/
```

Besides that there is a file called CoffeeShopApiArchitecture.jpg, where we have a basic description in high level how the architecture is organized.

## How to use this project

- First of all, go to http://localhost:3000, when you access this page a websocket connection between client e server is created.
- Now create a few products following the swagger documentation
- Create some combos, to apply discounts
- Simulate a few possibilites of orders to the user, notice that the value of this items are being calculated in this point
- When user pay the bill then we have create a new order
- Each product has to have a preparationTimeInMinutes, when we create a new order, we are calculating how much time this order are going to take to be ready. After this amount of time one alert popup will appear on this screen.