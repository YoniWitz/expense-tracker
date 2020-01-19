import React from 'react'


import FormComponent from './FormComponent'
import TableComponent from './TableComponent'
import Table from 'react-bootstrap/Table'
import TableHead from './TableHead'

class ExpenseTracker extends React.Component {
    constructor() {
        super();

        this.state = {
            description: "",
            date: "",
            amount: "",
            where: "",
            expenses: []//expenses
        }

        this.changeHandle = this.changeHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeHandle(event) {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        //console.log('An expense was submitted:', this.state.date, this.state.description, this.state.amount, this.state.where);
        let newExpense = {
            description: this.state.description,
            date: this.state.date,
            amount: this.state.amount,
            where: this.state.where
        }

        this.setState(prevState => {
            let newExpenses = prevState.expenses.map(item => item);

            newExpenses.push(newExpense);
            window.localStorage.setItem('expenses', JSON.stringify(newExpenses));

            return ({
                description: "",
                date: "",
                amount: "",
                where: "",
                expenses: newExpenses
            })
        })

        event.preventDefault();
    }

    shouldComponentUpdate(nextProps, nextState){
        return (nextState.expenses.length !== this.state.expenses.length)
    }

    componentDidMount(){
        let expenses = typeof (Storage) !== "undefined" ? JSON.parse(window.localStorage.getItem('expenses')) : [];

        this.setState({expenses:expenses})
    }

    render() {
        const returnedExpenses = this.state.expenses.map((expense, i) =>
            <TableComponent key={i} expense={expense} rowNumber={i + 1} />
        )

        return (
            <main>
                <h1>Simple expense manager project</h1>
                <h2>Add a new item:</h2>
                <br />

                <FormComponent fields={this.state} handleSubmit={this.handleSubmit} changeHandle={this.changeHandle} />
                <br />

                <Table responsive bordered>
                    <TableHead />
                    <tbody>
                        {returnedExpenses}
                    </tbody>
                </Table>
            </main>
        )
    }
}
export default ExpenseTracker