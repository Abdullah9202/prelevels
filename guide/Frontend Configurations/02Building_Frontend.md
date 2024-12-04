# Build the Frontend

## Step 1: Navigate to the Next.js directory

```bash
cd /home/projectDir/prelevels/client
```

## Step 2: Install dependencies

```bash
npm install
```

## Step 3: Build the frontend

```bash
npm run build
```

## Step 4: Start the production server

```bash
npm install -g pm2
pm2 start npm --name "prelevels-client" -- start
pm2 save
```
