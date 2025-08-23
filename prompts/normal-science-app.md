# Normal Science App - Full Stack Development Specification

You are an expert full-stack engineer. Build a minimal app that runs locally on my laptop with production-ready architecture for AWS deployment.

**IMPORTANT**: When you create any code or files, save this exact prompt as `original-prompt-$(git rev-parse --short HEAD).md` in the root directory of the project to preserve the original instructions with version tracking.

## Architecture Overview

- Two directories: `/web` and `/api`
- Production deployment to `normalscience.com` domain
- AWS Cognito authentication with custom domain (auth.normalscience.com)
- **Design Language**: Must match normalscience.com's current design system

## Design System

### Colors
- **Parchment**: `#f5f1e8` (background)
- **Ink**: `#2d2d2d` (primary text)
- **Sunlight**: `#e2c275` (accent)
- **Navy**: `#274060` (supplemental)
- **Dark Green**: `#2d5a27` (supplemental)
- **Maroon**: `#6a0f17` (supplemental)

### Typography
- **Headings**: Fira Sans
- **Body**: IBM Plex Serif

### Tailwind Configuration
```javascript
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
```

### Font Loading
```html
<!-- In index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:wght@400;500;600&display=swap" rel="stylesheet">
```

## Frontend (/web) - React + Vite + TypeScript + Tailwind

### Pages & Features
- **Landing page**: Login button (AWS Cognito authentication)
- **Chat page**: Textbox, Send button, transcript area (protected content)
  - Messages are ephemeral (not persisted)
  - Calls POST /api/chat and displays response
  - Handles API failures with user-friendly error messages
  - Disables Send button during API calls
  - **Direct access after login** (no intermediate welcome page)

### Technical Requirements
- **State Management**: React Context for global state (authentication, user session), local state for component-specific data
- **Error Handling**: Wrap main App component in React error boundary with fallback UI and reload option
- **Loading States**: Show loading indicators during async operations (login, API calls), disable buttons during operations
- **Accessibility**: Semantic HTML elements, alt text for images, keyboard navigation, basic ARIA labels, color contrast ratios
- **Responsive Design**: Mobile-first approach using Tailwind responsive utilities across mobile, tablet, and desktop breakpoints
- **Performance**: Optimize bundle size, lazy load components if needed, basic image optimization

### Design System Requirements
- **Company Branding**: "The Normal Science Company" (not "Normal Science App") - must appear on one line
- **No Taglines**: No descriptive text, slogans, or subtitles under the company heading
- **Color Scheme**: Must match normalscience.com's current design language
- **Typography**: Consistent with normalscience.com's font choices
- **Layout**: Maintain visual consistency with existing site design
- **Background**: Artistic representation of the double-slit experiment photon detection pattern

### Background Texture Implementation
The background represents the photon detection pattern from the double-slit experiment - where individual photons create an interference pattern over time. This creates a subtle, artistic representation of quantum mechanics.

```css
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

/* Subtle interference pattern overlay */
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
```

### Background Texture Testing
- Test on multiple browsers (Chrome, Firefox, Safari)
- Verify texture is visible on first page load
- Test with different screen resolutions
- Ensure texture doesn't interfere with text readability
- Verify texture creates the intended quantum interference pattern effect
- **CRITICAL**: Texture must be immediately visible without cache clearing or hard refresh

## Backend (/api) - Node 20 + Express + TypeScript

### API Endpoints
- **GET /healthz**: `{ success: true, data: { status: "ok" }, timestamp: string }`
- **POST /api/chat**: Accept `{ prompt: string }`, return standardized response format:
  ```typescript
  {
    success: boolean,
    data?: { reply: string, prompt: string },
    error?: string,
    timestamp: string
  }
  ```

### Technical Requirements
- **Validation**: Basic input validation for chat messages (length, content type)
- **Error Handling**: Network failures, HTTP errors, JSON parsing. Log errors to console for CloudWatch integration
- **Logging**: Structured console logging (console.log, console.error, console.warn with timestamps). Future CloudWatch integration via AWS SDK v3

### Security Requirements
- **Input Validation**: Basic validation for chat messages
  ```typescript
  const validateChatInput = (prompt: string) => {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid input: prompt must be a non-empty string');
    }
    if (prompt.length > 1000) {
      throw new Error('Invalid input: prompt too long (max 1000 characters)');
    }
    // Basic content validation
    if (prompt.trim().length === 0) {
      throw new Error('Invalid input: prompt cannot be empty');
    }
  }
  ```
- **Rate Limiting**: Basic rate limiting on chat endpoint (100 requests per minute per IP)
- **Authentication**: Secure AWS Cognito authentication implementation

## Authentication (AWS Cognito)

### Environment Variables Setup

#### Global Environment (Add to ~/.zshrc)
```bash
# Normal Science App Cognito Configuration
# Replace these placeholder values with your actual Cognito credentials
export NORMAL_SCIENCE_COGNITO_AUTHORITY="https://cognito-idp.us-east-1.amazonaws.com/YOUR_USER_POOL_ID"
export NORMAL_SCIENCE_COGNITO_CLIENT_ID="YOUR_CLIENT_ID"
export NORMAL_SCIENCE_COGNITO_DOMAIN="https://auth.normalscience.com"
```

#### Local Environment (.env.local)
```bash
VITE_COGNITO_AUTHORITY=$NORMAL_SCIENCE_COGNITO_AUTHORITY
VITE_COGNITO_CLIENT_ID=$NORMAL_SCIENCE_COGNITO_CLIENT_ID
VITE_COGNITO_DOMAIN=$NORMAL_SCIENCE_COGNITO_DOMAIN
```

#### Environment Variable Validation
The application should validate that all required environment variables are present:
```typescript
// Add to auth configuration
if (!import.meta.env.VITE_COGNITO_AUTHORITY) {
  throw new Error('Missing VITE_COGNITO_AUTHORITY environment variable');
}
if (!import.meta.env.VITE_COGNITO_CLIENT_ID) {
  throw new Error('Missing VITE_COGNITO_CLIENT_ID environment variable');
}
if (!import.meta.env.VITE_COGNITO_DOMAIN) {
  throw new Error('Missing VITE_COGNITO_DOMAIN environment variable');
}
```

### Cognito Configuration
```typescript
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssmClient = new SSMClient({ region: "us-east-1" });

const getParameter = async (parameterName: string): Promise<string> => {
  try {
    const command = new GetParameterCommand({
      Name: parameterName,
      WithDecryption: true,
    });
    const response = await ssmClient.send(command);
    return response.Parameter?.Value || "";
  } catch (error) {
    console.error(`Error fetching parameter ${parameterName}:`, error);
    return "";
  }
};

const getAuthConfig = async () => {
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    // Use local environment variables for development
    return {
      authority: import.meta.env.VITE_COGNITO_AUTHORITY,
      client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
      redirect_uri: "http://localhost:5173/auth/callback",
      response_type: "code",
      scope: "openid email",
      post_logout_redirect_uri: "http://localhost:5173/",
      loadUserInfo: false,
      automaticSilentRenew: true,
      silent_redirect_uri: "http://localhost:5173/silent-renew.html",
    };
  } else {
    // Use Parameter Store for production
    const authority = await getParameter("/normalscience/cognito/authority");
    const clientId = await getParameter("/normalscience/cognito/client-id");
    
    return {
      authority,
      client_id: clientId,
      redirect_uri: "https://normalscience.com/auth/callback",
      response_type: "code",
      scope: "openid email",
      post_logout_redirect_uri: "https://normalscience.com/",
      loadUserInfo: false,
      automaticSilentRenew: true,
      silent_redirect_uri: "https://normalscience.com/silent-renew.html",
    };
  }
};
```

### Cognito Domain
- **Custom Domain**: `https://auth.normalscience.com`
- **CNAME Record**: `auth.normalscience.com` → Cognito alias target

### Allowed URLs (Cognito App Client Configuration)
- **Callback URLs**:
  - `http://localhost:5173/auth/callback` (development)
  - `https://normalscience.com/auth/callback` (production)
- **Sign-out URLs**:
  - `http://localhost:5173/` (development)
  - `https://normalscience.com/` (production)

### Dependencies Required
```json
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
```

### Implementation Requirements
- **Auth Provider**: Wrap App with AuthProvider from react-oidc-context
- **Session Management**: Use Cognito tokens with automatic refresh
- **Loading States**: Handle async authentication with loading states
- **Error Handling**: Auth failures (network errors, token expiration)
- **TypeScript**: Interfaces matching Cognito user structure
- **Direct Redirect**: After login, redirect directly to protected chat content (no intermediate pages)

### Cognito App Client Configuration Requirements
- **Client Type**: Public (no client secret)
- **OAuth Flows**: Authorization code grant
- **Callback URLs**: Must include exact development and production URLs
- **Allowed OAuth Scopes**: openid, email
- **PKCE**: Required for public clients (handled automatically by oidc-client-ts)

### IAM Permissions Required
```json
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

## Environment & Configuration

### Development
- **CORS**: Local development only - origin http://localhost:5173, methods GET/POST
- **Proxy**: Vite dev proxy `/api` → `http://localhost:4000`
- **Ports**: Hardcoded 5173 (web) and 4000 (api)

### Production
- **Domain**: normalscience.com (eliminates CORS requirement)
- **Environment Detection**: Use NODE_ENV for environment-specific configurations
- **No Proxy**: Same-domain deployment

### Production Environment Variables (AWS Parameter Store)
```bash
# Store these parameters in AWS Systems Manager Parameter Store
# Replace placeholder values with your actual Cognito credentials

aws ssm put-parameter --name "/normalscience/cognito/authority" --value "https://cognito-idp.us-east-1.amazonaws.com/YOUR_USER_POOL_ID" --type "SecureString"
aws ssm put-parameter --name "/normalscience/cognito/client-id" --value "YOUR_CLIENT_ID" --type "SecureString"
aws ssm put-parameter --name "/normalscience/cognito/domain" --value "https://auth.normalscience.com" --type "SecureString"

# To verify parameters:
aws ssm describe-parameters --parameter-filters "Key=Name,Option=BeginsWith,Values=/normalscience" --region us-east-1

# To retrieve a parameter:
aws ssm get-parameter --name "/normalscience/cognito/authority" --with-decryption --region us-east-1
```

## Dependencies

### Root Dependencies (for enhanced scripts)
```json
{
  "devDependencies": {
    "concurrently": "^8.0.0",
    "wait-on": "^7.0.0"
  }
}
```

### /web Dependencies
- **Core**: react, react-dom, vite, typescript, @vitejs/plugin-react, tailwindcss, postcss, autoprefixer
- **Auth**: oidc-client-ts@^2.4.1, react-oidc-context@^2.4.0, @aws-sdk/client-ssm
- **Routing**: react-router-dom (optional, for callback routes)
- **Dev**: @types/react, @types/react-dom
- **Testing**: playwright, @playwright/test

### /api Dependencies
- **Core**: express, cors
- **Dev**: typescript, ts-node, nodemon, @types/express, @types/cors

## Configuration

### TypeScript
- **Strict Mode**: Enable strict mode (strict: true, noImplicitAny: true, strictNullChecks: true) in both /web and /api
- **/web**: jsx: "react-jsx", moduleResolution: "Bundler"
- **/api**: CommonJS (no "type": "module"), compile to dist with outDir

### Tailwind
- **Content**: ["./index.html", "./src/**/*.{ts,tsx}"]
- **Responsive**: Mobile-first with Tailwind utilities
- **Custom Colors**: Extend with normalscience.com's color palette

### Build Outputs
- **/web/dist/**: Vite build output
- **/api/dist/**: TypeScript compilation
- **Gitignore**: Both directories

## Scripts

### /web Scripts
- `"dev": "vite --port 5173"`
- `"build": "vite build"`
- `"preview": "vite preview --port 5173"`
- `"test:e2e": "playwright test"`

### /api Scripts
- `"dev": "nodemon src/index.ts"`
- `"build": "tsc"`
- `"start": "node dist/index.js"`

## Development Server Management

### Background Process Requirements
- All development servers must be started in background using `&` operator
- Implement proper health checks before proceeding with tests
- Use process management for cleanup after testing
- Never wait for dev servers to "finish" as they are long-running processes

### Required Scripts
The application must include scripts that handle server management:
- `npm run dev:all` - Start both servers in background
- `npm run test:e2e` - Start servers, run tests, cleanup
- `npm run test:cleanup` - Stop all dev servers

### Enhanced Development Scripts Implementation

#### Root Package.json
```json
{
  "scripts": {
    "dev:all": "concurrently --kill-others --prefix \"[{name}]\" --names \"API,WEB\" \"cd api && npm run dev\" \"cd web && npm run dev\"",
    "test:e2e": "npm run dev:all && wait-on -t 30000 http://localhost:4000/healthz http://localhost:5173/index.html && playwright test && npm run test:cleanup",
    "test:cleanup": "pkill -f 'npm run dev' || pkill -f 'vite' || pkill -f 'nodemon' || true",
    "install:all": "cd api && npm install && cd ../web && npm install"
  }
}
```

#### Dependencies Required
```json
{
  "devDependencies": {
    "concurrently": "^8.0.0",
    "wait-on": "^7.0.0"
  }
}
```

#### Script Functionality
- **`dev:all`**: Uses `concurrently` to run both servers simultaneously with clear logging
- **`test:e2e`**: Starts servers, waits for health endpoints, runs tests, cleans up
- **`test:cleanup`**: Kills all development processes with fallback options
- **`install:all`**: Installs dependencies for both API and web projects

### Testing Workflow
1. Start servers in background with health verification
2. Run tests or manual verification
3. Clean up processes when complete
4. Document any manual steps required for testing

## Testing

### E2E Testing (Playwright)
- Test navigation: Landing → Chat (direct after login)
- Test login flow (click login, verify chat page access)
- Test chat functionality (send message, verify response)
- Test logout flow (click logout, verify return to landing)
- Test error states and API failures
- Test design consistency with normalscience.com
- Runs in headless mode for CI/CD compatibility

## Deliverables

### Directory Structure
```
/
├── original-prompt-{git-hash}.md  # This exact prompt with version tracking
├── web/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── .env.local
│   ├── public/
│   │   ├── vite.svg
│   │   └── silent-renew.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── config/
│       │   └── auth.ts
│       └── pages/
│           ├── Landing.tsx
│           ├── Chat.tsx
│           └── AuthCallback.tsx
├── api/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       └── routes/
│           └── chat.ts
└── README.md
```

### Required Files
- **original-prompt-{git-hash}.md**: This exact prompt saved with git commit hash for version tracking
- All configuration files (package.json, tsconfig.json, etc.)
- All source files with proper imports and paths
- README.md with local development instructions

### Required Files for Authentication
- `web/public/silent-renew.html` - Required for token refresh
- `web/src/pages/AuthCallback.tsx` - Optional callback handler
- `web/.env.local` - Development environment variables
- `web/public/vite.svg` - Custom favicon

## Quality Gates

- All file imports and paths correct
- CORS restricted to http://localhost:5173 in development
- Chat page handles error states properly
- No external services, env vars, or secrets required
- E2E tests pass in headless mode
- TypeScript strict mode enabled and no errors
- Responsive design works across breakpoints
- Accessibility requirements met
- **Design matches normalscience.com's visual language**
- **Background texture represents double-slit experiment photon detection pattern**
- **Background Texture**: Must be clearly visible on first page load
- **Texture Density**: 6 gradient layers with opacity 0.03-0.08 for subtle quantum pattern
- **Interference Pattern**: Diagonal line overlay represents wave interference
- **No SVG Dependencies**: Background must not rely on SVG data URLs
- **Immediate Visibility**: Texture visible without cache clearing or hard refresh
- **No taglines or descriptive text under company heading**

## Local Development Instructions

### Option 1: Manual Server Management
1. `cd api && npm install && npm run dev &` (background, runs on http://localhost:4000)
2. `cd web && npm install && npm run dev &` (background, runs on http://localhost:5173)
3. Wait 3-5 seconds for servers to initialize
4. Verify servers: `curl http://localhost:4000/healthz` and `curl http://localhost:5173/`
5. Open browser to http://localhost:5173
6. Click Login → Chat (direct access to protected content)
7. Send a message and confirm response
8. Run `npm run test:e2e` to verify functionality
9. Cleanup: `pkill -f "npm run dev"`

### Option 2: Using Enhanced Scripts
1. `npm run dev:all` (starts both servers in background)
2. Wait for health checks to pass
3. Open browser to http://localhost:5173
4. Test functionality manually or run `npm run test:e2e`
5. `npm run test:cleanup` (stops all servers)

## Design Integration Requirements

### Color Scheme
- **Primary Colors**: Must match normalscience.com's primary color palette
- **Background Colors**: Match the existing site's background treatment
- **Text Colors**: Ensure proper contrast ratios with normalscience.com's color scheme
- **Accent Colors**: Use normalscience.com's accent colors for interactive elements

### Typography
- **Font Family**: Match normalscience.com's font choices
- **Font Weights**: Use consistent font weight hierarchy
- **Font Sizes**: Maintain typographic scale from reference site

### Layout & Spacing
- **Grid System**: Follow normalscience.com's layout patterns
- **Spacing**: Use consistent spacing scale
- **Component Sizing**: Match existing component dimensions

### Interactive Elements
- **Button Styles**: Match normalscience.com's button design
- **Form Elements**: Use consistent input styling
- **Hover States**: Match existing hover interactions
- **Focus States**: Ensure accessibility while maintaining design consistency

## Authentication Troubleshooting

### Common Issues
1. **400 Bad Request on Token Exchange**: Usually indicates PKCE mismatch or incorrect redirect URI
2. **CORS Errors**: Check that callback URLs are exactly configured in Cognito
3. **Silent Renew Failures**: Ensure silent-renew.html exists and is accessible
4. **Environment Variable Errors**: Missing or incorrect environment variables cause silent failures
5. **Custom Domain Issues**: Custom domains require explicit metadata configuration

### Debugging Steps
1. Check browser Network tab for failed requests
2. Verify environment variables are loaded correctly
3. Test with standard Cognito hosted UI first
4. Check Cognito app client configuration
5. Verify custom domain DNS settings
6. Check browser console for detailed error messages
7. Verify redirect URIs match exactly (including trailing slashes)

### Development vs Production Auth Strategy
- **Development**: Use standard Cognito hosted UI for simplicity and easier debugging
- **Production**: Use custom domain with explicit metadata configuration for branding

### Error Handling for Token Exchange Failures
```typescript
try {
  await auth.signinCallback();
} catch (error) {
  console.error('Token exchange failed:', error);
  // Handle 400 Bad Request errors specifically
  if (error.message?.includes('400')) {
    // Log detailed error information
    console.error('Token exchange 400 error details:', error);
  }
}
```

### Browser Network Debugging Instructions
```markdown
## Debugging Authentication Issues
- Check browser Network tab for token exchange requests
- Look for 400 Bad Request errors in token endpoint
- Verify redirect URIs match exactly (including trailing slashes)
- Check CORS headers in preflight requests
- Look for PKCE code_verifier mismatches
```

## Future Enhancements

- CloudWatch logging implementation
- Production environment configurations
- Advanced error handling and retry logic
- Performance monitoring and optimization
- CI/CD pipeline setup
- **LLM Integration**: Replace placeholder chat with real AI-powered responses
- **Design System**: Create comprehensive design tokens matching normalscience.com

---

**Note**: The design system must be extracted from normalscience.com and implemented consistently throughout the application. All visual elements should maintain the same look and feel as the existing site while adding the new chat functionality. The company heading must appear on one line with no taglines or descriptive text underneath. The background texture represents the photon detection pattern from the double-slit experiment, creating a subtle artistic representation of quantum mechanics.
