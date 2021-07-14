import { FieldError } from '../generated/graphql';

export const changeErrorsToMap = (errors: FieldError[]): Record<string, string> => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
