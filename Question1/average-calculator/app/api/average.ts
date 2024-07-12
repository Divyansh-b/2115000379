import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type NumberType = "prime" | "fibonacci" | "even" | "random";

interface NumberResponse {
  numbers: number[];
}

let window: number[] = [];
const WINDOW_SIZE = 10;

const fetchNumbers = async (type: NumberType): Promise<number[]> => {
  const urls: Record<NumberType, string> = {
    prime: "http://20.244.56.144/test/primes",
    fibonacci: "http://20.244.56.144/test/fibo",
    even: "http://20.244.56.144/test/even",
    random: "http://20.244.56.144/test/random",
  };

  try {
    const response = await axios.get<NumberResponse>(urls[type]);
    return response.data.numbers;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;

  if (
    typeof type !== "string" ||
    !["prime", "fibonacci", "even", "random"].includes(type)
  ) {
    res.status(400).json({ error: "Invalid number type" });
    return;
  }

  const numbers = await fetchNumbers(type as NumberType);

  const uniqueNumbers = Array.from(new Set([...window, ...numbers]));

  window = uniqueNumbers.slice(-WINDOW_SIZE);

  const average = calculateAverage(window);

  res.status(200).json({
    windowPrevState: window.slice(0, -1),
    windowCurrState: window,
    average: average.toFixed(2),
  });
}
