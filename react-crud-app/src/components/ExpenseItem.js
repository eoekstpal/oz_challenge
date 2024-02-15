import React from 'react'
import './ExpenseItem.css'
import { MdEdit, MdDelete } from 'react-icons/md';

const ExpenseItem = (props) => {
  return (
        <li className='item'>
            <div className='info'>
                <span className='expense'>{props.expense.charge}</span>
                <span className='amount'>{props.expense.amount}</span>
            </div>
            <div>
                <button className='edit-btn'>
                    <MdEdit/>
                </button>
                <button onClick={() => this.props.handleDelete(props.expense.id)} className='clear-btn'>
                    <MdDelete/>
                </button>
            </div>
        </li>
  )
}
export default ExpenseItem;