npm init -y

npm install -D tailwindcss

npx tailwindcss init --full (to make the default config with all things)
npx tailwindcss init (to make empty config)

@tailwind base;
@tailwind components;
@tailwind utilities;

npx tailwindcss -i ./src/input.css -o ./src/output.css --watch (you can add this inside the file created after run first command)

(if you add the above command inside the created file you can use it by run 'npm run (name)')