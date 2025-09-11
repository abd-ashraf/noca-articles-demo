#!/bin/bash

# Fail on error
set -e

# Colors for readability
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting NOCA Articles backend and frontend...${NC}"

# Start backend
(
  cd backend/Noca.Articles.Api
  echo -e "${GREEN}[Backend] Running dotnet...${NC}"
  dotnet run
) &

BACKEND_PID=$!

# Start frontend
(
  cd frontend
  echo -e "${GREEN}[Frontend] Running Angular dev server...${NC}"
  npm install
  npm run start
) &

FRONTEND_PID=$!

# Trap Ctrl+C to kill both
trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT

# Wait for both processes
wait
