import React, { Component } from 'react'

const NewsDetail =(props)=> {

    let { title, description, newsUrl, imageUrl, author, date,source} = props
    return (
      <>
        <div className="card" >
        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'50%'}}>
                {source}
              </span>
              
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="container">
              <h5 className="card-title">{title} </h5>
              <p className="card-text">{description}</p>
              <p class="card-text"><small className="text-muted">Updated by {!author ? "Unknown" : author} on {date}</small></p>

              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-dark">Read More</a>
            </div>
          </div>
        </div>

      </>
    )

}

export default NewsDetail
