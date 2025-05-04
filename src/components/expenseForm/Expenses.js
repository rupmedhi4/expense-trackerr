import React from 'react';
import ExpenseFormHeader from './ExpenseFormHeader';
import ExpenseForm from './ExpenseForm.js'
import ShowingExpenses from './ShowingExpenses';

export default function Expenses() {
  return (
    <div>
      <ExpenseFormHeader />
      <ExpenseForm />
    </div>
  );
}
