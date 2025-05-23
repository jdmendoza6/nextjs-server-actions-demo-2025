# Next.js Todo App with Server Actions

This is a [Next.js](https://nextjs.org) todo application that demonstrates server actions with a Laravel backend API.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Configuration

The application requires a Laravel API endpoint. You can configure the API URL in two ways:

### 1. Local Development
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 2. Production Deployment (AWS Amplify)

There are two ways to configure the production API endpoint:

#### Option A: Environment Variables in Amplify Console
1. Go to AWS Amplify Console
2. Navigate to your app > Environment variables
3. Add environment variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Your API endpoint (e.g., `http://your-api-endpoint.com/api`)

#### Option B: Update amplify.yml
Modify the `amplify.yml` file in your repository:

```yaml
build:
  commands:
    - echo "NEXT_PUBLIC_API_URL=http://your-api-endpoint.com/api" >> .env.production
    - npm run build
```

Note: Option A (Amplify Console) takes precedence over Option B (amplify.yml).

## Features
- Server-side data fetching with 60-second revalidation
- Server actions for real-time updates
- Environment-based API configuration
- AWS Amplify deployment ready