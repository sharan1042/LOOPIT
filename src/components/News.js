import React, { Component } from 'react'
import NewsDetail from './NewsDetail'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'science'
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,

  }
  capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  }
  constructor(props) {
    super(props); this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
    document.title = (`${this.capitalize(this.props.category)}- LOOPIT`)
  }

  async componentDidMount() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dd4b72ee6cf460d933ea2b108dab819&page=1`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articles: parsedData.articles })
    this.props.setProgress(100)

  }
  handleNext = async () => {
    // console.log("previous")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dd4b72ee6cf460d933ea2b108dab819&page=${this.state.page + 1}`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
  }
  handlePrev = async () => {
    // console.log("previous")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dd4b72ee6cf460d933ea2b108dab819&page=${this.state.page - 1}`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }

  render() {
    return (
      <div>
        <div className="container my-3" >
          <div className="container mt-100">
          <h1>LOOPIT - Top Headlines For You From {this.capitalize(this.props.category)}</h1>
          </div>

          <div className="row my-3">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsDetail title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-around">
          <button type="button " disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNext}>Next</button>

        </div>
      </div>
    )
  }
}

export default News
