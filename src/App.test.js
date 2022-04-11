import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import TodoTable from'./TodoTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('add todo',() => {
  render(<App />);
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '29.01.2021' } })
  const button = screen.getByText('Add');
  fireEvent.click(button);
  const tablecell = screen.getByText(/go to coffee/i);
  expect(tablecell).toBeInTheDocument();
})

test('renders todotable', () => {
  const row = [
    {desc: 'Go to coffee', date: '24.01.2021'}
  ];
  render(<TodoTable todos={row} />);
  const tablecell = screen.getByText(/go to coffee/i);
  const tablecell2 = screen.queryByText(/go to work/i);
  expect(tablecell).toBeInTheDocument();
  expect(tablecell2).not.toBeInTheDocument();
});

test('clear todos',() => {
  render(<App />);
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Saunaan töiden jälkeen' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '12.04.2022' } })
  const button = screen.getByText('Add');
  const button2 = screen.getByText('Clear');
  fireEvent.click(button);
  const tablecell = screen.getByText(/Saunaan töiden jälkeen/i);
  expect(tablecell).toBeInTheDocument();
  fireEvent.click(button2);
  const tablecell2 = screen.queryByText(/Saunaan töiden jälkeen/i);
  expect(tablecell2).not.toBeInTheDocument();
  })