#!/bin/sh
# make sure you have python 3.9 installed
source venv/Scripts/activate #optional if you are using other python interpreter than from virtual environment
pip install -r requirements.txt
nohup python db_api/server.py &

cd web_app
nohup npm start &

# open http://localhost:3000 on browser to see the result


