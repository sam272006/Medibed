import random

hospitals_ids = [str(i) for i in range(1, 98)]

sql = []

# Generate Wards
sql.append("-- Generate Wards")
for h_id in hospitals_ids:
    sql.append(f"INSERT INTO wards (id, name, hospital_id, total, occupied) VALUES ('W-{h_id}-G', 'General Ward', '{h_id}', 10, 0);")
    sql.append(f"INSERT INTO wards (id, name, hospital_id, total, occupied) VALUES ('W-{h_id}-I', 'ICU Ward', '{h_id}', 5, 0);")
    sql.append(f"INSERT INTO wards (id, name, hospital_id, total, occupied) VALUES ('W-{h_id}-E', 'Emergency Ward', '{h_id}', 5, 0);")

# Generate Beds
sql.append("\n-- Generate Beds")
for h_id in hospitals_ids:
    # General Beds
    for i in range(1, 11):
        status = random.choice(["Available", "Occupied"])
        sql.append(f"INSERT INTO beds (id, type, status, ward_id, hospital_id) VALUES ('B-{h_id}-G{i}', 'General', '{status}', 'W-{h_id}-G', '{h_id}');")
    # ICU Beds
    for i in range(1, 6):
        status = random.choice(["Available", "Occupied"])
        sql.append(f"INSERT INTO beds (id, type, status, ward_id, hospital_id) VALUES ('B-{h_id}-I{i}', 'ICU', '{status}', 'W-{h_id}-I', '{h_id}');")
    # Emergency Beds
    for i in range(1, 6):
        status = random.choice(["Available", "Occupied"])
        sql.append(f"INSERT INTO beds (id, type, status, ward_id, hospital_id) VALUES ('B-{h_id}-E{i}', 'Emergency', '{status}', 'W-{h_id}-E', '{h_id}');")

# Update Ward Occupancy counts
sql.append("\n-- Update Ward counts")
sql.append("""
UPDATE wards w
SET occupied = (
    SELECT COUNT(*) 
    FROM beds b 
    WHERE b.ward_id = w.id AND b.status = 'Occupied'
);
""")

with open("generate_beds.sql", "w") as f:
    f.write("\n".join(sql))
