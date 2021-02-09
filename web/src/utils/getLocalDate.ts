function cutZero(str: string) {
  if (str[0] === '0') {
    return str[1];
  } else {
    return str;
  }
}

function getMonth(month: string) {
  if (month === 'Jan') {
    return '1';
  } else if (month === 'Feb') {
    return '2';
  } else if (month === 'Mar') {
    return '3';
  } else if (month === 'Apr') {
    return '4';
  } else if (month === 'May') {
    return '5';
  } else if (month === 'Jun') {
    return '6';
  } else if (month === 'Jul') {
    return '7';
  } else if (month === 'Aug') {
    return '8';
  } else if (month === 'Sep') {
    return '9';
  } else if (month === 'Oct') {
    return '10';
  } else if (month === 'Nov') {
    return '11';
  } else if (month === 'Dec') {
    return '12';
  }

  return month;
}

export const isDateToday = (date: string) => {
  const localDate = new Date(parseInt(date)).toString();
  const now = new Date().toString();
  return now.slice(0, 15) === localDate.slice(0, 15);
};

export function getLocalDate(
  date: string,
  variant: 'default' | 'dot' = 'default',
  showTime: boolean = true
): string {
  const localDate = new Date(parseInt(date)).toString();
  const [, month, day, year, time] = localDate.split(' ');
  const [hour, minute] = time.split(':');

  let result = '';

  if (variant === 'default') {
    result = `${year}년 ${getMonth(month)}월 ${cutZero(day)}일`;
  } else if (variant === 'dot') {
    result = `${year}.${getMonth(month)}.${cutZero(day)}`;
  }

  if (showTime && isDateToday(date)) {
    result += ` ${hour}:${minute}`;
  }

  return result;
}
