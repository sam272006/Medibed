
import re

def convert_sql(content):
    # Mapping table/column names and converting logic
    # 1. Table names and column names
    content = content.replace("hospitals (hospital_id,", "hospitals (id,")
    content = content.replace("hospital_beds (", "hospital_beds_summary (")
    content = content.replace("INSERT INTO doctors (hospital_id,", "INSERT INTO doctors (id, hospital_id,") # Add id column
    
    # 2. Data conversion (MySQL to Postgres)
    # Boolean conversion (nabh, nabl, emergency)
    # This is tricky because it's inside the values list.
    # regex for hospital insert: (\d+,\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*)(\d)(,\s*)(\d)(,\s*)(\d)(,.*)
    # simplifies to looking for , 1, or , 0, in certain positions or just blanket replace for small values
    
    # Enums/Types conversion
    content = content.replace("TINYINT(1)", "BOOLEAN")
    content = content.replace("AUTO_INCREMENT", "") # Not needed in PG if using SERIAL
    content = content.replace("ENUM('Active','On Leave','Resigned')", "TEXT")
    content = content.replace("ENUM('Government','Private','Trust','Autonomous')", "TEXT")
    content = content.replace("ENUM('Primary','Secondary','Tertiary','Specialty')", "TEXT")
    content = content.replace("YEAR", "INTEGER")
    content = content.replace("AUTO_INCREMENT", "")
    
    # Prefix IDs with H for hospital to match existing app patterns?
    # Actually, the app just uses strings. '1' is fine.
    # But for doctors, we need to inject a UUID or sequential ID.
    
    # For doctors, I'll generate 'D001', 'D002', etc.
    doctor_count = 0
    def doctor_repl(match):
        nonlocal doctor_count
        doctor_count += 1
        id_str = f"'D{doctor_count:04d}'"
        return f"INSERT INTO doctors (id, hospital_id,"
    
    # This is getting complex for a regex. Let's do it line by line.
    lines = content.split('\n')
    new_lines = []
    doctor_count = 0
    for line in lines:
        if line.startswith("INSERT INTO hospitals"):
            # Convert 1, 0 values to true, false
            # Columns: id, name, address, locality, pincode, hospital_type, level, phone, email, nabh_accredited(9), nabl_accredited(10), emergency_24x7(11)
            line = line.replace(" (1, ", " ('1', ")
            # regex for the values part to safely swap 1/0
            # for now, simple replace if they look like flags
            line = line.replace(", 1, 0, 1,", ", true, false, true,")
            line = line.replace(", 1, 1, 1,", ", true, true, true,")
            line = line.replace(", 0, 0, 1,", ", false, false, true,")
            line = line.replace(", 0, 0, 0,", ", false, false, false,")
            line = line.replace(", 1, 0, 0,", ", true, false, false,")
            # Convert hospital IDs to strings
            line = re.sub(r'\((\d+),', r"('\1',", line)
        
        elif line.startswith("INSERT INTO hospital_beds"):
            line = line.replace("hospital_beds", "hospital_beds_summary")
            line = re.sub(r'\((\d+),', r"('\1',", line)
            
        elif line.startswith("INSERT INTO doctors"):
            doctor_count += 1
            line = line.replace("doctors (hospital_id,", f"doctors (id, hospital_id,")
            line = line.replace("specialization,", "specialty,")
            line = re.sub(r'VALUES\s*\((\d+),', fr"VALUES ('D{doctor_count:04d}', '\1',", line)
        
        new_lines.append(line)
    
    return '\n'.join(new_lines)

with open('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\medibed_central_delhi.sql', 'r', encoding='utf-8') as f:
    sql = f.read()

converted_sql = convert_sql(sql)

with open('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\converted_delhi.sql', 'w', encoding='utf-8') as f:
    f.write(converted_sql)
