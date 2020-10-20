import React, { Component } from 'react';

const apiBasePath = 'https://jsonmock.hackerrank.com/api/movies?Year=';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      movies: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log('handleChange');
    this.setState({ value: e.target.value });
  }

  handleClick() {
    const param = this.state.value;
    const apiUrl = apiBasePath + param;
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='layout-column align-items-center mt-50'>
        <section className='layout-row align-items-center justify-content-center'>
          <input
            onChange={this.handleChange}
            type='number'
            className='large'
            placeholder='Enter Year eg 2015'
            data-testid='app-input'
          />
          <button
            value={this.state.value}
            className=''
            data-testid='submit-button'
            onClick={this.handleClick}
          >
            Search
          </button>
        </section>

        {this.state.movies?.length > 0 ? (
          <ul className='mt-50 styled' data-testid='movieList'>
            {this.state.movies.map((movies, i) => {
              return (
                <li key={i} className='slide-up-fade-in py-10'>
                  {movies.Title}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className='mt-50 slide-up-fade-in' data-testid='no-result'>
            No Result
          </div>
        )}
      </div>
    );
  }
}
