# Project code for Open Classrooms course

Clone this repo and follow the instructions as set out below to get started.

## Getting started

- Clone the repo

```bash
git clone https://github.com/aragakerubo/go-fullstack-recipe-backend.git
```

- Install the package

```bash
npm install
```

- Create a `.env` file in the root directory and fill in the with the appropriate values and save the changes

```bash
MONGODB_URI=mongodb://<USERNAME>:<PASSWORD>@<CLUSTER>-shard-00-00-dxpxl.mongodb.net:27017,<CLUSTER>-shard-00-01-dxpxl.mongodb.net:27017,<CLUSTER>-shard-00-02-dxpxl.mongodb.net:27017/test?ssl=true&replicaSet=<CLUSTER>-shard-0&authSource=admin&retryWrites=true&w=majority
```

- Now run the following command to start the app from the script object

```bash
npm start
```

- And voila! Make changes and watch them update in real time.

### NB

Make sure you already have gulp installed globally. For macs/ linux add the `sudo` command incase of write access errors.

```bash
npm install -g nodemon
```

## Endpoints

| URI                          | URI Parameters                                                   | Message Body Input | Description                                               | Requires Authentication? |
| :--------------------------- | :--------------------------------------------------------------- | :----------------- | :-------------------------------------------------------- | :----------------------- |
| GET <br> /api/recipes        | None                                                             | None               | Returns all recipes in database                           | No                       |
| GET <br> /api/recipes/:id    | `id` (required): the recipe id                                   | None               | Returns the recipe with the provided ID from the database | Yes                      |
| POST <br> /api/recipes       | None                                                             | Yes                | Adds a new recipe to the database                         | No                       |
| PUT <br> /api/recipes/:id    | `id` (required): The unique ID of the recipe you want to update. | Yes                | Modifies the recipe with the provided ID                  | Yes                      |
| DELETE <br> /api/recipes/:id | `id` (required): The ID of the recipes you want to delete        | None               | Deletes the recipe with the provided ID                   | No                       |
