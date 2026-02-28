from flask import Blueprint, render_template


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

@blp.route('/step-2-design-2')
def step_2_design_2():
    return render_template('step_2_design_2.html', current_step=2)

@blp.route('/step-2-design-3')
def step_2_design_3():
    return render_template('step_2_design_3.html', current_step=2)

@blp.route('/step-2-design-4')
def step_2_design_4():
    return render_template('step_2_design_4.html', current_step=2)

@blp.route('/step-3')
def step_3():
    return render_template('step_3.html', current_step=3)

@blp.route('/step-4')
def step_4():
    return render_template('step_4.html', current_step=4)