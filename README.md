# Mempool Tracker

While bitcoin transactions are waiting to be included in blocks, they wait in the mempool. This webapp displays a live feed of all transactions in the Bitcoin Core mempool. It gathers information from a pruned Bitcoin Core node I set up running on a remote machine.

# Tech Stack

Using FastAPI + Uvicorn + Gunicorn for backend api \
Next.js + PM2 for local webapp hosting \
Nginx for reverse proxy 
