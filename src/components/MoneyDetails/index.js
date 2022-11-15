import './index.css'

const MoneyDetails = props => {
  const {income, expense} = props

  return (
    <>
      <div className="money-details-box money-details-box1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="money-details-image"
        />
        <div className="money-details-info-box">
          <p className="money-details-box-para1">Your Balance</p>
          <p className="money-details-box-para2">Rs {income - expense}</p>
        </div>
      </div>
      <div className="money-details-box money-details-box2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="money-details-image"
        />
        <div className="money-details-info-box">
          <p className="money-details-box-para1">Your Income</p>
          <p className="money-details-box-para2">Rs {income}</p>
        </div>
      </div>
      <div className="money-details-box money-details-box3">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="money-details-image"
        />
        <div className="money-details-info-box">
          <p className="money-details-box-para1">Your Expenses</p>
          <p className="money-details-box-para2">Rs {expense}</p>
        </div>
      </div>
    </>
  )
}

export default MoneyDetails

// testid="expensesAmount"
// testid="incomeAmount"
// testid="balanceAmount"
