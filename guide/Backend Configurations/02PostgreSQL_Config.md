
# PostgreSQL Database and User Creation Template

## Step 1: Switch to PostgreSQL User

Log in as the `postgres` user:

```bash
sudo -i -u postgres
```

## Step 2: Access the PostgreSQL Shell

Enter the `psql` shell:

```bash
psql
```

## Step 3: Create a New Database

Replace `<database_name>` with the desired name for your database:

```sql
CREATE DATABASE <database_name>;
```

## Step 4: Create a New User

Replace `<username>` with the desired username and `<password>` with a secure password:

```sql
CREATE USER <username> WITH PASSWORD '<password>';
```

## Step 5: Grant Privileges to the User

Grant all privileges on the new database to the created user:

```sql
ALTER DATABASE <database_name> OWNER TO <username>;
GRANT ALL PRIVILEGES ON DATABASE <database_name> TO <username>;
\c prelevels
GRANT ALL PRIVILEGES ON SCHEMA public TO <username>;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO <username>;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO <username>;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO <username>;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO <username>;
ALTER SCHEMA public OWNER TO your_database_user;
```

### Optional

If you want `<username>` to have superuser capabilities (not recommended unless necessary):

```sql
ALTER ROLE dbuser WITH SUPERUSER;
```

## Step 6: Exit PostgreSQL

Exit the `psql` shell:

```sql
\q
```

## Step 7: Test the Connection

Switch back to your root or normal user account:

```bash
exit
```

Test the connection using the `psql` client. Replace `<username>`, `<database_name>`, and `<password>` with your details:

```bash
psql -U <username> -h localhost -d <database_name>
```

When prompted, enter the password.

## Step 8: Verify Database Access

Once connected, verify access by listing tables:

```sql
\dt
```

For a new database, it will show `No relations found`, which is expected.

---

## Step 8: Updating .env in backend

```env
DB_NAME="prelevels"
DB_USER="prelevels_user"
DB_PASSWORD="yourpassword"
DB_HOST="localhost"
DB_PORT="5432"

DJANGO_SECRET_KEY="your-django-secret-key"
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourdomain.com
```

## Deleting the database

```bash
sudo -i -u postgres psql -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '<database_name>' AND pid <> pg_backend_pid();"
sudo -i -u postgres psql -c "DROP DATABASE <database_name>;"
```

---

## Deleting the user

```bash
sudo -i -u postgres psql -c "REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM testuser;"
sudo -i -u postgres psql -c "REASSIGN OWNED BY testuser TO postgres;"
sudo -i -u postgres psql -c "DROP OWNED BY testuser;"
sudo -i -u postgres psql -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE usename = 'testuser';"
sudo -i -u postgres psql -c "DROP USER testuser;"
```

## Notes

- Use strong passwords even for test environments.
- Ensure `pg_hba.conf` is configured for `md5` or `scram-sha-256` authentication for your user.
- Use meaningful names for databases and users to keep the system organized.
