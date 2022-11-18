import TSON from "typescript-json";

const basicExample = () => {
  interface IMember {
    name: string;
    age: number;
  }

  const getRandomBoolean = () => {
    return Math.random() > 0.5;
  };

  // NO PROBLEM
  const exact: IMember = {
    name: "someone",
    age: (getRandomBoolean() ? "rahul" : 10) as unknown as number,
  };
  try {
    // console.log(TSON.assertStringify(exact));
    console.log(TSON.isStringify(exact));
    console.log(exact);
  } catch (err) {
    console.error(err);
  }
};

export default basicExample;
