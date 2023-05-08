import { Autocomplete, TextField } from '@mui/material';
import * as React from 'react';

// type ContentType = {
//   id: string;
//   title: string;
// };

type Topic = {
  id: string;
  title: string;
};

const topics: Topic[] = [
  { id: '1', title: 'HTML' },
  { id: '2', title: 'CSS' },
  { id: '3', title: 'JS' },
  { id: '4', title: 'DOM' },
  { id: '5', title: 'TS' },
  { id: '6', title: 'Webpack' },
  { id: '7', title: 'Git' },
  { id: '8', title: 'React' },
  { id: '9', title: 'Node' },
  { id: '10', title: 'Express' },
  { id: '11', title: 'SQL' },
  { id: '12', title: 'MongoDB' },
];

const CustomAutocomplete: React.FC = () => {
  const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([]);
  return (
    <Autocomplete
      multiple
      getOptionLabel={({ title }) => title}
      options={topics}
      sx={{ width: 300 }}
      value={selectedTopics}
      onChange={(_, newSelectedTopics) => setSelectedTopics(newSelectedTopics)}
      renderInput={(params) => <TextField variant="filled" {...params} label="Interests" />}
    />
  );
};

export default CustomAutocomplete;
