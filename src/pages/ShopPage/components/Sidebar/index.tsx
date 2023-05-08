import * as React from 'react';
import { Divider } from '@mui/material';
import SidebarContainer from './components/SidebarContainer';
import DrawerHeader from '../DrawerHeader';
import DrawerContext from '../../contexts/DrawerContext';
import ShopContext from '../../contexts/ShopContext';
import RangeField from '../../../../components/form-controls/RangeField';
import CustomCheckboxGroup from '../../../../components/form-controls/CustomCheckboxGroup';

type SidebarProps = {
  isExtendedLayout: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isExtendedLayout }) => {
  const { open } = React.useContext(DrawerContext);

  const {
    filters: {
      price: priceFilter,
      categories: categoriesFilter,
      materialTypes: materialTypesFilter,
    },
  } = React.useContext(ShopContext);

  return (
    <SidebarContainer variant={isExtendedLayout ? 'permanent' : 'temporary'} open={open}>
      <DrawerHeader />
      <RangeField
        label="Price"
        min={priceFilter.bounds[0]}
        max={priceFilter.bounds[1]}
        value={priceFilter.range}
        onChangeCommitted={(_, newRange) => priceFilter.onChangeCommitted(newRange)}
      />
      <Divider sx={{ my: 2 }} />
      <CustomCheckboxGroup
        formLabel="Categories"
        name="categories"
        options={categoriesFilter.options}
        value={categoriesFilter.selectedOptions}
        onChange={(_, newCategories) => categoriesFilter.onChange(newCategories)}
      />
      <Divider sx={{ my: 2 }} />
      <CustomCheckboxGroup
        formLabel="Material Types"
        name="materialTypes"
        options={materialTypesFilter.options}
        value={materialTypesFilter.selectedOptions}
        onChange={(_, newCategories) => materialTypesFilter.onChange(newCategories)}
      />
    </SidebarContainer>
  );
};

export default Sidebar;
