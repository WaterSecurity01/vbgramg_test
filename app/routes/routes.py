import requests
from flask import Blueprint, render_template, request, Response


blp = Blueprint('routes', __name__)

@blp.route('/')
def home():
    return render_template('home.html', current_step=0)

@blp.route('/step-1')
def step_1():
    return render_template('step_1.html', current_step=1)

@blp.route('/step-2')
def step_2():
    return render_template('step_2.html', current_step=2)

@blp.route('/step-3')
def step_3():
    return render_template('step_3.html', current_step=3)

@blp.route('/step-4')
def step_4():
    return render_template('step_4.html', current_step=4)

@blp.route('/step-4-geo')
def step_4_geo():
    return render_template('step_4_geo.html', current_step=4)

@blp.route('/api/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return "No URL provided", 400
    try:
        resp = requests.get(url)
        return Response(resp.content, content_type=resp.headers.get('content-type', 'application/json'))
    except Exception as e:
        return str(e), 500

