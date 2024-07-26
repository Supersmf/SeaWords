export const getWordsLetters = (words: string[]) => {
  let selectedLetters = words[0].split("");

  words.forEach((word) => {
    const newLetters = selectedLetters.reduce((res, letter) => {
      const index = res.findIndex((item) => item === letter);

      if (index > -1) {
        res.splice(index, 1);
      }

      return res;
    }, word.split(""));

    selectedLetters = [...selectedLetters, ...newLetters];
  });

  return selectedLetters;
};

export const getLevel = (array: string[][], level: number) =>
  array[(level - 1) % array.length];
