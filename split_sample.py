import sys

with open("generate_beds.sql", "r") as f:
    lines = f.readlines()

chunk_size = 500
for i in range(0, len(lines), chunk_size):
    chunk = lines[i:i + chunk_size]
    with open(f"sample_chunk_{i//chunk_size}.sql", "w") as out:
        out.writelines(chunk)
