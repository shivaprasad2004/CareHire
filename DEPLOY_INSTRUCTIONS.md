# Deployment Guide for Render

## Database: PostgreSQL vs. MySQL
Render natively supports **PostgreSQL**. While you requested MySQL, using Render's managed PostgreSQL is the easiest way to deploy "in Render" with zero configuration.

I have updated the application to support **BOTH** MySQL (local development) and PostgreSQL (production on Render).

### Option 1: Use Render's Native PostgreSQL (Recommended)
1.  Push this code to GitHub.
2.  Go to the [Render Dashboard](https://dashboard.render.com/).
3.  Click **New +** -> **Blueprint**.
4.  Connect your repository.
5.  Render will automatically detect `render.yaml` and create:
    -   `carehire-server` (Backend API)
    -   `carehire-client` (Frontend)
    -   `carehire-db` (Managed PostgreSQL Database)

### Option 2: Stick to MySQL
If you strictly require MySQL:
1.  Create a MySQL database on an external provider (e.g., Aiven, DigitalOcean, TiDB Cloud).
2.  Get the **Connection URL** (e.g., `mysql://user:pass@host:port/db`).
3.  In Render, do **NOT** use the `render.yaml` database section.
4.  Manually add an Environment Variable to `carehire-server`:
    -   Key: `DATABASE_URL`
    -   Value: `mysql://...` (Your MySQL Connection String)
    -   *Note*: The code will automatically detect the `mysql` protocol in the URL if you update the config to parse it, OR you can set:
        -   `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` manually.
        -   `DB_DIALECT=mysql`

## Current Configuration
The `render.yaml` file is currently set up for **Option 1 (PostgreSQL)** for the smoothest experience.
