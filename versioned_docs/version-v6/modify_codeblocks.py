import os
import sys

def convert_code_blocks(file_path, filename):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    new_lines = []
    inside_existing_code_block = False
    inside_code_block = False
    prev_nonspaced_line_starts_with_hyphen = False

    for line in lines:
        if line.startswith('```'):
            inside_existing_code_block = not inside_existing_code_block
            new_lines.append(line)
            continue    
        elif inside_existing_code_block:
            new_lines.append(line)
            continue 

        if len(line) > 1 and line[0] != ' ':
            # print(line[:5])
            prev_nonspaced_line_starts_with_hyphen = (line[0] == '-')
            # print(prev_nonspaced_line_starts_with_hyphen)

        if not inside_code_block:
            if is_starting_block_line(line) and len(new_lines) > 0 and new_lines[-1].strip() == '' and not prev_nonspaced_line_starts_with_hyphen:
                inside_code_block = True
                new_lines.append('```\n')
                new_lines.append(line[4:])
                print(f'{filename}: {new_lines[-1][:-1]}')
            else:
                new_lines.append(line)
        else:
            if not is_block_line(line):
                new_lines.append('```\n')
                new_lines.append(line)
                inside_code_block = False
            else:    
                new_lines.append(line[4:])

    if inside_code_block:
        new_lines.append('```\n')

    new_lines = union_neighbour_blocks(new_lines)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.writelines(new_lines)

def is_starting_block_line(line):
    return line.startswith('    ') and line[4] != ' '    

def is_block_line(line):
    return line.startswith('    ')    

def union_neighbour_blocks(lines):
    new_lines = []
    add = True
    for index, line in enumerate(lines):
        if line == '```\n' and index+2 < len(lines) and lines[index+1] == '\n' and lines[index+2] == '```\n' :
            add = False
        elif line == '```\n' and not add:
            add = True
        else:
            new_lines.append(line)
    return new_lines

def main():
    if len(sys.argv) < 2:
        print("Usage: python modify_codeblocks.py <path_to_directory>")
        sys.exit(1)

    directory_path = sys.argv[1]

    if not os.path.isdir(directory_path):
        print(f"The provided path is not a directory: {directory_path}")
        sys.exit(1)

    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith(".md"):
                convert_code_blocks(os.path.join(root, file), file)

if __name__ == "__main__":
    main()