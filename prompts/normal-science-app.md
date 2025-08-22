# Normal Science App - Full Stack Development Specification

You are an expert full-stack engineer. Build a minimal app that runs locally on my laptop with production-ready architecture for AWS deployment.

**IMPORTANT**: When you create any code or files, save this exact prompt as `original-prompt-$(git rev-parse --short HEAD).md` in the root directory of the project to preserve the original instructions with version tracking.

## Architecture Overview

- Two directories: `/web` and `/api`
- Production deployment to `normalscience.com` domain
- Mock AWS Cognito authentication (ready for real Cognito integration)
- **Design Language**: Must match normalscience.com's current design system

## Frontend (/web) - React + Vite + TypeScript + Tailwind

### Pages & Features
- **Landing page**: Login button (simulates AWS Cognito authentication)
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
- **Background**: Subtle texture overlay that matches normalscience.com's background treatment

### Background Design
Use provided SVG noise pattern as background across all pages:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0" />
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.4" />
    </feComponentTransfer>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)" fill="#f5f1e8" />
</svg>
```
- Apply as CSS background pattern with higher visibility (0.4 slope)
- Ensure proper contrast with text content
- Optimize for performance (consider base64 encoding)
- **Must match normalscience.com's background treatment**

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
- **Validation**: Validate request structure, return 400 for invalid requests, 500 for server errors
- **Error Handling**: Network failures, HTTP errors, JSON parsing. Log errors to console for CloudWatch integration
- **Logging**: Structured console logging (console.log, console.error, console.warn with timestamps). Future CloudWatch integration via AWS SDK v3

## Authentication (Mock Cognito)

- **Mock SDK**: Simulate AWS Cognito authentication flow with signIn, signOut, getCurrentUser
- **Session Management**: React Context for in-memory session storage, expires on page refresh
- **Token Expiration**: Mock tokens expire after 1 hour, redirect to login and clear session when expired
- **Loading States**: Handle async authentication with loading states
- **Error Handling**: Auth failures (invalid credentials, network errors)
- **TypeScript**: Interfaces matching Cognito user structure
- **Direct Redirect**: After login, redirect directly to protected chat content (no intermediate pages)

## Environment & Configuration

### Development
- **CORS**: Local development only - origin http://localhost:5173, methods GET/POST
- **Proxy**: Vite dev proxy `/api` → `http://localhost:4000`
- **Ports**: Hardcoded 5173 (web) and 4000 (api)

### Production
- **Domain**: normalscience.com (eliminates CORS requirement)
- **Environment Detection**: Use NODE_ENV for environment-specific configurations
- **No Proxy**: Same-domain deployment

## Dependencies

### /web Dependencies
- **Core**: react, react-dom, vite, typescript, @vitejs/plugin-react, tailwindcss, postcss, autoprefixer
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
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── pages/
│       │   ├── Landing.tsx
│       │   └── Chat.tsx
│       └── lib/
│           └── auth.ts
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
- **Background texture is clearly visible and matches reference site**
- **No taglines or descriptive text under company heading**

## Local Development Instructions

1. `cd api && npm install && npm run dev` (runs on http://localhost:4000)
2. `cd web && npm install && npm run dev` (runs on http://localhost:5173)
3. Open browser to http://localhost:5173
4. Click Login → Chat (direct access to protected content)
5. Send a message and confirm response
6. Run `npm run test:e2e` to verify functionality

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

## Future Enhancements

- Real AWS Cognito integration
- CloudWatch logging implementation
- Production environment configurations
- Advanced error handling and retry logic
- Performance monitoring and optimization
- CI/CD pipeline setup
- **LLM Integration**: Replace mock chat with real AI-powered responses
- **Design System**: Create comprehensive design tokens matching normalscience.com

---

**Note**: The design system must be extracted from normalscience.com and implemented consistently throughout the application. All visual elements should maintain the same look and feel as the existing site while adding the new chat functionality. The company heading must appear on one line with no taglines or descriptive text underneath.
