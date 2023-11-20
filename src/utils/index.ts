export const shortNumber = (num: number): string => {
  const formatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  });

  return formatter.format(num);
};

export const to = async promise => promise.then(data => [null, data]).catch(err => [err]);
