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

// const initialTransactions = [
//   {id: uuidv4(), title: 'Salary', amount: 10000, type: 'Income'},
//   {id: uuidv4(), title: 'Car Loan', amount: 590, type: 'Expenses'},
//   {id: uuidv4(), title: 'Part time', amount: 15000, type: 'Income'},
//   {id: uuidv4(), title: 'Phone', amount: 7000, type: 'Expenses'},
// ]
class MoneyManager extends Component {
  state = {
    moneyHistoryList: [],
    title: '',
    amount: '',
    type: 'Income',
    income: 0,
    expense: 0,
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

    if (title.length !== 0 && amount.length !== 0) {
      this.setState(prev => ({
        moneyHistoryList: [...prev.moneyHistoryList, newTransaction],
        title: '',
        amount: '',
        type: transactionTypeOptions[0].displayText,
        income:
          type === 'Income' ? prev.income + parseInt(amount) : prev.income,
        expense:
          type === 'Expenses' ? prev.expense + parseInt(amount) : prev.expense,
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  deleteTransaction = (id, transferType, amount) => {
    const {moneyHistoryList, income, expense} = this.state
    const updateTransactions = moneyHistoryList.filter(each => each.id !== id)
    const totalIncome =
      transferType === 'Income' ? income - parseInt(amount) : income
    const totalExpenses =
      transferType === 'Expenses' ? expense - parseInt(amount) : expense
    this.setState({
      income: totalIncome,
      expense: totalExpenses,
      moneyHistoryList: updateTransactions,
    })
  }

  render() {
    const {moneyHistoryList, title, amount, type, income, expense} = this.state

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
          <MoneyDetails income={income} expense={expense} />
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
              type="text"
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
              value={type}
            >
              <option
                value={transactionTypeOptions[0].displayText}
                key={transactionTypeOptions[0].displayText}
              >
                {transactionTypeOptions[0].optionId}
              </option>
              <option
                value={transactionTypeOptions[1].displayText}
                key={transactionTypeOptions[1].displayText}
              >
                {transactionTypeOptions[1].optionId}
              </option>
            </select>
            <button type="submit" className="money-manager-form-btn">
              Add
            </button>
          </form>
          <div className="money-manager-history-container">
            <h1 className="money-manager-form-heading">History</h1>
            <div className="money-manager-heading-container">
              <p className="money-manager-heading1">Title</p>
              <p className="money-manager-heading1">Amount</p>
              <p className="money-manager-heading1">Type</p>
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
