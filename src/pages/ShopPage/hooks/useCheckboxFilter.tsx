import { CheckboxOption } from 'components/form-controls/CustomCheckboxGroup';
import React from 'react';

type CheckboxFilterOptions = {
  urlParamName: string;
  fetchOptions: () => Promise<CheckboxOption[]>;
};

const useCheckboxFilter = ({
  urlParamName,
  fetchOptions,
}: CheckboxFilterOptions): [
  CheckboxOption[],
  (newSelectedOptions: CheckboxOption[]) => void,
  CheckboxOption[],
] => {
  const [options, setOptions] = React.useState<CheckboxOption[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<CheckboxOption[]>([]);

  if (urlParamName) console.log(urlParamName);

  React.useEffect(() => {
    (async () => {
      const fetchedOptions = await fetchOptions();
      setOptions(fetchedOptions);
    })();
  }, []);

  return [selectedOptions, setSelectedOptions, options];
};

export default useCheckboxFilter;
