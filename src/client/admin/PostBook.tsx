import * as React from 'react';
import { json, User } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface IPostBookProps extends RouteComponentProps<{ id: string }> { }

export interface IPostBookState {
    title: string;
    author: string;
    price: number;
    categoryid: number;
    categories: { id: number, name: string }[];
    selectedCategoryId: string;
}

export default class IPostBook extends React.Component<IPostBookProps, IPostBookState> {
    constructor(props: IPostBookProps) {
        super(props);
        this.state = {
            title: null,
            author: null,
            price: null,
            categoryid: null,
            categories: [],
            selectedCategoryId: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this);

    }

    async componentWillMount() {
        if(!User || User.userid === null || User.role !== 'admin') {
            this.props.history.replace('/login');
        }
        try {
            let categories = await json('/api/categories');
            this.setState({ categories });
        } catch (e) {
            console.log(e);
        }
    }

    async handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        let book = {
            title: this.state.title,
            author: this.state.author,
            price: this.state.price,
            categoryid: this.state.selectedCategoryId
        };

        try {
            let result = await json('/api/books', 'POST', book);
            if (result) {
                this.setState({
                    title: '',
                    author: '',
                    price: null,
                    categoryid: null
                })
            }

            this.props.history.replace('/books');

        } catch (e) {
            throw e;
        }
    }

    renderCategories() {
        return this.state.categories.map(category => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        })
    }

    handleSelectCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ selectedCategoryId: e.target.value })
    }

    render() {

        const { title, author, price, selectedCategoryId } = this.state;

        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleSubmit} className="form-group m-2">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}
                            className="form-control d-block"
                            placeholder={title}>
                        </input>
                        <label>Author:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ author: e.target.value })}
                            className="form-control d-block"
                            placeholder={author}>
                        </input>
                        <label>Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ price: e.target.valueAsNumber })}
                            className="form-control d-block">
                        </input>
                        <label>Category: (Note: You must select from this field.)</label>
                        <select
                            value={selectedCategoryId}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ selectedCategoryId: e.target.value })}
                            className="form-control p-1 my-2"
                        >
                            <option>Select a category ...</option>
                            {this.renderCategories()}
                        </select>
                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-info mt-2">Post Book</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}