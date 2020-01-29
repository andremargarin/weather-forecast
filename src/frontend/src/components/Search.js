import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function Search({ onSelectLocation }) {
  const [query, setQuery] = useState();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let active = true;

    (async () => {
      const response = await fetch(`/api/location/?name=${query}`);
      let locations = await response.json();
      locations = locations['results'];

      if (active) {
        setOptions(locations);
      }
    })();

    return () => {
      active = false;
    };
  }, [query]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onChange = (event, value) => {
    if (value) {
      onSelectLocation(value);
    }
  }

  return (
    <Autocomplete
      freeSolo
      style={{ width: 500 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(event, value) => setQuery(value)}
      onChange={onChange}
      getOptionLabel={option => option.name}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Search by city name"
          fullWidth
          variant="outlined"
          InputProps={{
            ...params.InputProps
          }}
        />
      )}
    />
  );
}
