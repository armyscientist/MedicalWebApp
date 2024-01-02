from flask import Flask, request, jsonify
from flask_restful import Api
import mysql.connector
from flask_cors import CORS
from fuzzywuzzy import fuzz

app=Flask(__name__)
api=Api(app)
CORS(app)

def connectDB():
    conn=mysql.connector.connect(
        host='localhost',
        user='root',
        passwd='root',
        database='medicalwebappserver'
    )
    conn.autocommit=True
    return conn

@app.route('/hospital-login', methods=['GET'])
def Hospital_Login():
    conn=connectDB()
    cursor=conn.cursor(buffered=True)
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
    conn=connectDB()
    cursor=conn.cursor(buffered=True)
    #This only displays hosiptal_info table
    q1="""select hospital_info.hospital_id, utility_hospital_maxcount.utility_id, max as count, total,
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
        left join hospital_info on hospital_info.hospital_id=utility_hospital_maxcount.hospital_id;"""

    cursor.execute(q1)
    response={}   
    response_data=[]    

    for row in cursor:
        result={}
        for i, col in enumerate(cursor.column_names):
            result[col]=row[i]        
        response_data.append(result)
    response["top_utility_list"]=response_data
    return(jsonify(response))


#function
def getHospitalMatchedIds(cursor, hospital_name):
    result_hospital_ids=[]
    for (id, name) in cursor:
        if(fuzz.partial_ratio(hospital_name.lower(), name.lower())>80):
            result_hospital_ids.append(id)
    return result_hospital_ids

@app.route('/search', methods=['GET'])
def search():       
    conn=connectDB()
    cursor=conn.cursor(buffered=True)
    utility_id=request.args.get('utility_id')
    hospital_name=request.args.get('hospital_name')

    #Two types of searches
    #hospital name wise search
    response={"result_data":None}
    if(hospital_name and utility_id==None):
        #match name
        q="select hospital_id, hospital_name from hospital_info;"
        cursor.execute(q)
        hospital_ids=getHospitalMatchedIds(cursor, hospital_name)
        #if any hospital is found
        if(hospital_ids):
            
            q=''
            for i in range(1, len(hospital_ids)):
                q+=' or hospital_id='+str(hospital_ids[i]) 

            q2="""SELECT hospital_id, hospital_name, building_no, street, area, city, pincode, phone_appointment, phone_ambulance
            FROM hospital_info where hospital_id=%s"""+q
            cursor.execute(q2, (hospital_ids[0],))
        else:
            return(response)

    #Utility type wise search
    elif(hospital_name==None and utility_id):        
         #1)filter from utility_count and left join with hospital_id
        q2="""SELECT hospital_info.hospital_id, hospital_name, building_no, street, area, city, pincode, phone_appointment, phone_ambulance, 
        last_updated, count, total 
        FROM hospital_info 
        Right JOIN (select hospital_id, count, total from utility_count where utility_id=%s and count!=0) as got_utility 
        ON hospital_info.hospital_id=got_utility.hospital_id;"""
        cursor.execute(q2, (utility_id,))
            
   
    elif(hospital_name and utility_id):
        q="select hospital_id, hospital_name from hospital_info;"
        cursor.execute(q,())
        hospital_ids=getHospitalMatchedIds(cursor, hospital_name)
        if(hospital_ids):
            #concatente all ids and prepare query
            q=''
            for i in range(1, len(hospital_ids)):
                q+=' or hospital_info.hospital_id='+str(hospital_ids[i]) 

            q2="""SELECT hospital_info.hospital_id, hospital_name, building_no, street, area, city, pincode, phone_appointment, phone_ambulance, 
            last_updated, count, total 
            from hospital_info
            RIGHT JOIN (select hospital_id, count, total from utility_count where utility_id=%s and count!=0 ) as got_utility 
            ON hospital_info.hospital_id =got_utility.hospital_id WHERE hospital_info.hospital_id=%s"""+q
            cursor.execute(q2,(utility_id, hospital_ids[0]))
        else:
            return(response)

    #column_names=cursor.column_names
    response_data=[]
    fetched_cursor=cursor.fetchall()
    if(fetched_cursor):
        for row in fetched_cursor:
            result={}
            for i, col in enumerate(cursor.column_names):
                result[col]=row[i]
            response_data.append(result)

    response["result_data"]=response_data  

    return(jsonify(response))

@app.route('/utility_list/<hospital_id>', methods=['GET'])
def get_utility_list(hospital_id):
    try:
        with connectDB() as conn, conn.cursor() as cur:
            
            if hospital_id == "all":
                cur.execute("SELECT * FROM utility_info")
            else:
                cur.execute("SELECT * FROM utility_info WHERE utility_id IN (SELECT utility_id FROM utility_count WHERE hospital_id = %s)", (hospital_id,))

            rows = cur.fetchall()
            utilities = [{'utility_id': row[0], 'utility_name': row[1]} for row in rows]
            response = utilities
            return jsonify(response)
    except Exception as e:
        
        return jsonify({'error': 'An error occurred while retrieving the utility list.'}), 500

if __name__=="__main__":
    app.run(debug=True)

