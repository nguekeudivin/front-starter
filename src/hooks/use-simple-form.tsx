"use client";

import { pick } from "@/lib/utils";
import { useState } from "react";

export function useSimpleForm({
  defaultValues,
  schema,
  onUpdate,
}: {
  defaultValues: any;
  schema?: any;
  onUpdate?: any;
}) {
  const [values, setValues] = useState<any>(defaultValues);
  const [errors, setErrors] = useState<any>({});
  const setValue = (name: string, value: any) => {
    setValues((prevValues: any) => {
      const newValues = {
        ...prevValues,
        [name]: value,
      };
      if (onUpdate) onUpdate(newValues, name);
      return newValues;
    });
  };
  function handleChange(e: any) {
    const { name, value } = e.target;
    setValue(name, value);
  }

  function handleNumberChange(e: any) {
    const { name, value } = e.target;
    let bool = false;

    if (typeof value === "string") {
      bool = /^\d+$/.test(value);
    }

    if (typeof value === "number" || value == "") {
      bool = true;
    }

    if (bool) {
      setValue(name, value);
    }
  }

  function getValidValues(values: any) {
    const result = schema.safeParse(values);

    if (result.success) {
      // If the data is valid, return the entire object
      return result.data;
    } else {
      // If the data is invalid, extract valid fields
      const validFields: any = {};
      const errors = result.error.errors;

      for (const key of Object.keys(values)) {
        // Check if the field has no errors
        if (!errors.some((error: any) => error.path.includes(key))) {
          validFields[key] = values[key];
        }
      }
      return validFields;
    }
  }

  function validateAsync() {
    if (schema != undefined) {
      const result = schema.safeParse(values);
      if (!result.success) {
        const errorObj: { [key: string]: string } = {};
        result.error.errors.forEach((err: any) => {
          errorObj[err.path[0]] = err.message;
        });
        setErrors(errorObj);
        return Promise.reject(errorObj);
      } else {
        setErrors({});
        return Promise.resolve(result.data);
      }
    } else {
      return Promise.resolve(values);
    }
  }

  function validate() {
    setErrors({});
    if (schema != undefined) {
      const result = schema.safeParse(values);
      if (!result.success) {
        const errorObj: { [key: string]: string } = {};
        result.error.errors.forEach((err: any) => {
          errorObj[err.path[0]] = err.message;
        });
        setErrors(errorObj);
        return { valid: false, errors: errorObj };
      } else {
        return { valid: true, values: result.data };
      }
    } else {
      return {
        valid: true,
      };
    }
  }

  function check(inputs: any = undefined) {
    setErrors({});
    if (schema != undefined) {
      const result = schema.safeParse(inputs != undefined ? inputs : values);
      if (!result.success) {
        const errorObj: { [key: string]: string } = {};
        result.error.errors.forEach((err: any) => {
          errorObj[err.path[0]] = err.message;
        });

        setErrors(errorObj);
        return false;
      } else {
        setErrors({});
        return true;
      }
    } else {
      return true;
    }
  }

  function resetValues() {
    setValues(defaultValues);
    if (onUpdate) onUpdate(defaultValues);
  }

  function resetValue(name: string) {
    setValue(name, defaultValues[name]);
  }

  function renderErrors(...keys: any) {
    const errorsToRenders = keys.length ? pick(errors, keys) : errors;
    if (Object.keys(errorsToRenders).length == 0) return null;
    return (
      <div className="bg-red-50 text-red-500 rounded-lg border-red-500">
        {Object.entries(errorsToRenders).map(([key, value], index) => (
          <div key={`error${key}${index}`} className="ms-3 text-sm font-medium">
            {value as string}
          </div>
        ))}
      </div>
    );
  }


  // A special function to handle easly array update.
  // If the is true the function add the value to the array hold by the name key
  // otherwise we remove the value.
  function pushToggle(name: string, value: any, condition: boolean) {
    setValue(
      name,
      condition
        ? [...values[name], value]
        : values[name].filter((el: string) => el != value)
    );
  }

  function hasError(name: string) {
    return errors[name] != undefined && errors[name] != "";
  }

  return {
    getValidValues,
    handleNumberChange,
    setValue,
    setValues,
    resetValue,
    values,
    handleChange,
    validate,
    check,
    validateAsync,
    errors,
    hasError,
    setErrors,
    renderErrors,
    resetValues,
    pushToggle,
  };
}

export const validateObject = (values: any, schema: any) => {
  if (schema != undefined) {
    const result = schema.safeParse(values);
    if (!result.success) {
      const errorObj: { [key: string]: string } = {};
      result.error.errors.forEach((err: any) => {
        errorObj[err.path[0]] = err.message;
      });
      return { valid: false, errors: errorObj };
    } else {
      return { valid: true, values: result.data };
    }
  } else {
    return { valid: true, values };
  }
};
