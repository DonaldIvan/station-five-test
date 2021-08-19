import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { IMenuItem } from 'types';
import { ChangeEvent } from 'react';

interface IRadioTypes {
  item: IMenuItem[];
  value: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RGroup = ({ item, value, onChange, name }: IRadioTypes): JSX.Element => {
  return (
    <RadioGroup value={value} onChange={(e) => onChange(e)} name={name}>
      {item.map(({ id, value, disabled }) => (
        <FormControlLabel
          value={id}
          control={<Radio />}
          label={value}
          key={id}
          disabled={disabled}
        />
      ))}
    </RadioGroup>
  );
};

export default RGroup;
