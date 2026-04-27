
import re
import uuid

def convert_sql():
    with open('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\medibed_central_delhi.sql', 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into sections based on INSERT statements
    sections = re.split(r'(INSERT INTO\s+\w+)', content)
    
    new_sql = []
    
    # We already updated the schema via apply_migration, so we mostly need the INSERTS
    # But let's keep it safe.
    
    current_table = ""
    doctor_id_seq = 1
    
    for i in range(len(sections)):
        part = sections[i]
        
        if i % 2 == 1: # This is the "INSERT INTO table_name" part
            current_table = part.split()[-1]
            if current_table == 'hospital_beds':
                part = part.replace('hospital_beds', 'hospital_beds_summary')
            new_sql.append(part)
            continue
            
        if i == 0: # Header/Schema part - we'll skip most of it or comment it out
            new_sql.append("-- Migrated Delhi Dataset\n")
            continue
            
        # This is the values part
        if current_table == 'hospitals':
            # hospitals (hospital_id, name, ...
            # We want to change hospital_id to id and quote the value
            part = part.replace('(hospital_id,', '(id,')
            # regex to find (1, '...
            part = re.sub(r'\((\d+),', r"('\1',", part)
            # Boolean mapping for flags (nabh_accredited, nabl_accredited, emergency_24x7)
            # These are the 10th, 11th, 12th values usually.
            # Example: ..., 1, 0, 1, 28.6...
            # A more surgical approach:
            lines = part.split('),')
            converted_lines = []
            for line in lines:
                if line.strip().startswith('(') or line.strip().startswith(','):
                    # Find the triplets of 1,0
                    # format: ..., phone, email, [flag], [flag], [flag], lat, long, ...
                    # Example: ..., '011-41455603', 'info@...', 1, 0, 1, 28.68...
                    line = re.sub(r',\s*1,\s*1,\s*1,', ', true, true, true,', line)
                    line = re.sub(r',\s*1,\s*0,\s*1,', ', true, false, true,', line)
                    line = re.sub(r',\s*0,\s*1,\s*1,', ', false, true, true,', line)
                    line = re.sub(r',\s*0,\s*0,\s*1,', ', false, false, true,', line)
                    line = re.sub(r',\s*1,\s*1,\s*0,', ', true, true, false,', line)
                    line = re.sub(r',\s*1,\s*0,\s*0,', ', true, false, false,', line)
                    line = re.sub(r',\s*0,\s*1,\s*0,', ', false, true, false,', line)
                    line = re.sub(r',\s*0,\s*0,\s*0,', ', false, false, false,', line)
                converted_lines.append(line)
            part = '),'.join(converted_lines)

        elif current_table == 'hospital_beds_summary':
            # (hospital_id, ...
            part = re.sub(r'\((\d+),', r"('\1',", part)
            
        elif current_table == 'doctors':
            # doctors (hospital_id, name, qualification, specialization, ...
            part = part.replace('(hospital_id,', '(id, hospital_id,')
            part = part.replace('specialization,', 'specialty,')
            
            lines = part.split('),')
            converted_lines = []
            for line in lines:
                if line.strip().startswith('(') or line.strip().startswith(','):
                    line = re.sub(r'\((\d+),', fr"('D{doctor_id_seq:04d}', '\1',", line)
                    doctor_id_seq += 1
                converted_lines.append(line)
            part = '),'.join(converted_lines)
            
        new_sql.append(part)

    with open('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\converted_delhi_v2.sql', 'w', encoding='utf-8') as f:
        f.write(''.join(new_sql))

if __name__ == "__main__":
    convert_sql()
