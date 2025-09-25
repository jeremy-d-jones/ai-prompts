---
description: 'Full-stack chat application with quantum mechanics theming and AWS Cognito authentication'
mode: 'prompt'
tags: ['react', 'typescript', 'nodejs', 'express', 'aws', 'cognito', 'fullstack', 'chat', 'authentication', 'tailwind', 'vite']
difficulty: 'intermediate'
version: '1.0'
lastUpdated: '2025-01-XX'
prerequisites: ['React', 'TypeScript', 'Node.js', 'AWS basics', 'Tailwind CSS', 'Vite']
estimatedTime: '20-40 minutes'
useCase: 'Building a production-ready chat application with authentication'
---

## HEADER

* **name:** normal-science-app
* **version:** 1.0.0
* **status:** stable
* **owner:** Jeremy D. Jones
* **created:** 2025-01-XX
* **updated:** 2025-01-XX
* **tags:** react, typescript, nodejs, express, aws, cognito, fullstack, chat, authentication, tailwind, vite
* **summary:** Production-ready full-stack chat application with quantum mechanics theming, AWS Cognito authentication, and design system matching normalscience.com

---

## INTERFACES

### Inputs
* **chat_messages** (string) — User chat input with validation (max 1000 characters)
* **authentication_state** (enum) — unauthenticated, authenticating, authenticated, error
* **environment** (enum) — development, production
* **design_theme** (json) — Quantum mechanics theming with double-slit experiment background

### Outputs
* **Chat responses** (json) — Standardized API responses with success/error handling
* **Authentication flow** — Complete Cognito OAuth flow with session management
* **Web application** — React SPA with quantum mechanics theming
* **API endpoints** — Express backend with health and chat endpoints

### Assumptions
* User has AWS Cognito User Pool and App Client configured
* User has AWS Systems Manager Parameter Store access
* User wants to deploy to normalscience.com domain
* Design system should match existing normalscience.com aesthetics

### Non-goals
* Complex chat features beyond basic messaging
* User registration (handled by Cognito)
* Message persistence or history
* Real-time features or WebSocket connections

---

## BLOCKS

### [block]
**block_id:** system-mission
**role:** system
**purpose:** Define the expert full-stack engineer's mission
**content:**
```
You are an expert full-stack engineer. Build a minimal app that runs locally on your laptop with production-ready architecture for AWS deployment. The application should be a chat interface with quantum mechanics theming, AWS Cognito authentication, and design system matching normalscience.com.
```

### [block]
**block_id:** prerequisites-setup
**role:** developer
**purpose:** Define required AWS resources and pre-development setup
**content:**
```
Prerequisites Setup:
Required AWS Resources (Must be created first):
- AWS Cognito User Pool with custom domain (auth.normalscience.com)
- Cognito App Client configured with OAuth flows
- AWS Systems Manager Parameter Store parameters
- IAM permissions for Parameter Store access

Pre-Development Setup:
1. Create Cognito User Pool and App Client
2. Store credentials in Parameter Store:
   aws ssm put-parameter --name "/normalscience/cognito/authority" --value "..." --type "SecureString"
   aws ssm put-parameter --name "/normalscience/cognito/client-id" --value "..." --type "SecureString"
3. Verify credentials are accessible before starting development:
   aws ssm get-parameter --name "/normalscience/cognito/authority" --with-decryption --region us-east-1

Local Environment Requirements:
- Node.js 20+ installed
- Git configured
- AWS CLI configured with appropriate permissions
- Bash/zsh terminal (PowerShell may have issues with some commands)
```

### [block]
**block_id:** architecture-overview
**role:** developer
**purpose:** Define the application architecture and technology stack
**content:**
```
Architecture Overview:
- Two directories: /web and /api
- Production deployment to normalscience.com domain
- AWS Cognito authentication with custom domain (auth.normalscience.com)
- Design Language: Must match normalscience.com's current design system

Implementation Order:
1. Basic Setup: Project structure, dependencies, configuration
2. API Development: Health endpoint, chat endpoint, validation
3. Web Foundation: Routing, basic pages, design system
4. Authentication: Cognito integration, callback handling
5. Integration: Connect frontend to backend
6. Testing: E2E tests, error handling
7. Polish: Performance, accessibility, design consistency
```

### [block]
**block_id:** design-system
**role:** developer
**purpose:** Define comprehensive design system requirements
**content:**
```
Design System:
Colors:
- Parchment: #f5f1e8 (background)
- Ink: #2d2d2d (primary text)
- Sunlight: #e2c275 (accent)
- Navy: #274060 (supplemental)
- Dark Green: #2d5a27 (supplemental)
- Maroon: #6a0f17 (supplemental)

Typography:
- Headings: Fira Sans
- Body: IBM Plex Serif

Tailwind Configuration:
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: '#f5f1e8',
        ink: '#2d2d2d',
        sunlight: '#e2c275',
        navy: '#274060',
        'dark-green': '#2d5a27',
        maroon: '#6a0f17',
      },
      fontFamily: {
        'heading': ['Fira Sans', 'sans-serif'],
        'body': ['IBM Plex Serif', 'serif'],
      }
    }
  }
}

Font Loading:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:wght@400;500;600&display=swap" rel="stylesheet">
```

### [block]
**block_id:** background-texture
**role:** developer
**purpose:** Define quantum mechanics background texture implementation
**content:**
```
Background Texture Implementation:
The background represents the photon detection pattern from the double-slit experiment - where individual photons create an interference pattern over time. This creates a subtle, artistic representation of quantum mechanics.

CSS Implementation:
body {
  background-color: #f5f1e8;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(45, 45, 45, 0.08) 1px, transparent 1px),
    radial-gradient(circle at 80% 70%, rgba(45, 45, 45, 0.06) 1px, transparent 1px),
    radial-gradient(circle at 40% 60%, rgba(45, 45, 45, 0.05) 1px, transparent 1px),
    radial-gradient(circle at 60% 40%, rgba(45, 45, 45, 0.04) 1px, transparent 1px),
    radial-gradient(circle at 10% 80%, rgba(45, 45, 45, 0.03) 1px, transparent 1px),
    radial-gradient(circle at 90% 20%, rgba(45, 45, 45, 0.03) 1px, transparent 1px);
  background-size: 40px 40px, 60px 60px, 80px 80px, 100px 100px, 120px 120px, 140px 140px;
  background-position: 0 0, 20px 20px, 40px 40px, 60px 60px, 80px 80px, 100px 100px;
}

Subtle interference pattern overlay:
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(45, 45, 45, 0.015) 4px, rgba(45, 45, 45, 0.015) 8px);
  pointer-events: none;
  z-index: -1;
}

Background Texture Testing:
- Test on multiple browsers (Chrome, Firefox, Safari)
- Verify texture is visible on first page load
- Test with different screen resolutions
- Ensure texture doesn't interfere with text readability
- Verify texture creates the intended quantum interference pattern effect
- CRITICAL: Texture must be immediately visible without cache clearing or hard refresh
```

### [block]
**block_id:** frontend-requirements
**role:** developer
**purpose:** Define comprehensive frontend requirements
**content:**
```
Frontend Requirements (/web) - React + Vite + TypeScript + Tailwind:

Pages & Features:
- Landing page: Login button (AWS Cognito authentication)
- Chat page: Textbox, Send button, transcript area (protected content)
  - Messages are ephemeral (not persisted)
  - Calls POST /api/chat and displays response
  - Handles API failures with user-friendly error messages
  - Disables Send button during API calls
  - Direct access after login (no intermediate welcome page)

Technical Requirements (Prioritized):
Must Have (MVP):
- State Management: React Context for global state (authentication, user session), local state for component-specific data
- Error Handling: Wrap main App component in React error boundary with fallback UI and reload option
- Loading States: Show loading indicators during async operations (login, API calls), disable buttons during operations
- Accessibility: Semantic HTML elements, alt text for images, keyboard navigation, basic ARIA labels, color contrast ratios
- Responsive Design: Mobile-first approach using Tailwind responsive utilities across mobile, tablet, and desktop breakpoints

Should Have (Enhanced):
- Performance: Optimize bundle size, lazy load components if needed, basic image optimization

Design System Requirements:
- Company Branding: "The Normal Science Company" (not "Normal Science App") - must appear on one line
- No Taglines: No descriptive text, slogans, or subtitles under the company heading
- Color Scheme: Must match normalscience.com's current design language
- Typography: Consistent with normalscience.com's font choices
- Layout: Maintain visual consistency with existing site design
- Background: Artistic representation of the double-slit experiment photon detection pattern
```

### [block]
**block_id:** backend-requirements
**role:** developer
**purpose:** Define comprehensive backend requirements
**content:**
```
Backend Requirements (/api) - Node 20 + Express + TypeScript:

API Endpoints:
- GET /healthz: { success: true, data: { status: "ok" }, timestamp: string }
- POST /api/chat: Accept { prompt: string }, return standardized response format:
  {
    success: boolean,
    data?: { reply: string, prompt: string },
    error?: string,
    timestamp: string
  }

Technical Requirements (Prioritized):
Must Have (MVP):
- Validation: Basic input validation for chat messages (length, content type)
- Error Handling: Network failures, HTTP errors, JSON parsing. Log errors to console for CloudWatch integration
- Logging: Structured console logging (console.log, console.error, console.warn with timestamps). Future CloudWatch integration via AWS SDK v3

Should Have (Enhanced):
- Rate Limiting: Basic rate limiting on chat endpoint (100 requests per minute per IP)

Security Requirements:
Input Validation:
const validateChatInput = (prompt: string) => {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid input: prompt must be a non-empty string');
  }
  if (prompt.length > 1000) {
    throw new Error('Invalid input: prompt too long (max 1000 characters)');
  }
  if (prompt.trim().length === 0) {
    throw new Error('Invalid input: prompt cannot be empty');
  }
}
- Authentication: Secure AWS Cognito authentication implementation
```

### [block]
**block_id:** authentication-setup
**role:** developer
**purpose:** Define comprehensive AWS Cognito authentication setup
**content:**
```
Authentication Setup (AWS Cognito):

Environment Variables Setup:
Global Environment (Add to ~/.zshrc):
export NORMAL_SCIENCE_COGNITO_AUTHORITY="https://cognito-idp.us-east-1.amazonaws.com/YOUR_USER_POOL_ID"
export NORMAL_SCIENCE_COGNITO_CLIENT_ID="YOUR_CLIENT_ID"
export NORMAL_SCIENCE_COGNITO_DOMAIN="https://auth.normalscience.com"

Local Environment (.env.local):
VITE_COGNITO_AUTHORITY=$NORMAL_SCIENCE_COGNITO_AUTHORITY
VITE_COGNITO_CLIENT_ID=$NORMAL_SCIENCE_COGNITO_CLIENT_ID
VITE_COGNITO_DOMAIN=$NORMAL_SCIENCE_COGNITO_DOMAIN

Environment Variable Validation:
if (!import.meta.env.VITE_COGNITO_AUTHORITY) {
  throw new Error('Missing VITE_COGNITO_AUTHORITY environment variable');
}
if (!import.meta.env.VITE_COGNITO_CLIENT_ID) {
  throw new Error('Missing VITE_COGNITO_CLIENT_ID environment variable');
}
if (!import.meta.env.VITE_COGNITO_DOMAIN) {
  throw new Error('Missing VITE_COGNITO_DOMAIN environment variable');
}

Cognito Configuration:
- Custom Domain: https://auth.normalscience.com
- CNAME Record: auth.normalscience.com → Cognito alias target
- Allowed URLs:
  - Callback URLs: http://localhost:5173/auth/callback (dev), https://normalscience.com/auth/callback (prod)
  - Sign-out URLs: http://localhost:5173/ (dev), https://normalscience.com/ (prod)

Dependencies Required:
{
  "dependencies": {
    "@aws-sdk/client-ssm": "^3.0.0",
    "oidc-client-ts": "^2.4.1",
    "react-oidc-context": "^2.4.0"
  },
  "devDependencies": {
    "react-router-dom": "^6.0.0"
  }
}

Implementation Requirements:
- Auth Provider: Wrap App with AuthProvider from react-oidc-context
- Session Management: Use Cognito tokens with automatic refresh
- Loading States: Handle async authentication with loading states
- Error Handling: Auth failures (network errors, token expiration)
- TypeScript: Interfaces matching Cognito user structure
- Direct Redirect: After login, redirect directly to protected chat content (no intermediate pages)

Cognito App Client Configuration Requirements:
- Client Type: Public (no client secret)
- OAuth Flows: Authorization code grant
- Callback URLs: Must include exact development and production URLs
- Allowed OAuth Scopes: openid, email
- PKCE: Required for public clients (handled automatically by oidc-client-ts)

IAM Permissions Required:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ssm:GetParameter",
                "ssm:GetParameters"
            ],
            "Resource": [
                "arn:aws:ssm:us-east-1:*:parameter/normalscience/cognito/*"
            ]
        }
    ]
}
```

### [block]
**block_id:** environment-configuration
**role:** developer
**purpose:** Define environment and configuration requirements
**content:**
```
Environment & Configuration:

Development:
- CORS: Local development only - origin http://localhost:5173, methods GET/POST
- Proxy: Vite dev proxy /api → http://localhost:4000
- Ports: Hardcoded 5173 (web) and 4000 (api)

Production:
- Domain: normalscience.com (eliminates CORS requirement)
- Environment Detection: Use NODE_ENV for environment-specific configurations
- No Proxy: Same-domain deployment

Production Environment Variables (AWS Parameter Store):
aws ssm put-parameter --name "/normalscience/cognito/authority" --value "https://cognito-idp.us-east-1.amazonaws.com/YOUR_USER_POOL_ID" --type "SecureString"
aws ssm put-parameter --name "/normalscience/cognito/client-id" --value "YOUR_CLIENT_ID" --type "SecureString"
aws ssm put-parameter --name "/normalscience/cognito/domain" --value "https://auth.normalscience.com" --type "SecureString"

To verify parameters:
aws ssm describe-parameters --parameter-filters "Key=Name,Option=BeginsWith,Values=/normalscience" --region us-east-1

To retrieve a parameter:
aws ssm get-parameter --name "/normalscience/cognito/authority" --with-decryption --region us-east-1
```

### [block]
**block_id:** prompt-preservation
**role:** developer
**purpose:** Define prompt preservation requirement
**content:**
```
Prompt Preservation:
IMPORTANT: When you create any code or files, save this exact prompt as `original-prompt-$(git rev-parse --short HEAD).md` in the root directory of the project to preserve the original instructions with version tracking.
```

---

## ASSEMBLY

```
assembly_order:
  - system-mission
  - prerequisites-setup
  - architecture-overview
  - design-system
  - background-texture
  - frontend-requirements
  - backend-requirements
  - authentication-setup
  - environment-configuration
  - prompt-preservation
inclusion_rules:
  - Always include system-mission and prerequisites-setup
  - Include design-system for visual consistency
  - Include authentication-setup for secure user access
  - Include environment-configuration for deployment
  - Include prompt-preservation for version tracking
rendering:
  - Create complete project structure with /web and /api directories
  - Implement quantum mechanics theming and background texture
  - Set up AWS Cognito authentication flow
  - Create comprehensive documentation
  - Configure environment variables and deployment
```

---

## VARIABLES

```yaml
- var: CHAT_MESSAGE
  type: string
  required: true
  validate: "max 1000 characters, non-empty"
- var: AUTHENTICATION_STATE
  type: enum
  required: true
  validate: "unauthenticated|authenticating|authenticated|error"
- var: ENVIRONMENT
  type: enum
  required: false
  default: "development"
  validate: "development|production"
- var: COGNITO_AUTHORITY
  type: string
  required: true
  validate: "cognito-idp.*amazonaws.com.*"
- var: COGNITO_CLIENT_ID
  type: string
  required: true
  validate: ".*"
- var: COGNITO_DOMAIN
  type: string
  required: true
  default: "https://auth.normalscience.com"
  validate: "https://.*"
- var: WEB_PORT
  type: int
  required: false
  default: 5173
  validate: "1000-65535"
- var: API_PORT
  type: int
  required: false
  default: 4000
  validate: "1000-65535"
```

---

## STYLE GUIDE

* Use clear, technical language with specific implementation details
* Include code examples and configuration snippets
* Structure information hierarchically with clear sections
* Use consistent formatting for commands, file paths, and variables
* Include error handling and edge case considerations
* Maintain professional, production-ready tone
* Focus on quantum mechanics theming and design consistency
* Emphasize security and authentication best practices

---

## TESTS

1. **Authentication flow**: Complete Cognito OAuth flow with session management
2. **Chat functionality**: Send and receive messages with proper validation
3. **Design system**: Quantum mechanics theming and background texture
4. **Responsive design**: Mobile-first approach across all breakpoints
5. **Error handling**: Graceful handling of authentication and API failures
6. **Environment configuration**: Proper setup for development and production
7. **Security**: Input validation and secure authentication implementation

---

## CHANGELOG

* **1.0.0 (2025-01-XX)**: Initial version with comprehensive full-stack chat application and quantum mechanics theming
