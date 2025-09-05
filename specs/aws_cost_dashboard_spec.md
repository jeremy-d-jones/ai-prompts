# AWS Cost Dashboard Specification

## Project Overview
AWS cost monitoring dashboard displaying real-time spending rate ($/minute) based on rolling 4-hour window. Includes new authenticated landing page with navigation to dashboard and chat. Integrates with existing normalscience.com Cognito auth.

## Constraints
- Budget: <$5/month operational costs (~$0.60/month estimated)
- Single user access
- JWT passthrough authentication (no re-auth)
- Data refresh: Every 12 hours via Cost Explorer API
- UI refresh: Manual refresh button (no auto-polling)
- Rolling calculation window: 4 hours

## Tech Stack
- Frontend: React 18 + TypeScript component (existing Vite build)
- Backend: New Express route in existing Node.js API
- Scheduled Job: AWS Lambda (Python 3.11) + EventBridge
- Storage: DynamoDB table for cost data cache
- Auth: Existing AWS JWT verify + Cognito integration
- Deployment: Terraform/CDK additions to existing IaC

## Dependencies
- aws-sdk Cost Explorer client (Lambda)
- HMAC-SHA256 signing for internal API calls
- New DynamoDB table schema

## Functionality
- Data Collection: Lambda fetches 4-hour cost windows every 12 hours via Cost Explorer API
- API Endpoint: GET /api/aws-costs/current returns $/minute calculation with status
- Landing Page: New /dashboard route for authenticated users with navigation
- Cost Dashboard: /dashboard/aws-costs displays single metric with manual refresh
- Navigation: Links between /dashboard, /dashboard/aws-costs, and /chat
- Error Handling: Fallback states for stale/missing data, loading indicators
- Routing Update: Authenticated users redirect to /dashboard instead of /chat

## Security Plan
- HMAC-SHA256 request signing for all internal API calls (timestamp-based)
- Existing JWT verification and rate limiting applied to new endpoints
- Lambda IAM roles with minimal Cost Explorer read permissions
- Manual refresh controls prevent automated data exposure
- HTTPS enforcement and existing XSS protections
- No AWS credentials in environment variables

## Deployment Guide
- Infrastructure: Add normalscience-prod-aws-cost-cache-table, normalscience-prod-cost-data-collector Lambda, EventBridge 12h schedule via Terraform/CDK
- Backend: Deploy new Express route with request signing middleware
- Frontend: Deploy new React components and routing updates
- Process: Infrastructure → Backend → Frontend → Manual Lambda trigger → Verify flow
- Naming Convention: {project}-{environment}-{purpose}-{resource-type}

## Risks/Potential Issues
- Cost Explorer API rate limits: Implement exponential backoff, monitor usage
- DynamoDB costs: On-demand pricing, TTL cleanup, monthly spend monitoring
- Lambda cold starts: Acceptable for 12h schedule
- Cost Explorer downtime: Display last known good data with status indicators
- Data lag from AWS billing: Label as "estimated", document expected delays
- Testing: Unit tests for calculations, integration tests for APIs, E2E for auth flow