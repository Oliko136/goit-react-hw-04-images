import { Component } from "react";
import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
        query: ''
    }

    handleChange = ({ target }) => {
        this.setState({
            query: target.value.toLowerCase()
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.query.trim() === '') {
            alert('Please fill out this field');
            return;
        }

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { query } = this.state;

        return (
            <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={styles.SearchFormButton}>
                        <FaSearch className={styles.SearchFormButtonIcon} />
                    </button>

                    <input
                        className={styles.SearchFormInput}
                        type="text"
                        name="search"
                        value={query}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

