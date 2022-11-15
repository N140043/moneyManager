import './index.css'

const TransactionItem = props => {
  const {
    moneyInfo: {title, amount, type, id},
    deleteTransaction,
  } = props

  const deleteTransactionHistory = () => {
    deleteTransaction(id)
  }

  return (
    <li className="transaction-item-container">
      <p className="money-manager-para">{title}</p>
      <p className="money-manager-para">{amount}</p>
      <p className="money-manager-para">{type}</p>
      <button
        type="button"
        className="delete-btn"
        onClick={deleteTransactionHistory}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
