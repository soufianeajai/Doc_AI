# IntelliDocs - AI-Powered Document Processing System

## Overview

IntelliDocs is a comprehensive document processing system that combines intelligent document parsing, vector embeddings, and semantic search capabilities. The system consists of:

- **Frontend**: React application with Tailwind CSS
- **Backend**: NestJS API with TypeORM and PostgreSQL
- **AI Service**: FastAPI service for document processing and embeddings
- **Storage**: MinIO for file storage
- **Vector Database**: Qdrant for storing and searching embeddings

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───▶│   Backend   │───▶│ AI Service  │
│   (React)   │    │  (NestJS)   │    │ (FastAPI)   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │                   │
                           ▼                   ▼
                   ┌─────────────┐    ┌─────────────┐
                   │ PostgreSQL  │    │   Qdrant    │
                   │  Database   │    │   Vector    │
                   └─────────────┘    │  Database   │
                           │          └─────────────┘
                           ▼                   ▲
                   ┌─────────────┐            │
                   │    MinIO    │────────────┘
                   │   Storage   │
                   └─────────────┘
```

## Features

### Document Processing
- **Intelligent Parsing**: Uses Unstructured.io for layout analysis, OCR, and table extraction
- **Multi-format Support**: PDF, DOCX, JPEG, PNG files
- **Text Chunking**: Semantic text chunking using LangChain
- **Vector Embeddings**: Generated using Sentence Transformers

### Search Capabilities
- **Semantic Search**: Find documents based on meaning, not just keywords
- **User Isolation**: Each user can only search their own documents
- **Relevance Scoring**: Results ranked by semantic similarity

### Security & Storage
- **User Authentication**: JWT-based authentication with role-based access
- **Secure File Storage**: MinIO object storage with presigned URLs
- **Data Isolation**: User documents are completely isolated

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for AI service development)

### Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```bash
# Database Configuration
POSTGRES_DB=postgres
POSTGRES_USER=IntelliDocs_user
POSTGRES_PASSWORD=IntelliDocs_password_123
POSTGRES_PORT=5432

# MinIO Configuration
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin123
MINIO_PORT_S3_API=9000
MINIO_PORT_WEB_CONSOLE=9001

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# AI Service Configuration
AI_SERVICE_URL=http://ai-service:8000
BACKEND_URL=http://backend:3000
```

### Running the System

1. Start all services with Docker Compose:
```bash
docker-compose up -d
```

2. Wait for all services to initialize (first startup may take a few minutes to download models)

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - AI Service: http://localhost:8000
   - MinIO Console: http://localhost:9001
   - Qdrant Dashboard: http://localhost:6333/dashboard

### Development

#### Backend Development
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend Development
```bash
cd front-end
npm install
npm run dev
```

#### AI Service Development
```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## API Endpoints

### Backend (NestJS)
- `POST /authentication/sign-up` - User registration
- `POST /authentication/sign-in` - User login
- `POST /documents` - Upload document
- `GET /documents` - List user documents
- `GET /documents/search?q=query` - Search documents
- `DELETE /documents/:id` - Delete document

### AI Service (FastAPI)
- `POST /process-document` - Process uploaded document
- `POST /search` - Semantic search
- `GET /health` - Health check

## Document Processing Pipeline

1. **Upload**: User uploads document through frontend
2. **Storage**: File stored in MinIO, metadata in PostgreSQL
3. **Processing Trigger**: Backend calls AI service
4. **Document Analysis**: AI service uses Unstructured.io for intelligent parsing
5. **Text Chunking**: Content split into semantic chunks
6. **Embedding Generation**: Each chunk converted to vector embedding
7. **Vector Storage**: Embeddings stored in Qdrant with metadata
8. **Status Update**: Backend notified of processing completion

## Search Process

1. **Query Input**: User enters search query
2. **Query Embedding**: AI service generates embedding for query
3. **Vector Search**: Qdrant finds similar document chunks
4. **Results Ranking**: Results sorted by semantic similarity
5. **Response**: Relevant document chunks returned with metadata

## Technology Stack

### Frontend
- React 19 with TypeScript
- Tailwind CSS for styling
- Axios for API calls
- React Router for navigation

### Backend
- NestJS with TypeScript
- TypeORM for database operations
- PostgreSQL for data storage
- MinIO for file storage
- JWT for authentication

### AI Service
- FastAPI for the API framework
- Unstructured.io for document parsing
- LangChain for text processing
- Sentence Transformers for embeddings
- Qdrant for vector storage

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_*` | PostgreSQL configuration | - |
| `MINIO_*` | MinIO storage configuration | - |
| `JWT_SECRET` | JWT signing secret | - |
| `AI_SERVICE_URL` | AI service endpoint | http://localhost:8000 |
| `BACKEND_URL` | Backend endpoint for AI callbacks | http://localhost:3000 |

### AI Service Models

The AI service uses the following pre-trained models:
- **Sentence Transformer**: `all-MiniLM-L6-v2` (384-dimensional embeddings)
- **OCR**: Tesseract for text extraction
- **Table Detection**: YOLOX for table structure recognition

## Monitoring & Debugging

### Health Checks
- Backend: `GET http://localhost:3000`
- AI Service: `GET http://localhost:8000/health`
- Qdrant: `GET http://localhost:6333/health`

### Logs
```bash
# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f ai-service
docker-compose logs -f backend
```

### Common Issues

1. **AI Service taking long to start**: First startup downloads ML models (~1GB)
2. **Memory issues**: AI service requires at least 2GB RAM
3. **File upload fails**: Check MinIO connectivity and bucket permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.