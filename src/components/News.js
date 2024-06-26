import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () =>
  {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=714d4db05bb74694838d3faf9fb4bd28&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=> {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsExpress`;
    updateNews();
  },[])


  // const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   setPage(page+1)
  //   updateNews();
  // }

  const fetchMoreData = async() =>{
    // setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=714d4db05bb74694838d3faf9fb4bd28&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    // setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    console.log(parsedData);
  };

    return (
      <div className="Container my-3">
        <h1 className="mx-3"
          style={{
            textAlign: "center",
            margin: "40px 0px",
            marginTop: '90px'
            // fontFamily: 'Ephesis, cursive, Gasoek One, sans-serif, Poppins, sans-serif'
            
          }} >
          NewsExpress Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
    
        {loading && <Spinner />}
        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner/>}
        >
          <div className="container">

          
        <div className="row">
          {
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              )
            })}
        </div>
        </div>
        </InfiniteScroll>
       
      </div>
    );
  
}



News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
} 


export default News;
// export default Spinner;
