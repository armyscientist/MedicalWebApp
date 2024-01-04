import sqlite3

def create_tables_and_insert_dummy_data():
    """
    Create the necessary tables if they don't exist and insert some real-world dummy data into them if no data is present.
    """
    try:
        conn = sqlite3.connect('medicalwebappserver.db')
        cursor = conn.cursor()

        # Create the hospital_info table
        cursor.execute('''CREATE TABLE IF NOT EXISTS hospital_info (
                            hospital_id INTEGER PRIMARY KEY AUTOINCREMENT,
                            hospital_name TEXT NOT NULL,
                            building_no VARCHAR(30),
                            street VARCHAR(30),
                            area VARCHAR(30) NOT NULL,
                            city VARCHAR(30) NOT NULL,
                            state VARCHAR(30) NOT NULL,
                            pincode CHAR(6) NOT NULL,
                            phone_appointment VARCHAR(15) NOT NULL UNIQUE,
                            phone_ambulance VARCHAR(15) NOT NULL UNIQUE,
                            phone_inquiry VARCHAR(15),
                            phone3_alternate VARCHAR(15),
                            phone4_incharge CHAR(15),
                            incharge_name VARCHAR(30),
                            gmap TEXT,
                            last_updated DATETIME
                        )''')

        # Create the hospital_login table
        cursor.execute('''CREATE TABLE IF NOT EXISTS hospital_login (
                            hospital_id INTEGER PRIMARY KEY AUTOINCREMENT,
                            hospital_email VARCHAR(100) UNIQUE,
                            password TEXT NOT NULL,
                            last_updated DATETIME,
                            last_login DATETIME,
                            FOREIGN KEY (hospital_id) REFERENCES hospital_info(hospital_id) ON DELETE CASCADE
                        )''')

        # Create the utility_info table
        cursor.execute('''CREATE TABLE IF NOT EXISTS utility_info (
                            utility_id INTEGER PRIMARY KEY AUTOINCREMENT,
                            utility_name VARCHAR(30) UNIQUE
                        )''')

        # Create the utility_count table
        cursor.execute('''CREATE TABLE IF NOT EXISTS utility_count (
                            hospital_id INTEGER NOT NULL,
                            utility_id INTEGER NOT NULL,
                            count INTEGER DEFAULT 0,
                            total INTEGER DEFAULT 0,
                            last_updated DATETIME,
                            PRIMARY KEY (hospital_id, utility_id),
                            FOREIGN KEY (hospital_id) REFERENCES hospital_info(hospital_id) ON DELETE CASCADE,
                            FOREIGN KEY (utility_id) REFERENCES utility_info(utility_id) ON DELETE CASCADE
                        )''')

        # Insert some dummy data into the tables if no data is present
        cursor.execute('''SELECT COUNT(*) FROM hospital_info''')
        if cursor.fetchone()[0] == 0:
            cursor.execute('''INSERT INTO hospital_info (hospital_name, building_no, street, area, city, state, pincode, phone_appointment, phone_ambulance)
                                VALUES ('Hospital A', '123', 'Main Street', 'Area A', 'City A', 'State A', '123456', '123-456-7890', '234-567-8901')''')
            cursor.execute('''INSERT INTO hospital_info (hospital_name, building_no, street, area, city, state, pincode, phone_appointment, phone_ambulance)
                                VALUES ('Hospital B', '123', 'Elm Street', 'Area B', 'City B', 'State B', '234567', '234-567-8901', '345-678-9012')''')

        cursor.execute('''SELECT COUNT(*) FROM utility_info''')
        if cursor.fetchone()[0] == 0:
            cursor.execute('''INSERT INTO utility_info (utility_name) VALUES ('Ventilator')''')
            cursor.execute('''INSERT INTO utility_info (utility_name) VALUES ('ICU')''')
            cursor.execute('''INSERT INTO utility_info (utility_name) VALUES ('Casual')''')
            cursor.execute('''INSERT INTO utility_info (utility_name) VALUES ('Blood')''')
            cursor.execute('''INSERT INTO utility_info (utility_name) VALUES ('Emergency')''')

        cursor.execute('''SELECT COUNT(*) FROM utility_count''')
        if cursor.fetchone()[0] == 0:
            cursor.execute('''INSERT INTO utility_count (hospital_id, utility_id, count, total, last_updated) VALUES (	1,	1,	10,	20,	'2022-04-01 12:00:00')''')
            cursor.execute('''INSERT INTO utility_count (hospital_id, utility_id, count, total, last_updated) VALUES (1,	2,	5,	10,	'2022-04-01 12:00:00')''')
            cursor.execute('''INSERT INTO utility_count (hospital_id, utility_id, count, total, last_updated) VALUES (	2,	1,	7,	15,	'2022-04-01 12:00:00')''')
            cursor.execute('''INSERT INTO utility_count (hospital_id, utility_id, count, total, last_updated) VALUES (	1,	3,	2,	5,	'2022-04-01 12:00:00')''')
            cursor.execute('''INSERT INTO utility_count (hospital_id, utility_id, count, total, last_updated) VALUES (	2,	4,	1,	5,	'2022-04-01 12:00:00')''')
           

        conn.commit()
        print("Tables created and dummy data inserted successfully.")
    except sqlite3.Error as e:
        print(f"Error creating tables and inserting dummy data: {e}")
    finally:
        if conn:
            conn.close()

create_tables_and_insert_dummy_data()
