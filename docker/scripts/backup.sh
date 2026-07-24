#!/bin/bash
# Backup script for Origin Consulting Interior PostgreSQL Database

CONTAINER_NAME="origin_postgres"
DB_USER="origin_user"
DB_NAME="origin_db"
BACKUP_DIR="./docker/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
FILENAME="${BACKUP_DIR}/origin_db_backup_${TIMESTAMP}.sql.gz"

mkdir -p ${BACKUP_DIR}

echo "[INFO] Starting database backup for ${DB_NAME}..."
docker exec -t ${CONTAINER_NAME} pg_dump -U ${DB_USER} -d ${DB_NAME} | gzip > ${FILENAME}

if [ $? -eq 0 ]; then
  echo "[SUCCESS] Database backup saved to ${FILENAME}"
else
  echo "[ERROR] Database backup failed!"
  exit 1
fi
