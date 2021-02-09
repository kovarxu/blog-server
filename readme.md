
Blog Server Using:

Koa + mongodb

Deploy by Docker-Compose

# Dev

`docker-compose up -d` for development

**No need for: <del>npm run dev</del>**

# Production

`docker-compose -f docker-compose.yml -f production.yml up -d` to start the service
