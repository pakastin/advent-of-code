const data = await Deno.readTextFile("sample.txt");

let numbers = data.split(" ").map((str) => Number(str));

for (let i = 0; i < 25; i++) {
  numbers = numbers.reduce((numbers, number) => {
    let result;

    const str = String(number);
    if (number === 0) {
      result = 1;
    } else if (str.length % 2 === 0) {
      result = [
        Number(str.slice(0, str.length / 2)),
        Number(str.slice(str.length / 2, str.length)),
      ];
    } else {
      result = number * 2024;
    }
    return numbers.concat(result);
  }, []);
  console.log(i + 1, numbers.length);
}
