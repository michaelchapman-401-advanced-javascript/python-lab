from flask import Flask, render_template
from pymongo import MongoClient

client = MongoClient('localhost',27017)

app = Flask(__name__)

db = client.test

col = db.data

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/sales')
def sales():
    return render_template('sales.html')

@app.route('/getAll', methods=['GET'])
def getAll():
    return render_template('sales.html', message='This is a GET request. maybe???')