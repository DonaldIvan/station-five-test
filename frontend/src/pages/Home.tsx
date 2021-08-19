import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import { mealData } from 'constant';
import RadioGroup from 'components/RadioGroup';
import { theme, useStyles } from 'theme';
import { IMenu } from 'types';

type RadioButtonNames = {
  [key: string]: string;
};
const Home = (): JSX.Element => {
  const { menus: menusData, rules } = mealData;
  const [menus, setMenus] = useState<IMenu[]>(menusData);
  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const classes = useStyles();

  const [selectedRadioButton, setSelectedRadioButton] =
    useState<RadioButtonNames>({
      type: '',
      meal: '',
      sauce: '',
    });

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    alert(`Well done`);
  };

  const radioChangedHandler = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioButton((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateDisabledButtons = useCallback(() => {
    let idRulesToDisable: number[] = [];
    for (const key in selectedRadioButton) {
      const id = selectedRadioButton[key];
      id &&
        rules.hasOwnProperty(id) &&
        (idRulesToDisable = [...idRulesToDisable, ...rules[id]]);
      setIsValidToSubmit(!!id);
      if (idRulesToDisable.includes(+id)) {
        setSelectedRadioButton((prev) => ({
          ...prev,
          [key]: '',
        }));
      }
    }

    setMenus((prevMenu) =>
      prevMenu.map(({ menu, name: menuName }) => {
        const initialDisabledButton =
          !idRulesToDisable.length && ['meal', 'sauce'].includes(menuName);
        return {
          name: menuName,
          menu: menu.map((menuItem) => {
            const { id } = menuItem;
            return {
              ...menuItem,
              disabled: initialDisabledButton || idRulesToDisable.includes(+id),
            };
          }),
        };
      }),
    );
  }, [rules, selectedRadioButton]);

  useEffect(() => {
    updateDisabledButtons();
  }, [updateDisabledButtons]);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          color="textSecondary"
          gutterBottom
          align="center"
        >
          Meal Planner
        </Typography>
        <form noValidate autoComplete="off" onSubmit={submitHandler}>
          <Grid container spacing={0}>
            {menus &&
              menus.map(({ name, menu }) => (
                <Grid item xs={4} key={name}>
                  <FormControl className={classes.field}>
                    <RadioGroup
                      item={menu}
                      name={name}
                      value={selectedRadioButton[name]}
                      onChange={radioChangedHandler}
                    />
                  </FormControl>
                </Grid>
              ))}
          </Grid>

          <Button
            disabled={!isValidToSubmit}
            type="submit"
            color="secondary"
            variant="contained"
            fullWidth
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
