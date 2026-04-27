
import re

def convert_sql():
    with open('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\medibed_central_delhi.sql', 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into sections based on INSERT statements
    # We want to catch the whole INSERT statement including the VALUES part
    statements = re.split(r'(INSERT INTO\s+\w+)', content)
    
    new_sql = ["-- Migrated Delhi Dataset\n"]
    # Clear existing data to avoid conflicts
    new_sql.append("TRUNCATE hospitals, doctors, hospital_beds_summary, admins, wards, beds, patients, emergencies, records CASCADE;\n\n")

    doctor_id_seq = 1
    
    for i in range(len(statements)):
        part = statements[i]
        
        if i % 2 == 1: # "INSERT INTO table_name"
            tbl = part.split()[-1]
            if tbl == 'hospital_beds':
                tbl = 'hospital_beds_summary'
            
            # Look ahead to values
            values_part = statements[i+1]
            
            if tbl == 'hospitals':
                # Update column list
                values_part = values_part.replace('(hospital_id,', '(id,')
                # Quote IDs
                values_part = re.sub(r'\((\d+),', r"('\1',", values_part)
                # Boolean mapping
                values_part = re.sub(r',\s*1,\s*1,\s*1,', ', true, true, true,', values_part)
                values_part = re.sub(r',\s*1,\s*0,\s*1,', ', true, false, true,', values_part)
                values_part = re.sub(r',\s*0,\s*1,\s*1,', ', false, true, true,', values_part)
                values_part = re.sub(r',\s*0,\s*0,\s*1,', ', false, false, true,', values_part)
                values_part = re.sub(r',\s*1,\s*1,\s*0,', ', true, true, false,', values_part)
                values_part = re.sub(r',\s*1,\s*0,\s*0,', ', true, false, false,', values_part)
                values_part = re.sub(r',\s*0,\s*1,\s*0,', ', false, true, false,', values_part)
                values_part = re.sub(r',\s*0,\s*0,\s*0,', ', false, false, false,', values_part)
                
            elif tbl == 'hospital_beds_summary':
                # Quote hospital_id
                values_part = re.sub(r'\((\d+),', r"('\1',", values_part)
                
            elif tbl == 'doctors':
                # Update column list
                part = part.replace('(hospital_id,', '(id, hospital_id,')
                part = part.replace('specialization,', 'specialty,')
                # Generate DXXXX IDs and quote hospital_id
                # split by ), to handle each row
                rows = values_part.split('),')
                new_rows = []
                for row in rows:
                    if '(' in row:
                        match = re.search(r'\((\d+),', row)
                        if match:
                            h_id = match.group(1)
                            row = row.replace(f'({h_id},', f"('D{doctor_id_seq:04d}', '{h_id}',", 1)
                            doctor_id_seq += 1
                    new_rows.append(row)
                values_part = '),'.join(new_rows)

            new_sql.append(f"INSERT INTO {tbl}{values_part}")
            
    # Add Super Admin and Hospital Admins
    new_sql.append("\n\n-- Create Admins\n")
    # Super Admin
    new_sql.append("INSERT INTO admins (id, username, password, role, title) VALUES ('1', 'superadmin', 'admin123', 'super_admin', 'Chief Administrator');\n")
    
    # Hospital Admins (1-100)
    admin_entries = []
    for i in range(1, 101):
        admin_entries.append(f"  ('{100+i}', 'admin{i}', 'password{i}', 'hospital_admin', '{i}')")
    new_sql.append("INSERT INTO admins (id, username, password, role, hospital_id) VALUES\n")
    new_sql.append(",\n".join(admin_entries) + ";\n")

    with open('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\converted_delhi_v4.sql', 'w', encoding='utf-8') as f:
        f.write(''.join(new_sql))

if __name__ == "__main__":
    convert_sql()
