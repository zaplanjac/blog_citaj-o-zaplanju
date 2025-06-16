// Utility for converting Latin to Serbian Cyrillic
export const latinToCyrillic = (text: string): string => {
  const conversionMap: { [key: string]: string } = {
    'a': 'а', 'A': 'А',
    'b': 'б', 'B': 'Б',
    'c': 'ц', 'C': 'Ц',
    'd': 'д', 'D': 'Д',
    'e': 'е', 'E': 'Е',
    'f': 'ф', 'F': 'Ф',
    'g': 'г', 'G': 'Г',
    'h': 'х', 'H': 'Х',
    'i': 'и', 'I': 'И',
    'j': 'ј', 'J': 'Ј',
    'k': 'к', 'K': 'К',
    'l': 'л', 'L': 'Л',
    'm': 'м', 'M': 'М',
    'n': 'н', 'N': 'Н',
    'o': 'о', 'O': 'О',
    'p': 'п', 'P': 'П',
    'r': 'р', 'R': 'Р',
    's': 'с', 'S': 'С',
    't': 'т', 'T': 'Т',
    'u': 'у', 'U': 'У',
    'v': 'в', 'V': 'В',
    'z': 'з', 'Z': 'З',
    // Digraphs and special characters
    'dž': 'џ', 'Dž': 'Џ', 'DŽ': 'Џ',
    'lj': 'љ', 'Lj': 'Љ', 'LJ': 'Љ',
    'nj': 'њ', 'Nj': 'Њ', 'NJ': 'Њ',
    'dj': 'ђ', 'Dj': 'Ђ', 'DJ': 'Ђ',
    'đ': 'ђ', 'Đ': 'Ђ',
    'č': 'ч', 'Č': 'Ч',
    'ć': 'ћ', 'Ć': 'Ћ',
    'š': 'ш', 'Š': 'Ш',
    'ž': 'ж', 'Ž': 'Ж',
    // Common English words that should remain
    'w': 'в', 'W': 'В',
    'x': 'кс', 'X': 'КС',
    'y': 'ј', 'Y': 'Ј',
    'q': 'кв', 'Q': 'КВ'
  };

  // First handle digraphs (longer sequences first)
  let result = text;
  const digraphs = ['dž', 'Dž', 'DŽ', 'lj', 'Lj', 'LJ', 'nj', 'Nj', 'NJ', 'dj', 'Dj', 'DJ'];
  
  digraphs.forEach(digraph => {
    const regex = new RegExp(digraph, 'g');
    result = result.replace(regex, conversionMap[digraph] || digraph);
  });

  // Then handle single characters
  result = result.replace(/[a-zA-ZđĐčČćĆšŠžŽ]/g, (char) => {
    return conversionMap[char] || char;
  });

  return result;
};

// Date conversion utility
export const formatSerbianDate = (englishDate: string): string => {
  const monthMap: { [key: string]: string } = {
    'January': 'јануар',
    'February': 'фебруар',
    'March': 'март',
    'April': 'април',
    'May': 'мај',
    'June': 'јун',
    'July': 'јул',
    'August': 'август',
    'September': 'септембар',
    'October': 'октобар',
    'November': 'новембар',
    'December': 'децембар'
  };

  // Parse the English date (e.g., "March 15, 2024")
  const dateParts = englishDate.split(' ');
  if (dateParts.length >= 3) {
    const month = dateParts[0];
    const day = dateParts[1].replace(',', '');
    const year = dateParts[2];
    
    const serbianMonth = monthMap[month] || month.toLowerCase();
    return `${day} ${serbianMonth} ${year} год`;
  }
  
  return englishDate;
};

// Serbian Cyrillic translations
export const translations = {
  // Header
  'Readwell': 'Читај о Заплању',
  'Stories': 'Приче',
  'Authors': 'Аутори',
  'Categories': 'Категорије',
  'About': 'О нама',
  
  // Homepage
  'Stories Worth': 'Приче вредне',
  'Reading': 'читања',
  'Discover thoughtful articles, deep insights, and beautiful narratives crafted for the modern reader.': 'Откријте промишљене чланке, дубоке увиде и прелепе наративе о Заплању и његовим људима.',
  'Featured Story': 'Истакнута прича',
  'Recent Stories': 'Недавне приче',
  'Latest Story': 'Најновија прича',
  'Read Story': 'Прочитај причу',
  'No stories found matching': 'Нема пронађених прича за',
  
  // Blog post
  'Back to Stories': 'Назад на приче',
  'More in': 'Више у',
  'min read': 'мин читања',
  
  // Categories
  'Technology': 'Технологија',
  'Culture': 'Култура',
  'Environment': 'Животна средина',
  'Science': 'Наука',
  'Philosophy': 'Филозофија',
  
  // Common
  'Back to top': 'Назад на врх'
};

export const t = (key: string): string => {
  return translations[key as keyof typeof translations] || key;
};