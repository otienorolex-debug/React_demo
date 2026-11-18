# Toy Tales

Toy Tales is a React app for viewing, adding, liking, and donating toys.

## Run the app

Start the toys API, then run the frontend:

```sh
npm run dev
```

By default, the app expects a JSON API at `http://localhost:3001/toys`. The API
should return toys with `id`, `name`, `image`, and `likes` fields, and support:

- `GET /toys`
- `POST /toys` with `name`, `image`, and `likes`
- `PATCH /toys/:id` with the updated `likes` value
- `DELETE /toys/:id`

To use a different API endpoint, set `VITE_TOYS_API_URL` before starting Vite:

```sh
VITE_TOYS_API_URL=http://localhost:4000/toys npm run dev
```

Run `npm run lint` and `npm run build` to check the frontend.
