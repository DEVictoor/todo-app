const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

const padWithZeros = number => {
  if (!number) return null;
  return number.toString().padStart(2, '0');
};

const formatDate = string => {
  const dt = new Date(string);
  const day = padWithZeros(dt.getDate());
  const month = padWithZeros(dt.getMonth() + 1);
  const year = dt.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDateCasual = string => {
  if (!string) return null;
  const date = new Date(string);
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  return month + ' ' + day + ', ' + year;
};

const formatDateAlternative = string => {
  const date = new Date(string);
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `el ${day} de ${month} del ${year}`;
};

const formatTimeCasual = string => {
  if (!string) return null;
  const date = new Date(string);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes + ' ' + ampm;
};

const formatDateTimeCasual = date => {
  const formattedDate = formatDateCasual(date);
  const formattedTime = formatTimeCasual(date);
  return formattedDate + ' a las ' + formattedTime;
};

export {
  monthNames,
  formatDate,
  formatDateCasual,
  formatTimeCasual,
  formatDateTimeCasual,
  formatDateAlternative
};
