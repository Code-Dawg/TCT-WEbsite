#!/usr/bin/env bash
# exit on error
set -o errexit

# Upgrade pip and install requirements
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt

# Collect static files for WhiteNoise
python3 manage.py collectstatic --no-input

# Run database migrations
python3 manage.py migrate
