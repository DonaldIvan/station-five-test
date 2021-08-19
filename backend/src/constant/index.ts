export interface IContext {
  stringToSearch: string[];
  message: string;
}

const contextTable: IContext[] = [
  {
    stringToSearch: ['Hello', 'Hi'],
    message: 'Welcome to StationFive.',
  },
  {
    stringToSearch: ['Goodbye,', 'bye'],
    message: 'Thank you, see you around.',
  },
];

export default contextTable;
