import { useState } from "react";
import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";
import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleChange = ({ target }) => {
        setQuery(target.value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query.trim() === '') {
            alert('Please fill out this field');
            return;
        }

        onSubmit(query);
        setQuery('');
    }
    
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

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

