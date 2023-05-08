import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ApiService from '../../../services/api-service';
import { CheckboxOption } from '../../../components/form-controls/CustomCheckboxGroup';
import useCheckboxFilter from '../hooks/useCheckboxFilter';
import useRangeField from '../hooks/useRangeField';

type ShopContextValue = {
  cups: Cup[];
  filters: {
    price: {
      range: NumberRange;
      onChangeCommitted: (newRange: NumberRange) => void;
      bounds: NumberRange;
    };
    categories: {
      options: CheckboxOption[];
      selectedOptions: CheckboxOption[];
      onChange: (newSelectedOptions: CheckboxOption[]) => void;
    };
    materialTypes: {
      options: CheckboxOption[];
      selectedOptions: CheckboxOption[];
      onChange: (newSelectedOptions: CheckboxOption[]) => void;
    };
  };
};

const fetchCategoryOptions = async () => {
  const fetchedCategories = await ApiService.fetchMany('categories');

  return fetchedCategories.map(({ id, title }) => ({
    value: id,
    label: title,
  }));
};

const fetchMaterialTypeOptions = async () => {
  const fetchedCategories = await ApiService.fetchMany('materialTypes');

  return fetchedCategories.map(({ id, title }) => ({
    value: id,
    label: title,
  }));
};

const ShopContext = React.createContext({} as ShopContextValue);

export const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [cups, setCups] = React.useState<Cup[]>([]);

  const [categories, setCategories, categoriesOptions] = useCheckboxFilter({
    urlParamName: 'categories',
    fetchOptions: fetchCategoryOptions,
  });

  const [materialTypes, setMaterialTypes, materialTypesOptions] = useCheckboxFilter({
    urlParamName: 'materialTypes',
    fetchOptions: fetchMaterialTypeOptions,
  });

  const [priceRange, setPriceRange, priceBounds] = useRangeField({
    urlParamName: 'price',
    fetchRange: ApiService.fetchCupPriceRange,
  });

  const shopContextValue: ShopContextValue = React.useMemo(
    () => ({
      cups,
      filters: {
        price: {
          range: priceRange,
          onChangeCommitted: setPriceRange,
          bounds: priceBounds,
        },
        categories: {
          options: categoriesOptions,
          selectedOptions: categories,
          onChange: setCategories,
        },
        materialTypes: {
          options: materialTypesOptions,
          selectedOptions: materialTypes,
          onChange: setMaterialTypes,
        },
      },
    }),
    [cups, priceRange, categories, materialTypes],
  );

  React.useEffect(() => {
    (async () => {
      const fetchedCups = await ApiService.fetchMany('cups');
      setCups(fetchedCups);
    })();
  }, [searchParams]);

  return <ShopContext.Provider value={shopContextValue}>{children}</ShopContext.Provider>;
};

export default ShopContext;
