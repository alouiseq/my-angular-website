from flask import Flask 

app = Flask(__name__, static_url_path='')


@app.route('/')
def index ():
	app.send_static_file('index.html')