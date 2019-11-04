from flask import Flask, request, render_template, make_response, Markup
import flask

app = Flask(__name__)
@app.route('/', methods=['GET', 'POST'])
def render():
    arg = ''
    if request.method == 'GET':
        return make_response(render_template('index.html'))

if __name__=='__main__':
    app.run(debug=True)
