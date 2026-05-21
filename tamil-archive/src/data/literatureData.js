import * as XLSX from 'xlsx';

export async function loadTableData() {
  const response = await fetch('/data.xlsx');
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  return rows.map(row => ({
    id:              String(row['ID']                   ?? ''),
    moolaPadam:      String(row['மூலபாடம்']             ?? ''),
    sandhiPirittha:  String(row['சந்திபிரித்தபாடம்']    ?? ''),
    solPirittha:     String(row['சொற்கள்பிரித்தபாடம்']  ?? ''),
    nool:            String(row['நூல்']                  ?? ''),
    nool1:           String(row['நூல்1']                 ?? ''),
    padalElam:       String(row['பாடல்எண்']              ?? ''),
    adi:             String(row['அடி']                   ?? ''),
  }));
}

export const books = [
  'செவ்வியல் நூல்கள்',
  'திருக்குறள்',
  'சிலப்பதிகாரம்',
  'மணிமேகலை',
  'புறநானூறு',
  'அகநானூறு',
  'நற்றிணை',
  'தொல்காப்பியம்',
  'கம்பராமாயணம்',
  'கலித்தொகை',
  'பரிபாடல்',
  'ஐங்குறுநூறு',
];

export const stats = {
  idamPetra: 0,
  moththam:  37543,
};
