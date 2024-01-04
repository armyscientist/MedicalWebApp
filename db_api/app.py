from flask import Flask, request, jsonify
from flask_restful import Api
import mysql.connector
from flask_cors import CORS
from fuzzywuzzy import fuzz
import sqlite3
import traceback
import logging
logger = logging.getLogger('medicalwebapp')

app=Flask(__name__)
api=Api(app)
CORS(app)

def connectDB():
    try:
        conn = sqlite3.connect('medicalwebappserver.db')
        return conn
    except sqlite3.Error as e:
        print(f"Error connecting to database: {e}")
        return None

@app.route('/hospital-login', methods=['GET'])
def Hospital_Login():
    conn=connectDB()
    cursor=conn.cursor()
    hospital_id=request.args.get('hospital_id')
    hospital_email=request.args.get('hospital_email')
    hospital_password=request.args.get('password')
    print('hospital_email=',hospital_email)
    q='''select hospital_id from hospital_login where (hospital_email=%s) and password=%s'''
    cursor.execute(q, ( hospital_email,hospital_password))
    response={'login_status':False}
    if(cursor.rowcount):
        response['login_status']=True
    return jsonify(response)

@app.route('/top-utility-list', methods=['GET'])
def home_display():
    try:
        conn = connectDB()
        cursor = conn.cursor()

        query = """
            select hospital_info.hospital_id, utility_hospital_maxcount.utility_id, max as count, total,
            hospital_name, utility_hospital_maxcount.utility_name, 
            building_no, street, area, city, pincode, phone_appointment, phone_ambulance
            from
            (select utility_maxcount.utility_id, utility_name, hospital_id, max, utility_count.total from 
                (select utility_count.utility_id, utility_name, max(utility_count.count) as max from utility_count 
                inner join utility_info on utility_info.utility_id=utility_count.utility_id 
                group by utility_count.utility_id) 
                as utility_maxcount
            left join utility_count on utility_count.utility_id = utility_maxcount.utility_id and count = max) 
            as utility_hospital_maxcount
        left join hospital_info on hospital_info.hospital_id=utility_hospital_maxcount.hospital_id;
        """
        cursor.execute(query)
        response = {}
        response_data = []
        for row in cursor:
            result = {}
            for i, col in enumerate(cursor.description):
                result[col[0]] = row[i]
            response_data.append(result)

        response["top_utility_list"] = response_data
        conn.close()
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'An error occurred while retrieving the top utility list.'}), 500



#function
def getHospitalMatchedIds(cursor, hospital_name):
    result_hospital_ids=[]
    for (id, name) in cursor:
        if(fuzz.partial_ratio(hospital_name.lower(), name.lower())>80):
            result_hospital_ids.append(id)
    return result_hospital_ids

@app.route('/search', methods=['GET'])
def search():
    try:
        conn = connectDB()
        cursor = conn.cursor()

        utility_id = request.args.get('utility_id')
        hospital_name = request.args.get('hospital_name')

        # Two types of searches
        # Hospital name wise search
        response = {'result_data': None}
        if hospital_name and utility_id is None:
            # Match name
            q = "SELECT hospital_id, hospital_name FROM hospital_info"
            cursor.execute(q)
            hospital_ids = getHospitalMatchedIds(cursor, hospital_name)
            # If any hospital is found
            if hospital_ids:
                q = ''
                for i in range(1, len(hospital_ids)):
                    q += ' OR hospital_id=' + str(hospital_ids[i])

                q2 = f"""
                    SELECT hospital_id, hospital_name, building_no, street, area, city, pincode, phone_appointment, phone_ambulance
                    FROM hospital_info WHERE hospital_id={hospital_ids[0]}""" + q
                cursor.execute(q2)
            else:
                return response

        # Utility type wise search
        elif hospital_name is None and utility_id:
            # 1) Filter from utility_count and left join with hospital_id
            q2 = f"""
                SELECT hospital_info.hospital_id, hospital_name, building_no, street, area, city, pincode, phone_appointment, phone_ambulance, 
                last_updated, count, total 
                FROM hospital_info JOIN (SELECT hospital_id, count, total FROM utility_count WHERE utility_id={utility_id} AND count!=0) AS got_utility 
                ON hospital_info.hospital_id=got_utility.hospital_id;
            """
            cursor.execute(q2)

        elif hospital_name and utility_id:
            q = "SELECT hospital_id, hospital_name FROM hospital_info"
            cursor.execute(q)
            hospital_ids = getHospitalMatchedIds(cursor, hospital_name)
            if hospital_ids:
                # Concatenate all ids and prepare query
                q = ''
                for i in range(1, len(hospital_ids)):
                    q += ' OR hospital_info.hospital_id=' + str(hospital_ids[i])

                q2 = f"""
                    SELECT hospital_info.hospital_id, hospital_name, building_no, street, area, city, pincode, phone_appointment, phone_ambulance, 
                    last_updated, count, total 
                    FROM hospital_info
                    RIGHT JOIN (SELECT hospital_id, count, total FROM utility_count WHERE utility_id={utility_id} AND count!=0) AS got_utility 
                    ON hospital_info.hospital_id=got_utility.hospital_id WHERE hospital_info.hospital_id={hospital_ids[0]}""" + q
                cursor.execute(q2)
            else:
                return response

        response_data = []
        fetched_cursor = cursor.fetchall()
        if fetched_cursor:
            for row in fetched_cursor:
                result = {}
                for i, col in enumerate(cursor.description):
                    result[col[0]] = row[i]
                response_data.append(result)

        response['result_data'] = response_data

        conn.close()

        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        
        return jsonify({'error': 'An error occurred while retrieving the search results.'}), 500


@app.route('/utility_list/<hospital_id>', methods=['GET'])
def get_utility_list(hospital_id):
    try:
        conn = connectDB()
        cursor = conn.cursor()
        query = f"SELECT * FROM utility_info WHERE utility_id IN (SELECT utility_id FROM utility_count WHERE hospital_id = {hospital_id})"
        cursor.execute(query)
        rows = cursor.fetchall()
        utilities = [{'utility_id': row[0], 'utility_name': row[1]} for row in rows]
        response = utilities
        conn.close()
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'An error occurred while retrieving the utility list.'}), 500

if __name__=="__main__":
    app.run(debug=True)

