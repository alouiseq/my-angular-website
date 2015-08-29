from flask import Flask, request, jsonify, make_response
# from flask.ext.httpauth import HTTPBasicAuth
# from flask.ext.sqlalchemy import SQLAlchemy
import time

app = Flask(__name__, static_url_path='')
# auth = HTTPBasicAuth()
# db = SQLAlchemy()


@app.route('/')
def index ():
	return app.send_static_file('index.html')


# Temporary store until DB is ready
charts = [
    { 
        'id': 1,
        'year': 2015, 
        'title': 'A Year to Remember', 
        'description': 'First year recorded',
        'createdAt': 'Tue Aug 18 22:57:36 2015',
        'updatedAt': 'Tue Aug 18 22:57:36 2015',  
        'data': [{ 
            'name': 'Disneyland', 
            'y': 2,
            'drilldown': 'disneyland'
        }, { 
            'name': 'Monterey Bay Aquarium', 
            'y': 2,
            'drilldown': 'montereyBayAquarium'
        }, { 
            'name': 'Great America', 
            'y': 1, 
            'drilldown': 'greatAmerica'
        }],
        'expenses': {
            'series': [{
                'id': 'disneyland', 
                'name': 'Expense',
                'data': [
                    [ 'August', 1000 ],
                    [ 'June', 750 ]
                ]
            }, {
                'id': 'montereyBayAquarium', 
                'name': 'Expense',
                'data': [
                    [ 'July', 300 ],
                    [ 'March', 350 ]
                ]
            }, {
                'id': 'greatAmerica',
                'name': 'Expense', 
                'data': [
                    [ 'May', 200 ]
                ]
            }]
        }     
    }
]

chart_id = 1


# Check if user is authorized
# @auth.get_password
# def get_password (username):
#     if username == 'admin':
#         return 'admin'
#     return None


# Handle unauthorized access
# @auth.error_handler
# def unauthorized ():
#     return make_response(jsonify({'error': 'Unauthorized access'}), 401)


# Create a new chart
@app.route('/pieCharting/api/v1.0/createChart', methods=['POST'])
# @auth.login_required
def createChart ():
    chart = request.json
    chartId = chart_id
    chartId += 1
    now = time.strftime('%c')
    if 'year' in chart and 'title' in chart:
        newChart = {
            'id': chartId,
            'year': chart['year'],
            'title': chart['title'],
            'description': request.json.get('description', ''),
            'data': [
                [ 'No Vacations set', 100 ]
            ],
            'createdAt': now,
            'updatedAt': now        
        }

        charts.append(newChart)
        return jsonify(newChart)

    return make_response(jsonify({'error': 'Required: year and title'}), 404)


# # Add a vacation to an existing chart
# @app.route('/pieCharting/api/v1.0/addVacation/<chart_id>', methods=['POST'])
# # @auth.login_required
# def addVacation (chart_id):
#     newVacation = request.json
#     print len(chart)
#     foundChart = [chart for chart in charts if chart['id'] == int(chart_id)]
#     if len(foundChart) == 0:
#         return make_response(jsonify({'error': 'Cannot find chart'}), 404)
    
#     foundChart[0]['data'] = newVacation
#     foundChart[0]['updatedAt'] = time.strftime('%c')

#     return jsonify(foundChart[0])


# Remove chart from list of charts
@app.route('/pieCharting/api/v1.0/deleteChart/<chart_id>', methods=['DELETE'])
def deleteChart (chart_id):
    foundChart = [chart for chart in charts if chart['id'] == int(chart_id)]

    if len(foundChart) != 0:
        charts.remove(foundChart[0])
        return jsonify(charts=charts)
    else:
        return make_response(jsonify({'error': 'Chart not found'}), 404)


# # Remove vacation from an existing chart
# @app.route('/pieCharting/api/v1.0/deleteVacation/<chart_id>', methods=['DELETE'])
# def deleteVacation (chart_id):
#     foundChart = [chart for chart in charts if chart['id'] == int(chart_id)]

#     if len(foundChart) != 0:
#         charts.remove(foundChart[0])
#         return jsonify(charts=charts)
#     else:
#         return make_response(jsonify({'error': 'Chart not found'}), 404)


# Get all charts
@app.route('/pieCharting/api/v1.0/getCharts', methods=['GET'])
# @auth.login_required
def getCharts ():
    return jsonify(charts=charts)


# Get a chart from the list of charts
@app.route('/pieCharting/api/v1.0/displayChart/<chart_id>', methods=['GET'])
def showChart (chart_id):
    foundChart = [chart for chart in charts if chart['id'] == int(chart_id)]
    if len(foundChart) != 0:
        return jsonify(foundChart[0])
    else:
        return make_response(jsonify({'error': 'Chart not found'}), 404)


# Update an existing chart
@app.route('/pieCharting/api/v1.0/updateChart/<chart_id>', methods=['PUT'])
def updateChart (chart_id):
    updateChart = request.json
    print len(updateChart)
    foundChart = [chart for chart in charts if chart['id'] == int(chart_id)]
    # only updated properties are sent by client
    if len(foundChart) == 0:
        return make_response(jsonify({'error': 'Cannot find chart'}), 404)
    
    for key in updateChart:
        if foundChart[0][key] != updateChart[key]:
            foundChart[0][key] = updateChart[key]

    foundChart[0]['updatedAt'] = time.strftime('%c')
    return jsonify(foundChart[0])
