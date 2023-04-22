import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

function useForm<T>(inputValues: T): [T, (event: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>] {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    
    setValues((currentState) => {
      const newState = {
        ...currentState,
        [name]: value,
      };
      return newState;
    });
  };

  return [values, handleChange, setValues];
}

export default useForm;