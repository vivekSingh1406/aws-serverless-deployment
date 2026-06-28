### Smart Document Management System

```text
                                 User
                                   │
                                   │ HTTPS Request
                                   ▼
                         +----------------------+
                         |     CloudFront       |
                         |   Global CDN Cache   |
                         +----------+-----------+
                                    │
                                    ▼
                         +----------------------+
                         |    Amazon S3         |
                         |  Static Website      |
                         | (HTML/CSS/JS/React)  |
                         +----------+-----------+
                                    │
                         REST API Calls (HTTPS)
                                    │
                                    ▼
                         +----------------------+
                         |    API Gateway       |
                         |  REST API Endpoints  |
                         +----------+-----------+
                                    │
                                    ▼
                         +----------------------+
                         |     AWS Lambda       |
                         |   Business Logic     |
                         +----------+-----------+
                                    │
                +-------------------+-------------------+
                │                                       │
                ▼                                       ▼
      +----------------------+              +----------------------+
      |     DynamoDB         |              |      Amazon S3       |
      | Document Metadata    |              | Uploaded Documents   |
      |                      |              | PDFs, Images, Files  |
      +----------------------+              +----------------------+
```

---

### Project Structure Flow

```text
User
 │
 ▼
CloudFront
 │
 ▼
Static Website (Amazon S3)
 │
 ▼
API Gateway
 │
 ▼
AWS Lambda
 │
 ├──────────────► Amazon S3 (Store/Retrieve Files)
 │
 └──────────────► DynamoDB (Store/Retrieve Metadata)
 │
 ▼
API Gateway
 │
 ▼
Frontend
 │
 ▼
User
```
---

## AWS Service Responsibilities

| AWS Service              | Responsibility                                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **CloudFront**           | Delivers the frontend globally with low latency and caching.                                                         |
| **Amazon S3 (Frontend)** | Hosts the static website (HTML, CSS, JavaScript, or React build).                                                    |
| **API Gateway**          | Exposes REST APIs, routes requests, validates requests, enables CORS, and secures endpoints.                         |
| **AWS Lambda**           | Executes business logic such as uploading, listing, searching, downloading, and deleting documents.                  |
| **Amazon S3 (Storage)**  | Stores uploaded documents such as PDFs, images, Word, and Excel files.                                               |
| **DynamoDB**             | Stores document metadata including document ID, filename, upload date, category, tags, file size, and S3 object key. |
