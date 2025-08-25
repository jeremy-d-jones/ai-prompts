---
description: 'Comprehensive ETL pipeline for processing bank statements and transaction data with multi-format support'
mode: 'prompt'
tags: ['python', 'etl', 'finance', 'data-processing', 'pdf-parsing', 'banking', 'automation', 'fastapi', 'postgresql']
difficulty: 'advanced'
author: 'Jeremy D. Jones'
version: '1.0'
lastUpdated: '2025-01-XX'
prerequisites: ['Python 3.11+', 'ETL concepts', 'PDF processing', 'FastAPI', 'PostgreSQL', 'Docker']
estimatedTime: '30-60 minutes'
useCase: 'Building a production-ready financial data processing system'
---

## HEADER

* **name:** finance-tracker-etl
* **version:** 2.0.0
* **status:** stable
* **owner:** Jeremy D. Jones
* **created:** 2025-01-XX
* **updated:** 2025-01-XX
* **tags:** python, etl, finance, data-processing, pdf-parsing, banking, automation, fastapi, postgresql
* **summary:** Modern, production-ready finance tracker ETL application with web dashboard, universal PDF parsing, and comprehensive data management

---

## INTERFACES

### Inputs
* **file_inputs** (array) — Bank statement files in CSV, PDF, or other formats
* **bank_types** (array) — Supported banks: Chase, BOA, Citi, universal
* **processing_mode** (enum) — Single file, batch, scheduled
* **output_formats** (array) — CSV, JSON, Excel, PDF reports
* **categorization_rules** (json) — ML-based transaction categorization rules

### Outputs
* **Processed transactions** (json) — Normalized transaction data
* **Analytics dashboard** (html) — Web interface with charts and insights
* **Export files** (files) — Multiple format exports
* **Audit trail** (json) — Complete processing history

### Assumptions
* User has bank statement files to process
* Database and web server infrastructure available
* Modern Python environment with required dependencies

### Non-goals
* Real-time banking integration (file-based processing only)
* Complex financial analysis beyond basic categorization
* Multi-currency support in initial version

---

## BLOCKS

### [block]
**block_id:** system-mission
**role:** system
**purpose:** Define the finance tracker's mission and capabilities
**content:**
```
You are an expert full-stack engineer building a modern, production-ready finance tracker ETL application. Your mission is to create a comprehensive financial data management platform that addresses the limitations of existing systems while preserving core strengths. The application should provide a simplified user experience with web dashboard, universal PDF parsing, and advanced data processing capabilities.
```

### [block]
**block_id:** architecture-overview
**role:** developer
**purpose:** Define the modern architecture and technology stack
**content:**
```
Architecture & Technology Stack:
- Modern Python (3.11+) with type hints throughout
- Clean, modular architecture with clear separation of concerns
- FastAPI for web API interface alongside CLI
- SQLAlchemy with PostgreSQL for persistent data storage
- Pydantic v2 for data validation and serialization
- Async/await patterns for better performance
- Docker for containerization and easy deployment
- Structured logging (JSON format)
- React/Vue.js frontend for web dashboard
```

### [block]
**block_id:** simplified-ux
**role:** developer
**purpose:** Define simplified user experience requirements
**content:**
```
Simplified User Experience:
- Single Command Processing: Replace complex multi-step workflow with intelligent single command
- Web Dashboard: Modern web interface for file upload, processing status, data visualization
- Smart File Detection: Automatically detect file types and banks without manual configuration
- Real-time Processing: Show live progress updates during file processing
- Batch Processing: Handle multiple files efficiently with proper error handling
- Drag-and-drop file upload interface
- Responsive design for mobile access
```

### [block]
**block_id:** enhanced-data-processing
**role:** developer
**purpose:** Define advanced data processing capabilities
**content:**
```
Enhanced Data Processing:
- Universal PDF Parser: Single, intelligent PDF parser working across all banks
- AI-Powered Extraction: Use OCR and NLP for accurate transaction data extraction
- Automatic Categorization: ML-based transaction categorization
- Duplicate Detection: Fuzzy matching and ML to detect duplicate transactions
- Data Enrichment: Integrate with external APIs for merchant information
- Data Validation: Comprehensive validation at each processing step
- Data Cleaning: Automatic normalization and standardization
```

### [block]
**block_id:** data-storage-management
**role:** developer
**purpose:** Define comprehensive data storage and management
**content:**
```
Data Storage & Management:
- Database-First: Store all processed data in PostgreSQL with proper indexing
- Audit Trail: Track all file processing and data changes
- Data Versioning: Implement data versioning for tracking changes over time
- Backup & Recovery: Automated backup and recovery procedures
- Data Export: Multiple export formats (CSV, JSON, Excel, PDF reports)
- Multi-user Support: User authentication and role-based access
- Data Encryption: Encrypt sensitive data at rest
```

### [block]
**block_id:** technical-specifications
**role:** developer
**purpose:** Define detailed technical specifications and structure
**content:**
```
Technical Specifications:
Backend Structure:
finance-tracker-v2/
├── app/
│   ├── api/                 # FastAPI routes
│   ├── core/               # Core business logic
│   ├── models/             # SQLAlchemy models
│   ├── services/           # Business services
│   ├── utils/              # Utility functions
│   └── workers/            # Background task workers
├── frontend/               # React/Vue.js dashboard
├── docker/                 # Docker configuration
├── migrations/             # Database migrations
├── tests/                  # Comprehensive test suite
└── docs/                   # API documentation

Key Components:
1. Universal File Processor - Single entry point for all file types
2. Smart PDF Extractor - Computer vision and NLP for universal parsing
3. Data Pipeline - Async processing with error handling
4. Web Dashboard - Modern, responsive interface
5. API Layer - RESTful API with OpenAPI documentation
```

### [block]
**block_id:** database-schema
**role:** developer
**purpose:** Define comprehensive database schema design
**content:**
```
Database Schema:
- Files: Track all uploaded files with metadata
- Transactions: Store normalized transaction data
- Accounts: Bank account information
- Categories: Transaction categorization
- Processing Jobs: Track processing status and history
- Users: Multi-user support
- Audit Logs: Complete audit trail
- Configuration: Runtime configuration storage
- Notifications: Email/SMS alert settings
```

### [block]
**block_id:** configuration-management
**role:** developer
**purpose:** Define configuration management approach
**content:**
```
Configuration Management:
- Environment-based: Use environment variables for configuration
- Database-driven: Store configuration in database for runtime updates
- Validation: Validate all configuration at startup
- Defaults: Sensible defaults that work out of the box
- Security: Secure storage of sensitive configuration
- Hot-reload: Update configuration without restart
```

### [block]
**block_id:** testing-strategy
**role:** developer
**purpose:** Define comprehensive testing approach
**content:**
```
Testing Strategy:
- Unit Tests: 90%+ code coverage
- Integration Tests: Test complete workflows
- E2E Tests: Test web interface and API
- Performance Tests: Load testing for large files
- Security Tests: Vulnerability scanning
- Data Validation Tests: Ensure data integrity
- API Tests: Comprehensive API endpoint testing
```

### [block]
**block_id:** deployment-devops
**role:** developer
**purpose:** Define deployment and DevOps requirements
**content:**
```
Deployment & DevOps:
- Docker Compose: Easy local development
- Kubernetes: Production deployment
- CI/CD: Automated testing and deployment
- Monitoring: Health checks and metrics
- Backup: Automated database backups
- Security: Container security scanning
- Performance: Resource monitoring and optimization
```

### [block]
**block_id:** performance-requirements
**role:** developer
**purpose:** Define performance and scalability requirements
**content:**
```
Performance Requirements:
- Processing Speed: Handle 1000+ transactions per second
- File Size: Support files up to 100MB
- Concurrent Users: Support 10+ simultaneous users
- Response Time: API responses under 200ms
- Uptime: 99.9% availability
- Scalability: Horizontal scaling capability
- Memory Usage: Efficient memory management for large files
```

### [block]
**block_id:** security-requirements
**role:** developer
**purpose:** Define comprehensive security requirements
**content:**
```
Security Requirements:
- Authentication: JWT-based authentication
- Authorization: Role-based access control
- Data Encryption: Encrypt sensitive data at rest
- Input Validation: Comprehensive input sanitization
- Audit Logging: Complete audit trail
- API Security: Rate limiting and security headers
- Container Security: Secure container configuration
- Dependency Scanning: Regular security vulnerability scanning
```

---

## ASSEMBLY

```
assembly_order:
  - system-mission
  - architecture-overview
  - simplified-ux
  - enhanced-data-processing
  - data-storage-management
  - technical-specifications
  - database-schema
  - configuration-management
  - testing-strategy
  - deployment-devops
  - performance-requirements
  - security-requirements
inclusion_rules:
  - Always include system-mission and architecture-overview
  - Include simplified-ux for user-facing features
  - Include enhanced-data-processing for core functionality
  - Include security-requirements for production deployments
  - Include testing-strategy for quality assurance
rendering:
  - Generate complete application structure
  - Implement all required components
  - Create comprehensive documentation
  - Set up CI/CD pipeline
  - Configure monitoring and security
```

---

## VARIABLES

```yaml
- var: FILE_INPUTS
  type: array
  required: true
  validate: "min 1 file"
- var: BANK_TYPES
  type: array
  required: false
  default: ["chase", "boa", "citi", "universal"]
  validate: "chase|boa|citi|universal"
- var: PROCESSING_MODE
  type: enum
  required: false
  default: "single"
  validate: "single|batch|scheduled"
- var: OUTPUT_FORMATS
  type: array
  required: false
  default: ["csv", "json", "excel"]
  validate: "csv|json|excel|pdf"
- var: CATEGORIZATION_RULES
  type: json
  required: false
  default: '{"ml_enabled": true, "auto_categorize": true}'
- var: DATABASE_URL
  type: string
  required: true
  validate: "postgresql://.*"
- var: API_PORT
  type: int
  required: false
  default: 8000
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
* Focus on modern best practices and current technology standards

---

## TESTS

1. **File processing**: Successfully process various file formats and bank types
2. **PDF parsing**: Universal PDF parser works across different bank formats
3. **Data validation**: Comprehensive validation of processed transaction data
4. **Web dashboard**: Full functionality of web interface and API
5. **Performance**: Meet specified performance requirements under load
6. **Security**: All security requirements properly implemented
7. **Deployment**: Successful deployment and operation in containerized environment

---

## CHANGELOG

* **2.0.0 (2025-01-XX)**: Complete rewrite with modern architecture, web dashboard, and enhanced features
* **1.0.0 (2025-01-XX)**: Initial version with basic ETL capabilities 
