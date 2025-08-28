# Azure Deployment Guide

## 📋 Pre-deployment Checklist

### 1. Environment Variables to Configure in Azure

#### React Frontend (Azure Static Web Apps)
```
VITE_API_BASE_URL=https://your-spring-boot-app.azurewebsites.net
VITE_DOTNET_API_BASE_URL=https://your-dotnet-api.azurewebsites.net/api
VITE_ANGULAR_APP_URL=https://your-angular-app.azurewebsites.net
```

#### Spring Boot Backend (Azure App Service)
```
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=jdbc:sqlserver://your-azure-sql-server.database.windows.net:1433;database=AngularDb;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30
DATABASE_USERNAME=your-azure-sql-username
DATABASE_PASSWORD=your-azure-sql-password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
```

#### .NET API (Azure App Service)
Update in Azure App Service Configuration:
```
JWT__ValidIssuer=https://your-dotnet-api.azurewebsites.net
JWT__ValidAudience=https://your-angular-app.azurewebsites.net
ConnectionStrings__ShopDbConn=Server=your-azure-sql-server.database.windows.net;database=AngularDb;User Id=your-username;Password=your-password;TrustServerCertificate=true;Encrypt=true;
```

#### Angular Frontend (Azure Static Web Apps)
Update environment.prod.ts with your actual Azure URLs before building.

### 2. Database Setup
1. Create Azure SQL Database
2. Update connection strings in all applications
3. Run database migrations

### 3. Deployment Order
1. Deploy .NET API first
2. Deploy Spring Boot backend
3. Deploy Angular frontend
4. Deploy React frontend (User Management)

### 4. CORS Configuration
Ensure all applications allow requests from your Azure domains.

### 5. SSL/HTTPS
All Azure App Services should use HTTPS only.

## 🚀 Quick Deploy Commands

### Deploy Spring Boot to Azure Container Instances
```bash
# Build and push to Azure Container Registry
az acr build --registry myregistry --image userManagement-ms .

# Deploy to Container Instances
az container create --resource-group myResourceGroup --name userManagement-ms --image myregistry.azurecr.io/userManagement-ms:latest
```

### Deploy React to Azure Static Web Apps
```bash
# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy --app-location . --output-location dist
```
