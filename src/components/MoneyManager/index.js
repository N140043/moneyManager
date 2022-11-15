import './index.css'
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const initialTransactions = [
  {id: uuidv4(), title: 'Salary', amount: 10000, type: 'Income'},
  {id: uuidv4(), title: 'Car Loan', amount: 590, type: 'Expenses'},
  {id: uuidv4(), title: 'Part time', amount: 15000, type: 'Income'},
  {id: uuidv4(), title: 'Phone', amount: 7000, type: 'Expenses'},
]
class MoneyManager extends Component {
  state = {
    moneyHistoryList: initialTransactions,
    title: '',
    amount: '',
    type: transactionTypeOptions[0].displayText,
    income: initialTransactions.map(each => {
      if (each.type === 'Income') {
        return each.amount
      }
      return 0
    }),
    expense: initialTransactions.map(each => {
      if (each.type === 'Expenses') {
        return each.amount
      }
      return 0
    }),
  }

  addMoneyHistory = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    const incomeAmount = type === 'Income' ? amount : 0
    const expenseAmount = type !== 'Income' ? amount : 0
    if (title.length !== 0) {
      console.log(incomeAmount, expenseAmount)
      this.setState(prev => ({
        moneyHistoryList: [...prev.moneyHistoryList, newTransaction],
        title: '',
        amount: '',
        type: transactionTypeOptions[0].optionId,
        income: [...prev.income, +incomeAmount],
        expense: [...prev.expense, +expenseAmount],
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  deleteTransaction = id => {
    const {moneyHistoryList} = this.state
    const updateTransactions = moneyHistoryList.filter(each => each.id !== id)
    this.setState({
      moneyHistoryList: updateTransactions,
      income: updateTransactions.map(each => {
        if (each.type === 'Income') {
          return each.amount
        }
        return 0
      }),
      expense: updateTransactions.map(each => {
        if (each.type === 'Expenses') {
          return each.amount
        }
        return 0
      }),
    })
  }

  render() {
    const {moneyHistoryList, title, amount, income, expense} = this.state
    const totalIncome = income ? income.reduce((acc, curr) => acc + curr) : 0
    const totalExpenses = expense
      ? expense.reduce((acc, curr) => acc + curr)
      : 0
    console.log(totalIncome)
    console.log(totalExpenses)

    return (
      <div className="bg-container">
        <div className="personal-info-container">
          <h1 className="personal-info-heading ">Hi, Richard</h1>
          <p className="personal-info-para">
            Welcome back to your
            <span className="personal-info-para-span">Money Manager</span>
          </p>
        </div>
        <div className="money-details-container">
          <MoneyDetails income={totalIncome} expense={totalExpenses} />
        </div>
        <div className="money-manager-form-and-history-container">
          <form
            className="money-manager-form-container"
            onSubmit={this.addMoneyHistory}
          >
            <h1 className="money-manager-form-heading">Add Transaction</h1>
            <label className="money-manager-form-title " htmlFor="title">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              className="money-manager-form-title-input"
              placeholder="TITLE"
              value={title}
              onChange={this.onChangeTitle}
            />
            <label className="money-manager-form-title " htmlFor="amount">
              AMOUNT
            </label>
            <input
              type="number"
              id="amount"
              className="money-manager-form-title-input"
              placeholder="AMOUNT"
              value={amount}
              onChange={this.onChangeAmount}
            />
            <label
              className="money-manager-form-title "
              htmlFor="transfer-type"
            >
              TYPE
            </label>
            <select
              id="transfer-type"
              className="money-manager-form-title-input"
              onChange={this.onChangeType}
            >
              {transactionTypeOptions.map(each => (
                <option value={each.displayText} key={each.optionId}>
                  {each.optionId}
                </option>
              ))}
            </select>
            <button type="submit" className="money-manager-form-btn">
              Add
            </button>
          </form>
          <div className="money-manager-history-container">
            <h1 className="money-manager-form-heading">History</h1>
            <div className="money-manager-heading-container">
              <h1 className="money-manager-heading1">Title</h1>
              <h1 className="money-manager-heading1">Amount</h1>
              <h1 className="money-manager-heading1">Type</h1>
            </div>
            <ul className="money-manager-history-container-sub">
              {moneyHistoryList &&
                moneyHistoryList.map(each => (
                  <TransactionItem
                    moneyInfo={each}
                    key={each.id}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
