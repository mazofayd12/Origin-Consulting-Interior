#!/bin/bash
# Restore script for Origin Consulting Interior PostgreSQL Database

if [ -z "$1" ]; then
  echo "Usage: ./restore.sh <path_to_backup_file.sql.gz>"
  exit 1
fi

BACKUP_FILE=$1
CONTAINER_NAME="origin_postgres"
DB_USER="origin_user"
DB_NAME="origin_db"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "[ERROR] Backup file does not exist: $BACKUP_FILE"
  exit 1
fi

echo "[INFO] Restoring ${DB_NAME} from ${BACKUP_FILE}..."
gunzip -c ${BACKUP_FILE} | docker exec -i ${CONTAINER_NAME} psql -U ${DB_USER} -d ${DB_NAME}

if [ $? -eq 0 ]; then
  echo "[SUCCESS] Database restoration complete!"
else
  echo "[ERROR] Database restoration failed!"
  exit 1
fi
