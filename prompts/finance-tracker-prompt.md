Prompt: Create a Modular, Lightweight Finance Tracker ETL System
Context
You are tasked with creating a modern, modular, and lightweight version of a comprehensive finance tracker ETL pipeline. The current system is feature-rich but has become monolithic and heavy, with 42+ dependencies and large files (some over 1000 lines). Your goal is to create a clean, maintainable architecture that preserves functionality while being much more modular and lightweight.
Current System Analysis
The existing system has these characteristics:
Strengths:
Comprehensive PDF processing with multiple extraction methods (pdfplumber, PyMuPDF, Camelot, OCR)
Flexible JSON-based configuration system
Rich CLI interface with progress tracking
Multi-bank support with extensible framework
Robust error handling and fallback mechanisms
Handles both CSV exports and PDF statements
Issues to Address:
Heavy Dependencies: 42+ packages including heavy PDF/OCR libraries
Monolithic Structure: Large files (transformer.py: 764 lines, pdf_extractor.py: 1161 lines)
Dual Architecture: Both legacy and modern code paths coexisting
Complex CLI: Multiple entry points with subprocess calls
Over-engineered: Many features that may not be essential for core functionality
Tight Coupling: Components are heavily interdependent
Requirements
Core Principles:
Plugin-based Architecture: Separate concerns into independent, swappable modules
Minimal Core: Essential functionality only in the main package
Optional Dependencies: Heavy features as optional plugins
Single Responsibility: Each module has one clear purpose
Async-First: Modern async/await patterns throughout
Type Safety: Full type hints and Pydantic validation
Testability: Small, focused modules that are easy to test
Functional Requirements:
Process CSV and PDF financial statements
Convert to canonical transaction format
Support multiple banks (Chase, BOA, Citi, extensible)
Handle file organization and duplicate detection
Provide CLI and API interfaces
Support batch processing
Include data validation and error handling
Non-Functional Requirements:
Lightweight: Core package should have minimal dependencies (<10 packages)
Modular: Clear separation of concerns with plugin architecture
Extensible: Easy to add new banks, formats, and storage backends
Maintainable: Clean, well-documented code with clear interfaces
Fast: Efficient processing with async operations
Reliable: Robust error handling and validation

