const formatSoles = number => {
  if (typeof number === 'number') {
    let formattedNumber = number.toFixed(2);
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return 'S/. ' + formattedNumber;
  }
};
const formatTwoDec = number => {
  if (typeof number === 'number') {
    let formattedNumber = number.toFixed(2);
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedNumber;
  }
};
const textToSlug = text => {
  return text
    .toLowerCase()
    .toLowerCase()
    .replace(/[áäâà]/g, 'a')
    .replace(/[éëêè]/g, 'e')
    .replace(/[íïîì]/g, 'i')
    .replace(/[óöôò]/g, 'o')
    .replace(/[úüûù]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[\s_-]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/^-+|-+$/g, ' ');
};
export { formatSoles, textToSlug, formatTwoDec };
