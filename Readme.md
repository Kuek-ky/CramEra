# Setup Instructions

## Running the Code Locally

### 1. Database Setup
Run the `cramera.sql` script in your MySQL Workbench to create a new schema.

### 2. Environment Variables Setup (`.env`)

#### Backend
Place the `.env` file from the `env_backend` folder into the `backend` folder (at the same level as the `pom.xml` file).

**Note:**
- `SQL_CONNECTION_URL`: Replace the IP address with your IP address, and the `SQLPORT` with the port your SQL connection is currently using.
- `SQL_USER` & `SQL_PASSWORD`: Values should be based on the user with the credentials to access the schema. 
  *Example:*
  ```env
  SQL_USER=cramera_root
  SQL_PASSWORD=password
  ```

#### Frontend
Place the `.env` file from the `env_frontend` folder into the `frontend` folder (at the same level as the `tsconfig.json` file).

**Note:**
- `EXPO_PUBLIC_API_URL`: Replace the IP address with your IP address.

### 3. Running the Application

#### Backend
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend
In a separate terminal:
```bash
cd frontend
npm install  # <-- FOR THE 1ST TIME
npm start
```
*The frontend will be accessible on the web via `http://localhost:8081`.*

---

## Running the Code on Cloud
Download the `.apk` file in the submission folder and run it on an Android device.
