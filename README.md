This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment Options

### Deploy on AWS Amplify

You can deploy this Next.js application using AWS Amplify, which provides a fully managed CI/CD and hosting service:

1. Push your code to an AWS CodeCommit or GitHub repository
2. Connect your repository to AWS Amplify
3. Amplify will automatically build and deploy your application

For more details, check out the [AWS Amplify deployment guide](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs.html).

### Deploy on Amazon ECS/EKS

For containerized deployment, you can use Amazon Elastic Container Service (ECS) or Elastic Kubernetes Service (EKS):

1. Build your Docker image
2. Push to Amazon Elastic Container Registry (ECR)
3. Deploy using ECS with Fargate or EC2, or EKS

#### Configuring API Endpoints with ALB Integration

To integrate your Next.js application with ECS/EKS API endpoints via Application Load Balancer:

1. Update your Next.js configuration (`next.config.js`):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL + '/:path*' // Points to your ALB endpoint
      }
    ]
  }
}

module.exports = nextConfig
```

2. Set up environment variables:
```bash
# .env.local
API_URL=https://your-alb-endpoint.region.elb.amazonaws.com
```

3. Configure your ALB:
   - Create target groups for your API services
   - Set up routing rules based on URL paths
   - Configure health checks for your services
   - Enable HTTPS with ACM certificates

4. Update security groups:
   - Allow inbound traffic from ALB to your containers
   - Configure appropriate outbound rules
   - Set up container-to-container communication if needed

5. For production deployment, add these environment variables to your ECS task definition or EKS deployment:
```json
{
  "environment": [
    {
      "name": "API_URL",
      "value": "https://your-alb-endpoint.region.elb.amazonaws.com"
    }
  ]
}
```

For detailed deployment instructions, refer to:
- [Amazon ECS deployment guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started.html)
- [ALB with ECS guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html)
- [EKS deployment guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html)

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
