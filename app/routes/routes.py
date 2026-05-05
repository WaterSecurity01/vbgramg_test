import json
import os

from flask import Blueprint, jsonify, render_template


blp = Blueprint('routes', __name__)

@blp.route('/')
def home():
    return render_template('home.html', current_step=0)

@blp.route('/step-1')
def step_1():
    return render_template('step_1.html', current_step=1)

@blp.route('/step-2')
def step_2():
    works_list_file = os.path.join(os.path.dirname(__file__).split('app')[0], 'app/static/works_list.json')
    with open(works_list_file, 'r') as f:
        works_list = json.load(f)
    return render_template('step_2.html', current_step=2, works_list=works_list)

@blp.route('/step-3')
def step_3():
    return render_template('step_3.html', current_step=3)

@blp.route('/step-4')
def step_4():
    return render_template('step_4.html', current_step=4)

@blp.route('/step-5')
def step_5():
    return render_template('step_5.html', current_step=5)

@blp.route('/dummy-step-2')
def dummy_step_2():
    return render_template('step_6.html', current_step=3)