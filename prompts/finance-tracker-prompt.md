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
# Finance Tracker ETL Application - Comprehensive Improvement Prompt

## Current Application Analysis

Your finance tracker is a well-architected ETL pipeline with these strengths:

**✅ Strengths:**
- Comprehensive multi-format support (CSV/PDF)
- Multi-bank support (Chase, BOA, Citi)
- Robust PDF processing with 7+ extraction methods
- Smart file organization with duplicate detection
- Rich CLI interface with progress tracking
- Extensive configuration system
- Good test coverage
- Proper error handling and recovery

**❌ Issues to Address:**
- Complex file organization workflow (multiple scripts)
- Heavy dependency on external tools (Java, Tesseract, etc.)
- Inconsistent CLI structure (some commands call subprocess)
- No database integration for persistent storage
- Limited data analysis capabilities
- No web interface for easier usage
- Complex configuration files that could be simplified
- No real-time processing or monitoring

## Comprehensive Requirements for Better Version

Create a modern, production-ready finance tracker ETL application that addresses the limitations of the current system while preserving its core strengths. The application should be a comprehensive financial data management platform.

### Core Requirements

**1. Architecture & Technology Stack**
- Use modern Python (3.11+) with type hints throughout
- Implement a clean, modular architecture with clear separation of concerns
- Use FastAPI for a web API interface alongside CLI
- Implement SQLAlchemy with PostgreSQL for persistent data storage
- Use Pydantic v2 for data validation and serialization
- Implement async/await patterns for better performance
- Use Docker for containerization and easy deployment
- Implement proper logging with structured logging (JSON format)

**2. Simplified User Experience**
- **Single Command Processing**: Replace the complex multi-step workflow with a single command that handles everything intelligently
- **Web Dashboard**: Create a modern web interface for file upload, processing status, and data visualization
- **Smart File Detection**: Automatically detect file types and banks without manual configuration
- **Real-time Processing**: Show live progress updates during file processing
- **Batch Processing**: Handle multiple files efficiently with proper error handling

**3. Enhanced Data Processing**
- **Universal PDF Parser**: Create a single, intelligent PDF parser that works across all banks without bank-specific code
- **AI-Powered Extraction**: Use OCR and NLP to extract transaction data more accurately
- **Automatic Categorization**: Implement ML-based transaction categorization
- **Duplicate Detection**: Use fuzzy matching and ML to detect duplicate transactions across accounts
- **Data Enrichment**: Integrate with external APIs for merchant information and categorization

**4. Data Storage & Management**
- **Database-First**: Store all processed data in PostgreSQL with proper indexing
- **Audit Trail**: Track all file processing and data changes
- **Data Versioning**: Implement data versioning for tracking changes over time
- **Backup & Recovery**: Automated backup and recovery procedures
- **Data Export**: Multiple export formats (CSV, JSON, Excel, PDF reports)

**5. Advanced Features**
- **Real-time Notifications**: Email/SMS alerts for processing completion or errors
- **Scheduled Processing**: Automatically process new files from watched directories
- **Data Analytics**: Built-in analytics dashboard with charts and insights
- **Multi-user Support**: User authentication and role-based access
- **API Integration**: RESTful API for external integrations
- **Mobile Support**: Responsive web design for mobile access

### Technical Specifications

**Backend Structure:**
```
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
```

**Key Components:**

1. **Universal File Processor**
   - Single entry point that handles all file types
   - Automatic format detection and bank identification
   - Intelligent error recovery and retry mechanisms
   - Progress tracking and status updates

2. **Smart PDF Extractor**
   - Use computer vision and NLP for universal PDF parsing
   - No bank-specific code required
   - Automatic table detection and data extraction
   - Fallback mechanisms for different PDF formats

3. **Data Pipeline**
   - Async processing pipeline with proper error handling
   - Data validation at each step
   - Automatic data cleaning and normalization
   - Transaction deduplication across accounts

4. **Web Dashboard**
   - Modern, responsive interface
   - File upload with drag-and-drop
   - Real-time processing status
   - Data visualization and analytics
   - Export and reporting tools

5. **API Layer**
   - RESTful API for all operations
   - OpenAPI/Swagger documentation
   - Authentication and authorization
   - Rate limiting and security

### Database Schema

Design a comprehensive schema that includes:
- **Files**: Track all uploaded files with metadata
- **Transactions**: Store normalized transaction data
- **Accounts**: Bank account information
- **Categories**: Transaction categorization
- **Processing Jobs**: Track processing status and history
- **Users**: Multi-user support
- **Audit Logs**: Complete audit trail

### Configuration Management

- **Environment-based**: Use environment variables for configuration
- **Database-driven**: Store configuration in database for runtime updates
- **Validation**: Validate all configuration at startup
- **Defaults**: Sensible defaults that work out of the box

### Testing Strategy

- **Unit Tests**: 90%+ code coverage
- **Integration Tests**: Test complete workflows
- **E2E Tests**: Test web interface and API
- **Performance Tests**: Load testing for large files
- **Security Tests**: Vulnerability scanning

### Deployment & DevOps

- **Docker Compose**: Easy local development
- **Kubernetes**: Production deployment
- **CI/CD**: Automated testing and deployment
- **Monitoring**: Health checks and metrics
- **Backup**: Automated database backups

### Migration Path

- **Data Migration**: Tool to migrate existing data
- **Configuration Migration**: Convert existing config files
- **Gradual Rollout**: Support both old and new systems during transition

### Performance Requirements

- **Processing Speed**: Handle 1000+ transactions per second
- **File Size**: Support files up to 100MB
- **Concurrent Users**: Support 10+ simultaneous users
- **Response Time**: API responses under 200ms
- **Uptime**: 99.9% availability

### Security Requirements

- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control
- **Data Encryption**: Encrypt sensitive data at rest
- **Input Validation**: Comprehensive input sanitization
- **Audit Logging**: Complete audit trail

### Documentation

- **API Documentation**: Auto-generated OpenAPI docs
- **User Guide**: Comprehensive user documentation
- **Developer Guide**: Setup and development instructions
- **Architecture Docs**: System design and architecture
- **Troubleshooting**: Common issues and solutions

### Success Criteria

The improved system should:
1. **Reduce complexity**: Single command to process any file
2. **Improve reliability**: 99%+ success rate on file processing
3. **Enhance usability**: Web interface for non-technical users
4. **Scale better**: Handle larger datasets and more users
5. **Maintain data quality**: Better duplicate detection and validation
6. **Provide insights**: Built-in analytics and reporting
7. **Enable automation**: Scheduled processing and notifications

## Implementation Priority

**Phase 1: Core Infrastructure**
- Set up FastAPI backend with PostgreSQL
- Implement basic file upload and processing
- Create universal PDF parser
- Basic web interface

**Phase 2: Enhanced Features**
- Advanced data processing and validation
- User authentication and authorization
- Real-time notifications
- Data analytics dashboard

**Phase 3: Advanced Capabilities**
- ML-based categorization
- Advanced duplicate detection
- API integrations
- Mobile optimization

**Focus on creating 
