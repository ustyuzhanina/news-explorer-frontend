export function sortByFrequency(keywords) {
  const frequency = {};

  keywords.forEach((value) => frequency[value] = 0);

  const filteredArray = keywords.filter((value) => ++frequency[value] === 1);

  return filteredArray.sort((a,b) => frequency[b] - frequency[a]);
}