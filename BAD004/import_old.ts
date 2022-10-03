import XLSX from 'XLSX';

let workbook = XLSX.readFile("./seeds/BAD004-exercise.xlsx")
let user: User[] = XLSX.utils.sheet_to_json(workbook.Sheets['user'])
let category = XLSX.utils.sheet_to_json(workbook.Sheets['category'])
let file = XLSX.utils.sheet_to_json(workbook.Sheets['file'])

interface User {
    username: string;
    password: (string | number);
    level: string
}

let users = user.map(obj => obj.username)

console.log(users);
