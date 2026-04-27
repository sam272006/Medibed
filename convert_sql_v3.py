
import re

def convert_sql():
    with open('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\medibed_central_delhi.sql', 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into sections based on INSERT statements
    sections = re.split(r'(INSERT INTO\s+)', content)
    
    new_sql = ["-- Migrated Delhi Dataset\n"]
    
    current_table = ""
    doctor_id_seq = 1
    
    for i in range(len(sections)):
        part = sections[i]
        
        if part == "INSERT INTO ":
            continue
            
        if i > 0 and sections[i-1] == "INSERT INTO ":
            # This is the table name part
            table_name = part.split('(')[0].strip()
            current_table = table_name
            if current_table == 'hospital_beds':
                part = part.replace('hospital_beds', 'hospital_beds_summary')
            new_sql.append("INSERT INTO " + part)
            continue
            
        if i == 0:
            continue
            
        # This is the values part
        if current_table == 'hospitals':
            part = part.replace('(hospital_id,', '(id,')
            part = re.sub(r'\((\d+),', r"('\1',", part)
            # Boolean mapping for flags
            part = re.sub(r',\s*1,\s*1,\s*1,', ', true, true, true,', part)
            part = re.sub(r',\s*1,\s*0,\s*1,', ', true, false, true,', part)
            part = re.sub(r',\s*0,\s*1,\s*1,', ', false, true, true,', part)
            part = re.sub(r',\s*0,\s*0,\s*1,', ', false, false, true,', part)
            part = re.sub(r',\s*1,\s*1,\s*0,', ', true, true, false,', part)
            part = re.sub(r',\s*1,\s*0,\s*0,', ', true, false, false,', part)
            part = re.sub(r',\s*0,\s*1,\s*0,', ', false, true, false,', part)
            part = re.sub(r',\s*0,\s*0,\s*0,', ', false, false, false,', part)

        elif current_table == 'hospital_beds':
            # Quoting hospital_id
            part = re.sub(r'\((\d+),', r"('\1',", part)
            
        elif current_table == 'doctors':
            part = part.replace('(hospital_id,', '(id, hospital_id,')
            part = part.replace('specialization,', 'specialty,')
            
            lines = part.split('),')
            converted_lines = []
            for line in lines:
                if line.strip().startswith('(') or (line.strip().startswith(',') and '(' in line):
                    match = re.search(r'\((\d+),', line)
                    if match:
                        h_id = match.group(1)
                        line = line.replace(f'({h_id},', f"('D{doctor_id_seq:04d}', '{h_id}',", 1)
                        doctor_id_seq += 1
                converted_lines.append(line)
            part = '),'.join(converted_lines)
            
        new_sql.append(part)

    # Add Admins for each hospital (1-100)
    new_sql.append("\n\n-- Create Admins for new hospitals\n")
    new_sql.append("INSERT INTO admins (id, username, password, hospital_id, role) VALUES\n")
    admin_entries = []
    for i in range(1, 101):
        admin_entries.append(f"  ('{100+i}', 'admin{i}', 'password{i}', '{i}', 'hospital_admin')")
    new_sql.append(",\n".join(admin_entries) + ";\n")

    with open('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\converted_delhi_v3.sql', 'w', encoding='utf-8') as f:
        f.write(''.join(new_sql))

if __name__ == "__main__":
    convert_sql()
